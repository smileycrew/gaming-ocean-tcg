"use client";

import { ProductContextProviderProps, TProductContext } from "@/lib/types";
import { createContext } from "react";

export const ProductContext = createContext<TProductContext | null>(null);

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
