import { ProductType } from "@/types";
import { useContext, useState } from "react";
import Image from "next/image";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";

import { AppContext } from "../context";

function CartProduct(product: ProductType) {
  const countUpdateIconSize = 20;
  const productImageDimension = 175;
  const { name, imageURL, count } = product;
  const [image, setImage] = useState(false);
  const { increaseProductCartCount, decreaseProductCartCount, theme } =
    useContext(AppContext);

  return (
    <>
      <div
        className={`relative w-fit my-2 p-0 overflow-hidden active:!bg-transparent hover:!bg-transparent shadow-md ${
          theme === "oscura" ? "!text-white" : "!text-neutral"
        }`}
      >
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
            <AiOutlineDelete size={countUpdateIconSize} />
          ) : (
            <AiOutlineMinus size={countUpdateIconSize} />
          )}
        </button>
        <div
          onClick={() => setImage(!image)}
          className={`flex flex-row py-2 items-center justify-center ${
            theme === "oscura" ? "!text-white" : "!text-neutral"
          }`}
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
          <AiOutlinePlus size={countUpdateIconSize} />
        </button>
      </div>

      {image && (
        <Image
          src={`https:${imageURL}`}
          width={productImageDimension}
          height={productImageDimension}
          alt={name}
          className="p-0 m-auto h-40 w-40 rounded-sm"
        ></Image>
      )}
    </>
  );
}

export default CartProduct;
