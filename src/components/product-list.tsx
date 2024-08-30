"use client";

import { useProductContext } from "@/lib/hooks";
import ProductListItem from "./product-list-item";

export default function ProductList() {
  const { products } = useProductContext();

  return (
    <ul className="grid grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
