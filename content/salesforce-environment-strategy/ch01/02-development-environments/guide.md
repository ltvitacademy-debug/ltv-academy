# Lesson 2 — Development Environments

**Chapter 1 · Environments · Lesson 2 of 14**

## What you'll learn

- What a "development environment" needs to support, as distinct from testing or staging
- The two main choices for where building happens: sandboxes and scratch orgs
- Why development environments are usually the cheapest, fastest, and most disposable tier
- How source control and version control fit into a modern development environment strategy
- Why isolating one builder's work from another's is the main design goal at this tier

## What a development environment is for

A **development environment** is where new configuration and code are actually built — a new object, a new Flow, a new Apex trigger, a new Lightning Web Component. At this stage, nothing needs to look like production yet. What matters is that building here is fast, cheap, and isolated: fast to create and reset, cheap enough that an org can have several running at once, and isolated enough that one developer's half-finished work doesn't block or corrupt another developer's work in progress.

That combination of needs — speed, low cost, isolation — is exactly why development environments sit at the bottom of the promotion path from Lesson 1, and exactly why they're usually metadata-only: a developer building a new validation rule doesn't need 2 million real Account records to do it, and copying that data in would only slow down the one thing this environment needs to be good at, which is turning around quick, iterative changes.

## Two paths: sandboxes and scratch orgs

Salesforce gives architects two different tools for this tier, and choosing between them is one of the more consequential decisions in a development environment strategy:

- A **sandbox** (specifically, a Developer or Developer Pro sandbox — covered in full in Lesson 3) is a long-lived copy of an org's metadata that persists until someone refreshes or deletes it. It behaves like a small, personal, persistent copy of the org.
- A **scratch org** (covered in full in Lesson 4) is a temporary, fully disposable org created from a definition file rather than copied from an existing org. It's built from source, expires automatically, and is meant to be thrown away and recreated constantly.

Neither is strictly "better" — they suit different development styles. A sandbox-centric approach fits teams doing a lot of configuration-heavy, click-based building where it's convenient to have a stable environment that keeps its state between sessions. A scratch-org-centric approach fits teams practicing modern source-driven development, where every environment is reproducible from code in version control and nothing valuable is allowed to exist only inside one throwaway org.

## Isolating one builder from another

The core design problem at the development tier isn't really about data or realism — it's about **isolation**. If two developers both build inside the same sandbox at the same time, their changes land in the same place and can collide: one person's half-built Flow can break the page another person is actively testing. The standard fix is to give each developer (or at most a very small, tightly coordinated pair) their own environment at this tier, whether that's a personal Developer sandbox or a personal scratch org spun up for a specific piece of work and torn down when it's done.

This is also where source control earns its keep. In a source-driven approach, a developer's scratch org is disposable precisely because nothing important lives only inside it — every change of real value gets committed to version control, and the scratch org itself can be deleted and recreated from that source at any time without losing work. That property is much harder to get from a long-lived sandbox, where configuration can accumulate for months without ever being captured anywhere else.

## Where development hands off

Once a change is built and the developer believes it works, it doesn't go straight to production — it moves to the next stage in the promotion path, Testing (Lesson 5), where someone other than the person who built it checks that it actually behaves correctly. Development environments exist to make building fast and safe to experiment in; they are deliberately not where anyone signs off that a change is ready for the business to rely on.

## Key terms

| Term | Meaning |
|---|---|
| Development environment | The first stage in the promotion path, where new configuration and code are actually built |
| Isolation (development tier) | Keeping one builder's in-progress work from colliding with another's |
| Source-driven development | A development style where an environment's true state lives in version control, not only in the org itself |

## Lab

A team of four developers currently shares a single Developer sandbox. Two of them report that Flows they were actively testing kept breaking without them changing anything. Walk through why a shared development environment produces exactly this symptom, and propose a specific change to the team's development-environment setup (how many environments, and of what kind) that would most directly fix it. Justify whether you'd reach for more sandboxes or a scratch-org-based approach, and why.

## Check yourself

Can you explain, in your own words, why development environments are usually metadata-only rather than carrying real data? Can you describe the core difference in philosophy between a sandbox-centric and a scratch-org-centric development approach, and name one team characteristic that would push you toward each?
