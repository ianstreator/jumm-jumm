import { createContext, useEffect, useState } from "react";

type ContextProps = {
  children: React.ReactNode;
};
type Context = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  menuState: boolean;
  setMenuState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext({} as Context);

export const AppContextProvider = ({ children }: ContextProps) => {

  const [theme, setTheme] = useState("dark");
  const [menuState, setMenuState] = useState(false);

  return (
    <AppContext.Provider
      value={{ theme, setTheme, menuState, setMenuState } as Context}
    >
      {children}
    </AppContext.Provider>
  );
};