import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

import useCookie from "../lib/useCookie";

const cookiesStores = new Map();

export function createProxyStore<T extends {}>(
  ...[store, options]: {} extends T
    ? [
        store: T | Store<T>,
        options: {
          name: string;
        }
      ]
    : [
        store: object & (T | Store<T>),
        options: {
          name: string;
        }
      ]
): [get: Store<T>, set: SetStoreFunction<T>] {
  const [cookieValue, setCookie] = useCookie(options.name);
  const innerStore = createStore(
    cookieValue() !== null ? JSON.parse(cookieValue()!) : store,
    options
  );
  if (!cookiesStores.has(options.name)) {
    cookiesStores.set(options.name, innerStore);
  }
  const [innerValue, setValue] = innerStore;
  createEffect(() => {
    setCookie(JSON.stringify(innerValue));
  });
  return [innerValue, setValue];
}

export const loadStoreFromCookies = (
  cookieString: string,
  stores: string[]
) => {
  try {
    const c = cookieString.split("; ").map((value) => value.split("="));
    const cookieMap = new Map<string, object>(
      c?.map(([key, value]) => [key, JSON.parse(decodeURIComponent(value))])
    );
    stores.forEach((storeKey) => {
      if (cookieMap.has(storeKey) && cookiesStores.get(storeKey)) {
        const [get, set] = cookiesStores.get(storeKey);
        set(cookieMap.get(storeKey));
      }
    });
  } catch (e) {
    console.error(e);
    console.log("error loading cookie");
  }
};
