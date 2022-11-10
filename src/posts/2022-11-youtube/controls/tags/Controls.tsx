import { Background } from "../Background";
import { Tags } from "./Tags";

export const Controls = () => {
  return (
    <Background>
      <div class="relative h-14 w-full overflow-hidden">
        <Tags />
      </div>
    </Background>
  );
};
