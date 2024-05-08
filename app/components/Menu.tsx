"use client";
import { CategorizedProductsType } from "@/types";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import Image from "next/image";

import { IoMdClose } from "react-icons/io";

function Menu(products: CategorizedProductsType) {
  const { menuState, setMenuState, theme, setTheme } = useContext(AppContext);

  const themes = ["oscura", "rosa", "azul"];

  return (
    <div
      className={`flex flex-col text-white absolute overflow-hidden custom-transition top-0 z-50 h-full w-fit bg-primary shadow-xl ${
        menuState ? "left-0" : "-left-full"
      } `}
    >
      <div className="flex w-full justify-between items-center p-2 px-4 shadow-md bg-secondary">
        <div className="relative">
          <Image
            onClick={() => setMenuState(false)}
            src={"/jumm-jumm-logo.png"}
            width={50}
            height={50}
            alt="logo"
          ></Image>
        </div>
        <h2 className="text-white font-bold text-2xl">MENÚ</h2>
      </div>
      <ul className="menu grow overflow-y-scroll flex flex-col flex-nowrap pr-4">
        {Object.entries(products).map(([category, subcategories], i) => {
          return (
            <li key={i} className="w-full">
              <details>
                <summary className="font-bold text-xl bg-secondary m-2 hover:!bg-neutral hover:!text-white">
                  {category}
                </summary>
                <ul>
                  {Object.entries(subcategories).map(
                    ([subcategory, products], i) => {
                      return (
                        <li
                          key={i}
                          className="bg-secondary/70 my-4 mr-2 rounded-md hover:!bg-neutral"
                        >
                          <a
                            href={`#${products[0].name.trim()}`}
                            onClick={() => setMenuState(false)}
                            className="font-bold active text-md"
                          >
                            {subcategory}
                          </a>
                        </li>
                      );
                    }
                  )}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>
      <div className="menu flex flex-row flex-nowrap items-center bg-secondary py-4 font-bold text-white ">
        <h1 className="text-xl px-2">Tema:</h1>
        <ul className="flex flex-row w-full justify-between items-center">
          {themes.map((themeName, i) => (
            <li
              key={i}
              className={`${
                theme === themeName
                  ? "bg-green-300 text-neutral hover:!text-neutral rounded-md"
                  : "hover:bg-black/40 rounded-md"
              }`}
              onClick={() => setTheme(themeName)}
            >
              <p className="capitalize">{themeName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
