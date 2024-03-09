"use client";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../context";
import { ProductType } from "@/types";

function ProductCard({
  product,
  priority,
}: {
  product: ProductType;
  priority: boolean;
}) {
  const { imageURL, name, price, available } = product;

  const { addProductToCart } = useContext(AppContext);

  return (
    <div
      key={name}
      id={name}
      className="card rounded-sm bg-primary shadow-lg my-2 mx-1 max-w-[180px] sm:mr-4 md:mr-8"
    >
      <Image
        priority={priority}
        src={`https:${imageURL}`}
        width={200}
        height={200}
        alt={name}
        className="!w-[180px] !h-[180px]"
      ></Image>

      <div className="card-body p-2 justify-between text-sm">
        <div className="text-sm">
          <p className="font-bold min-h-[40px]">
            {name.replace("(", "").replace(")", "")}
          </p>
          <p>${price.toFixed(2)}</p>
        </div>

        <button
          onClick={() => available && addProductToCart(product)}
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
