"use client";
import ProductCard from "./ProductCard";
import { CategorizedProductsType } from "@/types";
import { useEffect, useContext } from "react";
import { AppContext } from "../context";

function CategorizedProducts(products: CategorizedProductsType) {
  const { menuState, setMenuState, cartState, setCartState } = useContext(AppContext)
  useEffect(() => {

  }, [menuState, cartState])
  return (
    <div className="overflow-y-scroll grow relative w-full" onScrollCapture={() => {
      setMenuState(false)
      setCartState(false)
    }} onClick={() => {
      setMenuState(false)
      setCartState(false)
    }}>
      {Object.entries(products).map(
        ([category, subcategories], categoryIndex) => (
          <div key={categoryIndex}>
            <h1 className="sticky top-0 z-30 font-bold text-white bg-secondary text-2xl text-end w-full p-2 px-4 shadow-md">
              {category}
            </h1>
            {Object.entries(subcategories).map(
              ([subcategory, products], subcategoryIndex) => (
                <div
                  key={subcategoryIndex}
                  id={products[0].name.trim()}
                  className="relative"
                >
                  <h3 className="sticky top-0 z-30 font-med text-2xl p-2 px-4 bg-info w-fit">
                    {subcategory}
                  </h3>
                  <div className="relative w-full flex flex-wrap py-6 justify-center md:justify-start">
                    {products.map((product, productIndex) => (
                      <ProductCard
                        key={productIndex}
                        product={product}
                        priority={
                          categoryIndex < 1 &&
                          subcategoryIndex < 1 &&
                          productIndex < 6
                        }
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )
      )}
    </div>
  );
}

export default CategorizedProducts;