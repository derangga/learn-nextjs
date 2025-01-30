import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { API_URL } from "@/utils/url";

export default async function ProductEdit({ params }) {
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

  async function updateProduct(formData) {
    "use server";
    const name = formData.get("name");
    const price = formData.get("price");
    const stocks = formData.get("stocks");
    const image = formData.get("image");
    const description = formData.get("description");

    try {
      await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          name: name,
          description: description,
          price: price,
          stocks: stocks,
          product_image: image,
        }),
      });

      revalidatePath(`/products/${id}`);
      revalidatePath(`/`);
    } catch (error) {
      console.log(`[ERROR] ${error}`);
    }

    redirect(`/products/${id}`);
  }

  const product = await fetchProduct();
  return (
    <main>
      <form className="p-4 flex flex-col w-1/2" action={updateProduct}>
        <label className="font-bold">Nama Produk</label>
        <input
          defaultValue={product.name}
          name="name"
          placeholder="Nama Produk"
        ></input>
        <label className="font-bold mt-2">Stock</label>
        <input
          defaultValue={product.stocks}
          name="stocks"
          placeholder="Jumlah Barang"
        ></input>
        <label className="font-bold mt-2">Harga</label>
        <input
          defaultValue={product.price}
          name="price"
          placeholder="Harga"
        ></input>
        <label className="font-bold mt-2">Gambar Produk</label>
        <input
          defaultValue={product.product_image}
          name="image"
          placeholder="Paste URL Gambar Produk"
        ></input>
        <label className="font-bold mt-2">Deskripsi</label>
        <textarea
          defaultValue={product.description}
          rows={12}
          name="description"
          placeholder="Tulis Deskripsi Produk"
        ></textarea>
        <button className="rounded-xl bg-green-600 text-white font-bold py-3 mt-3">
          Simpan
        </button>
      </form>
    </main>
  );
}
