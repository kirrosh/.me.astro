import { createEffect, For } from "solid-js";
import { themes } from "./themes";
import { themeStore } from "./themesStore";

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const ThemePicker = () => {
  const { setTheme, store } = themeStore;

  createEffect(() => {
    document.documentElement.setAttribute("data-theme", store.theme);
  });

  return (
    <div class="dropdown  dropdown-end">
      <label tabindex="0" class="btn m-1">
        {capitalize(store.theme)}
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-[400px] overflow-auto"
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
