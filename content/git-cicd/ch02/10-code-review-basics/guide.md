# Lesson 10 — Code Review Basics

**Chapter 2 · GitHub Essentials · Lesson 10 of 25**

## What you'll learn

- Leaving a comment on a specific line of a diff, not just the PR as a whole
- Suggesting an exact fix inline, so the author can accept it with one click
- The three review verdicts — Comment, Approve, Request changes — and
  what each actually does
- Reviewing a dbt model or SQL query the way you'd review any other code

## Commenting on a specific line

A pull request's diff isn't just something to skim — hovering any
changed line reveals a small icon for leaving a comment attached to
exactly that line, not a vague comment on the PR as a whole:

![A blue plus-sign icon appearing to the left of a changed diff line when hovered.](/courses/git-cicd/ch02/10-code-review-basics/hover-comment-icon.png)
*This shows up on hover over any line in the diff — click it to open a comment box scoped to that exact line.*
Source: [GitHub Docs — Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)

For a SQL query or dbt model, this is the difference between "this
join looks wrong" as a comment buried at the bottom of a PR, and a
comment attached to the exact `LEFT JOIN` line in question.

## Suggesting the exact fix

Comments describe a problem. **Suggestions** propose the fix directly,
as an editable code block the author can accept with a single click,
turning it into a real commit:

![The suggestion icon in a review comment's formatting toolbar.](/courses/git-cicd/ch02/10-code-review-basics/suggestion-block.png)
*Click this icon in a comment box and GitHub pre-fills the block with the line you're commenting on — edit it to the fix you're proposing.*
Source: [GitHub Docs — Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)

This matters for data work specifically: instead of "this column name
doesn't match our convention," a suggestion hands over the exact
corrected line — no interpretation required, no back-and-forth on
what you meant.

## Submitting a review: three verdicts

Individual line comments don't do anything on their own until you
submit a review, which starts from the **Review changes** button:

![The 'Files changed' tab of a pull request, with a green 'Review changes' button highlighted in the top right.](/courses/git-cicd/ch02/10-code-review-basics/review-changes-button.png)
*Every line comment you've left gets bundled into whichever verdict you submit here.*
Source: [GitHub Docs — Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)

Submitting a review means picking one of three verdicts:

- **Comment** — feedback with no verdict attached. Doesn't block or
  approve anything.
- **Approve** — you're satisfied; this is what unblocks a merge on a
  repo that requires review.
- **Request changes** — something needs fixing before this can merge.
  Blocks the merge button until resolved or dismissed.

## Key terms

| Term | Meaning |
|---|---|
| Line comment | Feedback attached to one specific line of a diff |
| Suggestion | A line comment that includes an exact, one-click-acceptable fix |
| Review | A bundle of comments submitted together with one verdict |
| Request changes | A review verdict that blocks merging until addressed |

## Lab

1. Open a pull request (your own or a public one) and leave a comment
   on one specific line, not a general PR comment.
2. On a second line, use the suggestion tool to propose an exact
   one-line fix.
3. Submit a review and pick the verdict that actually matches your
   intent — don't default to "Comment" out of habit.

## Check yourself

You're ready for Lesson 11 when you can explain the real difference
between a line comment, a suggestion, and a full review verdict — and
which one actually blocks a merge.
