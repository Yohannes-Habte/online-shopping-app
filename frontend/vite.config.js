import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 3000, // development
    strictPort: true,
    open: true,
  },

  preview: {
    port: 4173, // production preview (Vite default)
    strictPort: true,
  },
});