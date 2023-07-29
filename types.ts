export type ProductStructure = {
  name: string;
  available: boolean;
  description?: string;
  price: number;
  urls: string[];
};

export type ContentfulProductStructure = {
  items: {
    fields: {
      name: string;
      available: boolean;
      image: { fields: { file: { url: string } } }[];
      price: number;
      description: string;
    };
  }[];
};
