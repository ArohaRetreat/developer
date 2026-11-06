# Developer docs continuation

The independent repository is https://github.com/ArohaRetreat/developer . Hosting targets only `aroha-retreat-developer`; never deploy guest Hosting, Functions, Firestore or Storage from this repo.

## Verified release, 2026-11-06

Developer docs 0.1.1 were deployed from reviewed source 5f4a4d58b6d462c5a9db297a8c8af0a30f2db2a8 at https://aroha-retreat-developer.web.app . This source update refreshes provenance; deployment of this update must be verified separately.

Production website 0.25.0 and API 0.10.0 are live from reviewed website source fe34c3df4856a6a2cf0fb07eb354ac8aee6c3e6b (PR108). Preprod website 0.23.10/API0.10.0 remain isolated. All five original production booking hashes, CMS, runtime configuration and secret bindings were preserved; no live booking/email campaign was rerun.

@theharithsa/aroha-mcp@0.1.0 is published publicly with registry integrity matching the tested tarball. The downloaded npm package returned 0.1.0 through npx. GitHub release v0.1.0 points to reviewed MCP source 09ef4e18281cbff2d58d05fa3f4f17752d3bf9d1.

GoDaddy saved developer CNAME -> aroha-retreat-developer.web.app. Authoritative, Cloudflare and Google DNS resolve it; Firebase reports active hosting and ownership. TLS was still validating at this recorded checkpoint. Verify provider state and HTTPS before calling the custom domain ready; do not bypass certificate warnings.

MCP native traces, metrics and logs were independently searchable in the approved tenant from one synthetic exporter observation; real authenticated MCP-to-API linkage remains unverified. Real Google sign-in/token issuance remains a separate acceptance gate. Token issuance/revocation require explicit user action; do not automatically create live verification credentials.

39 API operations and nine read-only MCP tools are implemented. The broader planned lifecycle CRUD is still tracked under website105/70; do not treat the complete strategy inventory as shipped.
