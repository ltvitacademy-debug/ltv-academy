# Lesson 9 — Code Review

**Chapter 2 · Collaboration · Lesson 9 of 17**

## What you'll learn

- Why code review exists beyond "catching bugs" — what it actually optimizes for
- The three outcomes a reviewer can leave on a pull request, and what each means
- How to give feedback that's specific and actionable instead of vague
- How to receive feedback on your own PR without treating it as personal

## What code review is actually for

Code review is the practice of having at least one other person examine a proposed change before it merges. It's easy to assume the main goal is "catch bugs," and it does catch some — but a good reviewer, reading a diff cold, often can't fully simulate the code's behavior in their head the way automated tests can. Code review's bigger, often-overlooked value is **shared understanding**: a second person now knows this part of the codebase exists and roughly how it works, which matters enormously the day the original author is out sick, has left the team, or just doesn't remember why they wrote it that way eighteen months ago. Review also spreads conventions (so the codebase stays consistent even as more people touch it) and catches design-level problems — "this duplicates logic that already exists in `OpportunityTriggerHandler`" — that a test suite has no way to flag.

## The three things a reviewer can leave on a PR

GitHub's review feature gives a reviewer exactly three possible verdicts, and the distinction matters:

| Verdict | What it means |
|---|---|
| **Comment** | General feedback or questions, with no judgment on whether the PR should merge |
| **Approve** | "I've reviewed this and I'm satisfied it's ready to merge" |
| **Request changes** | "I found something that needs to be addressed before this merges" — this can block merging if the repository's branch protection rules require review approval (Lesson 10) |

A reviewer leaving only line comments without picking one of these three overall verdicts has given feedback, but hasn't actually signaled whether the PR is mergeable — which is why most teams expect an explicit Approve or Request Changes, not just scattered comments.

## Giving feedback that's actually actionable

Compare two comments on the same line of Apex:

> "This is wrong."

versus

> "This SOQL query runs inside a `for` loop over `accountIds`, so it'll hit the governor limit on the number of SOQL queries per transaction once there are more than 100 accounts. Can you move the query outside the loop and look up all the accounts in one pass?"

The second version tells the author *what's* wrong, *why* it matters, and *a concrete direction* to fix it — the author doesn't have to guess what you meant or whether you're even sure it's a real problem. Good review comments are specific, reference the actual risk (a real governor limit, a real edge case, a real existing pattern elsewhere in the codebase), and suggest a path forward rather than just flagging dissatisfaction.

It's also worth distinguishing a blocking issue from a preference. Prefixing optional, stylistic suggestions with something like "Nit:" lets the author know they can take it or leave it, rather than treating every comment as something that must be resolved before merging.

## Receiving feedback well

The author's side of review is a skill too. Feedback on a PR is feedback on the code, not a referendum on the author — treating "please add a null check here" as a personal criticism makes review slower and more stressful for everyone on a team over time. The most useful response to a comment you disagree with is to explain your reasoning and ask the reviewer to reconsider, not to silently ignore it or silently comply with something you still think is wrong. Both outcomes — reviewer and author reaching agreement, or the PR author providing context that changes the reviewer's mind — represent code review working correctly.

## Key terms

| Term | Meaning |
|---|---|
| Code review | Having at least one other person examine a change before it merges |
| Approve | A reviewer's signal that a PR is ready to merge as-is |
| Request changes | A reviewer's signal that something must be addressed before merging |
| Nit | An informal label for an optional, non-blocking stylistic suggestion |

## Lab

Find (or write, if none is available) a 15-20 line Apex method with at least one real issue — a missing null check, a SOQL query inside a loop, a hardcoded ID, or similar. Write three review comments on it: one that's vague and unhelpful ("fix this"), then rewrite it twice — once pointing out *what* and *why* without a suggested fix, and once including a specific, actionable fix. Compare all three side by side and identify exactly what each added.

## Check yourself

Can you name the three verdicts a GitHub reviewer can leave on a PR, and explain the practical difference between "Comment" and "Request changes"? Can you explain, beyond "catching bugs," one other concrete benefit code review provides to a team?
