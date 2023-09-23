import { cache } from "react";
import { ProductStructure, Products } from "@/types";
import "react-toastify/dist/ReactToastify.css";

import CategorizedProducts from "./components/CategorizedProducts";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";

export const revalidate = 3600;

export default async function Home() {
  const { products } = await fetchContentful();

  return (
    <main className="relative h-full flex flex-col items-center justify-between backdrop bg-accent md:px-40">
      <Navbar />
      <Menu {...products} />
      <Cart />
      <CategorizedProducts {...products} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeButton={false}
        theme="dark"
        limit={1}
      />
    </main>
  );
}
export const dynamic = "force-static";

const fetchContentful = cache(async () => {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const SPACE_ID = process.env.SPACE_ID;
  const ENVIRONMENT_ID = process.env.ENVIRONMENT_ID;

  const BASE_URL = "https://cdn.contentful.com";

  const res = await fetch(
    `${BASE_URL}/spaces/${SPACE_ID}/entries?content_type=products&include=2&limit=200&access_token=${ACCESS_TOKEN}`
  );

  const products: Products = await res.json().then((data) => {
    const {
      includes: { Entry, Asset },
      items,
    } = data;

    const imagesMap: any = Object.values(Asset).reduce((map: any, ass: any) => {
      map[ass.sys.id] = ass.fields.file.url;
      return map;
    }, {});

    const categories: any = {};
    const subcategories: any = {};

    for (const entry of Entry) {
      const isCategory = !entry.fields.category;
      const id = entry.sys.id;
      const title = entry.fields.title;

      if (isCategory) {
        categories[id] = title;
      } else {
        const categoryPointer = entry.fields.category.sys.id;
        subcategories[id] = { subcategoryName: title, categoryPointer };
      }
    }

    const products = Object.values(items).reduce(
      (products: Products, item: any) => {
        const imageID = item.fields.image[0].sys.id;
        const subcategoryID = item.fields.subcategory.sys.id;
        const { subcategoryName, categoryPointer } =
          subcategories[subcategoryID];
        const categoryName = categories[categoryPointer];
        const url = imagesMap[imageID];

        delete item.fields.image;
        delete item.fields.subcategory;

        const product: ProductStructure = {
          ...item.fields,
          url,
          subcategoryName,
          categoryName,
        };

        products[categoryName] = products[categoryName] || {};
        products[categoryName][subcategoryName] =
          products[categoryName][subcategoryName] || [];
        products[categoryName][subcategoryName].push(product);

        return products;
      },
      {}
    );

    return products;
  });

  return { products };
});
