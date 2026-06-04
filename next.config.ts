import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Static HTML export (out/) — deployable to GitHub Pages / any static host.
  output: "export",
  // Each route emits a folder/index.html, so refreshes on nested routes work.
  trailingSlash: true,
  // The export has no Image Optimization server; the site uses plain <img>.
  images: { unoptimized: true },
  // Pin the workspace root to this project so Turbopack doesn't infer a
  // parent directory from a stray lockfile (silences the multi-lockfile warning).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
