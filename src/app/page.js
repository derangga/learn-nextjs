import { ProductCard } from "@/components/product_card";
import { Header } from "@/components/header";
import { API_URL } from "@/utils/url";
import Link from "next/link";

export default async function Home() {
  async function fetchProduct() {
    let products = [];
    try {
      const response = await fetch(API_URL);
      const { data } = await response.json();
      products = data;
    } catch (error) {
      console.log(`[ERROR]: ${error}`);
    } finally {
      return products;
    }
  }

  const products = await fetchProduct();
  return (
    <>
      <Header />
      <main>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 px-12 pt-4">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <ProductCard {...product}></ProductCard>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
