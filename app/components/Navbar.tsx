"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context";

function Navbar() {
  const { menuState, setMenuState, cartState, setCartState, cartProducts } =
    useContext(AppContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartProductsSum());
  }, [cartProducts]);

  const cartProductsSum = () => {
    let count = 0;

    Object.values(cartProducts).forEach((category) => {
      Object.values(category).forEach((subcategory) => {
        Object.values(subcategory).forEach(
          (product) => (count += product.count)
        );
      });
    });

    return count;
  };

  return (
    <div className="bg-primary w-full flex items-center justify-between p-2 px-6">
      <button
        className="btn btn-sm bg-secondary text-white border-none rounded-md"
        onClick={() => {
          setMenuState(!menuState);
          setCartState(false);
        }}
      >
        menú
      </button>
      <div className="relative">
        <Image
          src={"/jumm-jumm-logo.svg"}
          width={60}
          height={60}
          alt="logo"
        ></Image>
      </div>
      <div
        onClick={() => {
          if (!Object.keys(cartProducts).length)
            return alert("Add items to view cart!");
          setCartState(!cartState);
          setMenuState(false);
        }}
        className="relative flex flex-row cursor-pointer"
      >
        <Image
          src={"/basket.svg"}
          width={50}
          height={50}
          alt="basket"
        ></Image>
        {cartCount > 0 && (
          <div className="absolute left-6 rounded-full bg-secondary text-white flex flex-col justify-center items-center w-8 h-8 p-3">
            {cartCount}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
