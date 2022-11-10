import { createSignal, onMount } from "solid-js";
import { Button, Toggle } from "../button";
import { Left } from "../button/icons/left";
import { Right } from "../button/icons/right";

export const Tags = () => {
  let list: HTMLDivElement | undefined;
  let parent: HTMLDivElement | undefined;
  const [position, setPosition] = createSignal(0);
  const [length, setMax] = createSignal(0);
  onMount(() => {
    if (!list || !parent) return;
    setMax(list.clientWidth - parent.clientWidth);
  });
  return (
    <div class="relative flex w-[494px] justify-center">
      {position() !== 0 && (
        <div class="absolute left-0 z-20 flex h-full items-center bg-transparent after:h-full after:w-12 after:shadow-right">
          <div class="bg-yt-primary ">
            <Button
              icon={Left}
              class=" bg-yt-primary"
              onClick={() => setPosition((prev) => prev - 1)}
            />
          </div>
        </div>
      )}
      <div
        ref={parent}
        class="relative w-full overflow-hidden whitespace-nowrap"
      >
        <div
          ref={list}
          class="flex w-min flex-nowrap transition-transform"
          style={{
            transform: `translateX(${Math.max(
              position() * -320,
              -1 * length()
            )}px)`,
          }}
        >
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
      {position() * 320 < length() && (
        <div class="absolute right-0 z-20 flex h-full items-center bg-transparent  before:h-full before:w-12 before:shadow-left">
          <div class="bg-yt-primary">
            <Button
              icon={Right}
              class="bg-yt-primary"
              onClick={() => setPosition((prev) => prev + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Item = () => {
  return (
    <div class="m-3 flex">
      <Toggle
        on="All"
        style={{
          "border-radius": "8px",
        }}
      />
    </div>
  );
};
