import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("developer reference contains domain-backed workflows and isolates its deployment target", async () => {
  const api = JSON.parse(await readFile("site/openapi.json"));
  assert.equal(api.info.version, "1.2.0");
  assert.ok(api.paths["/reservations"]);
  assert.ok(api.paths["/reservations/{id}/payments"].post);
  assert.ok(api.paths["/reservations/{id}/feedback"].delete);
  const firebase = JSON.parse(await readFile("firebase.json"));
  assert.equal(firebase.hosting.site, "aroha-retreat-developer");
  assert.equal(firebase.functions, undefined);
});
test("Connect keeps memory-only identity and defaults to read-only with explicit CRUD selection", async () => {
  const code = await readFile("site/connect.mjs", "utf8");
  assert.ok(code.includes("inMemoryPersistence"));
  assert.match(code, /purpose:\s*readOnly\(\)\?"mcp-readonly":"mcp"/);
  assert.ok(!/localStorage|sessionStorage|console\.log/.test(code));
});
