import { access, writeFile } from "node:fs/promises";

const target = "/security-center/zh/";
await access(new URL("../.next-pages/zh/index.html", import.meta.url));
await writeFile(
  new URL("../.next-pages/index.html", import.meta.url),
  `<!doctype html><html lang="zh"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><title>Security Center</title><link rel="canonical" href="${target}"></head><body><a href="${target}">Security Center</a></body></html>\n`,
);
await writeFile(new URL("../.next-pages/.nojekyll", import.meta.url), "");
