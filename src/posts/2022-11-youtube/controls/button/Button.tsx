import { createSignal, mergeProps, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { TochFeedback } from "./TochFeedback";

type Props = {
  icon?: JSX.Element;
  text?: JSX.Element;
  inverted?: boolean;
  class?: string;
  onClick?: JSX.DOMAttributes<HTMLButtonElement>["onClick"];
  style?: JSX.CSSProperties;
};

export const Button = (props: Props) => {
  const merged = mergeProps({ class: "" }, props);
  return (
    <button
      onClick={props.onClick}
      style={props.style}
      class="pointer relative flex h-9 flex-1 justify-center rounded-yt py-0 text-yt"
      classList={{
        "w-9 px-0": !!merged.icon && !props.text,
        "px-4": !!props.text,
        "bg-yt-text hover:bg-yt-mono text-yt-primary": merged.inverted,
        "bg-yt-control/10 text-yt-text hover:bg-yt-control/30":
          !merged.inverted,
        [merged.class]: !!merged.class,
      }}
    >
      <TochFeedback />
      <Show when={merged.icon}>
        <div
          class="h-6 w-6"
          classList={{
            "m-0": !merged.text,
            "-ml-1.5 mr-1.5": !!merged.text,
          }}
        >
          <div class="inline-flex h-6 w-6 items-center justify-center fill-current align-middle">
            {merged.icon}
          </div>
        </div>
      </Show>
      <Show when={merged.text}>
        <div class="overflow-hidden text-ellipsis">
          <span class="whitespace-nowrap font-yt font-medium">
            {merged.text}
          </span>
        </div>
      </Show>
    </button>
  );
};
