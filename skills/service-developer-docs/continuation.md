# Developer documentation continuation

Issue https://github.com/ArohaRetreat/developer/issues/1, separate repo approved6November2026. Seven pages and scoped read-token Connect built locally. Two application tests and21 foundation tests; browser review in progress. Target Firebase site aroha-retreat-developer created; custom domain developer.aroharetreat.com awaits GoDaddy CNAME developer -> aroha-retreat-developer.web.app and TLS verification. No guest CMS/bookings or original media changed. Website dependency issue105, MCP package issue1.

Current source branch feat/issue-1-developer-docs. No source merge/deployment/runtime sign-in or npm publication is inferred from these notes. Update with actual evidence after release. Token issue/revoke are explicit security-sensitive actions; no automatic live verification grant issuance.

## Reviewed release evidence (2026-11-06)

The independent Firebase Hosting site is live at https://aroha-retreat-developer.web.app from source 72d509e14871eb769c61972d57355f83a3303367. Custom-domain DNS and certificate activation remain pending. Reference contract now follows reviewed website source 8f9bcdba6158c14461d1ebdfb55dc9a42f7024bb; source provenance is separate from API deployment. MCP native traces, metrics and logs were independently searchable in the approved tenant from one synthetic exporter observation; real authenticated MCP-to-API linkage remains unverified. npm registry publication remains pending browser approval.
