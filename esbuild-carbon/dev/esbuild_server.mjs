import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./server/main.ts"],
    outfile: "./dist/server.js",
    platform: "node",
    bundle: true,
    minify: true,
    sourcemap: true,
    target: "es2018",
  })
  .catch(() => process.exit(1));
