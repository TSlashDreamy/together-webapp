import { defineConfig } from "vite";
import path from "path";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/together-webapp/",
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
