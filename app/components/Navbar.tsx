"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context";

function Navbar() {
  const { setMenuState, setCartState, cartProducts, cartCount } = useContext(AppContext);
 
  useEffect(() => {
  }, [cartCount]);

  return (
    <nav className="bg-primary w-full grow-0 flex items-center justify-between p-2 px-6">
      <button
        className="btn btn-sm bg-secondary text-white border-none rounded-md"
        onClick={() => {
          setMenuState(true);
          setCartState(false);
        }}
      >
        menú
      </button>
      <div className="relative">
        <Image
          src={"/jumm-jumm-logo.png"}
          width={60}
          height={60}
          alt="logo"
        ></Image>
      </div>
      <div
        onClick={() => {
          if (!Object.keys(cartProducts).length)
            return alert("¡Agregue artículos para ver el carrito!");
          setCartState(true);
          setMenuState(false);
        }}
        className="relative flex flex-row cursor-pointer"
      >
        <Image src={"/basket.svg"} width={50} height={50} alt="basket"></Image>
        {cartCount > 0 && (
          <div className="absolute left-6 rounded-full bg-secondary text-white flex flex-col justify-center items-center w-8 h-8 p-3">
            {cartCount}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
