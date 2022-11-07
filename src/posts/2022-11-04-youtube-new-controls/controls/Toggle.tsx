import { createSignal, JSX } from "solid-js";
import { YtButton } from "./YtButton";

type Props = {
  icons?: JSX.Element[];
  texts?: string[];
  class?: string;
};

export const Toggle = ({ icons, texts, ...rest }: Props) => {
  const [isChecked, setChecked] = createSignal(true);
  const toggle = () => setChecked((prev) => !prev);
  const currentIcon = () => icons?.[isChecked() ? 0 : 1];
  const currentText = () => texts?.[isChecked() ? 0 : 1];
  return (
    <YtButton
      {...rest}
      inverted={isChecked()}
      icon={currentIcon()}
      onClick={toggle}
    >
      {currentText()}
    </YtButton>
  );
};
