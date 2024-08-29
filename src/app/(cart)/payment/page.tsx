"use client";

import { useCartContext } from "@/lib/hooks";
import { useEffect } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { clearCart } = useCartContext();
  useEffect(() => {
    if (searchParams.success) {
      clearCart();
    }
  }, []);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      {searchParams.success && (
        <>
          <p className="text-4xl">Thank you for your purchase!</p>
          <p className="text-4xl">
            The confirmation will be sent to your email!
          </p>
        </>
      )}
      {searchParams.cancelled && <p className="text-4xl">Payment Cancelled</p>}
    </div>
  );
}
