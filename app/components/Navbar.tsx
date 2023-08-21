"use client";
import Image from "next/image";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context";

function Navbar() {
  const { menuState, setMenuState } = useContext(AppContext);

  return (
    <div className="bg-primary w-full flex items-center justify-between p-2 px-6">
      <button
        className="btn btn-sm bg-secondary text-white border-none rounded-md"
        onClick={() => setMenuState(!menuState)}
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
      <Image src={"/basket.svg"} width={50} height={50} alt="basket"></Image>
    </div>
  );
}

export default Navbar;
