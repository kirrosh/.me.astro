import { CanvasSpace, Create, Group, IPlayer, Line } from "pts";
import { Accessor, createEffect, createMemo, onMount } from "solid-js";
import { themeRoot } from "@features/theme/themesStore";

// TODO create Solid-Store for colors

let color = "250, 250, 250";
let secondary = "250, 250, 250";
let accent = "250, 250, 250";

export const PtsCanvas = () => {
  const { setTheme, store } = themeRoot;
  getComputedStyle(document.documentElement).backgroundColor;
  let space: Accessor<CanvasSpace | void> = () => {};

  const backgroundColor = () =>
    hslToRgb(
      getComputedStyle(document.documentElement).getPropertyValue("--b1")
    );
  const accentColor = () =>
    hslToRgb(
      getComputedStyle(document.documentElement).getPropertyValue("--a")
    );
  const secondaryColor = () =>
    hslToRgb(
      getComputedStyle(document.documentElement).getPropertyValue("--s")
    );
  const primaryColor = () =>
    hslToRgb(
      getComputedStyle(document.documentElement).getPropertyValue("--p")
    );

  createEffect(() => {
    console.log(store.theme);

    setTimeout(() => {
      color = primaryColor();
      accent = accentColor();
      secondary = secondaryColor();
      space()?.clear(`rgb(${backgroundColor()})`);
    }, 0);
  });

  onMount(() => {
    const newSpace = new CanvasSpace("#pts").setup({
      bgcolor: `rgb(${backgroundColor()})`,
      resize: true,
      retina: true,
    });
    createPlayer(newSpace);
    space = createMemo(() => newSpace);
    newSpace.bindMouse().bindTouch().play();
  });
  return <div id="pts" class="h-full w-full"></div>;
};

const createPlayer = (space: CanvasSpace) => {
  // Initiate Space and Form

  const form = space.getForm();

  var pts = new Group();
  const player: IPlayer = {
    // creatr 200 random points
    start: (bound) => {
      pts = Create.distributeRandom(space.innerBound, 200);
    },

    animate: (time, ftime) => {
      const perpend = new Group(space.center.$subtract(0.1), space.pointer).op(
        Line.perpendicularFromPt
      );
      pts.rotate2D(0.0005, space.center);

      pts.forEach((p, i) => {
        // for each point, find the perpendicular to the line
        let lp = perpend(p);
        var ratio = Math.min(
          1,
          1 - lp.$subtract(p).magnitude() / (space.size.x / 2)
        );
        form.stroke(`rgba(${color},${ratio}`, ratio * 2).line([p, lp]);
        form
          .fillOnly([`rgba(${accent})`, `rgba(${secondary})`][i % 2])
          .point(p, 2, "circle");
      });
    },
    resize: (bound) => {
      pts = Create.distributeRandom(bound, 200);
    },
  };
  space.add(player);
  return player;
};

const hslToRgb = (hslString: string) => {
  const arr = hslString.match(/\d+/g)!.map(Number);
  let h = arr[0];
  let s = arr[1];
  let l = arr[2];

  // IMPORTANT if s and l between 0,1 remove the next two lines:
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));
  return `${r}, ${g}, ${b}`;
};
