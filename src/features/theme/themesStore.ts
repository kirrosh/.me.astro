import { createRoot } from "solid-js";
import { DEFAULT_THEME, ITheme } from "./themes";
import { createStore } from "solid-js/store";

type IThemeStore = {
  theme: ITheme;
};

export const themeRoot = createRoot(() => {
  const [store, setStore] = createStore<IThemeStore>(
    { theme: DEFAULT_THEME },
    { name: "themeStore" }
  );

  const setTheme = (theme: ITheme) => {
    setStore("theme", () => {
      return theme;
    });
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return { store, setTheme };
});
