export type ProductStructure = {
  name: string;
  available: boolean;
  count?: number;
  price: number;
  url: string;
  categoryName: string;
  subcategoryName: string;
};

export type Products = {
  [category: string]: {
    [subcategory: string]: ProductStructure[];
  };
};

export type CartProducts = {
  [categoryName: string]: {
    [subcategoryName: string]: { [name: string]: ProductStructure };
  };
};
