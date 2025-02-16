import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  publicDir: "public",
  server: {
    port: 3001,
  },
  build: {
    cssMinify: false,
  },
});
