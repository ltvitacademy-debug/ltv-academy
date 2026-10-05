# Lesson 1 — What Governance Architecture Is

**Chapter 1 · Governance Architecture Foundations · Lesson 1 of 30**

## What you'll learn

- The difference between data governance itself and governance architecture, specifically
- The three layers every governance architecture has to provide: metadata, policy/enforcement, integration
- How governance architecture relates to enterprise and security architecture
- How this course builds on Data Governance Foundations Lessons 10-12, and where it goes further

## Governance and governance architecture are two different questions

Data Governance Foundations covered governance itself: the decisions, the roles, the policies, and — in Lessons 10 through 12 — the operating models that decide who holds authority and where. This course picks up a different, more technical question: once an organization has decided *what* it wants to govern and *who* holds the authority, how does it actually build the systems that make those decisions real, day to day, across dozens or hundreds of platforms? That's governance architecture.

Governance is the decision: "business-unit data owners decide local classification; a central council sets enterprise-wide definitions." Governance architecture is the system that makes that decision actually happen: where do those definitions live, what enforces them, how does a change propagate, and how does a new platform get connected without rebuilding everything from scratch.

## The three layers every governance architecture provides

Regardless of the specific platforms involved, every real governance architecture has to provide three things:

1. **A metadata and catalog layer.** Somewhere, a system of record holds what data exists, what it means, where it came from, and who's responsible for it. Chapter 3 goes deep on this layer specifically.
2. **A policy and enforcement layer.** A rule written in a policy document is not the same thing as a rule a system actually enforces. This layer turns "sensitive fields require manager approval to access" into a running, automated control. Chapter 4 covers this.
3. **An integration layer.** Real organizations run dozens of platforms — warehouses, lakes, SaaS tools, BI tools. Something has to connect them so metadata, policy, and lineage aren't each reinvented per platform.

## Where governance architecture sits

Governance architecture is a specialized domain inside enterprise and data architecture — the same way security architecture is a specialized domain, not a separate discipline bolted on afterward. It doesn't replace the operating-model decisions from Foundations Lessons 10-12; it implements them. A federated operating model and a centralized operating model both still need a metadata layer, a policy layer, and an integration layer — but, as Chapter 2 of this course covers in architectural depth, they need very different versions of each.

## Where this course goes

This chapter stays foundational: what governance architecture is, the principles that guide good designs (Lesson 2), the reusable patterns called reference architectures (Lesson 3), a capability map you can use to audit any organization's governance systems (Lesson 4), and the bridge between operating model and architecture (Lesson 5). Chapter 2 revisits the operating models from Foundations — centralized, federated, decentralized, and the newer data-mesh pattern — but architecturally: what each one actually looks like as a system, not just as an org chart. Chapters 3 through 6 go deep on metadata/catalog architecture, security/platform architecture, governance strategy, and applied case studies.

## Key terms

| Term | Meaning |
|---|---|
| Governance architecture | The systems and structural design that implement governance decisions |
| Metadata and catalog layer | The system of record for what data exists, means, and traces to |
| Policy and enforcement layer | The layer that turns a written rule into a running, automated control |
| Integration layer | What connects catalogs, policy engines, and platforms to each other |

## Lab

Pick one governance rule your organization (or one you know) actually has written down somewhere — a policy, a standard, anything. Trace it: is there a system that actually enforces it today, or does it rely entirely on people remembering to follow it? Write two or three sentences on what you found.

## Check yourself

Can you state, in one sentence, the difference between data governance and governance architecture — and name the three layers every governance architecture has to provide?
