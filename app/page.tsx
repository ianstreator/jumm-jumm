const contentful = require("contentful");
import { ProductStructure, ContentfulProductStructure } from "@/types";
import Banner from "./components/Banner";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const items = await fetchDataFromApi();
  return (
    <main className="relative max-h-screen flex flex-col items-center justify-between overflow-hidden">
      <Banner />

      <div className="flex flex-wrap px-6 pb-6 justify-between overflow-y-scroll bg-accent backdrop">
        {items.map((data, i) => (
          <ProductCard key={i} {...data} />
        ))}
      </div>
    </main>
  );
}

export const fetchDataFromApi = async () => {
  const client = contentful.createClient({
    accessToken: process.env.CDA_TOKEN,
    space: process.env.SPACE_ID,
  });

  const content: ContentfulProductStructure = await client.getEntries({
    content_type: "products",
  });

  const items: ProductStructure[] = content.items.map(
    ({ fields: { name, available, description, price, image } }) => {
      const urls = image.map((img) => img.fields.file.url);
      return {
        name,
        urls,
        price,
        description,
        available,
      };
    }
  );
  return items;
};
