"use client";
import { CategorizedProductsType } from "@/types";
import { useContext } from "react";
import { AppContext } from "../context";

import { IoMdClose } from "react-icons/io";

function Menu(products: CategorizedProductsType) {
  const { menuState, setMenuState, theme, setTheme } = useContext(AppContext);

  const themes = ["Oscura", "Rosa", "Azul"];

  return (
    <div
      className={`flex flex-col text-white absolute overflow-hidden custom-transition top-0 z-50 h-full w-fit bg-secondary shadow-xl ${
        menuState ? "left-0" : "-left-full"
      } `}
    >
      <div className="flex w-full justify-between p-4 shadow-md">
        <h2 className="text-white font-bold text-2xl">MENÚ</h2>
        <IoMdClose
          onClick={() => setMenuState(false)}
          color="white"
          size={30}
          className="cursor-pointer"
        />
      </div>
      <ul className="menu grow overflow-y-scroll flex flex-col flex-nowrap pr-4">
        {Object.entries(products).map(([category, subcategories], i) => {
          return (
            <li key={i} className="w-full">
              <details>
                <summary className="font-bold text-xl">{category}</summary>
                <ul>
                  {Object.entries(subcategories).map(
                    ([subcategory, products], i) => {
                      return (
                        <li key={i} className="bg-black/5 my-1 rounded-md">
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
      <div className="menu flex flex-row flex-nowrap items-center bg-neutral/10 py-4 font-bold text-white">
        <h1 className="text-xl px-2">Tema:</h1>
        <ul className="flex flex-row w-full justify-between items-center">
          {themes.map((themeName, i) => (
            <li
              key={i}
              className={`${
                theme === themeName && "bg-green-300 text-neutral rounded-md"
              }`}
              onClick={() => setTheme(themeName)}
            >
              <p>{themeName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;