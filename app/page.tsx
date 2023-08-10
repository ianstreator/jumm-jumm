const contentful = require("contentful");
import { ProductStructure, ContentfulProductStructure } from "@/types";
import Banner from "./components/Banner";
import ProductCard from "./components/ProductCard";
export default async function Home() {
  const items = await fetchDataFromApi();
  // console.log(items);
  return (
    <main className="relative max-h-screen flex flex-col items-center justify-between overflow-hidden">
      <Banner {...items} />

      <div className="flex flex-wrap px-6 pb-6 justify-between overflow-y-scroll bg-accent backdrop">
        {/* {items.map((data, i) => (
          <ProductCard key={i} {...data} />
        ))} */}
      </div>
    </main>
  );
}

const fetchDataFromApi = async () => {
  const client = contentful.createClient({
    accessToken: process.env.CDA_TOKEN,
    space: process.env.SPACE_ID,
  });

  const content: ContentfulProductStructure = await client.getEntries({
    content_type: "products",
    include: "2",
  });
  // console.log(content.items[0].fields.subcategory, " #####################");
  // console.log(content);
  const categorizedItems: {
    [category: string]: { [subcategory: string]: ProductStructure[] };
  } = {};
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

      const itemCard = { name, urls, price, available };

      console.log(categoryName, subcategoryName);

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
  console.log(items);
  // console.log(categorizedItems)
  return categorizedItems;
};
