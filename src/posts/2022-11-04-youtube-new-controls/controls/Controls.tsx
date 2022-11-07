import { Background } from "./Background";
import { YtButton } from "./YtButton";
import { Toggle } from "./Toggle";
import { ShareIcon } from "../icons/share";
import { DotsIcon } from "../icons/dots";
import { Dual } from "./Dual";

export const Controls = () => {
  return (
    <Background>
      <div class="grid w-full grid-cols-2 items-center gap-4">
        <span class="text-yt-text">Simple button</span>
        <div>
          <YtButton text={<span>Subscribe</span>} />
        </div>
        <span class="text-yt-text">With icon</span>
        <div>
          <YtButton icon={ShareIcon} text={<span>Share</span>} />
        </div>
        <span class="text-yt-text">Icon Button</span>
        <div>
          <YtButton icon={DotsIcon} />
        </div>
        <span class="text-yt-text">Inverted</span>
        <div>
          <YtButton icon={DotsIcon} inverted />
        </div>
        <span class="text-yt-text">Toggle</span>
        <div>
          <Toggle on="Subscribed" off="Subscribe" />
        </div>
        <span class="text-yt-text">Dual</span>
        <div>
          <Dual />
        </div>
      </div>
    </Background>
  );
};
