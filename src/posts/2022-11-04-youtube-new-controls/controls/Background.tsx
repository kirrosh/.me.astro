import type { JSX } from "solid-js/jsx-runtime";

type Props = {
  children?: JSX.Element;
};

export const Background = (props: Props) => {
  return (
    <div class="grid place-items-center rounded-lg border border-primary bg-yt-primary py-4 px-8">
      {props.children}
    </div>
  );
};
