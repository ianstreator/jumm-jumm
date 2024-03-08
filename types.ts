export type Product = {
  name: string;
  price: number;
  available: boolean;
  imageURL: string;
  category: string;
  subcategory: string;
  count?: number;
};

export type CategorizedProducts = {
  [categoryTitle: string]: {
    [subcategoryTitle: string]: Product[];
  };
};

export type CategorizedCartProducts = {
  [categoryTitle: string]: {
    [subcategoryTitle: string]: { [name: string]: Product };
  };
};