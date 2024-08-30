import "server-only";

import { User } from "@prisma/client";
import prisma from "./db";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { productsSchema } from "./validations";

const stripe = require("stripe")(process.env.SECRET_KEY);

export async function checkAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getProducts() {
  const data = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  const validatedProducts = productsSchema.safeParse(data.data);

  if (!validatedProducts.success) {
    throw new Error("Something went wrong.");
  }

  return data.data;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Something went wrong.");
  }

  return user;
}
