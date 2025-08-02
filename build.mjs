import { build } from "esbuild";
import { read, readdirSync, statSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getJsFiles(dir, ext = [".js"], files = []) {
  for (const file of readdirSync(dir)) {
    const fullpath = path.join(dir, file);
    if (statSync(fullpath).isDirectory()) {
      getJsFiles(fullpath, ext, files);
    } else if (ext.includes(path.extname(fullpath))) {
      files.push(fullpath);
    }
  }
  return files;
}

const entryPoints = getJsFiles(path.join(__dirname, "public", "src", "js"));
console.log(entryPoints);
build({
  entryPoints,
  outdir: "public/dist/js",
  bundle: true,
  format: "esm",
  platform: "browser",
  sourcemap: true,
  /* minify: true, */ //turn when minifying functions and use OOPs functions, code in OOPs folder, use screenchots as reference.
  keepNames: true,
}).catch(() => process.exit(1));
