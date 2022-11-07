import { createSignal, JSX } from "solid-js";
import { YtButton } from "./YtButton";

type Props = {
  icons?: JSX.Element[];
  texts?: string[];
  class?: string;
};

export const Toggle = ({ icons, texts, ...rest }: Props) => {
  const [isChecked, setChecked] = createSignal(true);
  return (
    <YtButton
      {...rest}
      inverted={isChecked()}
      text={texts?.[isChecked() ? 1 : 0]}
      icon={icons?.[isChecked() ? 1 : 0]}
      onClick={() => {
        setChecked((prev) => !prev);
      }}
    />
  );
};
