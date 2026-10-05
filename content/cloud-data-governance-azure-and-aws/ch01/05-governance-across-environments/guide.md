# Lesson 5 — Governance Across Environments

**Chapter 1 · Cloud Governance Architecture · Lesson 5 of 25**

## What you'll learn

- Why dev, test, and prod environments need different governance intensity, not different governance principles
- What "policy drift" is, and the two most common ways it happens
- How Azure Policy and AWS Config function as drift-detection mechanisms (a preview of Chapter 4)
- A closing checklist that ties Chapter 1's four lessons together

## Same principles, different intensity

Every environment — sandbox, dev, test, staging, production — should inherit from the same landing-zone pattern covered in Lesson 4. What legitimately differs between them is intensity, not whether governance applies at all:

- **Sandbox/dev** — looser restrictions on what resources can be created, but still no exception for encryption, still no exception for public network exposure of real data. Loosened restrictions apply to convenience features, not to the core security guardrails.
- **Test/staging** — governance should mirror production as closely as practical, specifically because staging's entire purpose is catching problems before they reach production. A staging environment with looser access control than production doesn't actually test anything meaningful about production readiness.
- **Production** — the tightest controls: least-privilege access, mandatory encryption, full audit logging, change approval workflows.

A common and costly mistake is treating "non-production" as a synonym for "ungoverned." Real customer data regularly ends up in dev or test environments — through database copies for testing, through debugging sessions, through sample exports — and a dev environment with weak access control around that data is just as much a breach as if it happened in production.

## What policy drift is, and how it happens

**Policy drift** is what happens when the governance controls a resource was *supposed* to have, based on its position in the hierarchy, silently stop matching what's actually configured. It happens two ways:

1. **Manual override drift** — someone with sufficient permissions makes a one-off change directly (loosens a network rule to debug something, disables an alert that was "too noisy") and never reverts it.
2. **Policy gap drift** — a new resource type or new deployment pattern appears that existing policy assignments simply didn't anticipate, so it deploys compliant with the letter of policy while violating its intent.

Both are the same underlying problem: the governance that's supposed to apply, based on hierarchy, and the governance that's actually in force have quietly diverged.

## How both clouds detect this (previewed here, covered fully in Chapter 4)

**Azure Policy** continuously evaluates resources against assigned policy definitions and reports **compliance state** — not just at creation time, but on an ongoing basis, so a resource that drifts out of compliance after deployment gets flagged, not just one that was created wrong. **AWS Config** does the equivalent job: it records configuration changes over time and evaluates them against **Config rules**, flagging resources that have drifted out of their expected configuration. Neither tool prevents drift by itself — Lesson 18 and 19 cover the preventive side (Azure Policy's deny effects, AWS Organizations' service control policies) — but both make drift *visible*, which is the precondition for fixing it.

## Closing Chapter 1

This chapter built the architecture this course assumes from here forward: cloud governance means applying familiar governance principles to a shared-responsibility, API-driven environment (Lesson 1); the provider/customer responsibility split never fully transfers data-governance decisions away from the customer (Lesson 2); governance attaches to a nested hierarchy of management groups/subscriptions and OUs/accounts (Lesson 3); landing zones bake that hierarchy's guardrails in from day one (Lesson 4); and that governance has to hold consistently across every environment, continuously, not just at creation time (this lesson). Chapter 2 builds the identity layer this architecture depends on.

## Key terms

| Term | Meaning |
|---|---|
| Policy drift | When a resource's actual configuration diverges from what governance policy says it should be |
| Manual override drift | Drift caused by a direct, unreverted one-off change to a resource's configuration |
| Policy gap drift | Drift caused by policy that doesn't yet cover a new resource type or deployment pattern |
| Compliance state (Azure Policy) / Config rule (AWS Config) | The mechanisms each cloud uses to continuously evaluate and report whether a resource matches its expected configuration |

## Lab

Think of (or imagine) a dev or test environment you've worked with. Write down one specific way governance was looser there than in production, and assess honestly: was that looseness applied to convenience (faster provisioning, relaxed naming conventions) or to something that actually protects data (encryption, access control, network exposure)? If it was the latter, that's drift worth flagging.

## Check yourself

Can you explain, in your own words, the difference between manual override drift and policy gap drift, and why "non-production" should never be treated as a synonym for "ungoverned"?
