import { access, mkdir, readFile, writeFile } from "node:fs/promises";

const target = "/security-center/zh/";
await access(new URL("../.next-pages/zh/index.html", import.meta.url));
await writeFile(
  new URL("../.next-pages/index.html", import.meta.url),
  `<!doctype html><html lang="zh"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><title>Security Center</title><link rel="canonical" href="${target}"></head><body><a href="${target}">Security Center</a></body></html>\n`,
);
await writeFile(new URL("../.next-pages/.nojekyll", import.meta.url), "");

const redirects = JSON.parse(
  await readFile(
    new URL("../src/config/page-redirects.json", import.meta.url),
    "utf8",
  ),
);
for (const { source, destination } of redirects) {
  for (const locale of ["", "en", "zh"]) {
    const target = `/security-center/${locale || "zh"}${destination}/`;
    const directory = new URL(
      `../.next-pages/${locale ? `${locale}/` : ""}${source.slice(1)}/`,
      import.meta.url,
    );
    await mkdir(directory, { recursive: true });
    await writeFile(
      new URL("index.html", directory),
      `<!doctype html><html lang="${locale || "zh"}"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${target}"><title>Security Center</title><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></head><body><a href="${target}">Security Center</a></body></html>\n`,
    );
  }
}
