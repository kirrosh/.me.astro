import { createSignal } from "solid-js";
import { DislikeIcon, DislikeFilledIcon } from "./icons/dislike";
import { LikeIcon, LikeFilledIcon } from "./icons/like";
import { Button } from "./Button";

type Props = {
  class?: string;
};

export const Dual = (props: Props) => {
  const [status, setStatus] = createSignal<"like" | "dislike" | "none">("none");
  const toggleLike = () => {
    setStatus((prev) => {
      return prev === "like" ? "none" : "like";
    });
  };
  const toggleDislike = () => {
    setStatus((prev) => {
      return prev === "dislike" ? "none" : "dislike";
    });
  };

  return (
    <div class="flex w-min">
      <Button
        onClick={toggleLike}
        class="relative rounded-r-none fill-current after:absolute after:right-0 after:top-1.5 after:h-6 after:w-[1px] after:bg-yt-control/10"
        icon={status() === "like" ? LikeFilledIcon : LikeIcon}
        text={["11k"]}
      />
      <Button
        onClick={toggleDislike}
        class="w-[52px] rounded-l-none px-4"
        icon={status() === "dislike" ? DislikeFilledIcon : DislikeIcon}
      />
    </div>
  );
};
