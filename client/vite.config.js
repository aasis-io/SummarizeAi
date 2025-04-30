import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Bind to all IPs, including local network
    port: 5173, // Ensure this matches the port you're using
  },
  optimizeDeps: {
    include: ["jwt-decode"],
  },
});
