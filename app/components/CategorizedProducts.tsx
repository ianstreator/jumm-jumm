"use client";
import { Products } from "@/types";
import ProductCard from "./ProductCard";

function CategorizedProducts(products: Products) {
  return (
    <div className="bg-accent backdrop overflow-y-scroll relative">
      {Object.entries(products).map(([category, subcategories], i) => (
        <div key={i}>
          <h1 className="sticky top-0 z-30 font-bold text-white bg-secondary text-2xl text-end w-full p-2 px-4">
            {category}
          </h1>

          {Object.entries(subcategories).map(([subcategory, products],i) => (
            <div key={i} id={products[0].name} className="relative">
              <h3 className="sticky top-0 z-30 font-light text-2xl p-2 px-4 rounded-r-md bg-info w-fit">
                {subcategory}
              </h3>

              <div className="flex flex-wrap px-6 pb-6 justify-start">
                {products.map((product, i) => (
                  <ProductCard key={i} {...product} />
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