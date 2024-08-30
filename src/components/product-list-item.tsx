import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import { toUsdPrice } from "@/lib/utils";
import Link from "next/link";
import { useCartContext } from "@/lib/hooks";
import { Product } from "@/lib/validations";
import { useState } from "react";

export type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  const { addItemToCart } = useCartContext();
  const router = useRouter();

  return (
    <li
      className="flex flex-col gap-3 rounded border p-3 shadow hover:border-black"
      key={product.id}
    >
      <Link className="self-center" href={`/products/${product.id}`}>
        <Image
          alt={product.name}
          className="h-[150px] w-[150px] object-cover"
          height={150}
          priority
          src={product.images[0]}
          width={150}
        />
      </Link>

      <div className="mt-auto">
        <p>{toUsdPrice(product.default_price.unit_amount / 100)}</p>
        <p>{product.name}</p>
      </div>

      <Button
        onClick={() => {
          addItemToCart(product.id);

          router.push("/cart");
        }}
      >
        Add To Cart
      </Button>
    </li>
  );
}
