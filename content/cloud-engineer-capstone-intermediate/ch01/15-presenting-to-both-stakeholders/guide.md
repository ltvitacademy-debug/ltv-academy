# Lesson 15 — Presenting to Both Stakeholders

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 15 of 16**

## What you'll learn

- Why presenting to Priya Suresh and Casey Lindqvist together, in one meeting, is different from
  briefing each of them separately
- How to lead with the actual outcome before the narrative, so the two real issues land as
  "caught and fixed" rather than as a surprise buried in a long story
- How to tailor the same honest facts to what an IT Manager and a VP of Engineering each actually
  need to act on
- Why disclosing both issues voluntarily, with the guardrail already shipped, is the version of
  this story that builds trust instead of spending it

## One meeting, two different jobs in the room

Priya Suresh asked for this project as IT Manager, focused on whether the platform is reliable,
supportable, and within budget. Casey Lindqvist, as VP of Engineering, cares about the same project
at a different altitude — whether the engineering practices behind it are sound and whether this
sets a pattern the rest of the org should trust. Presenting to both together means one account of
the project has to satisfy both lenses at once, instead of Theo quietly deciding which version each
person "needs to hear."

## Leading with the outcome, not the chronology

The instinct to walk through events in the order they happened — deploy, then the cost anomaly,
then the bucket, then the fixes — buries the actual headline under a slow build-up. Theo opens
instead with where things stand right now:

> "The platform's live: containerized, Terraform-managed, deployed through CI/CD, backed up
> cross-cloud to AWS. During the post-launch review, I found and fixed two issues before either
> one caused real damage — a cost misconfiguration and an access-scope issue on the backup bucket.
> Both are fixed, verified, and the pipeline now checks for both automatically going forward."

That's the headline both Priya and Casey need first. Everything after it is detail in support of
a conclusion they already have, not a slow reveal building toward one.

## What each finding actually needs to say, for each audience

Neither finding gets a different story for each person — the facts are the facts — but the framing
that matters to each person differs:

- **For Priya (IT Manager):** the cost line is directly her concern. "This app ran about 40% over
  its $1,750/month projection for roughly three weeks before I caught it in a routine review. It's
  back to the original number now, and the new pipeline check means this specific mistake — a
  scaling floor copied from the wrong environment — can't ship silently again."
- **For Casey (VP of Engineering):** the process point is what matters most. "Both issues were
  caught by review discipline, not by luck or an outage. The bucket policy issue, in particular,
  never resulted in confirmed unauthorized access — but it's exactly the kind of mistake that's
  easy to miss, which is why it's now a hard check in CI/CD instead of something that depends on
  someone remembering to look."

Said once, in the room, both people hear the version that answers their real question without
Theo having to repeat himself or imply something different to either one.

## Disclosing voluntarily, with the fix already shipped

Neither issue was discovered by an external audit, a customer complaint, or an executive asking a
pointed question. Theo found both, fixed both, validated both, and automated a check against both
— and only then is he bringing it to Priya and Casey, with the guardrail already live. That
sequencing matters: "here's what I found and already fixed, with a mechanism in place so it
doesn't recur" is a fundamentally different conversation than "here's a problem I need help with,"
and it's the version that actually earns trust for next time.

## Key terms

| Term | Meaning |
|---|---|
| Leading with the outcome | Opening a status update with where things currently stand, before the chronology of how it got there |
| Audience-specific framing | Presenting the same true facts with the emphasis that matters to each listener's actual responsibility |
| Voluntary disclosure | Reporting a self-found, self-fixed issue proactively, rather than waiting for it to be discovered by someone else |

## Lab

Write the two-sentence version of the bucket-policy finding you'd give Priya, and a different
two-sentence version you'd give Casey — using only true facts from Lessons 11 and 12, with each
one emphasizing what that person actually needs to act on.

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why does opening with "I found
and fixed two issues, here's the current state" land better with both stakeholders than narrating
events in the order they happened?
