"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { toast } from "react-toastify";

import { BsReverseListColumnsReverse } from "react-icons/bs";
import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";

import CartProduct from "./CartProduct";

function Cart() {
  const { cartState, setCartState, cartProducts, cartTotal, theme } =
    useContext(AppContext);

  const [cartList, setCartList] = useState("");

  const buildCartList = () => {
    let cartList = "";
    const escape = "\n";
    const subcategoryPrefix = "\n  ";
    const productPrefix = "    ";

    if (!Object.keys(cartProducts).length) setCartState(false);

    cartList = "Carrito total: $" + cartTotal.toFixed(2).toString() + escape;

    Object.entries(cartProducts).forEach(([category, subcategories]) => {
      cartList += escape + category.toUpperCase() + escape;
      Object.entries(subcategories).forEach(([subcategory, products]) => {
        cartList += subcategoryPrefix + subcategory + escape;
        Object.values(products).forEach(({ name, count }) => {
          cartList += productPrefix + `${count}x  ` + name + "," + escape;
        });
      });
    });

    return cartList;
  };

  useEffect(() => {
    setCartList(buildCartList());
  }, [cartProducts, setCartState, cartTotal]);

  return (
    <div
      className={`absolute custom-transition top-0 z-50 h-full w-fit ${
        theme === "oscura" ? "bg-primary" : "bg-accent"
      } shadow-xl ${cartState ? "right-0" : "-right-full"} `}
    >
      <div className="relative flex flex-col overflow-y-scroll w-full h-full">
        <div
          className={`sticky top-0 z-50 p-2 px-4 items-center flex flex-col bg-primary ${
            theme === "oscura" && "!bg-accent"
          } shadow-md`}
        >
          <div className="flex flex-row w-full items-center justify-between">
            <div className="relative">
              <Image
                onClick={() => setCartState(false)}
                src={"/jumm-jumm-logo.png"}
                width={50}
                height={50}
                alt="logo"
              ></Image>
            </div>
            <h1 className="text-2xl text-neutral">{`$${cartTotal.toFixed(
              2
            )}`}</h1>
          </div>
        </div>

        <div className="relative flex flex-col overflow-y-scroll">
          <div className="relative w-full grow mb-14">
            <ul
              className={`menu active mb-6 p-4 ${
                theme === "oscura" ? "!text-white" : "!text-neutral"
              }`}
            >
              {Object.entries(cartProducts).map(
                ([category, subcategories], i) => (
                  <li key={i}>
                    <ul className="ml-0">
                      {Object.entries(subcategories).map(
                        ([subcategory, products], i) => (
                          <li
                            key={i}
                            className=" active:bg-transparent hover:bg-transparent"
                          >
                            <p
                              className={`font-bold text-xl ${
                                theme === "oscura"
                                  ? "!text-white"
                                  : "!text-neutral"
                              } pl-0
                              active:!bg-transparent hover:!bg-transparent !cursor-default
                              `}
                            >
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

            <div></div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-full">
        <div
          className={`h-10 bg-gradient-to-t ${
            theme === "oscura" ? "from-primary" : "from-accent"
          } to-transparent z-40`}
        ></div>

        <div
          className={`flex flex-row w-full items-center justify-between ${
            theme === "oscura" ? "bg-primary" : "bg-accent"
          } p-4`}
        >
          <a
            onClick={(e) =>
              !window.confirm("¿Abrir WhatsApp?") && e.preventDefault()
            }
            href={`https://api.whatsapp.com/send?phone=584125868522&text=${encodeURIComponent(
              cartList
            )}`}
            title="Store WhatsApp"
            target="_blank"
          >
            <button className="relative overflow-hidden btn btn-sm border-none bg-green-600 w-fit">
              {/* <div className="absolute z-10 inset-0 bg-gradient-to-tr from-emerald-900 to-green-500 opacity-50"></div> */}
              <div className="z-50 w-full flex items-center justify-center text-white">
                WhatsApp
                <AiOutlineWhatsApp size={20} className="ml-2" />
              </div>
            </button>
          </a>

          {/*
                  IG.ME LINK BUG WHEN CLICKED IN INSTAGRAM'S EMBEDDED BROWSER VIEW
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

          <button
            onClick={() => {
              navigator.clipboard.writeText(cartList);
              toast("Lista Copiada! 📃", {
                className: "cart-copied",
                progressClassName: "progress-copied",
              });
            }}
            className="btn btn-sm border-none bg-secondary w-fit text-white"
          >
            copiar lista
            <BsReverseListColumnsReverse />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
