"use client";
import { Products } from "@/types";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";

import { IoMdClose } from "react-icons/io";

function Menu(products: Products) {
  const { menuState, setMenuState, theme, setTheme } = useContext(AppContext);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="absolute right-40 top-0 bottom-0 z-50 h-full w-full bg-secondary">
      <IoMdClose
        onClick={() => setMenuState(!menuState)}
        color="white"
        size={40}
        className="absolute top-0 right-0 m-2"
      />
      <ul className="menu text-white pl-40">
        {Object.entries(products).map(([category, subcategories], i) => {
          return (
            <li key={i} className="w-1/2">
              <a
                href={`#${Object.values(subcategories)[0][0].name}`}
                onClick={() => setMenuState(!menuState)}
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
        <ul className="border border-b-transparent border-x-transparent border-t-gray-50">
          <li>
            <a className="pointer-events-none">Theme</a>
            <ul>
              <li>
                <a onClick={() => setTheme("dark")}>Dark</a>
              </li>
              <li>
                <a onClick={() => setTheme("pink")}>Pink</a>
              </li>
              <li>
                <a onClick={() => setTheme("blue")}>Blue</a>
              </li>
            </ul>
          </li>
        </ul>
      </ul>
    </div>
  );
}

export default Menu;
