import { Product } from "./validations";

export type CartItem = Product & {
  quantity: number;
};

export type AuthFormError = {
  message: string;
};
