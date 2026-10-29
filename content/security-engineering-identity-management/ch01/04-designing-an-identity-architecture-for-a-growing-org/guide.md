# Lesson 4 — Designing an Identity Architecture for a Growing Org

**Chapter 1 · Identity Architecture at Enterprise Scale · Lesson 4 of 4**

## What you'll learn

- The real architecture decisions that change as an organization scales: single IdP vs.
  federated multiple IdPs, how many identity sources feed in, and how SSO scales as app count
  grows
- Why an acquisition is usually the event that forces the single-IdP-vs-federation decision
- A worked example walking identity architecture from 50 employees to 5,000
- How this chapter's identity foundation sets up Chapter 2's password policy work

## Starting simple: one IdP, a handful of apps

At around 50 employees, one identity provider is enough. A single Entra ID tenant or Okta org
covers the whole company, the directory might still be managed by hand, and only a small number
of SaaS apps are connected — through SAML or OIDC, as covered in Lesson 3. SSO at this scale is
a convenience: it saves people from juggling passwords, but the business doesn't yet depend on
it the way it will later.

## Scaling up: SSO becomes mandatory, provisioning becomes automated

By a few hundred employees, that convenience becomes a requirement. Dozens of connected apps
make manual account creation and removal a real risk — an employee who leaves the company but
keeps access to an app nobody remembered to offboard. **SCIM-based provisioning** solves that by
automating account creation, updates, and removal directly from the IdP to every connected app.
At this stage, the **HR system** usually becomes the real source of truth: it's the system that
actually knows when someone joins, changes roles, or leaves, and it feeds that data into the IdP
automatically instead of someone updating accounts by hand. Conditional Access and MFA policies
also need to apply consistently across every app now, not as a one-off setting on whichever app
got configured first.

## The acquisition moment: single IdP vs. federation

Growth to around 5,000 employees, especially through acquisition, forces the hardest identity
decision in this chapter. The acquired company doesn't arrive with nothing — it brings its own
identity source: its own Okta tenant, its own Entra ID tenant, or its own on-premises Active
Directory forest, each with its own users, apps, and policies already in place. The real
decision is whether to **consolidate** everyone into a single IdP, or **federate** the two IdPs
— establishing a trust relationship between them — while migration happens gradually over time.

## Worked example: the decision in practice

A 5,000-person company acquires a 200-person company running its own Okta tenant with 30
connected apps. Consolidating immediately means migrating all 200 users, re-connecting all 30
apps, and retraining everyone's sign-in habits in one disruptive push — fast to finish, hard on
the people living through it. Federating means setting up a trust relationship between the two
Okta tenants so users can keep working during a slower, staged migration — easier on people, but
it means running two identity planes at once, with two sets of Conditional Access policies to
keep aligned, for however long the migration takes. Neither option is free; the real job is
weighing app count, compliance and data-residency requirements, and timeline pressure, and
picking the cost the organization can actually absorb.

## Key terms

| Term | Meaning |
|---|---|
| Single IdP | One identity provider as the sole source of truth for the organization |
| Federated identity | A trust relationship between two IdPs, used when consolidating into one isn't immediate or practical |
| SCIM provisioning | Automated, standards-based account creation, update, and removal pushed from the IdP to connected apps |
| Source of truth | The authoritative system — often HR — that feeds identity data into the IdP |

## Check yourself

Given a 5,000-person company absorbing a 200-person acquisition with its own Okta tenant, what's
the first architecture decision you'd need to make, and what would you need to know to make it
well?

## Chapter 1 complete

That closes Chapter 1 — Identity Architecture at Enterprise Scale. You've gone from what changes
in the move from SOC analyst to security engineer, through what an identity provider and the
identity plane actually are, through how SAML and OIDC really carry a sign-in decision, to the
real architecture trade-offs a growing org has to make. Chapter 2 starts applying that
foundation directly, with **Password Policy Engineering Beyond the Basics**.
