# Lesson 10 — Code Review

**Chapter 2 · GitHub Essentials · Lesson 10 of 22**

## What you'll learn

- Leaving inline comments tied to specific lines of a diff
- Tracking your own progress through a large diff with "Viewed"
- The three review verdicts: Comment, Approve, Request changes
- What makes feedback actually useful to the person receiving it

## Inline comments

Code review happens on the **Files changed** tab (Lesson 9). Hovering over
any line in the diff reveals a blue **+** button — click it to attach a
comment to that exact line, rather than leaving a vague note on the PR as a
whole:

![Hovering over a line in a pull request's diff, revealing a blue "+" button to start a comment on that exact line.](/courses/git-github-swe/ch02/10-code-review/hover-comment-icon.png)

Anchoring feedback to the precise line it concerns is the entire value of
inline comments over a general PR comment — the author doesn't have to
guess which part of a 200-line diff you mean.

## Tracking your progress

On a large PR, a **Viewed** checkbox next to each file lets you mark your
way through the diff and collapse files you've already looked at:

![A pull request file's header, with the "Viewed" checkbox outlined, used to mark a file as reviewed and collapse it.](/courses/git-github-swe/ch02/10-code-review/viewed-checkbox.png)

This resets if the author pushes new commits to a file you'd already
marked — a deliberate signal that something there changed since you looked.

## Submitting your review

Once you've gone through the diff, the **Review changes** button submits
your verdict:

![A pull request's "Files changed" tab with the "Review changes" button outlined, used to submit a review verdict.](/courses/git-github-swe/ch02/10-code-review/review-changes-button.png)

- **Comment** — feedback with no formal verdict; doesn't block or approve the merge
- **Approve** — you're satisfied; often required before the merge button
  unlocks, depending on the repository's branch protection rules
- **Request changes** — you found something that needs fixing before this
  should merge; this explicitly blocks the merge until addressed

## What makes feedback actually useful

The best review comments are specific and actionable: "this will throw if
`items` is empty — worth a guard clause?" beats "this looks off." Ask
questions when you're not sure rather than asserting with false confidence,
and say when something is a nitpick versus a blocker — not every comment
needs to hold up the merge.

## Key terms

| Term | Meaning |
|---|---|
| Inline comment | Feedback attached to a specific line in the diff |
| Viewed checkbox | Tracks which files in a large diff you've already reviewed |
| Approve | A review verdict signaling you're satisfied with the changes |
| Request changes | A review verdict that blocks merging until addressed |

## Check yourself

You're ready for Lesson 11 when you can leave an inline comment on a
specific line, explain the practical difference between Comment, Approve,
and Request changes, and say what makes a review comment actually useful.
