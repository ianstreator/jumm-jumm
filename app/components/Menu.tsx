"use client";
import { Products } from "@/types";
import { useContext } from "react";
import { AppContext } from "../context";

import { IoMdClose } from "react-icons/io";

function Menu(products: Products) {
  const { menuState, setMenuState, theme, setTheme } = useContext(AppContext);

  const themes = ["Oscura", "Rosa", "Azul"];

  return (
    <div
      className={`absolute custom-transition top-0 z-50 h-full w-fit bg-secondary shadow-xl ${menuState ? "left-0" : "-left-full"
        } `}
    >
      <IoMdClose
        onClick={() => setMenuState(false)}
        color="white"
        size={40}
        className="absolute top-0 right-0 m-2 cursor-pointer"
      />
      <ul className="menu text-white">
        {Object.entries(products).map(([category, subcategories], i) => {
          return (
            <li key={i} className="w-1/2">
              <a
                href={`#${Object.values(subcategories)[0][0].name}`}
                onClick={() => setMenuState(false)}
                className="font-bold text-xl active"
              >
                {category}
              </a>
              <ul>
                {Object.entries(subcategories).map(
                  ([subcategory, products], i) => {
                    return (
                      <li key={i}>
                        <a
                          href={`#${products[0].name}`}
                          onClick={() => setMenuState(false)}
                          className="font-bold active"
                        >
                          {subcategory}
                        </a>
                      </li>
                    );
                  }
                )}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className="menu font-bold text-white border border-b-transparent border-x-transparent border-t-gray-50 mt-4">
        <h1 className="text-xl p-2">Tema</h1>
        <ul className="flex flex-row">
          {themes.map((themeName, i) => (
            <li
              key={i}
              className={`${theme === themeName &&
                "bg-green-300 text-neutral rounded-md"
                }`}
              onClick={() => setTheme(themeName)}
            >
              <p>
                {themeName}

              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
