"use client";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";

import { IoMdClose } from "react-icons/io";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import CartProduct from "./CartProduct";

function Cart() {
  const { cartState, setCartState, cartProducts, cartTotal } =
    useContext(AppContext);

  useEffect(() => {
    if (!Object.keys(cartProducts).length) setCartState(false);
  }, [cartProducts]);

  return (
    <div
      className={`absolute custom-transition top-0 z-50 h-full w-fit bg-primary shadow-xl ${
        cartState ? "right-0" : "-right-full"
      } `}
    >
      <div className="relative overflow-y-scroll w-full h-full">
        <div className="sticky top-0 z-50 p-2 px-4 items-center flex flex-col bg-primary">
          <div className="flex flex-row p-2 w-full items-center justify-between">
            <div className="relative">
              <Image
                src={"/jumm-jumm-logo.svg"}
                width={50}
                height={50}
                alt="logo"
              ></Image>
            </div>
            <h1 className="text-2xl">{`$${cartTotal.toFixed(2)}`}</h1>
            <IoMdClose
              onClick={() => setCartState(!cartState)}
              opacity={0.5}
              size={40}
              className="cursor-pointer text-secondary"
            />
          </div>
          <button className="btn btn-sm border-none bg-secondary w-full text-white">
            COPY CART
            <BsReverseListColumnsReverse />
          </button>
        </div>
        <div className="relative overflow-y-scroll">
          <ul className="menu active text-white">
            {Object.entries(cartProducts).map(
              ([category, subcategories], i) => {
                return (
                  <li key={i} className="font-bold">
                    <p className="text-xl active">
                    {category}

                    </p>
                    <ul>
                      {Object.entries(subcategories).map(
                        ([subcategory, products], i) => {
                          return (
                            <li key={i}>
                              {subcategory}
                              <ul>
                                {Object.values(products).map((product, i) => (
                                  <li key={i}>
                                    <CartProduct {...product} />
                                  </li>
                                ))}
                              </ul>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cart;
