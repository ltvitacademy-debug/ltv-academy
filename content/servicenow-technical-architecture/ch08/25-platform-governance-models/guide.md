# Lesson 25 — Platform Governance Models

**Chapter 8 · Governance & Multi-Department Implementation Strategy · Lesson 25 of 32**

## What you'll learn

- The real choice behind "who gets to change the platform": centralized governance versus federated governance
- Why centralized governance produces consistency but can become the thing that slows the platform down as the organization grows
- Why federated governance moves faster but can silently reproduce the duplicate-integration and inconsistent-convention problems earlier chapters warned about
- The specific guardrails that make federated governance survivable at enterprise scale
- How to recognize, on a real instance, which model is actually in place today — whether anyone chose it on purpose or not

## Recap: this is the alternative to Domain Separation

Chapter 2's Domain Separation lesson ended on a promise: most organizations with multiple departments don't have a genuine data-separation requirement — they have a governance problem, and Domain Separation is the wrong, expensive tool for solving it. This lesson is the real alternative it pointed to. Instead of walling departments off from each other inside the data model, a Technical Architect governs how those departments are allowed to change the shared platform they all sit on top of. That's a process and ownership decision, not a `sys_domain` decision, and it doesn't carry Domain Separation's permanent tax on every future script and report.

## Centralized governance: one team, every change

Under **centralized governance**, a single platform team reviews and releases every change — every Business Rule, every Catalog Item, every integration — before it reaches production, regardless of which department requested it. The honest upside is real: one team enforces one naming convention, one set of coding standards, and one view of the full integration inventory Chapter 4 described, so duplicate integrations and conflicting customizations are far less likely. The honest downside is just as real: as the organization adds departments, every one of their requests queues behind the same small team. A platform that started out fast gets slower exactly as demand for it grows, and "waiting on the platform team" becomes the thing business stakeholders complain about in Lesson 27's conversations.

## Federated governance: autonomy inside guardrails

Under **federated governance**, individual departments build and release their own changes inside established guardrails, without routing every change through central approval first. Delivery speed is the real win — a department doesn't wait in a shared queue to ship something only it needs. The real risk is consistency: without something holding the line, federated teams independently rebuild integrations to the same external system, invent their own role-naming conventions that contradict each other, and drift away from the shared component patterns a Technical Architect spent earlier chapters establishing.

## The guardrails that make federation survivable

Federated governance only works when a Technical Architect actively maintains a small set of real guardrails, not a policy document nobody reads:

- **Naming conventions**, enforced consistently enough that two departments' tables, roles, and fields are recognizable at a glance as belonging to the same instance.
- **Mandatory code review standards**, so a department's own developer still has their work checked against platform-wide practice before it ships — autonomy to release, not autonomy to skip review.
- **A shared component library**, so departments building similar capabilities (approval workflows, request forms, notification patterns) reuse the same vetted building blocks instead of each inventing its own.

Without these, federated governance isn't actually governance — it's just no governance, with extra departments.

## Key terms

| Term | Meaning |
|---|---|
| Centralized governance | One platform team reviews and releases every change across the organization before production |
| Federated governance | Departments build and release changes independently, inside established guardrails, without per-change central approval |
| Guardrail | A maintained standard (naming, code review, shared components) that keeps federated autonomy from producing inconsistency |
| Governance model | The deliberate choice of who approves platform changes and how — a process decision, not a data-separation decision |

## Check yourself

A fast-growing organization's single platform team has a six-week backlog of department change requests. Would you recommend moving toward centralized or federated governance here — and what guardrail would you put in place first, before loosening approval at all?
