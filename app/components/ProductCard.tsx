import Image from "next/image";
import { ProductStructure } from "@/types";

function ProductCard(data: ProductStructure) {
  const { urls, name, price } = data;

  return (
    <div className="card w-44 card-min bg-primary shadow-lg mt-6 overflow-hidden last:ml-auto">
      <div className="carousel w-full">
        {urls.map((url, i) => (
          <div
            key={i}
            className="carousel-item relative product-image-dimensions"
          >
            <Image
              src={`https:${url}`}
              width={175}
              height={175}
              alt={name}
            ></Image>
          </div>
        ))}
      </div>

      <div className="card-body p-2 justify-between">
        <div>
          <p className="font-bold">{name.replace("(", "").replace(")", "")}</p>
          <p>${price.toFixed(2)}</p>
        </div>

        <button className="btn btn-sm bg-secondary border-none text-xs text-white">
          <Image
            src={"/basket-plus.svg"}
            width={30}
            height={30}
            alt="basket-plus"
          ></Image>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
