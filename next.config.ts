import type { NextConfig } from "next";

// GitHub Pages serves from https://<user>.github.io/<repo>/ so we need a basePath.
// Local dev leaves it empty. CI sets NEXT_PUBLIC_BASE_PATH=/whatsapp-analytics.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
