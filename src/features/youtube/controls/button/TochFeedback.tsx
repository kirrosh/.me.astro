import { createSignal } from "solid-js";

export const TochFeedback = () => {
  const [animate, setAnimate] = createSignal(false);
  const [pressed, setPressed] = createSignal(false);
  return (
    <div style="border-radius: inherit;">
      <div
        class=" absolute top-0 bottom-0 right-0 left-0"
        aria-hidden="true"
        style="border-radius: inherit;"
        onmouseup={() => {
          setPressed(false);
          setAnimate(true);
          setTimeout(() => {
            setAnimate(false);
          }, 300);
        }}
        onmousedown={() => {
          setPressed(true);
        }}
      >
        <div
          class="absolute top-0 bottom-0 right-0 left-0  border border-white opacity-0"
          style="border-radius: inherit;"
          classList={{
            "animate-yt-feedback": animate(),
          }}
        />
        <div
          class="absolute top-0 bottom-0 right-0 left-0 bg-white"
          classList={{
            "opacity-0": !pressed(),
            "opacity-10": pressed(),
          }}
          style="border-radius: inherit;"
          onMouseUp={() => {
            setPressed(false);
          }}
          onMouseDown={() => {
            setPressed(true);
          }}
        />
      </div>
    </div>
  );
};
