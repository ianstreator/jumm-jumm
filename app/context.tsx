import { createContext, useState, useEffect } from "react";
import { CategorizedCartProductsType, ProductType } from "@/types";

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
  cartProducts: CategorizedCartProductsType;
  setCartProducts: React.Dispatch<React.SetStateAction<CategorizedCartProductsType>>;
  addProductToCart: Function;
  increaseProductCartCount: Function;
  decreaseProductCartCount: Function;
  cartTotal: number;
  cartCount: number;
};

export const AppContext = createContext({} as Context);

export const AppContextProvider = ({ children }: ContextProps) => {
  const [theme, setTheme] = useState("Rosa");
  const [menuState, setMenuState] = useState(false);
  const [cartState, setCartState] = useState(false);
  const [cartProducts, setCartProducts] = useState<CategorizedCartProductsType>({});
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  const addProductToCart = (product: ProductType) => {
    const { name, price, category, subcategory } = product;

    const cartProduct = cartProducts?.[category]?.[subcategory]?.[name];

    if (cartProduct) return increaseProductCartCount(cartProduct);

    setCartTotal((total) => total + price);
    setCartCount((count) => (count += 1));
    const newCartProduct: ProductType = { ...product, count: 1 };

    setCartProducts((curr) => {
      return {
        ...curr,
        [category]: {
          ...curr?.[category],
          [subcategory]: {
            ...curr?.[category]?.[subcategory],
            [name]: newCartProduct,
          },
        },
      };
    });
  };

  const increaseProductCartCount = (product: ProductType) => {
    const { name, count, price, category, subcategory } = product;

    setCartTotal((total) => total + price);
    setCartCount((count) => (count += 1));
    setCartProducts((curr) => {
      return {
        ...curr,
        [category]: {
          ...curr?.[category],
          [subcategory]: {
            ...curr?.[category]?.[subcategory],
            [name]: { ...product, count: count! + 1 },
          },
        },
      };
    });
  };

  const decreaseProductCartCount = (product: ProductType) => {
    const { name, count, price, category, subcategory } = product;
    setCartTotal((total) => (total -= price));
    setCartCount((count) => (count -= 1));

    const { productCount, subcategoryLength, categoryLength } =
      checkProductCountAndHierarchy(product);

    setCartProducts((curr) => {
      if (productCount! < 2) {
        delete curr[category][subcategory][name];
        if (subcategoryLength < 2) {
          delete curr[category][subcategory];
          if (categoryLength < 2) {
            delete curr[category];
          }
        }
        return {
          ...curr,
        };
      }
      return {
        ...curr,
        [category]: {
          ...curr?.[category],
          [subcategory]: {
            ...curr?.[category]?.[subcategory],
            [name]: { ...product, count: count! - 1 },
          },
        },
      };
    });
  };

  const checkProductCountAndHierarchy = ({
    category,
    subcategory,
    name,
  }: ProductType) => {
    const productCount =
      cartProducts[category][subcategory][name].count;
    const subcategoryLength = Object.keys(
      cartProducts[category][subcategory]
    ).length;
    const categoryLength = Object.keys(cartProducts[category]).length;

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
          cartCount,
        } as Context
      }
    >
      {children}
    </AppContext.Provider>
  );
};
