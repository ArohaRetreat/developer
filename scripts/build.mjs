import { cp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("site", "dist", { recursive: true });
const revision = execFileSync("git", ["rev-parse", "HEAD"], {
  encoding: "utf8",
}).trim();
const pkg = JSON.parse(await readFile("package.json"));
await writeFile(
  "dist/release.json",
  JSON.stringify(
    {
      name: "aroha-developer",
      version: pkg.version,
      source: revision,
      builtAt: new Date().toISOString(),
    },
    null,
    2,
  ) + "\n",
);
await writeFile("dist/robots.txt", "User-agent: *\nAllow: /\n");
console.log("Built developer docs");
