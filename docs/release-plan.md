# Developer docs 0.5.0 release

Issue #8, implementing PR #9. Publish the canonical REST 1.3.0 / 121-operation reference and MCP 0.3.0 setup after independently verifying the reviewed npm artifact. The API is live at website revision a4d28dc; MCP source is d038721. Source provenance must identify each independently.

Affected: static developer guides, OpenAPI/token/tool contracts, Connect scope choices, Swagger and generated compact reference. No new dependencies or provider settings; no website/API, data, indexes, identity grants, CMS, mail settings or secrets are modified by this docs release.

Predeploy: current-head application/foundation checks; three documentation/Swagger/Connect tests, build and 21 foundation checks; responsive browser review. npm version/integrity must match the tested 0.3.0 tarball, followed by fresh-cache CLI execution. Merge PR9 through normal GitHub checks, build the immutable merged revision, and deploy only Hosting site aroha-retreat-developer in project aroha-retreat.

Postdeploy: verify custom-domain HTTPS, release.json version/source, OpenAPI SHA256/121 operations, tool contract and source provenance, Swagger runtime/spec and updated MCP guide. Keep the production website source/version unchanged. Browser checks use no live grant issuance or business writes. Native RUM correlation and authenticated MCP-to-API traces are separate unverified acceptance gates; the SDK stdio test already verifies native metrics, traces and logs against a local collector.

Rollback: restore the preceding developer Hosting release only. Never roll back customer data, website, API or npm versions through this repository. Do not overwrite a tag or re-publish an existing npm version. Record actual provider release, final source and runtime receipts in issue8 after verification; source merge alone is not deployment evidence.
