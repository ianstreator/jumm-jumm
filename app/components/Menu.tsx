"use client";
import { Products } from "@/types";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";

import { IoMdClose } from "react-icons/io";

function Menu(products: Products) {
  const { menuState, setMenuState, theme, setTheme } = useContext(AppContext);

  const themes = ["dark", "pink", "blue"];

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      className={`absolute custom-transition top-0 z-50 h-full w-fit bg-secondary shadow-xl ${
        menuState ? "left-0" : "-left-full"
      } `}
    >
      <IoMdClose
        onClick={() => setMenuState(!menuState)}
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
                onClick={() => setMenuState(!menuState)}
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
                          onClick={() => setMenuState(!menuState)}
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
        <ul className="border border-b-transparent border-x-transparent border-t-gray-50 mt-4">
          <li>
            <a className="pointer-events-none font-bold">Theme</a>
            <ul className="flex flex-row">
              {themes.map((currTheme, i) => (
                <li
                  key={i}
                  className={`${
                    theme === currTheme &&
                    "bg-green-300 text-neutral rounded-md"
                  }`}
                >
                  <a onClick={() => setTheme(currTheme)}>{currTheme}</a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </ul>
    </div>
  );
}

export default Menu;
