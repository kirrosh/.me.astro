import { set, get, remove } from "js-cookie";
import type { CookieAttributes } from "js-cookie";
import { Accessor, createSignal } from "solid-js";

const useCookie = (
  cookieName: string
): [
  Accessor<string | null>,
  (newValue: string, options?: CookieAttributes) => void,
  () => void
] => {
  const [value, setValue] = createSignal<string | null>(
    get(cookieName) || null
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

export default useCookie;
