# Lesson 11 — Risks and Assumptions in Each Case

**Chapter 2 · Working the Cases · Lesson 11 of 16**

## What you'll learn

- The difference between a risk and an assumption, and why conflating them weakens a design document
- A simple way to score a risk (likelihood and impact) so a risk register is comparable, not just a list of worries
- Why an unstated assumption is more dangerous than a stated risk, even when the risk sounds scarier
- How to build a risk-and-assumptions register for one of Chapter 1's case studies from scratch

## Risk and assumption are not the same kind of statement

Lesson 9 separated requirements from assumptions and solutions-in-disguise. This lesson adds a fourth category that deserves its own treatment: a **risk** — something that might happen and would be bad if it did, whether or not any assumption was involved. An assumption is a belief the design is quietly standing on ("leadership values unified reporting enough to accept the consolidation cost"); a risk is an event ("the migration takes longer than planned and Ferro's biggest customer churns during the disruption"). A design can have an assumption with low risk attached (an assumption that's almost certainly true) and a risk with no assumption behind it at all (a vendor outage that has nothing to do with any belief the design relied on). Treating every worry as the same undifferentiated "risk" loses information a reviewer actually needs.

## Scoring a risk: likelihood and impact, not just a label

A risk register that just lists concerns in prose ("there's a risk the migration is disruptive") is hard to prioritize. Scoring each risk on two independent axes — **likelihood** (how probable is this, roughly: low, medium, high) and **impact** (how bad is it if it happens) — turns a list of worries into something that can actually be triaged. A high-likelihood, low-impact risk (Castellan's optimizer occasionally proposes a schedule a dispatcher has to manually override) needs a documented fallback but not a redesign. A low-likelihood, high-impact risk (Veltrix's usage-ingestion pipeline silently drops data for a full billing cycle, causing a wave of disputed invoices) deserves disproportionate design attention even though it's unlikely, specifically because the cost of being wrong is so large. Scoring both axes, rather than only flagging risks that feel urgent, is what catches the second kind before it happens instead of after.

## An unstated assumption can be worse than a stated risk

A stated risk, even a serious one, is visible — a reviewer can push back on it, ask for a mitigation, or decide to accept it knowingly. An unstated assumption is invisible until it breaks, and when it breaks, the design often fails in a way nobody anticipated because nobody ever wrote the assumption down to be challenged. Ferro's consolidation plan silently assumed each unit's sales teams would tolerate a slower, heavier Opportunity process in exchange for unified reporting — an assumption that, if wrong, produces not a clean failure but a slow, demoralizing one (reps quietly working around the new process, data quality degrading, the unified report turning out to be unified garbage). The discipline this lesson is teaching is simple to state and easy to skip under deadline pressure: every assumption identified in Lesson 9 gets written into the same register as the risks, specifically so it can be challenged before it becomes an invisible failure mode.

## Building the register

A usable risk-and-assumptions register, per case, needs four columns: the statement itself (risk or assumption, labeled as which), likelihood (for risks) or confidence (for assumptions — how sure is the team this is actually true), impact if wrong, and a mitigation or validation step (for a risk, what reduces the chance or the damage; for an assumption, what would actually confirm or disconfirm it, such as asking the stakeholder directly). A register with entries that have no mitigation or validation column filled in isn't finished — it's just a longer way of saying "we're worried," without the next step that makes the worry actionable.

## Key terms

| Term | Meaning |
|---|---|
| Risk | A possible future event that would be bad if it happened, independent of any specific assumption |
| Assumption | A belief a design relies on without explicit stakeholder confirmation (introduced in Lesson 9) |
| Likelihood | How probable a risk is judged to be |
| Impact | How bad the consequences would be if a risk materializes |
| Risk-and-assumptions register | A structured list scoring each risk and assumption with a mitigation or validation step |

## Lab

Build a risk-and-assumptions register for Harlow Community Partners' phased PMM rollout from Lesson 7. Identify at least three risks and two assumptions, score each risk on likelihood and impact, and write a mitigation (for each risk) or a validation step (for each assumption) for every entry. Flag which single entry in your register you'd escalate to Harlow's leadership before the tutoring program phase begins, and explain why that one specifically.

## Check yourself

Can you explain, with an example, why a risk and an assumption are different kinds of statements even though both represent uncertainty in a design? Can you describe why a low-likelihood, high-impact risk sometimes deserves more design attention than a high-likelihood, low-impact one?
