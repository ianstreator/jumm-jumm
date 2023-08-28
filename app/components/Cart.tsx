"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { toast } from "react-toastify";

import { IoMdClose } from "react-icons/io";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import CartProduct from "./CartProduct";

function Cart() {
  const { cartState, setCartState, cartProducts, cartTotal } =
    useContext(AppContext);

  const [cartList, setCartList] = useState("");

  useEffect(() => {
    if (!Object.keys(cartProducts).length) setCartState(false);
    setCartList("Cart Total: $" + cartTotal.toFixed(2).toString());
    Object.entries(cartProducts).forEach(([category, subcategories]) => {
      setCartList((curr) => curr.concat("\n"));
      setCartList((curr) => curr.concat(category.toUpperCase() + "\n"));
      Object.entries(subcategories).forEach(([subcategory, products]) => {
        setCartList((curr) => curr.concat("\n"));
        setCartList((curr) => curr.concat("  " + subcategory + "\n"));
        Object.values(products).forEach(({ name, count }) => {
          setCartList((curr) =>
            curr.concat("    " + `${count}x  ` + name + "\n")
          );
        });
      });
    });
  }, [cartProducts]);

  return (
    <div
      className={`absolute custom-transition top-0 z-50 h-full w-fit bg-accent shadow-xl ${
        cartState ? "right-0" : "-right-full"
      } `}
    >
      <div className="relative overflow-y-scroll w-full h-full">
        <div className="sticky top-0 z-50 p-2 px-4 items-center flex flex-col bg-primary">
          <div className="flex flex-row p-2 w-full items-center justify-between">
            <div className="relative">
              <Image
                onClick={() => setCartState(false)}
                src={"/jumm-jumm-logo.svg"}
                width={50}
                height={50}
                alt="logo"
              ></Image>
            </div>
            <h1 className="text-2xl">{`$${cartTotal.toFixed(2)}`}</h1>
            <IoMdClose
              onClick={() => setCartState(false)}
              opacity={0.5}
              size={40}
              className="cursor-pointer text-secondary"
            />
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(cartList);
              toast("Lista Copiada! 📃", {
                className: "cart-copied",
                progressClassName: "progress-copied",
              });
            }}
            className="btn btn-sm border-none bg-secondary w-full text-white"
          >
            Copiar
            <BsReverseListColumnsReverse />
          </button>
        </div>
        <div className="relative overflow-y-scroll">
          <ul className="menu active text-white">
            {Object.entries(cartProducts).map(
              ([category, subcategories], i) => (
                <li key={i}>
                  <p className="active-dark font-bold text-xl">{category}</p>

                  <ul>
                    {Object.entries(subcategories).map(
                      ([subcategory, products], i) => (
                        <li key={i}>
                          <p className="active-dark font-bold">{subcategory}</p>

                          <ul>
                            {Object.values(products).map((product, i) => (
                              <li key={i}>
                                <CartProduct {...product} />
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cart;
