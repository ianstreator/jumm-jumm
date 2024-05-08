import { ProductType, CategorizedProductsType } from "@/types";
import * as contentful from "contentful";
import "react-toastify/dist/ReactToastify.css";

import CategorizedProducts from "./components/CategorizedProducts";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";

export const revalidate = 3600;

export default async function Home() {
  const products = await fetchContentfulProducts();
  return (
    <main className="relative h-screen w-screen flex flex-col items-center justify-between backdrop bg-primary md:px-40">
      
      <Menu {...products} />
      <Cart />
      <CategorizedProducts {...products} />
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeButton={false}
        theme="dark"
        limit={1}
      />
    </main>
  );
}
export const dynamic = "force-static";

type ContentfulImageType = {
  fields: {
    file: {
      url: string;
    };
  };
}[];
type ContentfulSubcategoryType = {
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

  const CategorizedProducts = allProductData.reduce(
    (
      acc: CategorizedProductsType,
      { fields: { name, price, available, image, subcategory } }
    ) => {
      const imageURL = (image as ContentfulImageType)[0].fields.file.url!;

      const {
        fields: {
          title: subcategoryTitle,
          category: {
            fields: { title: categoryTitle },
          },
        },
      } = subcategory as ContentfulSubcategoryType;

      const product = {
        name,
        price,
        available,
        imageURL,
        category: categoryTitle,
        subcategory: subcategoryTitle,
      } as ProductType;

      const category = acc[categoryTitle] && acc[categoryTitle];

      const subcategoryProducts = category && category[subcategoryTitle];

      if (available) {
        if (!category) acc[categoryTitle] = {};

        if (!subcategoryProducts) {
          acc[categoryTitle][subcategoryTitle] = [product];
        } else {
          product.available
            ? subcategoryProducts.unshift(product)
            : subcategoryProducts.push(product);
        }
      }

      return acc;
    },
    {}
  );
  return CategorizedProducts;
};
