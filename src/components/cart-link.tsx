"use client";

import { useCartContext } from "@/lib/hooks";
import { Spinner } from "./ui/spinner";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function CartLink() {
  const { isCartLoading, numberOfItemsInCart } = useCartContext();

  return (
    <li className="relative flex gap-1">
      {isCartLoading && <Spinner />}

      {!isCartLoading && (
        <>
          <Link href="/cart">
            <IoCartOutline />
          </Link>
          <small className="absolute -top-2 left-5">
            {numberOfItemsInCart}
          </small>
        </>
      )}
    </li>
  );
}
