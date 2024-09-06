"use server";

import { signIn, signOut } from "@/lib/auth";
import {
    CheckoutItems,
    checkoutSchema,
    registerSchema,
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
    const validatedFormData = registerSchema.safeParse(formDataEntries);

    if (!validatedFormData.success) {
        return {
            message: "Invalid form data.",
        };
    }

    const { email, firstName, lastName, password } = validatedFormData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const prismaUser = await prisma.user.create({
            data: {
                email,
                firstName,
                hashedPassword,
                lastName,
                stripeCustomerId: "",
            },
        });

        const stripeCustomerInfo = await stripe.customers.list({
            email: prismaUser.email
        })

        if (!stripeCustomerInfo.data.length) {
            const newStripeCustomerInfo = await createNewStripeUser(email, firstName, lastName)

            const stripeCustomerId = newStripeCustomerInfo.id

            const updatedCustomerValues = {
                ...prismaUser,
                stripeCustomerId
            }

            await prisma.user.update({
                where: {
                    id: updatedCustomerValues.id
                },
                data: {
                    ...updatedCustomerValues
                }
            })
        } else {
            console.log("todo")
        }
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
    const validatedCheckout = checkoutSchema.safeParse(checkoutItems);

    if (!validatedCheckout.success) {
        throw new Error("Something went wrong.");
    }

    const checkoutSession = await stripe.checkout.sessions.create({
        customer: session.user.stripeCustomerId,
        line_items: validatedCheckout.data,
        mode: "payment",
        success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
        cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
    });

    console.log("TODO: If this returns id add clear cart else do not clear cart")

    // redirect user
    redirect(checkoutSession.url);
}

async function createNewStripeUser(
    email: string,
    firstName: string,
    lastName: string,
) {
    return await stripe.customers.create({
        name: `${firstName} ${lastName}`,
        email: email,
    });
}
