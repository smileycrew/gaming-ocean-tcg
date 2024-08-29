import { Product } from "./validations";

export type TProductContext = {
  products: Product[];
};

export type ProductContextProviderProps = {
  children: React.ReactNode;
  products: Product[];
};

export type ProductListItemProps = {
  onClick: () => void;
  product: Product;
};

export type TCartItems = Product & {
  quantity: number;
};
