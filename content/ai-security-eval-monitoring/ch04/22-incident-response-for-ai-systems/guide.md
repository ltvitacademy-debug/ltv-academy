# Lesson 22 — Incident Response for AI Systems

**Chapter 4 · Responsible AI & Governance · Lesson 22 of 25**

## What you'll learn

- Why every control this course has built still doesn't add up to "incidents never happen"
- The five stages a real incident response plan actually has, adapted for what's specific to AI failures
- Three concrete AI incident types and what response actually looks like for each
- Why a postmortem's real job is closing the loop back to earlier chapters, not assigning blame

## Every defense in this course is a reduction, not a guarantee

Chapter 1's prompt injection defenses, Chapter 2's red-teaming, Chapter 3's monitoring and alerting, this chapter's bias testing — every one of them reduces the odds and shortens the time-to-detection of a failure. None of them makes failure impossible. Incident response is the plan for the day one happens anyway: a hallucinated answer that caused real harm, a prompt injection that got through, a bias complaint that turns out to be valid.

## The five stages, adapted for AI

A standard incident response shape — detect, triage, contain, communicate, review — still applies, but each stage has an AI-specific wrinkle:

```text
1. Detect   — Lesson 17's alert fires, or a user reports it directly
2. Triage   — how many users affected? Is it still happening right now?
3. Contain  — roll back a prompt/model version, or disable the feature
4. Communicate — tell affected users and stakeholders, honestly
5. Review   — postmortem: which earlier control should have caught this?
```

The AI-specific wrinkle is mostly in Contain: unlike a traditional software bug, there's often no single line of code to revert. Containment might mean rolling back to a previous model version, tightening a system prompt, adding a stricter output filter, or temporarily disabling the feature entirely while a real fix is built.

## Three incident types, three different responses

- **A hallucination that caused real harm** (a user acted on a fabricated fact) — contain by adding the failure case to Chapter 2's eval dataset immediately, not just fixing the one instance; communicate clearly about what the AI got wrong.
- **A prompt injection that got through** (Chapter 1's Lesson 1 risk, realized) — contain by patching the specific gap, then re-running Chapter 2's red-teaming suite to check for siblings of the same attack, not just the exact one that succeeded.
- **A valid bias complaint** — contain by reviewing the flagged case against Lesson 18's testing approach, and treat it as a signal that the existing bias tests missed something, not an isolated one-off.

## What a postmortem is actually for

A postmortem's real output isn't a list of what went wrong — it's an honest answer to "which earlier control (eval, drift check, alert, bias test) should have caught this, and why didn't it?" That answer is what turns an incident into Chapter 2's eval dataset getting one entry larger, Chapter 3's alert thresholds getting recalibrated, or Lesson 21's model card getting updated with a documented limitation. An incident that doesn't change any of those was reviewed, not actually learned from.

## Key terms

| Term | Meaning |
|---|---|
| Containment | The immediate action that stops an AI incident from continuing to cause harm |
| Postmortem | A structured review asking which existing control should have caught the incident |
| Closing the loop | Feeding an incident's lesson back into evals, alerts, or documentation so it doesn't recur |

## Lab

Pick one of the three incident types above. Write a two-sentence containment action and a two-sentence postmortem question for it, specific enough that someone could actually act on both without further clarification.

## Check yourself

Can you explain, without looking, why "we fixed the specific bug" is an incomplete incident response for an AI failure, and what closing the loop back to evals or alerts actually adds that a one-off fix doesn't?
