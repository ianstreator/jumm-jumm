"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../context";
import { RxHamburgerMenu } from "react-icons/rx";



function Navbar() {
  const { setMenuState, setCartState, cartProducts, cartCount } = useContext(AppContext);

  const countRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (countRef.current) {
      countRef.current.style.scale = "1.1"

      setTimeout(() => {
        if (countRef.current)
          countRef.current.style.scale = "1"
      }, 100);
    }

  }, [cartCount]);

  return (
    <nav className="bg-accent w-full grow-0 flex items-center justify-between p-2 px-6 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.15)] z-30">
      <RxHamburgerMenu size={35} strokeWidth={0.25} cursor="pointer" color="#262626" onClick={() => {
        setMenuState(true);
        setCartState(false);
      }} />

      <div className="relative">
        <Image
          src={"/jumm-jumm-logo.png"}
          width={50}
          height={50}
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
          <div ref={countRef} className="absolute left-6 rounded-full bg-secondary text-white flex flex-col justify-center items-center w-8 h-8 p-3 transition-all">
            {cartCount}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
