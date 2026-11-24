import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/security-center" : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? { output: "export", trailingSlash: true, distDir: ".next-pages" }
    : {}),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    unoptimized: isGitHubPages,
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  redirects() {
    if (isGitHubPages) return [];
    return [
      {
        source: "/buttons-group",
        destination: "/buttons",
        permanent: true,
      },
      {
        source: "/modals",
        destination: "/dialogs",
        permanent: true,
      },
      {
        source: "/text-generator",
        destination: "/ai-chat/text",
        permanent: true,
      },
      {
        source: "/image-generator",
        destination: "/ai-chat/image",
        permanent: true,
      },
      {
        source: "/code-generator",
        destination: "/ai-chat/code",
        permanent: true,
      },
      {
        source: "/video-generator",
        destination: "/ai-chat/video",
        permanent: true,
      },
      {
        source: "/ai-settings",
        destination: "/ai-settings/account",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
