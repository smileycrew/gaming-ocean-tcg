import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import { productNameToUrl, toUsdPrice } from "@/lib/utils";
import Link from "next/link";
import { useCartContext } from "@/lib/hooks";
import { Product } from "@/lib/validations";

export type ProductListItemProps = {
    product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
    const { addItemToCart } = useCartContext();
    const router = useRouter();

    return (
        <li
            className="flex flex-col justify-between rounded gap-5  border p-3 shadow hover:border-black"
            key={product.id}
        >
            <div className="flex flex-col group">
                <Link className="flex flex-col" href={`/products/${productNameToUrl(product.name)}`}>
                    <div className="overflow-hidden self-center">
                        <Image
                            alt={product.name}
                            className="h-[150px] duration-500 w-[150px] object-cover hover:scale-110 transition"
                            height={150}
                            priority
                            src={product.images[0]}
                            width={150}
                        />
                    </div>
                    <div className="mt-auto">
                        <p>{toUsdPrice(product.default_price.unit_amount / 100)} USD</p>
                        <p className="group-hover:underline text-nowrap truncate text-sm">{product.name}</p>
                    </div>
                </Link>
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
