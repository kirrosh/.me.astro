import { createSignal } from "solid-js";
import { DislikeIcon, DislikeFilledIcon } from "../icons/dislike";
import { LikeIcon, LikeFilledIcon } from "../icons/like";
import { YtButton } from "./YtButton";

type Props = {
  class?: string;
};

export const Dual = ({ ...rest }: Props) => {
  const [like, setLike] = createSignal(true);
  const [dislike, setDislike] = createSignal(false);

  return (
    <div class="flex w-min">
      <YtButton
        onClick={() => setLike((prev) => !prev)}
        class="relative rounded-r-none fill-current after:absolute after:right-0 after:top-1.5 after:h-6 after:w-[1px] after:bg-yt-control/10"
        icon={like() ? LikeFilledIcon : LikeIcon}
        text="11K"
      />
      <YtButton
        onClick={() => setDislike((prev) => !prev)}
        class="w-[52px] rounded-l-none px-4"
        icon={dislike() ? DislikeFilledIcon : DislikeIcon}
      />
    </div>
  );
};
