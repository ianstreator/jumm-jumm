const contentful = require("contentful");
import { cache } from "react"
import {
  ProductStructure,
  ContentfulProductStructure,
  Products,
} from "@/types";
import "react-toastify/dist/ReactToastify.css";

import CategorizedProducts from "./components/CategorizedProducts";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";

export const revalidate = 3600

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
export const dynamic = 'force-static'

const fetchContentful = cache(async () => {

  const ACCESS_TOKEN = process.env.ACCESS_TOKEN
  const SPACE_ID = process.env.SPACE_ID
  const ENVIRONMENT_ID = process.env.ENVIRONMENT_ID

  const client = contentful.createClient({
    accessToken: ACCESS_TOKEN,
    space: SPACE_ID,
  });


  const content: ContentfulProductStructure = await client.getEntries({
    limit: 200,
    content_type: "products",
    include: "2",
  });




  // const BASE_URL = "https://cdn.contentful.com"

  // const res = await fetch(`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries?content_type=products&include=2&limit=200&access_token=${ACCESS_TOKEN}`)

  // // console.log(res)

  // const content: ProductStructure[] = await res.json().then(
  //   data => {
  //     const { includes: { Entry, Asset }, items } = data

  //     const categories: any = {}

  //     const subcategories: any = {}

  //     for (const [i, entry] of Entry.entries()) {
  //       console.log(entry, i)

  //       const isCategory = !entry.fields.category
  //       const id = entry.sys.id
  //       const title = entry.fields.title


  //       if (isCategory) {

  //         categories[title] = {id}
  //       } else {
  //         subcategories[title] = {id}

  //       }
  //     }

  //     console.log(categories,subcategories)

  //     return data
  //   }
  // )


  const items: ProductStructure[] = content.items.map(
    (
      {
        fields: {
          name,
          available,
          description,
          price,
          image,
          subcategory: {
            fields: {
              title: subcategoryName,
              category: {
                fields: { title: categoryName },
              },
            },
          },
        },
      },
      i
    ) => {
      const urls = image.map((img) => img.fields.file.url);
      return {
        name,
        urls,
        price,
        description,
        available,
        subcategoryName,
        categoryName,
      };
    }
  );

  const products: Products = {};

  items.forEach((item) => {
    const { categoryName, subcategoryName } = item;
    const product = { ...item };

    if (!products[categoryName!])
      products[categoryName!] = {};

    if (!products[categoryName!][subcategoryName!]) {
      products[categoryName!][subcategoryName!] = [product];
    } else {
      products[categoryName!][subcategoryName!].push(product);
    }
  });

  // const products = items.reduce((acc, item) => {
  //   const { categoryName, subcategoryName, ...product } = item;

  //   acc[categoryName!] = acc[categoryName!] || {};
  //   acc[categoryName!][subcategoryName!] = acc[categoryName!][subcategoryName!] || [];
  //   acc[categoryName!][subcategoryName!].push(product);

  //   return acc;
  // }, {});

  return { products };
});

