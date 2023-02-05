import { createSignal, For, onMount } from "solid-js";
import { themes } from "./themes";
import { themeRoot } from "./themesStore";

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const ThemePicker = () => {
  const [isLoading, setIsLoading] = createSignal(true);
  const { store, setTheme } = themeRoot;
  onMount(() => {
    setIsLoading(false);
  });
  return (
    <div class="dropdown-end dropdown">
      <label tabindex="0" class="btn m-1" classList={{ loading: isLoading() }}>
        {!isLoading() && capitalize(store.theme)}
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu rounded-box max-h-[400px] w-52  bg-base-100 p-2 shadow"
      >
        <div class="inner-scrollbar overflow-y-auto">
          <For each={themes}>
            {(theme, i) => (
              <li
                onClick={() => {
                  setTheme(theme);
                }}
              >
                <span>{capitalize(theme)}</span>
              </li>
            )}
          </For>
        </div>
      </ul>
    </div>
  );
};
