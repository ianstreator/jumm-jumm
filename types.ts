export type ProductStructure = {
  name: string;
  available: boolean;
  description?: string;
  price: number;
  urls: string[];
  categoryName: string;
  subcategoryName: string;
};

export type Products = {
  [category: string]: {
    [subcategory: string]: ProductStructure[];
  };
};

export type CartProduct = {
  name: string;
  price: number;
  count: number;
  categoryName?: string;
  subcategoryName?: string;
};

export type CartProducts = {
  [categoryName: string]: {
    [subcategoryName: string]: { [name: string]: CartProduct };
  };
};

export type ContentfulProductStructure = {
  items: {
    fields: {
      name: string;
      available: boolean;
      image: { fields: { file: { url: string } } }[];
      price: number;
      description: string;
      subcategory: {
        fields: { title: string; category: { fields: { title: string } } };
      };
    };
  }[];
};
