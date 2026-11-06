import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("developer reference excludes unfinished routes and protects guest deployment target", async () => {
  const api = JSON.parse(await readFile("site/openapi.json"));
  assert.equal(api.info.version, "1.1.0");
  assert.ok(api.paths["/reservations"]);
  assert.equal(api.paths["/payments"], undefined);
  const firebase = JSON.parse(await readFile("firebase.json"));
  assert.equal(firebase.hosting.site, "aroha-retreat-developer");
  assert.equal(firebase.functions, undefined);
});
test("Connect uses memory-only identity and read-only token purpose", async () => {
  const code = await readFile("site/connect.mjs", "utf8");
  assert.ok(code.includes("inMemoryPersistence"));
  assert.match(code, /purpose:\s*["']mcp-readonly["']/);
  assert.ok(!/localStorage|sessionStorage|console\.log/.test(code));
});
