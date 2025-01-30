import { priceFormat } from "@/utils/price_formater";

export const ProductCard = ({ name, description, price, product_image }) => {
  const reformatPrice = priceFormat(price);
  return (
    <div className="flex pr-4 rounded-xl border border-slate-200 bg-white cursor-pointer hover:shadow">
      <img
        src={product_image}
        width={140}
        className="rounded-s-xl"
        alt={name}
      />
      <div className="flex flex-col ml-3 py-2">
        <p className="text-base font-bold line-clamp-2">{name}</p>
        <p className="text-xs line-clamp-3 mt-1">{description}</p>
        <p className="text-sm font-bold mt-2">{`Rp${reformatPrice}`}</p>
      </div>
    </div>
  );
};
