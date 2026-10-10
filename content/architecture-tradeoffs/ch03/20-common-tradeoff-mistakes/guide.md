# Lesson 20 — Common Tradeoff Mistakes

**Chapter 3 · Applying Tradeoffs · Lesson 20 of 20**

## What you'll learn

- The recurring mistakes architects make across every tradeoff in this course, named explicitly
- Why each mistake is tempting in the moment, and what it costs later
- How to catch yourself making one of these mistakes in real time
- How this closing lesson ties back to Lesson 1's original framing of what a tradeoff actually is

## This is the course's own self-check, made explicit

Lesson 16 asked you to self-check your practice scenarios against a handful of failure patterns. This closing lesson names all of those patterns fully, with the reasoning for why each one is tempting and what it actually costs — the same mistakes recur across security vs. usability, performance vs. complexity, build vs. buy, and everything else in this course, which is exactly why they're worth naming once, clearly, at the end.

## Mistake 1: Treating a "best practice" as universal

Lesson 1 opened with this one, and it's worth closing on it too, because it's the deepest mistake underneath most of the others. Following "always use Flow" or "always build real-time" without checking whether this org's actual constraints match the context that made that advice correct somewhere else is how a reasonable-sounding rule becomes the wrong answer for a specific scenario. The fix is the habit this whole course tried to build: ask what this org's actual needs are, not what the generic advice says.

## Mistake 2: Choosing the fashionable side, not the justified side

Real-time, programmatic, custom-built, and fully centralized all sound more sophisticated than batch, declarative, bought, and decentralized — and that reputational pull is a real, if silly, force on architecture decisions. An architect who picks the more impressive-sounding option because it's impressive-sounding, rather than because the scenario's actual facts justify it, has made a decision for the wrong reason even if it happens to land on the right answer. The tell: if you can't point to a specific fact about this scenario that the decision depends on, you were probably choosing based on how the answer sounds.

## Mistake 3: Presenting a decision as costless

Lessons 8 and 15 both warned about this: a decision explained without naming what's being given up isn't more persuasive, it's less trustworthy, because every real tradeoff has a cost and omitting it either means you haven't found it yet or you're hiding it. Either way, someone downstream discovers the hidden cost eventually, usually at a worse moment than if it had been named upfront.

## Mistake 4: Treating the decision as permanent

A decision made correctly for today's scale, team, and regulatory environment can become wrong as any of those change — and a tradeoff analysis that doesn't name the condition under which it should be revisited leaves nobody watching for that change. This is why every lesson in this course that covered a specific tradeoff ended with a question about what happens when the context shifts; it's not boilerplate, it's the part of the analysis most likely to get skipped under time pressure and most costly to have skipped later.

## Mistake 5: Misapplying a rule outside the context that made it correct

A rule learned from one scenario — "bulkify everything," "always use CDC over Platform Events," "centralize everything for consistency" — gets misapplied when the new scenario's specific facts (volume, team composition, regulatory context, timeline) don't actually match the conditions that made the original rule correct. The fix isn't to distrust every rule; it's to check, each time, whether the specific facts that justified the rule the first time are actually present this time.

## Mistake 6: Solving only the first tradeoff noticed in a compound scenario

Lessons 17 and 18 built case studies specifically because real scenarios often contain more than one tradeoff at once, and stopping analysis at the first one found — fixing the console's slow load time and declaring the project done, without noticing the tangled Flow and the governance gap sitting right next to it — leaves real problems unaddressed. The fix is the habit from those lessons: look for a second and third tradeoff before concluding the analysis is complete.

## Bringing it back to Lesson 1

Lesson 1 opened this course with three questions every tradeoff should answer: what are we optimizing for and what are we spending to get it, what does this specific org actually need, and what happens when the context changes. Every mistake in this lesson is, underneath, a failure to actually answer one of those three questions honestly — reaching for the generic answer instead of this org's actual need, ignoring the cost side of the first question, or skipping the third question about context change entirely. The skill this course has been building, across all twenty lessons, is the discipline to keep answering those three questions for real, every time, rather than letting a shortcut, a reflex, or a fashionable-sounding answer stand in for the analysis.

## Key terms

| Term | Meaning |
|---|---|
| Fashionable-side bias | Choosing the more impressive-sounding option in a tradeoff because of reputation rather than because the scenario's facts justify it |
| Costless-decision mistake | Presenting a tradeoff recommendation without naming what's being given up, which reduces trust rather than increasing it |
| Permanence mistake | Treating a tradeoff decision as settled forever, with no named condition for revisiting it as context changes |
| Context-mismatch misapplication | Reusing a rule from one scenario in a new scenario without checking whether the facts that justified it the first time are actually present |

## Lab

Review your own Lesson 16 practice-scenario answers and your Lesson 17/18 case study ADRs. For each one, check it against all six mistakes in this lesson and write one sentence per mistake confirming you avoided it, or one sentence identifying where you actually made it and how you'd fix that specific answer now.

## Check yourself

Can you name all six common tradeoff mistakes from this lesson, and for each one, state specifically what makes it tempting to make in the moment? Can you explain how each of the six mistakes traces back to a failure to honestly answer one of Lesson 1's three original questions?
