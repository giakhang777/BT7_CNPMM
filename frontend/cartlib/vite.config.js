// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.js",
      name: "CartUI",
      fileName: (format) => `cart-ui.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // 👇 Đánh dấu các lib bên ngoài (không bundle)
      external: ["react", "react-dom", "antd"],
      output: {
        // 👇 Ánh xạ global cho bản UMD (chỉ cần khi ai đó xài qua <script> UMD)
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          antd: "antd",
        },
      },
    },
  },
});
