# Quarterly Updates and Release Management

**Chapter 2 · Oracle Fusion Cloud Applications · Lesson 10 of 20**

Lesson 7 said Oracle controls the update schedule in the SaaS model. This lesson makes that concrete: Oracle Fusion Cloud is updated on a fixed quarterly cadence, every customer gets the same update, and understanding how that cadence works is something every Financials consultant is expected to know cold.

## What you'll learn

- Oracle's quarterly release naming convention
- How the update "cohort" schedule staggers who gets updated when
- Why non-production gets the update before production
- What "opt-in" features mean, and why they matter to a consultant

## The release naming convention

Oracle names each quarterly release using the last two digits of the calendar year plus a letter, A through D, for which quarter it is. The first release of 2026 is **26A**, the second is **26B**, the third is **26C**, and the fourth is **26D**. Four updates land every year, keeping every customer on a recent version — there is no multi-year "upgrade project" the way there often is with on-premises software.

## Cohorts: a staggered rollout

Not every customer is updated on the exact same calendar day. Oracle assigns customers to a **cohort** — A, B, or C — which determines which month within the quarter they receive the update. As an example of the pattern: Cohort A customers might be updated in February, May, August, and November; Cohort B in March, June, September, and December; Cohort C in April, July, October, and January. This staggering lets Oracle roll out a release gradually and catch any issues with earlier cohorts before later ones are updated — and it gives implementation teams a predictable calendar to plan testing around.

## Non-production first, then production

Within a customer's own environments (Lesson 9), the **non-production (test) environment is updated first**, typically a few weeks before production. That gap is deliberate: it gives the customer's functional team time to review what changed, test their critical business processes against the new version, and decide how to handle any new **opt-in features** before the same update reaches production and real users.

## Opt-in features

Not everything in a quarterly update turns on automatically. Oracle frequently ships new functionality as **opt-in** — available, but switched off until a customer deliberately turns it on in Setup and Maintenance (Lesson 18). This protects customers from an update unexpectedly changing how their business runs. Reviewing the "What's New" readiness documentation Oracle publishes before each release, and deciding which opt-in features to turn on, is a real, recurring task for a Financials functional consultant — not a one-time thing you do during implementation and never again.

## Why this matters

A consultant who ignores the quarterly update cycle gets blindsided: a screen looks different, a setting has moved, or a new validation suddenly applies, and nobody on the team saw it coming because no one reviewed that quarter's readiness notes. A consultant who takes it seriously builds a habit: read what's changing, test it in non-production, decide on opt-ins, and communicate it to the business before production updates.

## Key terms

| Term | Meaning |
|---|---|
| Quarterly release | Oracle's update cadence, named YYA/YYB/YYC/YYD for each year's four quarters |
| Cohort | A/B/C grouping that determines which month within the quarter a customer is updated |
| Opt-in feature | New functionality shipped turned off, enabled deliberately by the customer |
| Readiness documentation | Oracle's published "What's New" notes for each quarterly release |

## Check yourself

You're ready for Lesson 11 when you can explain why non-production is updated before production, what an opt-in feature is and why it exists, and why a consultant needs to read Oracle's readiness notes every quarter rather than just once during implementation.
