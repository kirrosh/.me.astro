import { createRoot } from "solid-js";
import { DEFAULT_THEME, ITheme } from "./themes";
import { createCookieStore } from "@lib/createCookieStore";

type IThemeStore = {
  theme: ITheme;
};

export const createThemeStore = () => {
  const [store, setStore] = createRoot(() =>
    createCookieStore<IThemeStore>(
      { theme: DEFAULT_THEME },
      { name: "themeStore" }
    )
  );

  const setTheme = (theme: ITheme) => {
    setStore("theme", () => {
      return theme;
    });
  };
  return { store, setTheme };
};

export const themeStore = createRoot(createThemeStore);
