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
// Serve only the pinned Swagger runtime files, never its example initializer/spec.
await mkdir('dist/swagger/assets', {recursive:true});
for (const file of ['swagger-ui-bundle.js','swagger-ui-bundle.js.LICENSE.txt','swagger-ui.css','LICENSE','NOTICE']) {
  await cp(new URL('../node_modules/swagger-ui-dist/'+file,import.meta.url),'dist/swagger/assets/'+file);
}
