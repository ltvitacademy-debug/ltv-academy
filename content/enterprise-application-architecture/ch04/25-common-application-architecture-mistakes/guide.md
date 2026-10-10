# Lesson 25 — Common Application Architecture Mistakes

**Chapter 4 · Exam Preparation · Lesson 25 of 25**

## What you'll learn

- A consolidated list of the recurring mistakes this course has warned about, gathered in one place
- Why most architecture mistakes aren't about not knowing a fact, but about skipping a step under pressure
- How to use this list as a pre-build and pre-review checklist going forward
- How this closing lesson ties back to Lesson 1's framing of what the role actually is

## Mistakes are usually process failures, not knowledge gaps

Looking back across this course, the recurring mistakes aren't failures to know a Salesforce feature exists — they're failures to apply a known process under real-world pressure: a deadline, an eager stakeholder, a feature that seems simple enough to skip the usual steps for. This final lesson gathers those recurring mistakes in one place, each tied back to the lesson that covered the discipline that prevents it.

## The consolidated list

- **Designing straight from the stated request, without digging for the underlying need** (Lesson 2). The fix is a disciplined intake, every time, even when the request sounds simple.
- **Jumping to a data model before the domain model is settled** (Lesson 3). The fix is getting the business reality right, independent of Salesforce, before mapping anything to objects.
- **Letting an org accrete into an undifferentiated monolith with no application boundaries** (Lesson 4). The fix is deliberately evaluating ownership, audience, and reuse signals before bolting a new capability onto an existing app.
- **Treating "declarative-first" as a slogan instead of a starting point for judgment**, building everything in Flow even once a requirement has clearly outgrown it, or reaching for Apex out of habit when nothing justifies its cost (Lesson 5). The fix is applying the actual factors, every time, to the actual requirement.
- **Multiple triggers on one object with no handler pattern, and Flow sprawl with no naming convention** (Lessons 6, 9). The fix is one trigger per object delegating to a handler, and a consistent naming and documentation discipline applied continuously, not as a cleanup project.
- **Skipping straight to "build fully custom" without checking whether a standard feature already covers the need** (Lesson 7). The fix is honestly working the build/configure/buy spectrum in order.
- **Assuming a design that works at today's volume will keep working, with no scalability evaluation against realistic future volume** (Lesson 8). The fix is asking the volume question during intake, not discovering the answer at scale.
- **Treating technical debt as either always wrong or invisible** (Lesson 11). The fix is making debt a deliberate, documented, visible decision.
- **Building generic, reusable, or future-proofed structures before a second real use case or a plausible signaled need justifies them** (Lessons 10, 14) — premature abstraction's various disguises.
- **Skipping design review, or treating it as a rubber stamp instead of a genuine check against the full quality-attribute list** (Lesson 20).
- **Making a significant decision and never writing down why**, leaving a future maintainer unable to tell a deliberate trade-off from an accident (Lesson 22).

## Why this list is worth memorizing as a checklist, not just reading once

Every item on this list describes a *known* discipline this course already taught in detail — none of them are a surprise by the time you reach this lesson. The value of consolidating them here is turning scattered lessons into a single, fast pre-build and pre-review pass: before a design goes to review, or during review itself, running down this list takes a few minutes and catches the same categories of mistake that, left unchecked, tend to resurface project after project regardless of how skilled the individual architect is.

## Back to where this course started

Lesson 1 opened by distinguishing "it works" from "it's well-architected." Every mistake on this list is a way a solution can work in the short term while still failing that second, higher bar — and every fix on this list is a discipline, not a secret piece of trivia. That's the actual shape of the Application Architect's job: not knowing more facts than an Admin or a Developer, but consistently applying a set of disciplines — requirements analysis, domain modeling before data modeling, deliberate tool choice, quality-attribute awareness, and honest documentation — under exactly the deadline and stakeholder pressure that makes skipping them tempting every single time.

## Key terms

| Term | Meaning |
|---|---|
| Process failure | A mistake caused by skipping a known discipline under pressure, rather than by lacking knowledge |
| Pre-build checklist | Using this course's consolidated mistake list as a fast review pass before or during design review |

## Lab

Pick any one design you've worked through in this course's labs (the warranty-claims domain model, the Claim-approval automation note, or the Harborline case study). Run it against this lesson's consolidated mistake list, item by item, and identify the single item you'd most want a reviewer to double-check on that specific design, and why — given everything you now know about where real architecture mistakes tend to come from.

## Check yourself

Can you name at least six of the recurring mistakes from this lesson's consolidated list, each tied to the earlier lesson that taught the discipline preventing it? Can you explain, in your own words, why this course frames architecture mistakes as process failures under pressure rather than knowledge gaps — and why that framing means the fix is a habit, not a fact to memorize?
