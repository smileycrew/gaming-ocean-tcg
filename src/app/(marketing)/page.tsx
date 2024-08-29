import ProductList from "@/components/product-list";

export default async function Home() {
  return (
    <main className="flex flex-col justify-between p-10">
      <article>
        <ProductList />
      </article>
    </main>
  );
}
