import ProductList from "@/components/product-list";

export default async function Home() {
  return (
    <main className="p-10">
      <article>
        <ProductList />
      </article>
    </main>
  );
}
