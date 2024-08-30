"use client";

import ProductList from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { useCartContext, useProductContext } from "@/lib/hooks";
import { toUsdPrice } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { addItemToCart } = useCartContext();
  const { products } = useProductContext();

  const params = useParams();
  const router = useRouter();

  const selectedProduct = products.find((product) => product.id === params.id);

  if (!selectedProduct) return <p className="text-4xl">Product Not Found</p>;

  return (
    <>
      <div className="w-1/2">
        <article className="flex flex-col gap-10">
          <div className="flex gap-5">
            <Image
              alt={selectedProduct.name}
              className="h-[350px] w-full object-cover"
              height={300}
              priority
              src={`${selectedProduct.images[0]}`}
              width={300}
            />

            <div className="flex flex-col gap-5">
              <section className="flex flex-col gap-3">
                <p>{selectedProduct.name}</p>
                <p>
                  {toUsdPrice(selectedProduct.default_price.unit_amount / 100)}
                </p>
                {/* TO DO */}
                <p>{selectedProduct.metadata.description}</p>
              </section>

              <Button
                className="mr-auto"
                onClick={() => {
                  addItemToCart(selectedProduct.id);

                  router.push("/cart");
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
          <p>{selectedProduct.description}</p>
        </article>
      </div>
      <ProductList />
    </>
  );
}
