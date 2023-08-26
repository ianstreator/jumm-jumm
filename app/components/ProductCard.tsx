"use client";
import Image from "next/image";
import { ProductStructure } from "@/types";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";

function ProductCard(product: ProductStructure) {
  const { urls, name, price, categoryName, subcategoryName } = product;

  const { addProductToCart } = useContext(AppContext);

  const cartProduct = {
    name,
    price,
    urls,
    categoryName,
    subcategoryName,
  };

  return (
    <div
      key={name}
      id={name}
      className="card card-side rounded-sm w-44 card-min bg-primary shadow-lg my-4 mx-auto overflow-hidden"
    >
      <Image
        src={`https:${urls[0]}`}
        width={175}
        height={175}
        alt={name}
      ></Image>

      <div className="card-body p-2 justify-between">
        <div>
          <p className="font-bold">{name.replace("(", "").replace(")", "")}</p>
          <p>${price.toFixed(2)}</p>
        </div>

        <button
          onClick={() => addProductToCart(cartProduct)}
          className="btn btn-sm bg-secondary border-none text-xs text-white"
        >
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
