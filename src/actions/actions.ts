"use server";

import { signIn, signOut } from "@/lib/auth";
import {
  authSchema,
  chargesSchema,
  CheckoutItems,
  checkoutItemsSchema,
} from "@/lib/validations";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-utils";
import { redirect } from "next/navigation";

const stripe = require("stripe")(process.env.SECRET_KEY);

export async function logIn(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. Could not sign in.",
          };
        }
      }
    }

    throw error;
  }
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function register(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const formDataEntries = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(formDataEntries);

  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists.",
        };
      }
    }
  }

  await signIn("credentials", formData);
}

export async function createCheckoutSession(checkoutItems: CheckoutItems) {
  // authentication check
  const session = await checkAuth();
  // validate checkoutItems
  const validatedCheckoutItems = checkoutItemsSchema.safeParse(checkoutItems);

  if (!validatedCheckoutItems.success) {
    throw new Error("Something went wrong.");
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: validatedCheckoutItems.data,
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });
  console.log("🚀 ~ createCheckoutSession ~ checkoutSession:", checkoutSession);

  // redirect user
  redirect(checkoutSession.url);
}

export async function getCharges() {
  const session = await checkAuth();

  const charges = await stripe.charges.list();

  const validatedCharges = chargesSchema.safeParse(charges.data);

  if (!validatedCharges.success) {
    throw new Error("Something went wrong");
  }

  const filteredCharges = validatedCharges.data.filter(
    (charge) => charge.billing_details.email === session.user.email,
  );

  return filteredCharges;
}
