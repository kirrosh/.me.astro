import { createSignal, mergeProps, onMount, Signal } from "solid-js";
import { Button, Toggle } from "../button";
import { Left } from "../button/icons/left";
import { Right } from "../button/icons/right";

export const Tags = () => {
  let list: HTMLDivElement | undefined;
  let parent: HTMLDivElement | undefined;
  const [position, setPosition] = createSignal(0);
  const [length, setMax] = createSignal(0);

  const selectedSignal = createSignal<number>();
  onMount(() => {
    if (!list || !parent) return;
    setMax(list.clientWidth - parent.clientWidth);
  });
  return (
    <div class="relative flex justify-center">
      {position() !== 0 && (
        <div class="absolute left-0 z-20 flex h-full items-center bg-transparent after:h-full after:w-12 after:shadow-right">
          <div class="bg-yt-primary ">
            <Button
              icon={Left}
              style={{
                "background-color": "transparent",
              }}
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
          class="flex w-min flex-nowrap overflow-hidden transition-transform"
          style={{
            transform: `translateX(${Math.max(
              position() * -320,
              -1 * length()
            )}px)`,
          }}
        >
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
      {position() * 320 < length() && (
        <div class="absolute right-0 z-20 flex h-full items-center bg-transparent before:h-full before:w-12 before:shadow-left">
          <div class="bg-yt-primary">
            <Button
              icon={Right}
              style={{
                "background-color": "transparent",
              }}
              onClick={() => setPosition((prev) => prev + 1)}
            />
          </div>
        </div>
      )}
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
