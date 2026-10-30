# Lesson 16 — Wrap-Up: What Changed, and What's Next

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 16 of 16**

## What you'll learn

- A full-arc summary of what this project actually built, from Lesson 1's ask through Lesson 15's
  stakeholder presentation
- Why finding and fixing two real, independent mistakes is part of this project's success story,
  not a footnote on it
- What capability Driftwood's platform has now that it didn't have 16 lessons ago
- Why the next phase of this work — full Kubernetes and multi-cloud scale — is deliberately left
  undescribed here, as a separate project

## What Driftwood's platform looked like, and what it looks like now

This project started with a single ask that grew: Priya Suresh and Casey Lindqvist asked for
containerization, Terraform, CI/CD, and AWS as a backup target, on top of what the Beginner project
had already shipped. Sixteen lessons later, Driftwood Outdoor Apparel's storefront app is:

- **Containerized** and running on Terraform-provisioned infrastructure, not hand-configured
  resources
- **Deployed through CI/CD**, with every infrastructure change going through a pull request and a
  visible `terraform plan`
- **Backed up cross-cloud to AWS**, with the replication job from Lesson 7 feeding an S3 bucket
  that's correctly scoped to one IAM role, not the whole internet
- **Protected by an automated guardrail** that checks every future Terraform change for the two
  specific mistakes this chapter actually made, before either one can ship again

## The two mistakes were part of the story, not a detour from it

It would be easy to treat Lessons 9–13 as a setback in an otherwise clean build. That's not the
right read. A real production system that's been running for even a few weeks accumulates real
findings — a cost anomaly here, an access scope that's broader than intended there — and the
measure of a good platform isn't whether it has zero mistakes. It's whether mistakes get found,
fixed, validated, and turned into a check that prevents the same mistake next time. Driftwood's
platform did all four, on its own review cadence, before either mistake caused the damage it was
capable of causing.

## What's actually different now, concretely

Compare the platform at the start of this project to the platform now: infrastructure lives in
Terraform modules with named, reviewable scaling profiles instead of ad hoc settings; every change
to those modules gets a `terraform plan` a human can actually read before it ships; the CI/CD
pipeline now actively checks for the two specific risk patterns this project uncovered the hard
way; and the AWS backup target isn't just "set up," it's set up with an access model someone can
point to and explain. None of that existed, in this form, at the start of Lesson 1.

## What's next — without getting ahead of it

Casey Lindqvist has already signaled where this goes next: taking Driftwood's platform to full
Kubernetes and multi-cloud scale. That's a real, substantial next phase — and it's a different
project, with its own lessons, its own scenario, and its own real mistakes to find along the way.
This course doesn't preview its specifics here; the point of this wrap-up is to close this
project cleanly, not to start describing the next one before it's actually built.

## Key terms

| Term | Meaning |
|---|---|
| Review cadence | A team's regular habit of checking production systems for issues, independent of any specific incident prompting it |
| Access model | A documented, explainable statement of who or what can do what with a given resource |
| Platform maturity | Measured not by the absence of mistakes, but by how reliably they're found, fixed, validated, and guarded against recurring |

## Lab

In your own words, write the two-sentence version of "what changed" you'd put at the top of this
project's final write-up — one sentence on capability added, one sentence on what the two findings
and the new guardrail actually prove about how this platform is run.

## Check yourself

You've completed this project when you can explain, without looking: what four things happened to
each of this chapter's two mistakes (found, fixed, validated, guarded against), and why that
four-part pattern — not a zero-mistake record — is the actual measure of this platform's maturity.
