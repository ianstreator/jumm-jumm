const contentful = require("contentful");
import {
  ProductStructure,
  ContentfulProductStructure,
  Products,
} from "@/types";
import Client from "./components/Client";

export default async function Home() {

  const products = await fetchContentful();

  return (
    <main className="relative max-h-screen flex flex-col items-center justify-between overflow-hidden">
      <Client {...products} />
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

    delete product.categoryName;
    delete product.subcategoryName;

    if (!products[categoryName!]) {
      products[categoryName!] = {};
    }

    if (!products[categoryName!][subcategoryName!]) {
      products[categoryName!][subcategoryName!] = [product];
    } else {
      products[categoryName!][subcategoryName!].push(product);
    }
  });

  return products;
};
