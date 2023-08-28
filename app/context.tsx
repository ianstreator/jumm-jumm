import { CartProduct, CartProducts, ProductStructure } from "@/types";
import { createContext, useEffect, useState } from "react";

type ContextProps = {
  children: React.ReactNode;
};
type Context = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  menuState: boolean;
  setMenuState: React.Dispatch<React.SetStateAction<boolean>>;
  cartState: boolean;
  setCartState: React.Dispatch<React.SetStateAction<boolean>>;
  cartProducts: CartProducts;
  setCartProducts: React.Dispatch<React.SetStateAction<CartProducts>>;
  addProductToCart: Function;
  increaseProductCartCount: Function;
  decreaseProductCartCount: Function;
  cartTotal: number;
};

export const AppContext = createContext({} as Context);

export const AppContextProvider = ({ children }: ContextProps) => {
  const [theme, setTheme] = useState("Oscura");
  const [menuState, setMenuState] = useState(false);
  const [cartState, setCartState] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProducts>({});
  const [cartTotal, setCartTotal] = useState(0);

  const addProductToCart = (product: ProductStructure) => {
    const { name, price, categoryName, subcategoryName } = product;

    const cartProduct = cartProducts?.[categoryName]?.[subcategoryName]?.[name];

    if (cartProduct) return increaseProductCartCount(cartProduct);

    const newCartProduct: CartProduct = { ...product, count: 1 };

    setCartTotal((total) => total + price);

    setCartProducts((curr) => {
      return {
        ...curr,
        [categoryName]: {
          ...curr?.[categoryName],
          [subcategoryName]: {
            ...curr?.[categoryName]?.[subcategoryName],
            [name]: newCartProduct,
          },
        },
      };
    });
  };

  const increaseProductCartCount = (product: CartProduct) => {
    const { name, count, price, categoryName, subcategoryName } = product;
    setCartTotal((total) => total + price);

    setCartProducts((curr) => {
      return {
        ...curr,
        [categoryName]: {
          ...curr?.[categoryName],
          [subcategoryName]: {
            ...curr?.[categoryName]?.[subcategoryName],
            [name]: { ...product, count: count + 1 },
          },
        },
      };
    });
  };

  const decreaseProductCartCount = (product: CartProduct) => {
    const { name, count, price, categoryName, subcategoryName } = product;
    setCartTotal((total) => total - price);

    const { productCount, subcategoryLength, categoryLength } =
      checkProductCountAndHierarchy(product);

    setCartProducts((curr) => {
      if (productCount < 2) {
        delete curr[categoryName][subcategoryName][name];
        if (subcategoryLength < 2) {
          delete curr[categoryName][subcategoryName];
          if (categoryLength < 2) {
            delete curr[categoryName];
          }
        }
        return {
          ...curr,
        };
      } else {
      }

      return {
        ...curr,
        [categoryName]: {
          ...curr?.[categoryName],
          [subcategoryName]: {
            ...curr?.[categoryName]?.[subcategoryName],
            [name]: { ...product, count: count - 1 },
          },
        },
      };
    });
  };

  const checkProductCountAndHierarchy = ({
    categoryName,
    subcategoryName,
    name,
  }: CartProduct) => {
    const productCount =
      cartProducts[categoryName][subcategoryName][name].count;
    const subcategoryLength = Object.keys(
      cartProducts[categoryName][subcategoryName]
    ).length;
    const categoryLength = Object.keys(cartProducts[categoryName]).length;

    return { productCount, subcategoryLength, categoryLength };
  };

  return (
    <AppContext.Provider
      value={
        {
          theme,
          setTheme,
          menuState,
          setMenuState,
          cartState,
          setCartState,
          cartProducts,
          setCartProducts,
          addProductToCart,
          increaseProductCartCount,
          decreaseProductCartCount,
          cartTotal,
        } as Context
      }
    >
      {children}
    </AppContext.Provider>
  );
};
