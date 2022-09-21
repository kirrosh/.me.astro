import { For, onMount } from "solid-js";
import { DEFAULT_THEME, ITheme, themes } from "./themes";
import { themeRoot } from "./themesStore";

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const ThemePicker = () => {
  const { store, setTheme } = themeRoot;
  onMount(() => {
    const localTheme =
      (localStorage.getItem("theme") as ITheme) || DEFAULT_THEME;
    setTheme(localTheme);
  });
  return (
    <div class="dropdown-end dropdown">
      <label tabindex="0" class="btn m-1">
        {capitalize(store.theme === DEFAULT_THEME ? "theme" : store.theme)}
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu rounded-box max-h-[400px] w-52 overflow-auto bg-base-100 p-2 shadow"
      >
        <For each={themes}>
          {(theme, i) => (
            <li
              onClick={() => {
                setTheme(theme);
              }}
            >
              <a>{capitalize(theme)}</a>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};
