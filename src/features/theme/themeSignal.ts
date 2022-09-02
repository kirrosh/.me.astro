import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { DEFAULT_THEME, THEME_COOKIE_NAME } from "../../lib/getThemeFromCookie";
import useCookie from "../../lib/useCookie";

export const themeSignal = isServer
  ? createSignal(DEFAULT_THEME)
  : useCookie(THEME_COOKIE_NAME);
