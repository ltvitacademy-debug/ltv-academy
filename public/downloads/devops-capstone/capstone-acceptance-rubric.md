# DevOps Capstone Acceptance Rubric

> This is the scored, checkable version of Lesson 3's "Definition of Done" checklist. That
> lesson tells you what done looks like in six plain-language items; this rubric breaks each
> item into specific, verifiable criteria worth real points, so you (or a reviewer) can score
> your finished `storefront` project honestly instead of eyeballing it.
>
> **Total: 100 points. 90 points (90%) required to pass.** Every category lists required
> criteria (must be present to pass that category at all) and optional enhancements (extra
> credit, not required). Verification steps tell you exactly how to check each item — run the
> command, don't just read the code and assume it works.

## 1. Infrastructure Automation — 15 points

*Does the infrastructure exist only because Terraform created it, with state handled safely?*

| Criterion | Points | Verification |
|---|---:|---|
| `infra/terraform/` exists with separate `modules/networking` and `modules/database`, applied via `environments/dev.tfvars` and `prod.tfvars` | 4 | `terraform plan -var-file=environments/dev.tfvars` runs clean with zero manual drift |
| Remote state is configured (`azurerm` backend or equivalent), not a local `.tfstate` file | 4 | Check `backend.tf` for a `backend "azurerm" { ... }` block; confirm the state blob exists in the storage account, not on disk |
| State locking actually works | 3 | Run `terraform apply` from two terminals at once against the same environment; the second must fail with a lock error naming who holds it, not corrupt state |
| Every resource traces back to a `.tf` file — no manually-clicked resources | 4 | `terraform plan` shows zero unexpected changes on a clean checkout; `terraform state list` accounts for every resource in the resource group |

**Required to pass this category:** remote state + locking must both work (8 of the 15 points). A project with only local state fails this category regardless of how complete the rest is — Lesson 7's entire point is that local state doesn't survive two people touching the same infrastructure.

**Optional enhancement (not required):** a second cloud's Terraform module (AWS alongside Azure), demonstrating the dual-cloud competency this path builds elsewhere but the capstone itself doesn't require.

## 2. Docker and Kubernetes Implementation — 20 points

*Are both services actually containerized and running correctly on a real cluster?*

| Criterion | Points | Verification |
|---|---:|---|
| Both `product-catalog` and `checkout` have working, non-root Dockerfiles | 4 | `docker build` succeeds for both; `docker inspect` shows a non-root `USER` |
| Local multi-service environment works via Compose | 3 | `docker compose up` brings up both services plus their dependencies, and they can reach each other |
| Kubernetes cluster is provisioned and both services deploy successfully | 5 | `kubectl get pods -n northbridge-dev` shows both services `Running`, not `CrashLoopBackOff` or `Pending` |
| Helm charts exist and are used for deployment, not raw `kubectl apply` of hand-written manifests | 4 | `helm list -n northbridge-dev` shows both releases; `helm upgrade --install` is the actual deploy mechanism, confirmed in the CI workflow file |
| Resource requests/limits are set on both deployments | 2 | `kubectl describe pod` shows non-empty `requests`/`limits` for both services |
| Secrets reach pods via External Secrets Operator, never a hardcoded value in a Helm `values.yaml` | 2 | `grep -r apiKey charts/*/values.yaml` returns nothing; an `ExternalSecret` resource exists per service |

**Required to pass this category:** both services must actually be `Running` on the real cluster (not just locally via Compose) — a project that only demos locally does not meet this bar.

## 3. CI/CD Pipeline Reliability — 20 points

*Does a code change actually reach production automatically, safely, and promotably?*

| Criterion | Points | Verification |
|---|---:|---|
| A merge to `main` reaches `northbridge-dev` with zero manual steps | 5 | Push a trivial change, time how long until it's live in `northbridge-dev` with no human running a deploy command |
| CI pipeline runs lint/test → build → scan → push in that order, and a failing step actually blocks the next one | 4 | Intentionally break a test; confirm the pipeline stops before building/pushing an image |
| A tag reaches staging and then production only through the promotion + approval gate from Lesson 12 | 4 | Confirm production deploys require a recorded approval, not just a tag push alone |
| Artifacts are versioned by immutable tag (commit SHA), never `:latest` | 3 | `kubectl get deployment -o yaml` shows an image tag that is a SHA, not `latest` |
| Rollback actually works, via `helm rollback` or redeploying a prior SHA | 4 | Deliberately deploy a broken version to `northbridge-dev`, then roll it back; confirm the previous working version is restored and you can state which method you used and why |

**Required to pass this category:** the merge-to-dev automation AND a demonstrated, working rollback are both required — a pipeline that only deploys forward, with no proven rollback path, does not meet this bar. This is the single most common way a capstone looks finished in a demo but isn't: showing the happy path and never actually breaking something on purpose to prove recovery works.

## 4. Security and Secrets Management — 15 points

*Does security scanning actually block bad changes, not just report on them after the fact?*

