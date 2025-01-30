import { priceFormat } from "@/utils/price_formater";
import { API_URL } from "@/utils/url";
import Image from "next/image";
import Link from "next/link";

export default async function ProductDetail({ params }) {
  const { id } = await params;
  async function fetchProduct() {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        cache: "no-store",
      });
      const product = await response.json();
      return product;
    } catch (error) {
      console.log(`[ERROR]: ${error}`);
      return {};
    }
  }
  const product = await fetchProduct();
  const price = priceFormat(product.price);
  return (
    <main className="px-32 pt-8 pb-3 grid grid-cols-3 gap-12 h-full absolute">
      <div className="overflow-hidden">
        <Image
          src={product.product_image}
          alt={product.name}
          width={480}
          height={480}
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col overflow-auto">
        <p className="text-2xl font-bold">{product.name}</p>
        <p className="text-base mt-4">{product.description}</p>
      </div>
      <div className="flex flex-col h-fit border border-slate-400 rounded-xl p-3 overflow-y-auto mx-8">
        <div className="font-bold text-base">Informasi Produk</div>
        <div className="mt-2">
          Stock total: <span className="font-bold">{product.stocks}</span>
        </div>
        <div className="flex flex-row justify-between items-center mt-2">
          <div>Harga</div>
          <div className="text-lg font-bold">Rp{price}</div>
        </div>
        <Link
          className="rounded-xl bg-green-600 text-white py-3 font-bold mt-4 w-full text-center"
          href={`/products/${id}/edit`}
        >
          Ubah Informasi
        </Link>
      </div>
    </main>
  );
}
