import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { exec } from "child_process";

function imageOptimizerPlugin(): Plugin {
  return {
    name: "vite-image-optimizer-watcher",
    configureServer(server) {
      server.watcher.on("add", (filePath) => {
        if (/\.(jpe?g|png)$/i.test(filePath) && filePath.includes("/public/images/")) {
          exec("python3 scripts/optimize_images.py", (err, stdout) => {
            if (stdout) console.log(stdout);
          });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), imageOptimizerPlugin()],
  server: {
    port: 5173,
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          motion: ["framer-motion"],
          gsap: ["gsap"],
        },
      },
    },
  },
});
