import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind(), mdx(), solidJs()],
  output: "static",
});
