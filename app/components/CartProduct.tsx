import { ProductStructure } from "@/types";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";

import { AppContext } from "../context";

function CartProduct(product: ProductStructure) {
  const { name, url, count } = product;

  const [image, setImage] = useState(false);

  const { increaseProductCartCount, decreaseProductCartCount } =
    useContext(AppContext);

  return (
    <>
      <div className="relative w-fit my-2 p-0 bg-transparent overflow-hidden hover:bg-transparent shadow-md active">
        <button
          onClick={() => {
            if (count! < 2) {
              return (
                confirm("¿Quitar artículo del carrito?") &&
                decreaseProductCartCount(product)
              );
            }
            decreaseProductCartCount(product);
          }}
          className="btn btn-lg rounded-r-none w-10 text-white  border-none p-1 transform-none bg-secondary"
        >
          {count! < 2 ? (
            <AiOutlineDelete size={20} />
          ) : (
            <AiOutlineMinus size={20} />
          )}
        </button>
        <div
          onClick={() => setImage(!image)}
          className="flex flex-row py-2 items-center justify-center text-neutral"
        >
          <p className="w-36 h-10 pl-2 whitespace-normal text-start font-bold flex items-center justify-start cursor-pointer">
            {name}
          </p>
          <p className="w-8 text-xl mx-2">{`x${count}`}</p>
        </div>

        <button
          onClick={() => increaseProductCartCount(product)}
          className="btn btn-lg rounded-l-none w-10 text-white border-none p-1 transform-none bg-secondary"
        >
          <AiOutlinePlus size={20} />
        </button>
      </div>

      {image && (
        <Image
          src={`https:${url}`}
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
