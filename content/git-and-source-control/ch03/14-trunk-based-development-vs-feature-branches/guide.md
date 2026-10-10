# Lesson 14 — Trunk-Based Development vs. Feature Branches

**Chapter 3 · Salesforce Workflows · Lesson 14 of 17**

## What you'll learn

- What trunk-based development actually requires, beyond "we merge to main a lot"
- Why long-lived feature branches create a specific, predictable kind of pain
- The trade-offs each approach makes, applied to a Salesforce release train
- What a feature flag is and why it's often what makes trunk-based development viable

## Trunk-based development

**Trunk-based development** means developers integrate their work into a single shared branch — the "trunk," almost always `main` — in small increments, multiple times a day, rather than working in isolation on a branch for days or weeks before merging. It's a stricter practice than it sounds: it requires `main` to always stay in a deployable state (echoing Lesson 1's CI requirement), which in turn requires strong automated test coverage, since there's no long-lived branch acting as a buffer between "code someone's working on" and "code that's about to ship."

```
main ---c1---c2---c3---c4---c5---c6---   (every commit lands directly, or via a very short-lived branch)
```

Any branches that do exist under trunk-based development are deliberately short-lived — often merged within a day — closer to "a few commits on a branch for ten minutes while a PR gets reviewed" than "a feature branch that lives for three weeks."

## The specific pain of long-lived feature branches

A feature branch that stays open for weeks has a predictable failure mode: the longer it diverges from `main`, the more `main` changes underneath it while nobody's reconciling the two. By the time it's finally ready to merge, the branch and `main` have drifted far enough apart that the merge itself becomes a high-risk event — exactly the kind of large, painful three-way merge (Lesson 5) and multi-file conflict resolution (Lesson 8) that this course has been building toward avoiding. The branch was meant to isolate risk; instead, deferring integration this long concentrates risk into one dreaded merge day. This is the core argument trunk-based development makes: integrate constantly in small pieces, and there's never a backlog of divergence waiting to explode at once.

## Feature flags: how you ship unfinished work safely

The obvious objection to trunk-based development is: what if a feature genuinely takes three weeks to build, and it's not safe to let half-finished code reach production just because it merged to `main`? The usual answer is a **feature flag** (also called a feature toggle): a runtime switch that lets incomplete or in-progress functionality exist in `main`, deployed, but inactive — hidden behind a flag that's off until the feature is actually ready. In a Salesforce context, this might be a Custom Metadata Type record, a custom permission, or a Custom Setting checked at runtime by a flow or Apex class, rather than a branch, controlling whether a feature's logic actually executes for a given user or org. This decouples two things that long-lived branches conflate: *merging* code (which can happen continuously, in small reviewable pieces) and *releasing* a feature to users (which can happen whenever it's actually ready, independent of when the code landed in `main`).

## Applying this to a Salesforce release train

Chapter 3's earlier lessons described release trains and environment branching as common patterns, and they aren't incompatible with trunk-based principles — many real Salesforce teams run a form of trunk-based development *within* a release-train structure: developers merge small, frequent, short-lived-branch PRs into a shared integration branch continuously, and the "release train" aspect is really about when a stable point on that branch gets promoted through QA/UAT/Production, not about developers working in isolation for weeks at a time. The decision isn't strictly "trunk-based OR Git Flow" — it's how long individual developers' branches live before integrating, which is a choice orthogonal to how releases get scheduled and promoted.

## Key terms

| Term | Meaning |
|---|---|
| Trunk-based development | Integrating small changes into a shared main branch frequently, keeping it always deployable |
| Long-lived feature branch | A branch that stays open for an extended period before merging, accumulating divergence risk |
| Feature flag (feature toggle) | A runtime switch that lets merged-but-unfinished functionality stay inactive until ready |
| Deployable | A codebase state that could be released as-is without known breakage |

## Lab

A Salesforce developer is asked to build a significant new approval process spanning Opportunities, Quotes, and a new custom object — realistically a two-to-three week effort. Write a short plan for how they could follow trunk-based development principles anyway: describe how they'd break the work into small, frequently-merged pieces, and design a feature flag (naming the Salesforce mechanism you'd use — Custom Metadata Type, Custom Setting, or custom permission) that keeps the incomplete approval process inactive for end users until it's fully built and tested.

## Check yourself

Can you explain why a feature branch that stays open for three weeks is riskier to merge than six branches that each stay open for two days? Can you describe what a feature flag is and why it lets a team merge continuously without releasing unfinished work to real users?
