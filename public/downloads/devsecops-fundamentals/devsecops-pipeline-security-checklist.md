# DevSecOps Pipeline Security Checklist

A working checklist for Northbridge Retail's checkout-service pipeline, organized by this
course's chapters. Each item names the control, the lesson it comes from, and what "done" looks
like in this pipeline specifically -- not a generic industry checklist, but the one this course
actually builds across Chapters 1-7.

## 1. Security foundations (Chapter 1)

- [ ] **Shift-left applied, not just stated** -- scans run in CI on every pull request (Lesson 1),
  not only against what's already in production.
- [ ] **A current threat model exists** for checkout and is revisited when the architecture
  changes, not written once and filed away (Lesson 2).
- [ ] **OWASP Top 10 categories mapped to this pipeline's actual controls** -- each category has
  a named scan or control that addresses it, not just awareness of the list (Lesson 3).

## 2. Identity, IAM & RBAC (Chapter 2)

- [ ] **Least privilege on every role** -- the checkout pipeline's deployment identity can do
  exactly what deploying checkout requires, nothing broader (Lesson 5).
- [ ] **Workload identity, not long-lived credentials, for the CI runner** -- Azure Entra ID /
  AWS IAM role assumption instead of a static access key baked into pipeline config (Lessons 6, 7, 9).
- [ ] **Kubernetes RBAC scoped per namespace** -- the checkout service account can't act outside
  its own namespace (Lesson 8).

## 3. Secrets management (Chapter 3)

- [ ] **No secret is hardcoded in a `.tf`, `.yml`, or application config file** -- every real
  secret is read at runtime from Key Vault, Secrets Manager, or Vault (Lessons 11-13).
- [ ] **`.gitignore` excludes `*.tfvars`, `*.tfstate*`, `.env`, and `secrets/`** across every
  repository, not just checkout's (Lesson 10).
- [ ] **Pipeline secrets injected at runtime**, never stored as a plain CI variable visible in
  logs (Lesson 14).

## 4. Vulnerability scanning (Chapter 4) -- see `security-scan.yml` in this resource set

- [ ] **SAST runs on every pull request** via GitHub code scanning / CodeQL, with findings
  triaged (true positive, fix, or dismissed with a documented reason) -- never silently ignored
  (Lesson 15).
- [ ] **Dependency / composition scanning covers transitive dependencies**, not just what's
  listed directly in the manifest file (Lesson 16).
- [ ] **Secrets detection scans full git history**, not just the current diff, and any leaked
  secret is rotated, never just deleted in a later commit (Lesson 17).
- [ ] **IaC scanning runs against the Terraform plan**, before `apply`, so a misconfigured
  resource is never actually provisioned (Lesson 18).
- [ ] **An SBOM is generated at build time for every image**, in SPDX or CycloneDX format, and
  stored somewhere queryable -- so "are we affected by this new CVE" is a search, not a
  repository-by-repository hunt (Lesson 19).

## 5. Container & pipeline security (Chapter 5)

- [ ] **Every image is scanned post-build** (Trivy or equivalent), gating on CRITICAL/HIGH with a
  fixed version available (Lesson 20).
- [ ] **Dockerfiles follow the hardening checklist**: minimal/distroless base image, non-root
  `USER`, multi-stage build with no build tooling in the final image (Lesson 20; see the
  Dockerfile template in the docker-and-containers course's resource vault for the exact pattern).
- [ ] **Kubernetes manifests pass a pod-security review**: no privileged containers, no running
  as root, `readOnlyRootFilesystem` set where feasible (Lesson 21).
- [ ] **CI/CD pipeline itself is hardened**: third-party Actions pinned to a commit SHA, not a
  mutable tag; the pipeline's own identity follows least privilege (Lesson 22).
- [ ] **Runtime security monitoring is in place** for unexpected process execution or file
  changes inside running containers, not just build-time scanning (Lesson 23).
- [ ] **Policy as code enforced** for anything that shouldn't be deployable regardless of what a
  scan finds -- e.g. a Kubernetes admission policy blocking `:latest` tags in production
  (Lesson 24).

## 6. Compliance & response (Chapter 6)

- [ ] **Compliance requirements expressed as automated checks**, not a static spreadsheet nobody
  re-reads after an audit (Lesson 25).
- [ ] **Audit logging captures who did what, when**, across cloud, Kubernetes, and the CI/CD
  platform itself, with retention matching Northbridge's actual compliance obligations
  (Lesson 26).
- [ ] **A real vulnerability management process is running**, not just scanning: every new
  finding gets triaged, prioritized by exploitability and business context (not CVSS score
  alone), remediated, verified by rerunning the scan, and rolled into a monthly trend report
  (Lesson 27).
- [ ] **An incident response plan exists for a security incident specifically** (distinct from a
  general outage runbook), with a named on-call path and a practiced escalation chain
  (Lesson 28).

## Required reviewers on the production environment

- [ ] The `production` GitHub Actions environment has required reviewers configured under
  **Settings -> Environments**, so even a fully green pipeline pauses for a human approval
  before deploying checkout (Lesson 22).
- [ ] Any bypass of a deployment protection rule is visible and logged ("Start all waiting
  jobs"), never a silent skip -- a control that can be bypassed invisibly isn't really a control
  (Lesson 22).

## Using this checklist

Run through every box before onboarding a new service onto this pipeline pattern, and re-run it
quarterly against checkout itself -- a control that passed a review a year ago can quietly rot as
the service, its dependencies, and its deployment target all keep changing underneath it.
