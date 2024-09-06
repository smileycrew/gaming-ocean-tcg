import { z } from "zod";

export const userEssentials = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

const cartEssentials = z.object({
  productId: z.string(),
  quantity: z.coerce.number().int(),
});

const chargeEssentials = z.object({
  id: z.string(),
  amount: z.coerce.number().int(),
  billing_details: z.object({
    email: z.string().email(),
  }),
  created: z.coerce.number().int(),
  receipt_url: z.string().url(),
});

const checkoutEssentials = z.object({
  price: z.string(),
  quantity: z.coerce.number().int(),
});

const productEssentials = z.object({
  id: z.string(),
  default_price: z.object({
    id: z.string(),
    unit_amount: z.coerce.number().int(),
  }),
  description: z.string(),
  images: z.array(z.string()),
  name: z.string(),
});

export const productWithQuantity = productEssentials.merge(
  z.object({
    quantity: z.coerce.number().int(),
  }),
);

export const registerSchema = userEssentials.merge(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
);

export const authSchema = registerSchema.merge(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    stripeCustomerId: z.string(),
  }),
);

export const stripeCustomerIdSchema = z.object({
  id: z.string(),
});

export const cartEssentialsSchema = z.array(cartEssentials);
export const chargesSchema = z.array(chargeEssentials);
export const checkoutSchema = z.array(checkoutEssentials);
export const productsSchema = z.array(productEssentials);

export type Auth = z.infer<typeof authSchema>;
export type Cart = z.infer<typeof cartEssentials>;
export type CartItems = z.infer<typeof cartEssentialsSchema>;
export type CheckoutItems = z.infer<typeof checkoutSchema>;
export type Product = z.infer<typeof productEssentials>;
