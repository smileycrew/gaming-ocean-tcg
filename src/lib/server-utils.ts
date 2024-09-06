import "server-only";

import { User } from "@prisma/client";
import prisma from "./db";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { Product, productsSchema } from "./validations";

const stripe = require("stripe")(process.env.SECRET_KEY);

export async function checkAuth() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return session;
}

export async function addProducts(stripeProducts: Product[]) {
    const prismaProducts = await prisma.product.findMany()
    if (prismaProducts.length === stripeProducts.length) {
        console.log("No product changes")
    } else {
        console.log("Product changes")
        const productsToAdd = stripeProducts?.filter((product) => {
            if (!prismaProducts.some((p) => p.stripeProductId === product.id)) {
                return product
            }
        })

        console.log("TODO IF PRODUCTS IN DB IS LESS THAN STRIPE FIND OUT WHICH ONE TO DELETE FROM DB")
        // const productsToDelete = prismaProducts.filter((product) => {
        // if (stripeProducts.some((p) => p.id === product.stripeProductId)) {
        // return product
        // }
        // })

        for (const product of productsToAdd) {
            console.log("Example of adding product")
            await prisma.product.create({
                data: {
                    description: product.description,
                    imageUrl: product.images[0],
                    name: product.name,
                    stripePriceId: product.default_price.id,
                    price: product.default_price.unit_amount,
                    stock: 20,
                    stripeProductId: product.id
                }
            })
        }
    }
}

export async function getCharges() {
    const session = await checkAuth();

    const charges = await stripe.charges.list({
        customer: session.user.stripeCustomerId
    });

    return charges.data;
}

export async function getProducts() {
    const stripeProducts = await stripe.products.list({
        active: true,
        expand: ["data.default_price"],
    });

    await addProducts(stripeProducts.data)
    const validatedProducts = productsSchema.safeParse(stripeProducts.data);

    if (!validatedProducts.success) {
        throw new Error("Something went wrong.");
    }

    return validatedProducts.data;
}

export async function getUserByEmail(email: User["email"]) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("Could not get user.");
    }

    return user;
}
