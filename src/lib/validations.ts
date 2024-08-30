import { metadata } from "@/app/layout";
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

const cartSchema = z.object({
  id: z.string(),
  default_price: z.object({
    id: z.string(),
    unit_amount: z.coerce.number().int(),
  }),
  description: z.string(),
  images: z.array(z.string()),
  name: z.string(),
  quantity: z.coerce.number().int(),
});

const chargeSchema = z.object({
  id: z.string(),
  amount: z.coerce.number().int(),
  billing_details: z.object({
    email: z.string().email(),
  }),
  created: z.coerce.number().int(),
  receipt_url: z.string().url(),
});

const productSchema = z.object({
  id: z.string(),
  default_price: z.object({
    id: z.string(),
    unit_amount: z.coerce.number().int(),
  }),
  description: z.string(),
  images: z.array(z.string()),
  metadata: z.union([
    z.object({
      description: z.string(),
    }),
    z.object({}),
  ]),
  name: z.string(),
});

const checkoutItemSchema = z.object({
  price: z.string(),
  quantity: z.coerce.number().int(),
});

export const cartItemsSchema = z.array(cartSchema);
export const chargesSchema = z.array(chargeSchema);
export const checkoutItemsSchema = z.array(checkoutItemSchema);
export const productsSchema = z.array(productSchema);

export type Auth = z.infer<typeof authSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type CartItems = z.infer<typeof cartItemsSchema>;
export type CheckoutItems = z.infer<typeof checkoutItemsSchema>;
export type Product = z.infer<typeof productSchema>;
