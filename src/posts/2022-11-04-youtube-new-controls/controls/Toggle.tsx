import { Signal, JSX, createSignal } from "solid-js";
import { Button } from "./Button";

type Props = {
  on: string;
  off: string;
  class?: string;
};

export const Toggle = (props: Props) => {
  const [isChecked, setChecked] = createSignal(false);
  const toggle = () => setChecked((prev) => !prev);
  return (
    <Button
      class={props.class}
      inverted={isChecked()}
      onClick={toggle}
      text={[isChecked() ? props.on : props.off]}
    />
  );
};
