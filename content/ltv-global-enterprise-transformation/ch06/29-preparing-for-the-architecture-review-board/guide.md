# Lesson 29 — Preparing for the Architecture Review Board

**Chapter 6 · Defense · Lesson 29 of 33**

## What you'll learn

- How to convert Chapter 5's deliverables into actual defense preparation, not just paperwork
- The specific evaluation domains LTV Global's ARB will check this design against
- A rehearsal method for each of the five key ADRs from Lesson 25
- Why "I don't know, but here's how I'd find out" is a legitimate, prepared answer

## From deliverables to defense readiness

Every deliverable in Chapter 5 now gets used for its actual purpose: defense preparation. The diagrams (Lessons 23-24) are what you'll reference and point to under questioning, not re-derive live. The formalized risk register and ADRs (Lesson 25) are the specific, pre-thought-out answers to the questions a board is almost certain to ask. The roadmap (Lesson 26) is what you'll defend when someone asks why Parts & Aftermarket wasn't built first. None of this is new work — it's converting documents into readiness.

## The evaluation domains LTV Global's ARB will check

Consistent with how a well-run architecture review board operates generally, LTV Global's board evaluates this design against the same domains: **requirements traceability** (does every major decision map back to a stated requirement from Lesson 2, or is some of it just preference?); **scalability and performance** (does the design hold up at LTV Global's actual 10,000-user, millions-of-records volume, not a pilot's volume?); **security** (does the Lesson 11 design actually protect what it claims to, including the EMEA GDPR question?); **integration** (does the Lesson 13 hub design handle a slow or down external system gracefully?); **data model and data quality** (does Lesson 9's model hold up after two years of real-world edge cases?); **governance and maintainability** (does Lesson 22's CoE actually survive staff turnover, or just claim to?); and **risk and tradeoffs** (what did the design choose not to do, and was that informed or an oversight?).

## Rehearsing the five ADRs

Lesson 25's five architecture decision records are the highest-probability questions in the entire defense. A rehearsal method that works: for each ADR, practice stating the decision, the rejected alternative, and the reason for rejection, out loud, in under thirty seconds, with no notes. If you can't do this fluently for ADR-03 (LedgerPoint batch vs. real-time) without checking Lesson 14 again, that's exactly the gap this lesson exists to close before the real defense, not during it.

## "I don't know, but here's how I'd find out" is a real answer

Not every possible question has a pre-written answer in this capstone's deliverables, and pretending otherwise under live questioning is a worse failure mode than admitting a gap. A board member might ask a detail this course's lessons never specified — the exact field-level encryption key rotation policy, say. The correct response isn't inventing a confident-sounding number on the spot; it's naming the right mechanism to find the real answer ("that's Shield Platform Encryption's key rotation policy, which I'd confirm against the client's security team's actual requirement before committing to a specific cadence") — demonstrating you know *where* the answer lives even when you don't have it memorized.

## What "ready" actually looks like

Readiness for Chapter 6 isn't memorizing every lesson's exact wording — it's being able to explain any of this capstone's thirteen design areas, unprompted, starting from "what was decided" through "why," through "what was rejected and why," without needing to open the TAD to check. Lessons 30 and 31 give you two mock defenses to actually test that readiness before Lesson 32's final defense.

## Key terms

| Term | Meaning |
|---|---|
| Defense readiness | The ability to explain a decision, its reasoning, and its rejected alternatives unprompted, without reference material |
| Evaluation domain | A specific category (security, scalability, integration, etc.) a board systematically checks a design against |
| "I don't know, but here's how I'd find out" | A legitimate answer naming the correct mechanism to resolve a gap, rather than inventing a confident guess |

## Lab

Pick the ADR from Lesson 25 you feel least confident defending from memory right now. Write out, in under thirty seconds' worth of spoken words (roughly 60-80 words), the decision, the rejected alternative, and the reason for rejection — then check it against Lesson 25's actual text and note exactly what you got wrong or left out.

## Check yourself

Can you name the seven evaluation domains LTV Global's ARB will check this design against? Can you explain, in your own words, why "I don't know, but here's how I'd find out" is a stronger answer in a real defense than a confidently invented guess?
