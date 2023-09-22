"use client";
import { Products } from "@/types";
import ProductCard from "./ProductCard";

function CategorizedProducts(products: Products) {
  console.log(products)
  return (
    <div className="overflow-y-scroll grow relative w-full">
      {Object.entries(products).map(([category, subcategories], categoryIndex) => (
        <div key={categoryIndex}>
          <h1 className="sticky top-0 z-30 font-bold text-white bg-secondary text-2xl text-end w-full p-2 px-4 shadow-md">
            {category}
          </h1>
          {Object.entries(subcategories).map(([subcategory, products], subcategoryIndex) => (
            <div key={subcategoryIndex} id={products[0].name} className="relative">
              <h3 className="sticky top-0 z-30 font-med text-2xl p-2 px-4 bg-info w-fit">
                {subcategory}
              </h3>
              <div className="relative w-full flex flex-wrap p-6 justify-center md:justify-start">
                {products.map((product, productIndex) => (
                  <ProductCard key={productIndex} product={product} priority={categoryIndex < 1 && subcategoryIndex < 1 && productIndex < 6} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CategorizedProducts;
