"use client";
import React from "react";

import { useContext } from "react";
import { AppContext } from "../context";

import Navbar from "./Navbar";
import CategorizedProducts from "./CategorizedProducts";
import Menu from "./Menu";
import { Products } from "@/types";

function Client(products: Products) {
  const { menuState } = useContext(AppContext);

  return (
    <>
      <Menu {...products} />
      {/* {menuState && <Menu {...products} />} */}
      <Navbar {...products} />

      <CategorizedProducts {...products} />
    </>
  );
}

export default Client;
