import { createEffect, For } from "solid-js";
import { isServer } from "solid-js/web";
import { themeSignal } from "../features/theme/themeSignal";
import { ITheme, themes } from "../lib/getThemeFromCookie";

type Props = {
  themeFromCookie: string;
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const ThemePicker = ({ themeFromCookie }: Props) => {
  const [theme, setTheme] = themeSignal;
  const themeOrDefault = () => {
    if (isServer) {
      return themeFromCookie;
    }
    const res = theme();
    if (res !== null) return res as ITheme;
    return themeFromCookie as ITheme;
  };

  createEffect(() => {
    document.documentElement.setAttribute("data-theme", themeOrDefault());
  });

  return (
    <div class="dropdown  dropdown-end">
      <label tabindex="0" class="btn m-1">
        {capitalize(themeOrDefault())}
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-[400px] overflow-auto"
      >
        <For each={themes}>
          {(theme, i) => (
            <li onClick={() => setTheme(theme)}>
              <a>{capitalize(theme)}</a>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};
