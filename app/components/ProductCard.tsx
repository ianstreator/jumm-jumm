"use client";
import Image from "next/image";
import { ProductStructure } from "@/types";
import { useContext } from "react";
import { AppContext } from "../context";

function ProductCard({ product, priority }: { product: ProductStructure, priority: boolean }) {

  const { url, name, price, available, categoryName, subcategoryName } =
    product;


  const { addProductToCart } = useContext(AppContext);

  const cartProduct = {
    name,
    price,
    url,
    categoryName,
    subcategoryName,
  };

  return (
    <div
      key={name}
      id={name}
      className="card rounded-sm bg-primary shadow-lg my-6 mx-1 sm:mr-4 md:mr-8"
    >
      <Image
        priority={priority}
        src={`https:${url}`}
        width={200}
        height={200}
        alt={name}
        className="!w-[200px] !h-[230px]"
      ></Image>

      <div className="card-body p-2 justify-between text-sm">
        <div className="text-sm">
          <p className="font-bold">{name.replace("(", "").replace(")", "")}</p>
          <p>${price.toFixed(2)}</p>
        </div>

        <button
          onClick={() => available && addProductToCart(cartProduct)}
          className="btn btn-sm bg-secondary border-none text-xs text-white"
        >
          {available ? (
            <Image
              src={"/basket-plus.svg"}
              width={30}
              height={30}
              alt="basket-plus"
            ></Image>
          ) : (
            <p>Agotado</p>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
