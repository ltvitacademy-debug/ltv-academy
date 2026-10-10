# Lesson 9 — Enterprise Architecture Frameworks Overview

**Chapter 2 · Enterprise Concerns · Lesson 9 of 22**

## What you'll learn

- Why general enterprise architecture frameworks exist, and what problem they're trying to solve
- A high-level sense of TOGAF and the Zachman Framework as the two most widely cited general EA frameworks
- Salesforce's own Well-Architected framework, including its current five pillars
- How to use a framework as a checklist for completeness, not as a rulebook to follow blindly

## Why frameworks exist at all

An enterprise architecture framework is a structured way of making sure an architecture effort doesn't quietly skip something important. Left unstructured, it's easy for an architecture review to spend all its attention on the exciting technical problem in front of it and forget to ask about data governance, or security, or how the design will be operated once it's live. Frameworks exist to counter that by giving architects a checklist of categories to work through — not because every category matters equally in every situation, but because skipping one by accident, rather than by a deliberate decision, is exactly the kind of mistake a framework is meant to catch.

## Two general-purpose frameworks worth knowing by name

Two frameworks come up repeatedly in enterprise architecture conversations, independent of any specific vendor:

- **TOGAF (The Open Group Architecture Framework).** A widely adopted general-purpose EA framework built around a repeatable process (the Architecture Development Method) for moving from business strategy through to implemented technology, with defined architecture domains at each stage.
- **The Zachman Framework.** An older, matrix-style framework that classifies architecture artifacts along two axes: different perspectives (such as planner, owner, designer, builder) and different questions (what, how, where, who, when, why), producing a structured way to make sure every perspective has considered every question.

Neither framework is Salesforce-specific, and a System Architect isn't expected to become a certified TOGAF practitioner. What matters is recognizing the pattern both frameworks share: force a structured pass across multiple dimensions of the problem, so nothing important gets skipped by accident.

## Salesforce's own framework: Well-Architected

Salesforce publishes its own architecture framework, called **Well-Architected**, aimed specifically at evaluating Salesforce solutions. Salesforce has described this framework as having gone through a revision: an earlier version was organized around three qualities — Trusted, Easy, and Adaptable — while the current version organizes around five pillars: **Trust** (protecting people, data, and systems through secure, compliant design), **Reliability** (systems that keep working and recover well when something fails), **Operational Excellence** (observing, automating, and improving how systems run), **Resource and Cost Optimization** (spending in a way that maximizes long-term business value), and **Fairness** (transparency, accessibility, and equity in how a solution behaves). Salesforce frames these pillars as being in tension with one another by design — increasing reliability may require more resources, and stronger controls may add complexity — so the framework's value is in forcing an explicit, visible trade-off conversation rather than pretending all five pillars can always be maximized simultaneously.

## A checklist, not a rulebook

The right way to use any of these frameworks — TOGAF, Zachman, or Salesforce's Well-Architected — is as a completeness check against your own architecture work, not as a rigid sequence of steps you're graded on following exactly. A System Architect reviewing a proposed solution can ask, pillar by pillar or domain by domain, "did we actually think about this," without needing the full ceremony of a formal TOGAF engagement. The value is in the coverage, not the paperwork.

## Key terms

| Term | Meaning |
|---|---|
| TOGAF | A widely adopted general-purpose enterprise architecture framework built around a repeatable development method |
| Zachman Framework | A matrix-style framework classifying architecture artifacts by perspective and by question (what/how/where/who/when/why) |
| Salesforce Well-Architected | Salesforce's own framework for evaluating Salesforce solutions, currently organized around five pillars |
| Trust (Well-Architected pillar) | Protecting people, data, and systems through secure, compliant design |
| Reliability (Well-Architected pillar) | Designing systems that keep working and recover well when something fails |

## Lab

Take a Salesforce solution design you're familiar with, or invent a plausible one (for example, a new approval process for discount requests). Walk it through Salesforce's five Well-Architected pillars one at a time — Trust, Reliability, Operational Excellence, Resource and Cost Optimization, Fairness — and write one sentence per pillar on whether the design as described actually addresses that pillar, or leaves it unconsidered. Note any pillar where strengthening it would clearly trade off against another pillar.

## Check yourself

Can you name Salesforce Well-Architected's current five pillars? Can you explain, in your own words, why a framework like this is meant to be used as a completeness checklist rather than a rulebook with a single right answer?

Sources: [Salesforce Well-Architected overview](https://architect.salesforce.com/well-architected/overview), [New Well-Architected framework](https://www.salesforce.com/blog/new-well-architected-framework/)
