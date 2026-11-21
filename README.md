# Aroha developer documentation

Separate documentation for the scoped REST API and CRUD-capable npm MCP server. Target: https://developer.aroharetreat.com. Independent Firebase Hosting site `aroha-retreat-developer` in the existing Aroha project; guest Hosting/CMS/bookings are not deployed by this repository.

`npm run build`, `npm test`, `sh scripts/check.sh`. Static source lives in site/, output dist/ (ignored). Connect uses the existing Google/Firebase identity, in-memory browser persistence, scoped grant API and explicit token creation/revocation. It stores no token in browser storage or telemetry. Its public Firebase config is not an admin credential.

External REST contract 1.5.0 contains 122 operations, including staff reservation search and explicit early checkout. The published MCP 0.3.0 package contains 121 tools from contract 1.3.0. Existing read-only credentials retain the original nine-operation ceiling; write access requires a newly issued explicit scoped grant. Remote OAuth and service principals remain deferred. Source implementation and actual deployed availability are distinct. See docs/delivery.md and the owning service continuation for release evidence.

API source: ArohaRetreat/website issue105. MCP: ArohaRetreat/mcp issue1, package @theharithsa/aroha-mcp. Documentation issue1 in this repository.

Template version: **1.9.0**
