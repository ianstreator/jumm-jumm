import { CartProduct } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";

import { AppContext } from "../context";

function CartProduct(product: CartProduct) {
  const { name, urls, count } = product;

  const [image, setImage] = useState(false);

  const { increaseProductCartCount, decreaseProductCartCount } =
    useContext(AppContext);

  return (
    <>
      <div className="relative w-fit my-2 p-0 bg-transparent overflow-hidden hover:bg-transparent shadow-md active">
        <button
          onClick={() => {
            if (count < 2) {
              return (
                confirm("Remove product from cart?") &&
                decreaseProductCartCount(product)
              );
            }
            decreaseProductCartCount(product);
          }}
          className="btn btn-lg w-10 text-white rounded-none border-none p-1 transform-none bg-secondary pointer-events-auto"
        >
          {count < 2 ? (
            <AiOutlineDelete size={20} />
          ) : (
            <AiOutlineMinus size={20} />
          )}
        </button>
        <div
          onClick={() => setImage(!image)}
          className="flex flex-row py-2 font-normal items-center justify-center text-neutral bg-primary"
        >
          <p className="w-40 h-10 pl-4 whitespace-normal text-start font-bold flex items-center justify-start">
            {name}
          </p>
          <p className="w-8 text-xl ml-2">{`x${count}`}</p>
        </div>

        <button
          onClick={() => increaseProductCartCount(product)}
          className="btn btn-lg w-10 text-white rounded-none border-none p-1 transform-none bg-secondary pointer-events-auto"
        >
          <AiOutlinePlus size={20} />
        </button>
      </div>

      {image && (
        <Image
          src={`https:${urls[0]}`}
          width={175}
          height={175}
          alt={name}
          className="p-0 m-auto h-40 w-40 rounded-sm"
        ></Image>
      )}
    </>
  );
}

export default CartProduct;
