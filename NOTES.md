# NOTES — decisions and open questions

## Decisions

- 2026-09-02 — GitHub repo created **private** (`wagreen3629/ltv-academy`) since it will hold
  paid course scaffolding; matches oracle-guides precedent.
- 2026-09-02 — Netlify site `ltv-academy` created via MCP connector before any build, per
  Bill's instruction, so database/member-area env vars and deploys have a home from day one.

## Open questions

- [ ] **Netlify ↔ GitHub link**: the MCP connector cannot link a repo to the site. One-time
  manual step in the Netlify UI (Project → Configuration → Build & deploy → Link repository)
  to get auto-deploy on push. Until then, deploys go through the MCP `deploy-site` token flow.
- [ ] Custom domain cutover (www.ltvacademy.com) — timing TBD; current site is live on Wix(?).
