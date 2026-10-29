# Lesson 28 — A Pipeline Security Checklist Before It Ships to Production

**Chapter 7 · Securing the Pipeline Itself · Lesson 4 of 4**

## What you'll learn

- How the controls from this chapter — secrets scanning, least privilege,
  and SBOMs — combine into one concrete pre-production gate
- Which additional checks belong in that gate: branch protection, required
  status checks, image/dependency scanning, and an audit trail
- How to express the gate as enforced CI configuration, not a document
  nobody reads before a release
- Why the checklist has to be a required status check, not a suggestion, to
  actually stop an unsafe pipeline from shipping

## The checklist

This is the gate a change should pass through before it reaches production —
not as a wiki page someone reads once, but as checks a pipeline actually
enforces. Treat every row as a yes/no a pull request either satisfies or
doesn't.

1. **Secrets scan is clean.** gitleaks or detect-secrets ran against this
   diff and the full history has already been baseline-audited (Lesson 25).
2. **No long-lived static credentials introduced.** Any new cloud access in
   this pipeline uses OIDC federation or a short-lived token, not a pasted
   key (Lesson 26).
3. **CI/CD permissions are explicit and minimal.** The workflow declares a
   `permissions` block; no job assumes a broader role than the specific
   resource it touches (Lesson 26).
4. **Untrusted and trusted execution are separated.** Fork-triggered jobs
   run on a pool with no access to production secrets (Lesson 26).
5. **An SBOM was generated for this build** and scanned for known
   vulnerabilities, with no unresolved critical/high findings left
   unreviewed (Lesson 27).
6. **Dependency and base-image versions are pinned**, not left on a
   floating tag like `latest`, so what ships is reproducible and auditable.
7. **Branch protection and required reviews are enforced** on the target
   branch — no direct pushes, at least one approving review, and every
   check above listed as a required status check before merge is even
   possible.
8. **The deploy step is logged and attributable** — who approved it, what
   commit SHA shipped, and where the SBOM and scan reports for that exact
   build are stored for later reference.

## Making it enforced, not aspirational

A checklist that lives in a document gets skipped under deadline pressure.
The same checklist, expressed as required CI status checks on the target
branch, cannot be bypassed by a rushed merge:

```yaml
# .github/workflows/pipeline-gate.yml
name: pipeline-gate
on: pull_request

permissions:
  contents: read

jobs:
  secrets-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: gitleaks/gitleaks-action@v2

  sbom-and-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: syft packages dir:. -o cyclonedx-json > sbom.json
      - run: grype sbom:sbom.json --fail-on high
```

Then, in the repository's branch protection settings, mark `secrets-scan`
and `sbom-and-scan` as **required status checks** on the target branch. With
that set, GitHub refuses to allow the merge button to be clickable at all
until both jobs pass — the gate is structural, not procedural.

## Key terms

| Term | Meaning |
|---|---|
| Pre-production gate | The set of checks a change must pass before it's allowed to reach production, expressed as enforced CI jobs |
| Required status check | A branch-protection setting that blocks merging until a named CI job reports success |
| Pinned dependency | A dependency or base image locked to an exact version/digest instead of a floating tag like `latest` |
| Audit trail | A record of who approved a deploy, which commit shipped, and where that build's SBOM and scan reports live |

## Check yourself

You're ready to move on when you can explain, without looking: why does
turning this checklist into required CI status checks matter more than
writing it down somewhere, and name the three controls from this chapter
that a pre-production gate should verify before any pipeline ships.
