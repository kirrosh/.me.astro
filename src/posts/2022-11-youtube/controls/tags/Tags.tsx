import { createSignal, mergeProps, onMount, Show, Signal } from "solid-js";
import { createScrollPosition } from "@solid-primitives/scroll";
import { Button, Toggle } from "../button";
import { Left } from "../button/icons/left";
import { Right } from "../button/icons/right";

export const Tags = () => {
  let list: HTMLDivElement | undefined;
  let parent: HTMLDivElement | undefined;
  const [max, setMax] = createSignal(0);
  // pass as function
  const scroll = createScrollPosition(() => parent);

  const selectedSignal = createSignal<number>();
  onMount(() => {
    if (!list || !parent) return;
    setMax(list.clientWidth - parent.clientWidth);
  });
  return (
    <div class="relative flex justify-center">
      <Show when={scroll.x !== 0}>
        <div class="absolute left-0 z-20 flex h-full items-center bg-transparent after:h-full after:w-12 after:shadow-right">
          <div class="bg-yt-primary ">
            <Button
              icon={Left}
              style={{
                "background-color": "transparent",
              }}
              onClick={() =>
                parent?.scrollBy({ left: -100, behavior: "smooth" })
              }
            />
          </div>
        </div>
      </Show>
      <div
        ref={parent}
        class="no-scrollbar relative w-full touch-pan-x touch-pan-y overflow-x-scroll whitespace-nowrap"
      >
        <div ref={list} class="flex w-min flex-nowrap transition-transform">
          <Tag signal={selectedSignal} id={0} />
          <Tag signal={selectedSignal} id={1} />
          <Tag signal={selectedSignal} id={2} />
          <Tag signal={selectedSignal} id={3} />
          <Tag signal={selectedSignal} id={4} />
          <Tag signal={selectedSignal} id={5} />
          <Tag signal={selectedSignal} id={6} />
          <Tag signal={selectedSignal} id={7} />
          <Tag signal={selectedSignal} id={8} />
          <Tag signal={selectedSignal} id={9} />
          <Tag signal={selectedSignal} id={10} />
        </div>
      </div>
      <Show when={scroll.x !== null && scroll.x <= max()}>
        <div class="absolute right-0 z-20 flex h-full items-center bg-transparent before:h-full before:w-12 before:shadow-left">
          <div class="bg-yt-primary">
            <Button
              icon={Right}
              style={{
                "background-color": "transparent",
              }}
              onClick={() =>
                parent?.scrollBy({ left: 100, behavior: "smooth" })
              }
            />
          </div>
        </div>
      </Show>
    </div>
  );
};

type Props = {
  id: number;
  signal: Signal<number | undefined>;
};

const Tag = (p: Props) => {
  const props = mergeProps({ id: 0, signal: createSignal(0) }, p);
  const [selectedId, setSelected] = props.signal;
  const checked = () => selectedId() === props.id;
  const setChecked = () =>
    checked() ? setSelected(undefined) : setSelected(props.id);
  const signal = [checked, setChecked] as Signal<boolean>;

  return (
    <div class="m-3 flex">
      <Toggle
        signal={signal}
        on="All"
        style={{
          "border-radius": "8px",
        }}
      />
    </div>
  );
};
