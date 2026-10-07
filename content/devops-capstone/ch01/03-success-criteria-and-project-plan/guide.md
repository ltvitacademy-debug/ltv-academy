# Success Criteria & Project Plan

You now have the brief, the architecture, and the repository structure. Before you touch a single file, it's worth answering a question that's easy to skip and expensive to skip wrong: what does "done" actually mean for this capstone? This lesson defines a concrete checklist for done, and lays out the realistic four-phase project plan you'll follow for the rest of the course.

## What you'll learn

- A concrete, checkable definition of "done" for the Northbridge Retail capstone
- Why each item on that checklist exists, not just what it is
- The four-phase project plan and what ships at the end of each phase
- How the three story beats threaded through this course map onto the plan

## Defining "done"

A capstone without a clear finish line turns into endless polishing. Here's the checklist you're building toward — by the end of Chapter 5, every box should be checked for both `product-catalog` and `checkout`:

- [ ] **Containerized** — both services have a working Dockerfile and run correctly in a local multi-service environment via Docker Compose
- [ ] **Infrastructure provisioned as code** — all Azure resources (resource groups, VNets, AKS clusters, ACR, Postgres, Key Vault) exist only because Terraform created them, with state stored remotely and locked
- [ ] **CI/CD automated end to end** — a merge to `main` reaches the `northbridge-dev` namespace with no manual steps, and a tag reaches staging and then production through the promotion and approval gates from Lesson 2
- [ ] **Monitored with alerting** — Grafana dashboards exist for both services using the RED method, and Alertmanager routes real alerts (including a defined SLO for checkout) to an on-call channel
- [ ] **Security-scanned** — Trivy, gitleaks, and Checkov are wired into CI and actually block a bad merge, not just report on one
- [ ] **Documented** — an architecture diagram, runbooks, and at least one postmortem exist in `docs/`, and you can present the whole system to someone who's never seen it

That checklist is also the rubric: if you can walk through it item by item and point at the thing that satisfies each line, the capstone is done. If you're explaining why an item is "mostly done" or "done except for," it isn't done yet.

## The four-phase project plan

```
Phase 1 — Application & Containers        (Chapter 2)
  The sample application, Dockerfiles, local multi-service Compose setup.

Phase 2 — Infrastructure                   (Chapter 3)
  Terraform for Azure: resource groups, VNets, AKS, ACR, Postgres, Key Vault.
  Lesson 7's worked example: a state-locking collision when two engineers
  apply at once — the reason remote state + locking exists.

Phase 3 — Pipeline & Deployment            (Chapter 4)
  CI pipeline, automatic deploy to dev, promotion to staging + prod with
  the manual approval gate, a live push-to-production demo.

Phase 4 — Monitoring & Security            (Chapter 5)
  Grafana dashboards + alerting, Trivy/gitleaks/Checkov wired into CI
  (catches a near-miss PaymentPro key committed to a Helm values file),
  an incident drill replaying the flash-sale checkout latency incident,
  final documentation and presentation.
```

Each phase builds strictly on the one before it — you can't automate a deploy in Phase 3 to infrastructure that doesn't exist yet from Phase 2, and you can't meaningfully monitor a pipeline in Phase 4 that isn't deploying anything in Phase 3. That ordering is deliberate, and it mirrors how a real team would sequence this work.

Two of the three story beats threaded through this course live inside that plan rather than being abstract warnings: the Terraform state collision is the motivating incident for Lesson 7, and the near-miss secrets leak is the worked example for Lesson 15's security scanning. The third — the flash-sale checkout latency incident — already happened once in the "Monitoring, Logging & Observability" course earlier in this path; here, in Lesson 16, you'll re-run it as a tabletop drill against the infrastructure you've just built, diagnose it with your own monitoring stack, and write the blameless postmortem.

## Key terms

- **Definition of done** — the fixed checklist (containerized, IaC-provisioned, CI/CD automated, monitored, security-scanned, documented) that marks the capstone complete
- **RED method** — the dashboard pattern (rate, errors, duration) used for monitoring both services
- **Blameless postmortem** — a write-up of an incident focused on system and process fixes, not individual blame
- **Four-phase plan** — Application & Containers → Infrastructure → Pipeline & Deployment → Monitoring & Security
