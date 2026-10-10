# Lesson 14 — Enterprise Sharing Architecture

**Chapter 3 · Sharing Architecture · Lesson 14 of 24**

## What you'll learn

- Why "enterprise sharing architecture" is a different discipline from knowing each sharing feature individually
- The layered mental model an architect uses to reason about any sharing design: floor, baseline grant, exceptions, carve-outs
- How to decide which of the Chapter 1–2 mechanisms is the right tool for a given requirement
- Why maintainability and explainability are first-class design goals, not afterthoughts
- What a review board actually probes when it examines a sharing design

## From feature knowledge to architecture

Chapters 1 and 2 covered every individual mechanism Salesforce gives you to control record visibility: organization-wide defaults, role hierarchy, sharing rules, teams, manual sharing, public groups and queues, Apex managed sharing, sharing reasons, sharing sets, territory management, implicit sharing, and restriction/scoping rules. Knowing what each one does is necessary but not sufficient. **Enterprise sharing architecture** is the discipline of combining those mechanisms into a single, coherent design for a real org — one with dozens of objects, thousands of users, millions of records, and a business that keeps changing its mind about who should see what. The skill being tested is not "can you configure a sharing rule" but "given this business requirement, which combination of mechanisms produces the simplest design that's still correct, performs at scale, and survives being handed to someone else in two years."

## The layered model

Every sharing design, no matter how complex, decomposes into four layers, each answering a different question:

- **The floor (OWD).** What's the absolute minimum anyone can see without any additional grant? This is set once per object and rarely revisited — changing it later is expensive because every other layer was built assuming it.
- **The baseline grant (role hierarchy, territory hierarchy).** Who gets broad, structural access because of where they sit in the organization? This should track the shape of real accountability — a regional manager needs to see their region's records because they're accountable for the region, not because of an arbitrary rule.
- **The exceptions (sharing rules, teams, sharing sets, Apex managed sharing).** Who needs access that doesn't follow the baseline — a cross-functional reviewer, a deal team, a support agent on a specific case? Each exception should map to a specific, nameable business reason.
- **The carve-outs (restriction rules).** Is there a narrow slice of records that needs to be *hidden* even from people the baseline and exceptions would otherwise show it to? This layer is used sparingly — it's the one mechanism that subtracts rather than adds, and a design leaning on it heavily is often a sign the baseline was set wrong.

A design review board reads a sharing architecture top-down through these four layers before looking at a single screenshot of Setup. If an architect can't explain which layer a given sharing rule belongs to and why it isn't handled one layer up, that's the first thing that gets probed.

## Choosing the right mechanism

The most common design mistake is reaching for the most flexible tool (Apex managed sharing) when a declarative one (a sharing rule, a public group, a role hierarchy adjustment) would do the job with far less long-term cost. A useful ordering, from cheapest-to-maintain to most expensive:

1. **Adjust the role hierarchy or OWD** if the requirement is structural and permanent.
2. **A declarative sharing rule** (owner-based or criteria-based) if the requirement is "this group of users needs access to this group of records," and the grouping can be expressed with roles, territories, or public groups.
3. **A team (Account/Opportunity/Case) or a public group** if the requirement is about flexible, per-record collaboration membership that changes often.
4. **Manual sharing** only for genuine one-off exceptions that don't scale and shouldn't be automated.
5. **Apex managed sharing** only when the sharing logic depends on conditions no declarative tool can express — and even then, isolated in a small, well-tested set of classes, because every row it writes still has to be recalculated and maintained like any other sharing row.

Reaching for Apex first is the architectural equivalent of writing a trigger when a validation rule would do — it works, but it's harder to read, harder to debug, and it couples visibility logic to deployable code that someone eventually has to maintain without the original context.

## Explainability as a design goal

An enterprise sharing design has to survive contact with people who didn't build it: new admins, auditors, support engineers debugging an access complaint, and a CTA review board. The practical test is whether every grant in the design can be traced back to a one-sentence business justification — "Regional Sales Managers see their region's Opportunities because they own the regional forecast" — rather than "it's been like that since 2019 and nobody wants to touch it." A design with twelve criteria-based sharing rules on the same object, each handling a slightly different exception, is a sign the underlying role hierarchy or OWD choice was wrong, not that twelve rules were the right number of rules.

## Key terms

| Term | Meaning |
|---|---|
| Enterprise sharing architecture | The discipline of combining individual sharing mechanisms into one coherent, maintainable design for a real org |
| Floor | The OWD — the minimum access level with no additional grant |
| Baseline grant | Structural access from role or territory hierarchy, tracking real accountability |
| Exception | A declarative or programmatic grant layered on top of the baseline for a specific, nameable reason |
| Carve-out | A Restriction Rule that removes visibility from a narrow slice of records |

## Lab

Take an object you're familiar with from a real or hypothetical org (e.g., Opportunity at a mid-size B2B company). Write down, in one sentence each: the OWD and why, the role-hierarchy baseline and who it's meant to serve, every sharing rule or team you'd add as an exception and the specific business reason for each, and whether any restriction rule is needed. If you can't produce a one-sentence justification for any layer, that's a signal the design needs rethinking before you'd defend it to a review board.

## Check yourself

Name the four layers of the model and, for each, the question it answers. Why does a design with many criteria-based sharing rules on one object often indicate the OWD or role hierarchy was chosen incorrectly, rather than that the business genuinely needed that many exceptions?
