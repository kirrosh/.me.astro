import * as Cookie from "js-cookie";
const { set, get, remove } = Cookie;
import type { CookieAttributes } from "js-cookie";
import { Accessor, createSignal } from "solid-js";
import { isServer } from "solid-js/web";

const createCookieSignal = (
  cookieName: string,
  defaultValue?: string
): [
  Accessor<string | null>,
  (newValue: string, options?: CookieAttributes) => void,
  () => void
] => {
  if (isServer) {
    const [value, setValue] = createSignal<string | null>(defaultValue || null);
    return [
      value,
      (newValue: string, options?: CookieAttributes) => {
        setValue(newValue);
      },
      () => {
        setValue(null);
      },
    ];
  }
  const [value, setValue] = createSignal<string | null>(
    get(cookieName) || defaultValue || null
  );
  const updateCookie = (newValue: string, options?: CookieAttributes) => {
    set(cookieName, newValue, options);
    setValue(newValue);
  };
  const deleteCookie = () => {
    remove(cookieName);
    setValue(null);
  };

  return [value, updateCookie, deleteCookie];
};

export default createCookieSignal;
