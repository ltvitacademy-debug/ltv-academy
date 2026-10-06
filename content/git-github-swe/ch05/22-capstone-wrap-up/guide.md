# Lesson 22 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 5 · Capstone · Lesson 22 of 22**

## What you'll learn

- Presenting a real GitHub workflow in an interview, credibly
- What to actually point at in your repository, and in what order
- The specific questions this project should make you ready to answer
- Where this course leaves you, and what comes next in the AI Engineer path

## What to actually show

A real repository with real history is more convincing than a slide
deck describing one. In an interview or a portfolio review, walk
through it in this order:

1. **The commit graph and branch history** — thirty seconds showing a
   real feature branch, merged through a real pull request, proving
   the workflow is real, not just described.
2. **The pull request itself** — the description, and the inline
   review comment you addressed with a follow-up commit. This is
   where you demonstrate you can both give and receive real code
   review, not just click "Approve."
3. **The resolved merge conflict** — pull up the commit where you
   resolved it and explain, in plain language, what the conflict
   actually was and why you kept the version you kept.
4. **The Actions tab** — a real run history with real pass/fail
   results, and the deploy job's condition, explained: why it only
   fires on a real merge to `main`, never on an open PR.
5. **The release tag** — and your written reasoning for the branching
   strategy you picked, tied to the actual size and shape of this
   project.

## Questions this project should prepare you for

- "Walk me through what happens when you merge a pull request on this
  project." You should answer this without opening the code — commit
  graph, CI run, deploy condition, in order.
- "Tell me about a real merge conflict you've resolved." Most
  candidates can describe merge conflicts in the abstract; you can
  point at one you actually hit and fixed.
- "Why this branching strategy for this project, and what would make
  you choose differently?" — the real decision behind Lesson 12's
  content, now applied to a project you built and can defend.
- "What stops your deploy job from running on every single push?" —
  the `github.event_name` and `github.ref` condition from Lesson 20,
  explained in your own words against your own workflow file.

## Where this leaves you

This course wasn't really about memorizing Git commands in isolation
— it was about the actual mechanics of how software gets built on a
team: proposing a change, getting it reviewed, integrating it safely,
and shipping it without anyone needing to remember to run the tests
by hand. Every practice in this course — branches, pull requests,
forking, tags, CI, gated deploys — exists to make collaboration on
shared code something a team can trust, not something that depends on
everyone remembering to be careful.

That instinct transfers to any team, any stack, any CI tool. The
specific workflow file in this capstone will look different from
whatever you build next. The habit of asking "who reviews this, what
tests it, and what actually controls when it ships" doesn't change.

## What's next in the AI Engineer path

This course is the second stop in the AI Engineer path, right after
Python for AI Engineering. The path continues next with **APIs & JSON
for AI Applications** — REST fundamentals, a deep dive on JSON, and
the specific shapes AI provider APIs use (streaming responses,
function calling, structured output), building toward a reusable API
client. Everything in this course — branches, pull requests, CI,
gated deploys — is exactly how that next course's project, and every
project after it in this path, will actually get built and shipped.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio review | Presenting a real repository and workflow as evidence of a skill, not just describing it |
| Walkthrough order | Commit graph → pull request → resolved conflict → Actions tab → release tag |

## Lab

1. Practice walking through your own capstone repository out loud, in
   the order above, in under five minutes.
2. Write out your own answer to each of the four interview questions
   above, specific to your actual project and workflow file.
3. If you're building a portfolio, link the repository directly —
   real commit history and a real Actions tab are more convincing
   than a screenshot of either.

## Check yourself

This course is complete when you can walk a stranger through your
capstone repository, end to end, and answer all four questions above
without hesitation.
