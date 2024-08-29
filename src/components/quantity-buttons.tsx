import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type QuantityButtonsProps = {
  onAdd: () => void;
  onChange: (productId: string, quantity: number) => void;
  onSubtract: () => void;
  productId: string;
  quantity: number;
};

export default function QuantityButtons({
  onAdd,
  onChange,
  onSubtract,
  productId,
  quantity,
}: QuantityButtonsProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === "") {
      onChange(productId, 1);
    } else if (value === "0") {
      onChange(productId, 1);
    } else if (parseInt(value) > 0) {
      onChange(productId, parseInt(value));
    }
  };

  return (
    <div className="flex justify-start gap-1">
      <Button onClick={onSubtract}>
        <MinusIcon />
      </Button>

      <Input
        className="text-center"
        type="number"
        onChange={handleInputChange}
        value={quantity}
      />

      <Button onClick={onAdd}>
        <PlusIcon />
      </Button>
    </div>
  );
}