| Criterion | Points | Verification |
|---|---:|---|
| Trivy scans both container images and blocks on CRITICAL vulnerabilities with a fix available | 4 | Find or introduce a known-vulnerable base image version; confirm the pipeline fails, not just warns |
| Checkov scans the Terraform and blocks on real misconfiguration (open NSG, missing encryption) | 4 | Introduce a deliberately open security rule in a feature branch; confirm Checkov catches it before merge |
| gitleaks scans every commit/PR diff and actually blocks a leaked secret | 4 | Try committing a fake API-key-shaped string (not a real one); confirm gitleaks catches it — either locally via the pre-commit hook or in CI |
| No real secret exists in Git history, Helm `values.yaml`, or a ConfigMap | 3 | `git log -p -- '*values.yaml'` across the whole repo history, not just the current commit, confirms nothing sensitive was ever committed |

**Required to pass this category:** all three scanners (Trivy, Checkov, gitleaks) must be wired into CI as actual blocking gates, not advisory-only steps — `soft_fail: true`-equivalent configuration on any of the three fails this category, per Lesson 15's own framing ("actually block a bad merge, not just report on one").

**Optional enhancement:** a documented near-miss of your own (like the PaymentPro key in Lesson 15) — catching a real mistake during your own build-out and writing it up is stronger evidence than a scanner that's simply never been tested against a real leak.

## 5. Observability and Incident Response — 10 points

*Would you actually find out if this broke, and could you diagnose why?*

| Criterion | Points | Verification |
|---|---:|---|
| Grafana dashboards exist for both services using the RED method (rate, errors, duration) | 3 | Dashboards are reachable and show live data under normal traffic |
| At least one SLO is defined with a real alert, not just a dashboard someone has to remember to check | 3 | A burn-rate or threshold alert actually fires when the SLO is violated (test this, don't just read the Alertmanager config) |
| The incident drill from Lesson 16 was actually run, not just read | 4 | A real postmortem document exists (see docs criteria below) with a real timeline from an actual drill, not a hypothetical one copied from the lesson |

**Required to pass this category:** the alert must be proven to actually fire under real conditions — an alert rule that exists in YAML but has never triggered doesn't meet this bar, since Lesson 16's whole point is that the original incident's alert existed but was configured wrong (full-exhaustion only, not saturation-based) and fired too late.

## 6. Troubleshooting and Recovery — 10 points

*Is there real, specific evidence of diagnosing and fixing a problem — not just building something that happened to work the first time?*

| Criterion | Points | Verification |
|---|---:|---|
| A real Terraform state-locking collision was reproduced and resolved (per Lesson 7), not just read about | 3 | Can name the exact lock error message encountered and what resolved it |
| A real failed deployment was rolled back using the mechanism from Category 3, with evidence (logs, a screenshot, a recorded `helm history`) | 4 | `helm history` for the release shows at least one `superseded` revision from an intentional rollback, not just a clean linear history |
| The incident drill's root-cause diagnosis used the golden signals / USE method (per Lesson 16), with the real bottleneck identified, not guessed | 3 | The postmortem's root cause section names a specific resource (e.g., a connection pool) backed by a specific metric query, not a vague description |

**Required to pass this category:** at least one of the three must be demonstrated with real evidence (an error message, a `helm history` showing a superseded revision, or a specific metric query) — a capstone that never broke anything on purpose cannot demonstrate it knows how to recover from a break.

## 7. Documentation and Technical Communication — 10 points

*Could someone who's never seen this system understand it and run it from what you wrote?*

| Criterion | Points | Verification |
|---|---:|---|
| An architecture diagram exists in `docs/` and matches what's actually built | 3 | Compare the diagram against `terraform state list` and `kubectl get all` — it should match, not be aspirational |
| At least one runbook exists for a real operational task (e.g., "how to roll back a bad deploy," "what to check when checkout latency alerts fire") | 3 | The runbook is specific enough that someone unfamiliar with the project could follow it without asking you a question |
| At least one real, complete postmortem exists per the blameless format from Lesson 16 (summary, impact, root cause, contributing factor, owned + dated action items) | 4 | Every action item has a named owner and a due date — an action item with neither is incomplete per Lesson 16's own standard |

**Required to pass this category:** the postmortem's action items must have both an owner and a date — this is the exact bar Lesson 16 itself sets ("a postmortem without both is a list of good intentions, not a fix"), so it's enforced here as a hard requirement, not a nice-to-have.

---

## Scoring summary

| Category | Points |
|---|---:|
| Infrastructure automation | 15 |
| Docker and Kubernetes implementation | 20 |
| CI/CD pipeline reliability | 20 |
| Security and secrets management | 15 |
| Observability and incident response | 10 |
| Troubleshooting and recovery | 10 |
| Documentation and technical communication | 10 |
| **Total** | **100** |

**90 points minimum to pass.** Every category also lists what's *required* to pass that category specifically — scoring 90+ overall while completely missing a category's required bar (e.g., no proven rollback) means the project isn't actually done, even if the arithmetic says 90. Treat the required items as hard gates, the point values as how much polish matters once the gate is cleared.

## How to use this rubric

1. Score yourself first, honestly, category by category, with real verification — run the commands, don't just read your own code and assume it works.
2. For anything scored below the maximum, write one sentence: what's missing, and what you'd do about it. That sentence is the actual deliverable for a self-review — the number alone isn't.
3. If you have a study partner, trade projects and score each other's independently before comparing notes.
