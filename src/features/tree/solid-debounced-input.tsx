import { JSX, onCleanup, getOwner } from "solid-js";

export type ScheduleCallback = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  wait?: number
) => Scheduled<Args>;

export interface Scheduled<Args extends unknown[]> {
  (...args: Args): void;
  clear: VoidFunction;
}

export const debounce: ScheduleCallback = (callback, wait) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  const clear = () => clearTimeout(timeoutId);
  if (getOwner()) onCleanup(clear);
  const debounced: typeof callback = (...args) => {
    if (timeoutId !== undefined) clear();
    timeoutId = setTimeout(() => callback(...args), wait);
  };
  return Object.assign(debounced, { clear });
};

function DebouncedInput(
  props: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
  } & Omit<JSX.DOMAttributes<HTMLInputElement>, "onChange">
) {
  const onChange = debounce((message: string) => props.onChange(message), 100);

  return (
    <input
      aria-label="Search"
      placeholder="Search by name..."
      class="input-bordered input w-full max-w-xs"
      value={props.value}
      onInput={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  );
}

export default DebouncedInput;
