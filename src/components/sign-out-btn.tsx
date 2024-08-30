"use client";

import { logOut } from "@/actions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { useCartContext } from "@/lib/hooks";

export default function SignOutBtn() {
  const { clearCart } = useCartContext();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          clearCart();

          await logOut();
        });
      }}
    >
      Sign out
    </Button>
  );
}
