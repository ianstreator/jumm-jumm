"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { toast } from "react-toastify";

import { IoMdClose } from "react-icons/io";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";

import CartProduct from "./CartProduct";

function Cart() {
  const { cartState, setCartState, cartProducts, cartTotal } =
    useContext(AppContext);

  const [cartList, setCartList] = useState("");

  useEffect(() => {
    if (!Object.keys(cartProducts).length) setCartState(false);
    setCartList("Carrito total: $" + cartTotal.toFixed(2).toString() + "\n");
    Object.entries(cartProducts).forEach(([category, subcategories]) => {
      setCartList((curr) =>
        curr.concat("\n").concat(category.toUpperCase() + "\n")
      );
      Object.entries(subcategories).forEach(([subcategory, products]) => {
        setCartList((curr) =>
          curr.concat("\n").concat("  " + subcategory + "\n")
        );
        Object.values(products).forEach(({ name, count }) => {
          setCartList((curr) =>
            curr.concat("    " + `${count}x  ` + name + "\n")
          );
        });
      });
    });
  }, [cartProducts, setCartState, cartTotal]);

  return (
    <div
      className={`absolute custom-transition top-0 z-50 h-full w-fit bg-primary shadow-xl ${
        cartState ? "right-0" : "-right-full"
      } `}
    >
      <div className="relative flex flex-col overflow-y-scroll w-full h-full">
        <div className="sticky top-0 z-50 p-2 px-4 items-center flex flex-col bg-primary shadow-md">
          <div className="flex flex-row p-2 pb-0 w-full items-center justify-between">
            <div className="relative">
              <Image
                onClick={() => setCartState(false)}
                src={"/jumm-jumm-logo.png"}
                width={50}
                height={50}
                alt="logo"
              ></Image>
            </div>
            <h1 className="text-2xl">{`$${cartTotal.toFixed(2)}`}</h1>
            <IoMdClose
              onClick={() => setCartState(false)}
              opacity={0.5}
              size={30}
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
            className="btn btn-sm border-none my-4 bg-secondary w-full text-white"
          >
            copiar lista
            <BsReverseListColumnsReverse />
          </button>
          <div className="flex flex-row w-full justify-end">
            {/*
                  IG.ME LINK BUG WHEN CLICKED IN INSTAGRAM EMBEDDED VIEW
            */}
            {/* <a href={"https://ig.me/m/jummjumm.shop/"} target="_blank">
              <button className="relative w-40 btn btn-md border-none overflow-hidden rounded-md bg-transparent hover:bg-white">
                <div className="absolute z-10 inset-0 bg-gradient-to-tr from-fuchsia-700 to-amber-300 opacity-50"></div>
                <div className="z-50 w-full flex justify-between items-center text-white !font-extrabold">
                  Instagram
                  <AiOutlineInstagram size={30} />
                </div>
              </button>
            </a> */}
            <a
              // onClick={() => {
              //   if (confirm("¿Abrir WhatsApp?")) window.open(`https://api.whatsapp.com/send?phone=584125868522&text=${encodeURIComponent(
              //     cartList
              //   )}`, "_blank")
              // }}
              onClick={(e) =>
                !window.confirm("¿Abrir WhatsApp?") && e.preventDefault()
              }
              href={`https://api.whatsapp.com/send?phone=584125868522&text=${encodeURIComponent(
                cartList
              )}`}
              title="Store WhatsApp"
              target="_blank"
            >
              <button className="relative overflow-hidden btn btn-sm border-none rounded-md bg-transparent hover:bg-white w-fit">
                <div className="absolute z-10 inset-0 bg-gradient-to-tr from-emerald-900 to-green-500 opacity-50"></div>
                <div className="z-50 w-full flex items-center justify-center text-white">
                  WhatsApp
                  <AiOutlineWhatsApp size={20} className="ml-2" />
                </div>
              </button>
            </a>
          </div>
        </div>
        <div className="relative flex flex-col overflow-y-scroll">
          <div className="relative w-full grow">
            <div className="fixed bottom-0 w-full h-10 bg-gradient-to-t from-primary to-transparent z-40"></div>

            <ul className="menu active text-white mb-6 p-4">
              {Object.entries(cartProducts).map(
                ([category, subcategories], i) => (
                  <li key={i}>
                    <ul className="ml-0">
                      {Object.entries(subcategories).map(
                        ([subcategory, products], i) => (
                          <li key={i}>
                            <p className="active-dark font-bold text-xl pl-0">
                              {category + " - " + subcategory}
                            </p>

                            <ul className="p-0 m-0">
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
    </div>
  );
}

export default Cart;
