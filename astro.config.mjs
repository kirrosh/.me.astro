import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/edge";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [mdx(), solidJs(), tailwind()],
  output: "server",
  adapter: vercel(),
});
