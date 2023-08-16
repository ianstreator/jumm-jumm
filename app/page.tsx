const contentful = require("contentful");
import {
  ProductStructure,
  ContentfulProductStructure,
  Products,
} from "@/types";
import Banner from "./components/Banner";
import ProductCard from "./components/ProductCard";
export default async function Home() {
  const products = await fetchContentful();
  return (
    <main className="relative max-h-screen flex flex-col items-center justify-between overflow-hidden">
      <Banner {...products} />

      <div className="flex flex-wrap px-6 pb-6 justify-between overflow-y-scroll bg-accent backdrop">
        {/* {products.map((data, i) => (
          <ProductCard key={i} {...data} />
        ))} */}
      </div>
    </main>
  );
}

const fetchContentful = async () => {
  const client = contentful.createClient({
    accessToken: process.env.CDA_TOKEN,
    space: process.env.SPACE_ID,
  });

  const content: ContentfulProductStructure = await client.getEntries({
    content_type: "products",
    include: "2",
  });

  const items: ProductStructure[] = content.items.map(
    ({
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
    }) => {
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

    delete product.categoryName;
    delete product.subcategoryName;

    if (!products[categoryName!]) {
      products[categoryName!] = {};
    }

    if (!products[categoryName!][subcategoryName!]) {
      products[categoryName!][subcategoryName!] = [];
    } else {
      products[categoryName!][subcategoryName!].push(product);
    }
  });

  console.log(products);

  return products;
};
