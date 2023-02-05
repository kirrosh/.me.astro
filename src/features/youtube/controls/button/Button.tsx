import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { TochFeedback } from "./TochFeedback";
import { twMerge } from "tailwind-merge";

type Props = {
  icon?: JSX.Element;
  text?: JSX.Element;
  inverted?: boolean;
  class?: string;
  onClick?: JSX.DOMAttributes<HTMLButtonElement>["onClick"];
  style?: JSX.CSSProperties;
};

export const Button = (props: Props) => {
  const className = twMerge(
    "pointer relative flex h-9 flex-1 justify-center rounded-yt py-0 text-yt",
    props.class
  );
  return (
    <button
      onClick={props.onClick}
      style={props.style}
      class={className}
      classList={{
        "w-9 px-0": !!props.icon && !props.text,
        "px-4": !!props.text,
        "bg-yt-text hover:bg-yt-mono text-yt-primary": props.inverted,
        "bg-yt-control/10 text-yt-text hover:bg-yt-control/30": !props.inverted,
      }}
    >
      <TochFeedback />
      <Show when={props.icon}>
        <div
          class="h-6 w-6"
          classList={{
            "m-0": !props.text,
            "-ml-1.5 mr-1.5": !!props.text,
          }}
        >
          <div class="inline-flex h-6 w-6 items-center justify-center fill-current align-middle">
            {props.icon}
          </div>
        </div>
      </Show>
      <Show when={props.text}>
        <div class="overflow-hidden text-ellipsis">
          <span class="whitespace-nowrap font-yt font-medium">
            {props.text}
          </span>
        </div>
      </Show>
    </button>
  );
};
