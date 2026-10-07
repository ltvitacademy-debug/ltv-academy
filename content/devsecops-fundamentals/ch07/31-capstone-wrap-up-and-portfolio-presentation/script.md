# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

You've got a secured order-service pipeline: six controls, ordered, gated, deployed by a scoped identity. This final lesson runs a retrospective on that build, the way lesson twenty-eight taught you to run one after a real incident, and turns it into something you can present.

## Segment 2 (steps)

Ask the same three questions as that incident retrospective, but about your own build. What happened — which controls, in what order, and where did you simplify versus a real production setup? What worked — which control would have caught a real problem? What would you change — what's reusable for a second service, and what was specific to order-service?

## Segment 3 (steps)

A pipeline that runs is a prerequisite, not the finish line. An interviewer isn't mainly checking if your YAML is valid — they're checking if you can explain why the secrets scan runs before the build, why the gate threshold is CVSS nine, and why the deploy identity lists exactly three permissions. Those answers already exist in the last two lessons; the work now is saying them out loud.

## Segment 4 (steps)

When you present this, use four parts: the problem — zero checks and a stale identity. The design — six controls, ordered and gated. One concrete trade-off, like excluding a known-unfixable low-severity finding instead of blocking forever, and how you'd revisit it. And what you'd do with more time, named explicitly as out of scope, not forgotten.

## Segment 5 (outro)

That closes DevSecOps Fundamentals — from shift-left in chapter one to one real, defensible pipeline for Northbridge Retail. That's the project to bring to your next interview.
