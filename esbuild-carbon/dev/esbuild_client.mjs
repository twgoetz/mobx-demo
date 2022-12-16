import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

esbuild
  .build({
    entryPoints: ["./src/App.tsx"],
    outdir: "./dist",
    entryNames: "[dir]/[name].bundle",
    bundle: true,
    minify: true,
    sourcemap: true,
    target: "es2018",
    plugins: [
      sassPlugin(),
    ],
    loader: {
        '.png': 'dataurl',
        '.woff': 'dataurl',
        '.woff2': 'dataurl',
        '.eot': 'dataurl',
        '.ttf': 'dataurl',
        '.svg': 'dataurl',
      },
  })
  .catch(() => process.exit(1));
