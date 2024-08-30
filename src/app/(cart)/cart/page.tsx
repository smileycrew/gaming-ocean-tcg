"use client";

import CartFooter from "@/components/cart-footer";
import CartHeader from "@/components/cart-header";
import CartItem from "@/components/cart-item";
import { Spinner } from "@/components/ui/spinner";
import { useCartContext } from "@/lib/hooks";
import React from "react";

export default function Page() {
  const { checkout, productsInCart, subtotal, isGettingCartItems } =
    useCartContext();

  if (isGettingCartItems) {
    return (
      <div className="flex h-full items-center justify-center text-center">
        <Spinner size={100} />
      </div>
    );
  }

  if (!productsInCart) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-4xl">Something went wrong</p>
      </div>
    );
  }

  if (productsInCart.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-4xl">Your Cart Is Empty</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-10 p-10">
      <header className="space-y-10">
        <h1 className="text-center text-4xl font-bold">My Cart</h1>
        <CartHeader />
      </header>

      <article>
        <ul>
          {productsInCart.map((product) => (
            <CartItem cartItem={product} key={product.id} />
          ))}
        </ul>
      </article>

      <footer className="flex w-full flex-col gap-5">
        <CartFooter onClick={checkout} subtotal={subtotal} />
      </footer>
    </div>
  );
}
