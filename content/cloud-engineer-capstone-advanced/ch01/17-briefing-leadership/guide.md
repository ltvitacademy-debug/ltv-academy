# Lesson 17 — Briefing Leadership on the Sale Results

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 17 of 26**

## What you'll learn

- Why Theo's briefing to CTO Dana Whitfield and VP of Engineering
  Casey Lindqvist has to cover the sale's overall results **and** the
  incident, in the same conversation, honestly
- A real structure for leading with business impact before technical
  detail, without burying or softening what went wrong
- Why the briefing is built directly from the Lesson 15 incident
  report, not a separate, rosier retelling
- How Theo frames a fix that already worked without implying the
  underlying risk is now zero everywhere

## One briefing, not two stories

It would be tempting to give Dana and Casey a clean "the sale was a
huge success" readout and mention the incident almost as a footnote.
Theo doesn't do that — not because leadership can't handle a technical
detail, but because the honest version of "how did the sale go" is
incomplete without the 85 minutes of degraded checkout and exactly why
it happened. The sale's overall numbers and the incident are one story,
not two, and Theo briefs it that way.

## Leading with business impact, not technical sequence

The incident report from Lesson 15 is written timeline-first, which is
right for that document's job. A leadership briefing needs a different
order — business impact first, mechanism second — because Dana and
Casey's first real question is "how did this affect the business,"
not "which Kubernetes field was missing." Theo's structure:

| Step | What it covers |
|---|---|
| 1. Headline | Sale's overall results, and the one incident that happened during it, in a single sentence each |
| 2. Business impact | ~85 minutes of degraded checkout during peak traffic; estimated effect on completed orders in that window |
| 3. What happened and why | The real mechanism — missing topology spread constraint, masked by a cluster-wide average — in plain language, no unexplained jargon |
| 4. What's already fixed | The spread constraint applied and validated live, under continuing real load |
| 5. What's still open | The broader review of every other Deployment, and the FinOps dashboard's new per-zone alerting, both already logged as follow-ups |

## Not overclaiming the fix

Theo is careful about one specific thing: `checkout-api` is fixed and
validated. That is not the same claim as "no other service has this
gap." He says so directly, because the follow-up action from Lesson 15
— reviewing every other Deployment's spec for the same missing
constraint — isn't finished yet. Overstating the fix's scope to make
the briefing sound more reassuring would be the kind of thing that
comes back to damage trust the next time something breaks somewhere
else in the cluster.

## Anticipating the hardest question

Dana and Casey's sharpest likely question is some version of "why
didn't the FinOps dashboard we built specifically to watch this catch
it sooner?" Theo doesn't wait to be asked — he addresses it directly,
in plain terms: the dashboard was built to answer a capacity/cost
question, not a per-zone reliability question, and that specific gap
is exactly what Lesson 16's new panel and alert now close. Naming the
gap himself, before it's asked as a challenge, is what keeps this a
briefing instead of a defense.

## Key terms

| Term | Meaning |
|---|---|
| Business-impact-first framing | Leading a technical briefing with effect on the business before explaining mechanism |
| Overclaiming | Describing a fix's scope as broader than what's actually been verified |
| Proactive disclosure | Naming a hard question yourself before being asked, rather than waiting to be challenged on it |

## Lab

1. Write the one-sentence "headline" Theo would open the briefing
   with, covering both the sale's results and the incident.
2. Explain why business impact comes before technical mechanism in
   this briefing's structure, even though the incident report itself
   is timeline-first.
3. Write the exact sentence Theo uses to avoid overclaiming that every
   other service is now also free of this gap.

## Check yourself

You're ready for Lesson 18 when you can explain, without looking, why
Theo briefs the sale's results and the incident as one story, and why
naming the FinOps dashboard's specific blind spot himself is stronger
than waiting for Dana or Casey to raise it.
