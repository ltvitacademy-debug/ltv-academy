# Lesson 2 — Architecture Overview

**Chapter 1 · Design · Lesson 2 of 25**

## What you'll learn

- The difference between a feature list and an architecture, and why Priya insists on the second before any clicking starts
- The specific architectural layers this capstone's platform will have, and what lives in each one
- The non-functional requirements (performance, security, maintainability) Solstice actually cares about
- Why "declarative first, code only where declarative can't reach" is the governing principle for every build decision in this course

## A feature list is not an architecture

The Definition of Done from Lesson 1 is a feature list: ten things the finished org must do. An **architecture** is a different artifact — it's the set of decisions about *how* those features are built, *why* each decision was made over the realistic alternatives, and *how the pieces fit together* so the system still makes sense as it grows past lesson 25. Priya's rule for this capstone, which mirrors how real Salesforce architecture reviews work, is simple: no Setup clicking and no Apex class until the relevant piece of this lesson's architecture is written down and can be defended.

## The layers of this platform

Solstice's service-and-sales platform breaks into four layers, and nearly everything you build in Chapters 1–4 slots into exactly one of them:

| Layer | What lives here | Built in |
|---|---|---|
| **Data layer** | Standard objects (Account, Contact, Opportunity, Asset, Case) plus custom objects for installation and warranty work | Lesson 3 |
| **Access layer** | Org-wide defaults, role hierarchy, sharing rules, profiles, and permission sets | Lesson 4 |
| **Logic layer** | Flow, Apex classes, triggers, and asynchronous jobs that enforce business rules and move data | Chapter 2 |
| **Experience and integration layer** | Lightning Web Components and the outbound REST callout to Solstice's manufacturer warranty partner | Chapter 3 |

Reports, dashboards, deployment, and documentation in Chapter 4 aren't a fifth layer — they're how the first four layers get measured, shipped, and explained.

## The governing principle: declarative first

Every lesson in this capstone that involves a design decision comes back to one rule: **use the simplest tool that reliably does the job, and reach for code only when declarative tools genuinely can't.** Concretely, for this platform that means:

- Record-triggered Flow (Lesson 6) handles the Case-to-Installation-Job automation, because it's a conditional record-creation workflow declarative tooling handles well — not a reason to write a trigger just because you can.
- Apex triggers (Lesson 9) are reserved for the one piece of logic Flow genuinely struggles with here: validating a warranty claim amount against a service contract's coverage limit at scale, with full control over bulk behavior and a guaranteed, testable order of operations.
- A REST callout (Lesson 14) is code by necessity — Flow *can* make HTTP callouts too, but this capstone deliberately builds it in Apex so you practice the governor-limit-aware callout patterns (Named Credentials, async callouts from trigger context) a real integration developer needs.

This isn't a stylistic preference. Salesforce's own platform guidance treats unnecessary custom code as a maintenance liability — every Apex class is something a future developer has to read, test, and keep working across API version upgrades, where a Flow is visible and editable by an admin with no code background. The architecture decisions you write down in this chapter exist to make that trade-off explicit, lesson by lesson, instead of defaulting to code everywhere.

## Non-functional requirements

Beyond the feature list, Renata and Priya have named three qualities the finished platform has to have, and you'll be evaluated against all three starting in Chapter 4:

- **Performance.** The warranty-claim trigger (Lesson 9) has to behave correctly when a data load inserts hundreds of Cases at once, not just one at a time in the UI — this is why Lesson 20 is a dedicated performance review.
- **Security.** Four different user types (sales reps, service agents, technicians, managers) see different slices of the same data, enforced at the platform level, not by convention or by hiding buttons.
- **Maintainability.** Every trigger uses a handler class, every Apex class has a test class, and the whole project lives in version control so a second developer could pick it up without you in the room.

## Key terms

| Term | Meaning |
|---|---|
| Architecture | The set of decisions about how a system's pieces are built and connected, and why, beyond just what it does |
| Data layer / Access layer / Logic layer / Experience & integration layer | The four architectural layers this platform is organized into |
| Declarative first | The governing principle: use Flow and configuration by default, reach for Apex only where declarative tools can't reliably do the job |
| Non-functional requirement | A quality the system must have (performance, security, maintainability) rather than a feature it must do |

## Lab

Write a one-page "Architecture Decision Record" (you'll write more of these in Lesson 21) for exactly one decision: why the Case-to-Installation-Job automation belongs in Flow and not in an Apex trigger. State the decision, the alternative you rejected, and the specific reason — tie it back to the declarative-first principle above.

## Check yourself

- Name the four architectural layers of this platform and give one example of what lives in each.
- What is this capstone's rule for deciding between Flow and Apex for a given piece of logic?
- Name the three non-functional requirements Solstice cares about, and why each one matters for this specific platform.
