# Lesson 25 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 6 · Capstone · Lesson 25 of 25**

## What you'll learn

- Presenting a CI/CD-backed data project in an interview, credibly
- What to actually point at in your repository, and in what order
- The specific questions this project should make you ready to answer
- Where this course's skills fit into a data analyst or engineer's
  daily work going forward

## What to actually show

A repository is more convincing than a slide deck. In an interview or
a portfolio review, walk through it in this order:

1. **The `.gitignore`** — thirty seconds proving you know what
   belongs in version control and what doesn't, and why.
2. **A real pull request** — one with actual review comments and a
   suggestion, showing the review habit, not just that a PR exists.
3. **The workflow file** — read `.github/workflows/ci.yml` out loud,
   naming the trigger, the job, and the steps, exactly like Lesson 20
   asked you to be able to do.
4. **A failed run, then a passing one** — proof the pipeline actually
   catches something real, not just that it exists for show.
5. **The deploy job** — explain why it's a separate job with a
   separate condition, and why the credentials are scoped differently
   from CI's.

## Questions this project should prepare you for

- "Walk me through what happens when you push a commit to this repo."
  You should be able to answer this without looking at anything.
- "What would happen if you accidentally committed a password?" —
  you should be able to describe both the `.gitignore` prevention and
  the "you'd still need to rotate it" reality from Lesson 12.
- "Why two separate jobs for CI and deploy?" — the risk of running
  untested code against production, from Lesson 22.
- "What's the difference between Continuous Delivery and Continuous
  Deployment, and which does this project use?" — a direct callback to
  Lesson 16, now answerable about a real project you built.

## Where this fits into daily work

None of this course was really about Git commands in isolation — it
was about a specific, real anxiety in data work: shipping a change to
a dashboard or a model without breaking something nobody notices until
a stakeholder does. Every practice in this course — branches, reviews,
required checks, separated credentials — exists to catch that failure
before it reaches someone who trusted the number.

That habit transfers to any team, any tool, any stack. The specific
YAML in `retail-orders-analytics`'s workflow file will look slightly
different at a real job. The instinct to ask "does this have a test
gate before it reaches production" doesn't change.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio review | Presenting real, working code as evidence of a skill, not just describing it |
| Walkthrough order | .gitignore → PR/review → workflow file → a failed then passing run → deploy job |

## Lab

1. Practice walking through your own capstone repository out loud, in
   the order above, in under five minutes.
2. Write out your own answer to each of the four interview questions
   above, specific to your actual project.
3. If you're building a portfolio, link the repository directly —
   real, working CI/CD is more convincing than a screenshot of one.

## Check yourself

This course is complete when you can walk a stranger through your
capstone repository, end to end, and answer all four questions above
without hesitation.
