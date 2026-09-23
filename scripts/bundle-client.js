import { build } from "esbuild";

await build({
  entryPoints: ["lib/count.js"],
  bundle: true,
  format: "esm",
  platform: "browser",
  mainFields: ["module", "main"],
  outfile: "public/count.js",
  legalComments: "none",
});
