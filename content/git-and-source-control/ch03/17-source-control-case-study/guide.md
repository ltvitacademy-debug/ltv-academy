# Lesson 17 — Source Control Case Study

**Chapter 3 · Salesforce Workflows · Lesson 17 of 17**

## What you'll learn

- How every concept from this course connects into one realistic end-to-end scenario
- How to diagnose a messy, partially-broken Salesforce release process using what you now know
- How to design a fix that uses branching strategy, protection rules, and metadata-conflict handling together
- A way to self-assess whether you can actually apply this course, not just recall its vocabulary

## Northbridge Retail's situation

Northbridge Retail's Salesforce team has six developers and a single `main` branch with no protection rules at all. Anyone can push directly to `main`. There's no separate `develop`, `uat`, or `qa` branch — every developer pulls `main`, makes changes directly in a shared full sandbox (not a scratch org), and pushes straight back to `main` whenever they're done, usually once every few days. Twice in the last month, one developer's push has silently overwritten another's unrelated metadata change, because nobody was reviewing anything before it landed. Last week, a `package.xml` conflict got "resolved" by a rushed developer who picked one side's `<members>` list entirely, silently dropping a teammate's new field from the next deploy — nobody noticed until QA flagged a missing field three days later.

## Diagnosing the problems

Walking through what you've learned across all three chapters, several distinct failures are stacked on top of each other here, and it's worth naming each one specifically rather than treating this as one vague mess:

- **No branches at all (Lessons 4-5)**: every developer works directly on `main`, so there's no isolation between unrelated work, and no way to review a change before it affects everyone.
- **No pull requests or review (Lessons 7, 9)**: changes land with no second person checking them, no discussion of *why*, and no chance to catch a problem before it's permanent.
- **No branch protection (Lesson 10)**: nothing technically prevents a direct push to `main`, even though that's exactly the behavior causing the overwrite incidents.
- **A shared full sandbox instead of scratch orgs (Lesson 12)**: multiple developers editing the same org simultaneously is a big part of why changes silently collide — there's no isolated environment per feature.
- **A rushed, non-union conflict resolution (Lesson 15)**: the `package.xml` conflict was "resolved" by discarding one side entirely instead of taking the union of both legitimate additions — exactly the mistake Lesson 15 named directly.

## Designing the fix

Putting the whole course together, a realistic remediation plan looks like this:

1. **Adopt a branching strategy (Lesson 13)**: given six developers and no complex multi-environment release train yet, a lightweight trunk-based approach (Lesson 14) — short-lived feature branches, merged frequently — fits better than a heavyweight Git Flow setup Northbridge doesn't need yet.
2. **Require pull requests for everything** (Lesson 7), with at least one reviewer's approval required (Lesson 9) before anything reaches `main`.
3. **Turn on branch protection on `main`** (Lesson 10): require a PR, require approval, require status checks to pass, and restrict direct pushes to nobody, including admins, except in a clearly-defined emergency hotfix process.
4. **Move each developer to their own scratch org per feature branch** (Lesson 12), eliminating the shared-sandbox collisions entirely.
5. **Set up a required CI check** (Lesson 11) that runs a validation-only deploy (Lesson 15) against every PR automatically, so a broken or incomplete metadata change is caught before a human even reviews it.
6. **Document the correct way to resolve a `package.xml` or Profile conflict** (Lesson 15) — union, not pick-one-side — so the next rushed developer has a clear, written standard to follow instead of guessing under time pressure.

None of these six steps depends on exotic tooling — every one of them is a direct application of a lesson already covered in this course.

## Why this case study is the right way to close the course

Real Salesforce teams rarely fail at Git because they don't know what a commit is. They fail because several small, individually-reasonable-looking shortcuts compound: skipping review *once* because a change felt small, allowing a direct push *once* because branch protection felt like bureaucracy, resolving a conflict by picking a side because reading both sides carefully felt slower. Recognizing that pattern — and having a specific, lesson-by-lesson vocabulary for diagnosing and fixing it — is the actual skill this course has been building toward, not just being able to recite what `git merge` does in isolation.

## Key terms

| Term | Meaning |
|---|---|
| Root-cause stacking | Multiple small, individually-plausible process gaps compounding into a real incident |
| Remediation plan | A concrete, prioritized set of fixes mapped to specific identified failures |

## Lab

Write a one-page remediation memo, as if you were presenting it to Northbridge Retail's engineering manager. For each of the five diagnosed problems above, state the specific fix (naming the actual Git/Salesforce mechanism — not a vague "communicate better"), and sequence the six steps in the order you'd actually roll them out, with a one-sentence justification for why that order minimizes disruption to the six developers' daily work.

## Check yourself

Without rereading this lesson, can you list all five root causes behind Northbridge Retail's incidents, each tied to a specific lesson in this course? Can you explain why "the team doesn't know Git" is the wrong diagnosis, and what the right diagnosis actually is?
