import { Product, CategorizedProducts } from "@/types";
import * as contentful from "contentful";
import "react-toastify/dist/ReactToastify.css";

import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";

export const revalidate = 3600;

export default async function Home() {
  const products = await fetchContentfulProducts();
  return (
    <main className="relative h-full flex flex-col items-center justify-between backdrop bg-accent md:px-40">
      <Navbar />
      <Menu {...products} />
      <Cart {...products} />
      <ProductList {...products} />
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

type ContentfulImageStruct = {
  fields: {
    file: {
      url: string;
    };
  };
}[];
type ContentfulSubcategoryStruct = {
  fields: {
    title: string;
    category: {
      fields: {
        title: string;
      };
    };
  };
};

const accessToken = process.env.ACCESS_TOKEN as string;
const space = process.env.SPACE_ID as string;

const client = contentful.createClient({ space, accessToken });

const fetchContentfulProducts = async () => {
  const allProductData = (
    await client.getEntries({
      content_type: "products",
      include: 2,
      limit: 250,
    })
  ).items;

  const categorizedProducts = allProductData.reduce(
    (
      acc: CategorizedProducts,
      { fields: { name, price, available, image, subcategory } }
    ) => {
      const imageURL = (image as ContentfulImageStruct)[0].fields.file.url!;

      const {
        fields: {
          title: subcategoryTitle,
          category: {
            fields: { title: categoryTitle },
          },
        },
      } = subcategory as ContentfulSubcategoryStruct;

      const product = {
        name,
        price,
        available,
        imageURL,
        category: categoryTitle,
        subcategory: subcategoryTitle,
      } as Product;

      const category = acc[categoryTitle] && acc[categoryTitle];

      const subcategoryProducts = category && category[subcategoryTitle];

      if (!category) acc[categoryTitle] = {};

      if (!subcategoryProducts) {
        acc[categoryTitle][subcategoryTitle] = [product];
      } else {
        product.available
          ? subcategoryProducts.unshift(product)
          : subcategoryProducts.push(product);
      }

      return acc;
    },
    {}
  );
  return categorizedProducts;
};
