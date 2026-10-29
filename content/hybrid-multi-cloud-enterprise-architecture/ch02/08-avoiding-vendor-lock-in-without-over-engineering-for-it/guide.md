# Lesson 8 — Avoiding Vendor Lock-In Without Over-Engineering for It

**Chapter 2 · Multi-Cloud Strategy · Lesson 4 of 4**

## What you'll learn

- A pragmatic framework for deciding when portability is worth
  building, and when it's just insurance you're paying for twice
- Why favoring Kubernetes and Terraform for portability is usually
  cheap, while custom abstraction layers usually aren't
- How to recognize lock-in you've accepted on purpose, which is a
  very different thing from lock-in nobody ever thought about

## Reframing the goal: not "zero lock-in," but "priced lock-in"

Lesson 5 named the vague fear of lock-in as a bad reason to go
multi-cloud. The same fear, redirected inward, produces a second
mistake: building elaborate custom abstraction layers on top of every
cloud service "just in case" the organization ever needs to switch
providers — even when nobody has named a specific trigger for that
switch. The honest goal isn't eliminating lock-in everywhere. It's
knowing exactly where you have it, why, and whether that was a
deliberate trade you made for something valuable, or an accident
nobody evaluated.

## Favor portability where it's genuinely cheap

Some portable patterns cost you almost nothing extra to adopt,
because you'd want them for other reasons anyway, and they happen to
also keep a path open to another provider:

- **Kubernetes for compute.** A containerized workload running on
  Kubernetes behaves close to the same way whether the control plane
  is AKS, EKS, or GKE. You weren't going to avoid containerizing the
  workload anyway — containers are good practice independent of
  multi-cloud — so the portability is close to a side effect, not an
  extra cost center. Lesson 9 goes deep on exactly how far this
  portability really extends and where it quietly stops.
- **Terraform for infrastructure-as-code.** Even though a Terraform
  module written for `azurerm` doesn't run unmodified against AWS,
  the *skill* and the *workflow* — declarative resources, state,
  plan/apply, modules — transfer directly. A team fluent in Terraform
  against one cloud can get productive on a second cloud's provider
  far faster than a team that only knows that provider's native
  IaC tool. You were going to use Terraform anyway (Chapter 1
  covered why); the portability of the skill is a bonus, not a
  separate investment.
- **Standard protocols and open data formats**, where they genuinely
  fit the workload: PostgreSQL-compatible managed databases, standard
  message formats, open container images. These keep a door open
  without costing meaningfully more than the proprietary alternative
  in most cases.

## Don't over-engineer for a risk that may never materialize

Contrast that with the pattern that quietly wastes enormous amounts
of engineering time: building a custom internal abstraction layer
over every cloud service your organization touches — a homegrown
wrapper around storage, around queuing, around managed databases —
so that, hypothetically, someday, you could swap providers under it
without rewriting application code.

This sounds responsible. In practice, it almost always costs more
than it protects against, for a few concrete reasons. The abstraction
has to be maintained forever, by your own team, instead of by the
cloud provider. It almost never covers 100% of what the underlying
service does, so teams end up working around the abstraction anyway
the moment they need a provider-specific feature, which defeats the
point. And it slows down every single feature built on top of it,
permanently, in exchange for protecting against a switch that, for
most organizations, never actually happens — because by the time a
real reason to switch shows up (Lesson 5's actual drivers), it's
usually workload-specific and migration-planned, not a flip of a
config flag the abstraction layer was supposedly standing by for.

## Lock-in you choose on purpose is fine

The pragmatic version of this lesson isn't "never accept lock-in."
Plenty of managed services are worth the lock-in: a fully-managed
database service that eliminates real operational burden, a managed
identity platform, a provider-native serverless offering that removes
infrastructure management entirely. Accepting that lock-in
**consciously**, because the operational savings are real and
documented, is a sound architectural decision. The failure mode this
lesson is actually warning against isn't lock-in itself — it's
lock-in nobody ever evaluated, sitting next to an abstraction layer
nobody needed, both unexamined, both costing the organization in
opposite directions at once.

## A working rule of thumb

Adopt a portable pattern when you'd want it anyway for reasons that
have nothing to do with multi-cloud (Kubernetes, Terraform, open
data formats). Accept a proprietary, locked-in service deliberately
when its operational savings are real and documented. Build a custom
abstraction layer only when a specific, named migration is already
planned — never speculatively, against a risk nobody has quantified.

## Key terms

| Term | Meaning |
|---|---|
| Priced lock-in | Vendor dependence that was identified, evaluated, and accepted on purpose because the trade-off was worth it |
| Portability side effect | Portability gained "for free" from a pattern (Kubernetes, Terraform) you'd adopt anyway for other reasons |
| Speculative abstraction layer | A custom wrapper built over cloud services against a migration that was never actually planned, costing ongoing maintenance for a risk that may never materialize |

## Check yourself

You're ready for Chapter 3 when you can explain why Kubernetes and
Terraform are cheap portability bets but a custom abstraction layer
over every managed service usually isn't, and when you can state, for
any given managed service in your own architecture, whether its
lock-in was accepted on purpose or never actually evaluated.
