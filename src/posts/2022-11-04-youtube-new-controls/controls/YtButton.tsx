import { children, mergeProps, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

type Props = {
  icon?: JSX.Element;
  children?: JSX.Element;
  inverted?: boolean;
  class?: string;
  onClick?: JSX.DOMAttributes<HTMLButtonElement>["onClick"];
};

export const YtButton = (props: Props) => {
  const c = children(() => props.children);
  const merged = mergeProps({ class: "" }, props);
  return (
    <button
      onClick={props.onClick}
      class="pointer flex h-9 flex-1 justify-center rounded-yt py-0 text-yt"
      classList={{
        "w-9 px-0": !!merged.icon && !c(),
        "px-4": !!c(),
        "bg-yt-text hover:bg-yt-mono text-yt-primary": merged.inverted,
        "bg-yt-control/10 text-yt-text hover:bg-yt-control/30":
          !merged.inverted,
        [merged.class]: !!merged.class,
      }}
    >
      <Show when={merged.icon}>
        <div
          class="h-6 w-6"
          classList={{
            "m-0": !c(),
            "-ml-1.5 mr-1.5": !!c(),
          }}
        >
          <div class="inline-flex h-6 w-6 items-center justify-center fill-current align-middle">
            {merged.icon}
          </div>
        </div>
      </Show>
      <Show when={c()}>
        <div class="overflow-hidden text-ellipsis">
          <span class="whitespace-nowrap font-yt font-medium">{c()}</span>
        </div>
      </Show>
    </button>
  );
};
