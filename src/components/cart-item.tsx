import Image from "next/image";
import { Button } from "./ui/button";
import QuantityButtons from "./quantity-buttons";
import { toUsdPrice } from "@/lib/utils";
import { useCartContext } from "@/lib/hooks";
import { TCartItems } from "@/lib/types";

type CartItemProps = {
  cartItem: TCartItems;
};

export default function CartItem({ cartItem }: CartItemProps) {
  const {
    addQuantity,
    changeQuantityOnInput,
    removeItemFromCart,
    subtractQuantity,
  } = useCartContext();
  return (
    <li
      className="grid grid-cols-5 items-center border-b p-3 text-center"
      key={cartItem.id}
    >
      <div className="flex items-center gap-3">
        <Image alt="" height={50} src={cartItem.images[0]} width={50} />
        <p>{cartItem.name}</p>
      </div>
      <p>{toUsdPrice(cartItem.default_price.unit_amount / 100)}</p>
      <QuantityButtons
        onAdd={() => addQuantity(cartItem.id)}
        onChange={changeQuantityOnInput}
        onSubtract={() => subtractQuantity(cartItem.id)}
        productId={cartItem.id}
        quantity={cartItem.quantity}
      />
      <p>
        {toUsdPrice(
          (cartItem.default_price.unit_amount / 100) * cartItem.quantity,
        )}
      </p>
      <Button
        onClick={() => removeItemFromCart(cartItem.id)}
        variant="destructive"
      >
        Remove
      </Button>
    </li>
  );
}
