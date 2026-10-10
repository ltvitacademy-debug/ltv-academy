# Lesson 14 — Measuring Governance Success

**Chapter 3 · Building Governance · Lesson 14 of 14**

## What you'll learn

- Why "we have a framework and a committee" isn't itself evidence a governance program is working
- A practical scorecard spanning the people, policy, process, and technology pillars from Lesson 1
- How to tell the difference between activity metrics (meetings held, policies written) and outcome metrics (quality improved, risk reduced)
- Why speed-to-resolution matters as much as any quality number
- How to use this course's own structure as a maturity checklist for a real org

## Having a program isn't the same as the program working

It's possible to stand up every structure this course has described — named data owners, a classification scheme, a retention policy, a governance committee — and still have a program that isn't actually improving anything, because nobody is checking whether the structures are producing better outcomes or just existing on paper. Lesson 5 already made this point narrowly, for data quality specifically; this lesson extends it to the whole governance program.

## A scorecard across all four pillars

Each of Lesson 1's four pillars has its own kind of success measure, and a mature program tracks at least one from each rather than over-indexing on whichever is easiest to report:

- **People** — Is the ownership register from Lesson 2 actually current, or are half its named owners people who left the company eight months ago? A simple, honest metric: the percentage of major objects with an owner confirmed within the last review cycle.
- **Policy** — Lesson 5's data-quality metrics (completeness rate, duplication rate) are the clearest example here, extended to classification coverage (what percentage of fields holding sensitive data per Data Detect's findings actually carry a Data Sensitivity Level) and retention-policy coverage (what percentage of major objects have a documented retention policy at all).
- **Process** — Are the scheduled reviews actually happening? A classification-drift review that was supposed to run quarterly (Lesson 9's periodic-review idea) but hasn't run in a year is a process failure visible only if someone's tracking whether it ran, not just whether the policy exists on paper.
- **Technology** — Are the controls that exist actually active? An org can have standard Duplicate Rules sitting inactive in Setup (a real, commonly-observed gap per this course's Lesson 4 research) — which means a report titled "Duplicate Rules configured: yes" is misleading if the honest answer is "configured but never activated."

## Activity metrics vs. outcome metrics

A governance program under pressure to show progress will naturally gravitate toward activity metrics — number of committee meetings held, number of policies written, number of fields classified — because they're easy to count and always trend upward. The problem is that none of those numbers prove anything got better. The outcome metrics that actually matter are harder to produce but far more honest: did the duplication rate actually fall quarter over quarter (Lesson 5), did the time to fulfill an erasure request actually shrink (Lesson 8), did an audit actually find fewer unclassified sensitive fields than the one before it (Lesson 9/13). A program report that leads with "we held 12 governance meetings this year" without also reporting what changed as a result is reporting effort, not success.

## Speed-to-resolution matters as much as any single number

One outcome metric deserves special attention because it's easy to overlook: how long it takes the program to actually resolve something once a problem surfaces. The Meridian case study (Lesson 13) is a useful benchmark here — a mature program should be able to answer "how long did it take from the audit finding to the field being classified and the erasure request being fully resolved across all downstream systems" and see that number shrink over successive incidents, as the structural fixes (a real data owner, a real release checkpoint) start paying off. A program that resolves its tenth ungoverned-field incident just as slowly as its first hasn't actually matured, no matter how much documentation it's produced in the meantime.

## Using this course as your own maturity checklist

The fourteen lessons in this course double as a practical checklist for assessing any real Salesforce org's governance maturity: does it have named owners (Lesson 2) and stewards (Lesson 3) with current assignments; are quality controls not just configured but active and measured (Lessons 4-5); does it have a written, followed retention policy (Lesson 6) and a workable privacy/consent process (Lesson 7); can it actually produce what compliance requires on request (Lesson 8); is sensitive data classified and is that classification driving real decisions (Lesson 9); can it answer an audit's traceability questions within its actual retention windows (Lesson 10); and does all of that sit inside one maintained framework (Lesson 11) with a real committee (Lesson 12) that resolves disputes in a reasonable time. An org that can answer "yes, and here's the evidence" to most of these isn't just compliant on paper — it has a governance program that's actually working, which is the distinction this entire course has been building toward.

## Key terms

| Term | Meaning |
|---|---|
| Activity metric | A count of governance work performed (meetings held, policies written) that doesn't by itself prove an outcome improved |
| Outcome metric | A measure of actual change in data quality, risk, or compliance posture over time |
| Speed-to-resolution | How long it takes a governance program to fully resolve an incident once discovered, and whether that time shrinks over successive incidents |
| Governance maturity | The degree to which an org's governance structures are not just present but actively working and improving outcomes |

## Lab

Using Meridian Health Partners from Lesson 13, draft a one-page "year one vs. year two" governance scorecard: pick one metric from each of the four pillars (people, policy, process, technology), state what the honest year-one baseline number probably was given the case study's facts, and state what a credible, specific year-two target would be if the structural fixes from Lesson 13 were actually implemented.

## Check yourself

Can you explain, with an example, the difference between an activity metric and an outcome metric in a governance context? Can you name one metric from each of the four pillars (people, policy, process, technology) that a mature Salesforce governance program should be tracking?
