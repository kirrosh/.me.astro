import { createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

import createCookieSignal from "@lib/useCookie";

const cookiesStores = new Map();

//TODO: add doc and tests
export function createCookieStore<T extends {}>(
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
  // Need for SSR
  if (isServer) {
    const innerStore = createStore(store, options);
    if (!cookiesStores.has(options.name)) {
      cookiesStores.set(options.name, innerStore);
    }
    return innerStore;
  }
  const [cookieValue, setCookie] = createCookieSignal(
    options.name,
    JSON.stringify(store)
  );
  const value = cookieValue();
  let innerStore = createStore(value ? JSON.parse(value) : store, options);
  if (!cookiesStores.has(options.name)) {
    cookiesStores.set(options.name, innerStore);
  } else {
    innerStore = cookiesStores.get(options.name);
  }
  const [innerValue, setValue] = innerStore;
  createEffect(() => {
    setCookie(JSON.stringify(innerValue));
  });
  return [innerValue, setValue];
}

export const loadStoreFromCookies = (
  cookieString: string | null,
  stores: string[]
) => {
  if (!cookieString) {
    console.log("No cookie stores to load.");
    return;
  }
  try {
    const c = cookieString.split("; ").map((value) => value.split("="));
    const cookieMap = new Map<string, object>(
      c
        ?.filter(([key]) => stores.some((s) => key === s))
        .map(([key, value]) => {
          return [key, JSON.parse(decodeURIComponent(value))];
        })
    );
    stores.forEach((storeKey) => {
      if (cookieMap.has(storeKey)) {
        if (cookiesStores.get(storeKey)) {
          const [get, set] = cookiesStores.get(storeKey);
          set(cookieMap.get(storeKey));
        } else {
          const newStore = createStore(cookieMap.get(storeKey), {
            name: storeKey,
          });
          cookiesStores.set(storeKey, newStore);
        }
      }
    });
  } catch (e) {
    console.error(e);
    console.log("Error loading cookie.");
  }
};

// Add typescript support
export const getCookieStoreValue = (storeKey: string) => {
  if (cookiesStores.has(storeKey)) {
    const [value] = cookiesStores.get(storeKey);
    return value;
  }
  return null;
};
