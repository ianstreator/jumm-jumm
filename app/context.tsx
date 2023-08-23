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
};

export const AppContext = createContext({} as Context);

export const AppContextProvider = ({ children }: ContextProps) => {
  const [theme, setTheme] = useState("dark");
  const [menuState, setMenuState] = useState(false);
  const [cartState, setCartState] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProducts>({});

  useEffect(() => {}, [cartProducts]);

  const addProductToCart = (product: ProductStructure) => {
    const { name, price, categoryName, subcategoryName } = product;

    const cartProduct: CartProduct = { name, price, count: 1 };

    delete cartProduct.categoryName;
    delete cartProduct.subcategoryName;

    setCartProducts((curr) => {
      return {
        ...curr,
        [categoryName]: {
          ...curr?.[categoryName],
          [subcategoryName]: {
            ...curr?.[categoryName]?.[subcategoryName],
            [name]: cartProduct,
          },
        },
      };
    });
  };
  //   const deleteProductFromCart = ({name,categoryName,subcategoryName}: CartProduct) => {
  //     delete cartProducts[categoryName][subcategoryName][name]
  //   }
  //   const increaseProductCartCount = (product: CartProduct) => {
  //     cartProducts[]
  //   }
  //   const decreaseProductCartCount = (product: CartProduct) => {
  //     cartProducts[]
  //   }

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
        } as Context
      }
    >
      {children}
    </AppContext.Provider>
  );
};
