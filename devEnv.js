/*************************************************************************************
 *   Use This With Node To Develop This Project In sass, http-server and typescript   *
 **************************************************************************************/

const concurrently = require("concurrently");
const path = require("path");
const { commands, result } = concurrently(
  [
    "npm:watch-*",
    {
      command: "sleep 2s && http-server -c1",
      name: "server",
      prefixColor: "green",
    }, 
    {
      command: "esbuild --watch --target=chrome58 --minify-syntax --minify-whitespace --color=true --loader:.ttf=copy --loader:.woff2=file --bundle src/css/style.css src/css/all.min.css --outdir=dist",
      name: "css",
      prefixColor: "magenta",
    }, 
    {
      command: "esbuild --sourcemap=external --watch --minify --color=true  --bundle src/ts/main.ts  --outfile=dist/main.js",
      name: "typescript",
      prefixColor: "blue",
    },
    {
      command: "esbuild --sourcemap=external --watch --minify --color=true  --bundle src/ts/serviceWorker.ts  --outfile=serviceWorker.js",
      name: "typescript",
      prefixColor: "blue",
    },
  ],
);

result.then((suc, fail) => {
  if (suc) {
    console.log("\x1b[34mExit, Bye!\n");
  }
});
