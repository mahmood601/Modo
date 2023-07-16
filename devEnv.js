/*************************************************************************************
 *   Use This With Node To Develop This Project In sass, http-server and typescript   *
 **************************************************************************************/

const concurrently = require("concurrently");
const path = require("path");
const { result } = concurrently(
  [
    "npm:watch-*",
    {
      command: "sleep 2s && http-server -c 0",
      name: "server",
      prefixColor: "green",
    },
    {
      command: "tsc -w --outFile dist/main.js --sourceMap --removeComments",
      name: "tsc",
      prefixColor: "blue",
    },
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
    cwd: path.resolve(__dirname, "./"),
    kill: ["SIGINT", "SIGKILL", "SIGTERM", "0"],
    close: null,
  },
);

result.then((suc, fail) => {
  if (suc) {
    console.log("\x1b[34mExit, Bye!\n");
  }
});
