---
name: service-developer-docs
description: Maintain the independent Aroha API and MCP developer documentation site.
---

# Developer documentation

Owner ArohaRetreat. Static site/ HTML/CSS/modules, build scripts/build.mjs, isolated Firebase Hosting site aroha-retreat-developer. Never deploy guest Hosting/Functions/CMS from this repo. Current OpenAPI mirrors the implemented website external API; retain provenance and distinguish proposed routes from runtime evidence. MCP stays in ArohaRetreat/mcp.

Connect uses existing Firebase verified Google identity with in-memory persistence, scoped-token create/revoke and explicit actions. Do not persist tokens in browser storage, screenshots or logs. Preserve exact environment hosts, least privilege and actual error states; no placeholder success. Public Firebase web config is not a privileged credential.

Run npm run build, npm test, sh scripts/check.sh and responsive browser review. Deploy exact reviewed source to only aroha-retreat-developer. Domain DNS/TLS and OAuth/sign-in acceptance require independent checks. Keep docs factual about shipped operations and unfinished financial/feedback/OAuth features.
