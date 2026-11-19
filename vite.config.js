import react from "@vitejs/plugin-react";
import { default as path } from "path";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), tailwindcss()],
    base: "./",
    resolve: {
      alias: {
        "@/": `${path.resolve(import.meta.dirname, "src")}/`,
        // @sliit-foss/bashaway-ui requires tailwindcss/resolveConfig, which Tailwind CSS 4 no longer ships
        "tailwindcss/resolveConfig": "lodash/identity"
      }
    }
  });
};
