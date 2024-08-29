import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import { toUsdPrice } from "@/lib/utils";
import { ProductListItemProps } from "@/lib/types";
import Link from "next/link";

export default function ProductListItem({
  onClick,
  product,
}: ProductListItemProps) {
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
          onClick();

          router.push("/cart");
        }}
      >
        Add To Cart
      </Button>
    </li>
  );
}
