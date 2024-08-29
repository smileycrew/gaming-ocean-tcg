import { Button } from "./ui/button";

type CartFooterProps = {
  onClick: () => void;
  subtotal: number;
};

export default function CartFooter({ onClick, subtotal }: CartFooterProps) {
  return (
    <>
      <section className="flex flex-col self-end">
        <div className="grid grid-cols-2 border-b py-3">
          <p>Subtotal:</p>
          <p className="text-end">${subtotal}</p>
        </div>

        <div className="grid grid-cols-2 border-b py-3">
          <p>Shipping:</p>
          <p className="text-end">Shipping On Checkout</p>
        </div>

        <div className="grid grid-cols-2 border-b py-3">
          <p>Taxes:</p>
          <p className="text-end">Taxes On Checkout</p>
        </div>
      </section>

      <Button className="self-end" onClick={onClick}>
        Go to checkout
      </Button>
    </>
  );
}
