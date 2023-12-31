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
      className="card card-side rounded-sm w-44 card-min bg-primary shadow-lg my-4 overflow-hidden sm:mr-4 md:mr-8"
    >
      <Image
        priority={priority}
        src={`https:${url}`}
        width={150}
        height={150}
        alt={name}
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
