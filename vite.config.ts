import * as path from "node:path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [svelte()],
   resolve: {
      alias: {
         $lib: path.resolve("./src/lib"),
      },
   },
});
