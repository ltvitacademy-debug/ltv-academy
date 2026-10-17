# CI/Production Secrets Separation Checklist

From Lesson 23. Confirm all of these before a CI/CD pipeline touches
any credential with real access.

## Separation

- [ ] CI jobs and the deploy job use **different, separately-named
      secrets** (e.g. `DB_PASSWORD` vs. `PROD_DB_PASSWORD`) — never
      the same secret referenced under two names.
- [ ] The CI credential's database/warehouse user has access **only**
      to a disposable CI/scratch schema — not production, even if the
      CI job is "just running tests."
- [ ] The production credential is referenced **only** inside the job
      gated to `push` + `ref == 'refs/heads/main'` — never inside a
      job that runs on `pull_request`.

## Platform-level protections (confirm, don't just assume)

- [ ] Secrets are added via the repo's Settings → Secrets and
      variables → Actions — never written directly into a workflow
      file or committed anywhere.
- [ ] Deliberately `echo` a secret in a test workflow step and
      confirm GitHub masks it as `***` in the log — don't just trust
      that masking works, see it happen.
- [ ] If the repository can receive pull requests from forks, confirm
      secrets are withheld from fork-triggered workflow runs (this is
      GitHub's default — verify it hasn't been overridden).

## The red flag to watch for in code review

A new job that reuses the production credential inside a
`pull_request`-triggered job, often justified as "just for a quick
preview" or "it's already available." This is a real risk, not a
style nitpick: it means **any** pull request — from any branch, by
any contributor — can execute against production before a human
reviews the change. The fix is always a separate, narrowly-scoped
credential for whatever the PR-triggered job actually needs, never
reusing the production one.
