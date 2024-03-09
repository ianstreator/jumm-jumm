export type ProductType = {
  name: string;
  price: number;
  available: boolean;
  imageURL: string;
  category: string;
  subcategory: string;
  count?: number;
};

export type CategorizedProductsType = {
  [categoryTitle: string]: {
    [subcategoryTitle: string]: ProductType[];
  };
};

export type CategorizedCartProductsType = {
  [categoryTitle: string]: {
    [subcategoryTitle: string]: { [name: string]: ProductType };
  };
};