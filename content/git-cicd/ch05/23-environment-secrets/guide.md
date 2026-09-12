# Lesson 23 — Environment Variables & Secrets in CI/CD

**Chapter 5 · Building a CI/CD Pipeline for a Data Project · Lesson 23 of 25**

## What you'll learn

- Where `${{ secrets.DB_PASSWORD }}` from Lessons 21-22 actually comes
  from
- Adding a real secret to a repository through GitHub's UI
- Why secrets are encrypted at rest and masked in logs, specifically
- Separating CI credentials from production credentials, and why that
  separation matters

## Where a secret actually lives

Every `${{ secrets.* }}` reference in `retail-orders-analytics`'s
workflow file points to a value configured on GitHub itself — never
written in the repository, never visible in a diff, never something
`git log` could ever show. To get there, open the repository's
**Settings**:

![A repository's top navigation with the Settings tab highlighted.](/courses/git-cicd/ch05/23-environment-secrets/repo-actions-settings.png)
*Secrets live in repository settings, not in any file the workflow itself contains.*
Source: [GitHub Docs — Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

From there, **Secrets and variables → Actions** is where secrets
actually get created:

![The 'Actions secrets and variables' settings page, explaining that secrets are encrypted and used for sensitive data, with Secrets and Variables tabs.](/courses/git-cicd/ch05/23-environment-secrets/actions-secrets-tab.png)
*Secrets are encrypted — GitHub itself can't show you a saved secret's value again, only let you overwrite it.*
Source: [GitHub Docs — Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

Adding `DB_PASSWORD` here (Settings → Secrets and variables → Actions
→ New repository secret) is what makes `${{ secrets.DB_PASSWORD }}`
resolve to a real value at run time in Lessons 21 and 22's workflow.

## What GitHub actually does with a secret

- **Encrypted at rest.** Once saved, GitHub can't display the value
  back to you — only overwrite it with a new one. There's no "reveal"
  button because there's nothing to reveal.
- **Masked in logs, automatically.** If a workflow step accidentally
  prints a secret's value (`echo $DB_PASSWORD`), GitHub replaces it
  with `***` in the log output — a real, automatic safety net, not
  something you configure yourself.
- **Withheld from fork pull requests.** A pull request opened from a
  fork of your repository does not receive your secrets, by default —
  a real protection against a malicious PR trying to exfiltrate
  credentials by printing them.

## Separate secrets for CI and production

Lesson 22's `deploy` job used `PROD_DB_HOST` and `PROD_DB_PASSWORD` —
deliberately different secret names from `DB_HOST` and `DB_PASSWORD`
used in the CI job. This isn't redundancy:

- The CI credential should only have access to a disposable schema,
  with no way to touch real production data even if a CI workflow
  somehow misbehaved.
- The production credential should be usable only from the `deploy`
  job, never from a pull request build — which the two-job split from
  Lesson 22 already enforces structurally.

A single shared credential with full access everywhere means a bug or
a compromised dependency in a PR's CI run could reach production data.
Two separate, narrowly-scoped credentials means it can't.

## Key terms

| Term | Meaning |
|---|---|
| Repository secret | An encrypted value stored on GitHub, referenced in a workflow as `${{ secrets.NAME }}` |
| Masking | GitHub automatically replacing a secret's value with `***` if it appears in a log |
| Fork PR restriction | Secrets are withheld by default from workflows triggered by a pull request from a fork |
| Least privilege | Scoping each credential to only what it actually needs — CI schema vs. production |

## Lab

1. In a real repository, add a secret under Settings → Secrets and
   variables → Actions, and reference it in a workflow step with
   `${{ secrets.YOUR_SECRET_NAME }}`.
2. Deliberately `echo` that secret in a workflow step and confirm
   GitHub masks it as `***` in the run's log.
3. If your project has both a CI and a production database, confirm
   they use separate credentials, each scoped to only what that job
   actually needs.

## Check yourself

You're ready for Lesson 24 (the capstone) when you can explain why a
CI credential and a production credential should never be the same
secret, even when the two databases are similar.
