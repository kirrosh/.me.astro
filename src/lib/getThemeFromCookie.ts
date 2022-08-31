export const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
] as const;

export type ITheme = typeof themes[number];

export const THEME_COOKIE_NAME = "theme";
const DEFAULT_THEME: ITheme = "wireframe";

export const getThemeFromCookie = (cookieString: string | null) => {
  if (!cookieString) {
    return DEFAULT_THEME;
  }
  const c = cookieString.split("; ").map((value) => value.split("="));

  const theme = c.find(([key, value]) => {
    return key === THEME_COOKIE_NAME;
  });
  if (theme) {
    return theme[1];
  }
  return DEFAULT_THEME;
};
