import { Signal, JSX, createSignal, mergeProps } from "solid-js";
import { Button } from "./Button";

type Props = {
  on: string;
  off?: string;
  class?: string;
  style?: JSX.CSSProperties;
  signal?: Signal<boolean>;
};

export const Toggle = (p: Props) => {
  const props = mergeProps({ off: p.on, signal: createSignal(false) }, p);
  const [isChecked, setChecked] = props.signal;
  const toggle = () => setChecked((prev) => !prev);
  return (
    <Button
      class={props.class}
      style={props.style}
      inverted={isChecked()}
      onClick={toggle}
      text={[isChecked() ? props.on : props.off]}
    />
  );
};
