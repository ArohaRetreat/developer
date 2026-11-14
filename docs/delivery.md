# Delivery

## Documentation review

Every PR records a visible decision under **Documentation impact**. Use one of these lines.

```text
Updated: <affected guides or links>
No change: <reason the guides still apply>
```

Foundation CI checks for the entry. The PR review checks the accuracy and scope of the decision, including for Dependabot. Use the [Aroha handbook](https://aroharetreat.github.io/website/handbook/) for public instructions and keep private operational details in the owning service's documentation.

These practices and the bundled skill were adopted from [App Launchpad 1.14.0](https://github.com/theharithsa/app-launchpad-template/releases/tag/v1.14.0), source `97aff26610feed99e9d0329c8eab4ea33794c1ed`. The template metadata records the original scaffold.

- [Issue-to-merge and release procedure](../.agents/skills/app-launchpad/references/github-release.md)
- [Authorization and safety](../.agents/skills/app-launchpad/references/safety.md)
- [Evidence states](../.agents/skills/app-launchpad/references/evidence.md)
- [Baseline repository ruleset](repository-ruleset.md)
- [Template versions and consumer upgrades](versioning.md)

## Prepared0.5.0 — issue8

The candidate reference contains contract1.3.0/121operations and MCP0.3.0, with scoped manual booking/customer-linking/credit/ledger/feedback guides. OpenAPI, token scopes and MCP tools are copied from their canonical sources. Final merged API/npm provenance must be pinned before publication. Tests/build/foundation and zero production dependency vulnerabilities pass locally. Deploy Hosting only to aroha-retreat-developer; never deploy website functions or create a real token during documentation verification.
