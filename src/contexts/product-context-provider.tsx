"use client";

import { Product } from "@/lib/validations";
import { createContext } from "react";

type ProductContext = {
  products: Product[];
};

type ProductContextProviderProps = {
  children: React.ReactNode;
  products: Product[];
};

export const ProductContext = createContext<ProductContext | null>(null);

export default function ProductContextProvider({
  children,
  products,
}: ProductContextProviderProps) {
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
