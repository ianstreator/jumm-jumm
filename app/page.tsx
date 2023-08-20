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

      <div className="bg-accent backdrop overflow-scroll relative">
        {Object.entries(products).map(([category, subcategories], i) => (
          <div className="relative">
            <h1 className="sticky top-0 z-30 font-bold text-white bg-secondary text-2xl text-end w-full p-2 px-4">
              {category}
            </h1>
            {Object.entries(subcategories).map(([subcategory, products]) => (
              <div className="relative">
                <h3 className="sticky top-0 z-50 font-light text-2xl p-2 px-4 rounded-r-md bg-info w-fit">
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
