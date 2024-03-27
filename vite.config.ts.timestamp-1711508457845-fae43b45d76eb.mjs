// vite.config.ts
import { defineConfig } from "file:///C:/Users/nephrite/Desktop/p/crypto-portfolio-pwa/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/nephrite/Desktop/p/crypto-portfolio-pwa/node_modules/vite-plugin-pwa/dist/index.js";
import react from "file:///C:/Users/nephrite/Desktop/p/crypto-portfolio-pwa/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\nephrite\\Desktop\\p\\crypto-portfolio-pwa";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "Crypto Portfolio",
        short_name: "crypto-portfolio",
        description: "the best crypto portfolio management app.",
        icons: [
          {
            src: "/Icon-20x20@1x.png",
            sizes: "20x20",
            type: "image/png",
            purpose: "favicon"
          },
          {
            src: "/logo.svg",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch icon"
          },
          {
            src: "/logo.svg",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        theme_color: "#171717",
        background_color: "#f0e7db",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait"
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxuZXBocml0ZVxcXFxEZXNrdG9wXFxcXHBcXFxcY3J5cHRvLXBvcnRmb2xpby1wd2FcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG5lcGhyaXRlXFxcXERlc2t0b3BcXFxccFxcXFxjcnlwdG8tcG9ydGZvbGlvLXB3YVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbmVwaHJpdGUvRGVza3RvcC9wL2NyeXB0by1wb3J0Zm9saW8tcHdhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6ICdwcm9tcHQnLFxuICBtYW5pZmVzdDp7XG4gICAgbmFtZTpcIkNyeXB0byBQb3J0Zm9saW9cIixcbiAgICBzaG9ydF9uYW1lOlwiY3J5cHRvLXBvcnRmb2xpb1wiLFxuICAgIGRlc2NyaXB0aW9uOlwidGhlIGJlc3QgY3J5cHRvIHBvcnRmb2xpbyBtYW5hZ2VtZW50IGFwcC5cIixcbiAgICBpY29uczpbXG4gICAgICB7XG4gICAgICBzcmM6ICcvSWNvbi0yMHgyMEAxeC5wbmcnLFxuICAgICAgc2l6ZXM6JzIweDIwJyxcbiAgICAgIHR5cGU6J2ltYWdlL3BuZycsXG4gICAgICBwdXJwb3NlOidmYXZpY29uJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3JjOiAnL2xvZ28uc3ZnJyxcbiAgICAgICAgc2l6ZXM6JzE4MHgxODAnLFxuICAgICAgICB0eXBlOidpbWFnZS9wbmcnLFxuICAgICAgICBwdXJwb3NlOidhcHBsZSB0b3VjaCBpY29uJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNyYzogJy9sb2dvLnN2ZycsXG4gICAgICAgIHNpemVzOic1MTJ4NTEyJyxcbiAgICAgICAgdHlwZTonaW1hZ2UvcG5nJyxcbiAgICAgICAgcHVycG9zZTonYW55IG1hc2thYmxlJyxcbiAgICAgIH1cbiAgICBdLFxuICAgIHRoZW1lX2NvbG9yOicjMTcxNzE3JyxcbiAgICBiYWNrZ3JvdW5kX2NvbG9yOicjZjBlN2RiJyxcbiAgICBkaXNwbGF5Olwic3RhbmRhbG9uZVwiLFxuICAgIHNjb3BlOicvJyxcbiAgICBzdGFydF91cmw6XCIvXCIsXG4gICAgb3JpZW50YXRpb246J3BvcnRyYWl0J1xuICAgIH1cbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VSxTQUFTLG9CQUFvQjtBQUMzVyxTQUFTLGVBQWU7QUFDeEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDbEIsVUFBUztBQUFBLFFBQ1AsTUFBSztBQUFBLFFBQ0wsWUFBVztBQUFBLFFBQ1gsYUFBWTtBQUFBLFFBQ1osT0FBTTtBQUFBLFVBQ0o7QUFBQSxZQUNBLEtBQUs7QUFBQSxZQUNMLE9BQU07QUFBQSxZQUNOLE1BQUs7QUFBQSxZQUNMLFNBQVE7QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTTtBQUFBLFlBQ04sTUFBSztBQUFBLFlBQ0wsU0FBUTtBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFNO0FBQUEsWUFDTixNQUFLO0FBQUEsWUFDTCxTQUFRO0FBQUEsVUFDVjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGFBQVk7QUFBQSxRQUNaLGtCQUFpQjtBQUFBLFFBQ2pCLFNBQVE7QUFBQSxRQUNSLE9BQU07QUFBQSxRQUNOLFdBQVU7QUFBQSxRQUNWLGFBQVk7QUFBQSxNQUNaO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
