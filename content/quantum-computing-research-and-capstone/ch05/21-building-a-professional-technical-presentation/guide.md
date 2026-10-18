# Building a Professional Technical Presentation

A written report and a presentation serve different purposes, even when they cover the same work. This lesson is about building the presentation version of your capstone — for a technical audience that could ask you hard questions about your methods.

## What you'll learn

- How a technical presentation's structure differs from the written report's structure, and why
- A slide-by-slide outline for a 10-15 minute capstone presentation
- How to anticipate and prepare for the hard technical questions your specific results invite
- A worked presentation outline for the running GHZ/ZNE capstone
- Common presentation mistakes that undercut strong underlying work

## Why presentation structure differs from report structure

A written report can be read at the reader's own pace, re-read, and skipped around in — a presentation is linear and time-boxed, so it needs a different shape: lead with the question and the headline finding, then support it, rather than building up to a conclusion the way the report's methods-first structure does. A technical audience specifically wants to see enough methodology to trust the result, but doesn't need (and won't sit through) the full level of methods-section detail your written report contains — your job is choosing which details earn a slide and which stay in the backup/appendix.

## A slide-by-slide outline (10–15 minutes)

1. **Title + one-sentence question** — what you investigated, in a sentence a non-expert in your specific sub-topic could still follow.
2. **Motivation** — why this question matters, briefly (1 slide, not a full literature review).
3. **Hypothesis** — stated clearly, using your Lesson 12 language, before showing any results — this lets the audience judge your results against your own stated prediction, not a reframed one (directly enforcing Lesson 17's anti-HARKing discipline in front of an audience).
4. **Method, at the right altitude** — circuit diagram, key parameters, hardware named — enough for a technical audience to assess validity, not your full build log.
5. **Results** — your main figure/table, the actual numbers, with a sentence captioning what it shows.
6. **Limitations** — do not skip or rush this slide; a confident, concise limitations slide is read by a technical audience as a sign of credibility, exactly as Lesson 20 argued for the written report.
7. **Conclusion** — your bounded, scoped takeaway, tied back to the hypothesis slide.
8. **Backup slides** (not presented unless asked) — the detail a technical audience might probe in Q&A: full run log summary, raw data, the calibration-gap diagnosis from Lesson 17, exact extrapolation fit parameters.

## Anticipating hard technical questions

Before presenting, list the three hardest questions a skeptical technical reviewer could ask about your specific result, and prepare a real answer for each — not to memorize a script, but so you're not caught flat-footed. For the running example: "How do you know the calibration-window gap, not something else, explains the original discrepancy?" (answer: the same-window retry reversed the pattern, which is direct evidence); "Why only 3 and 5 qubits, not a denser sweep?" (answer: time/queue-budget scoping decision, stated honestly, per Lesson 13); "Is 1,024 shots enough to trust these numbers?" (answer: reference your Lesson 5/16-style significance check directly).

## A worked presentation outline

For the running capstone: slide 3 states the hypothesis exactly as written in Lesson 12 (including the specific 3-vs-5-qubit relative-magnitude claim). Slide 5's results slide shows both the original and corrected comparisons side by side, since that comparison *is* part of the finding (per Lesson 20's limitations excerpt) — hiding the original, confounded run would actually make the presentation less credible to a technical audience, not more polished.

## Common presentation mistakes

- Spending too much time on methods detail that belongs in backup slides, running out of time before the results and limitations slides.
- Presenting only the clean, final result and omitting the confound-and-correction story, which is often the most interesting part of the actual research process.
- Reading dense text directly off slides rather than using slides to support a spoken explanation.

## Key terms

| Term | Meaning |
|---|---|
| Backup slides | Supporting detail prepared but not presented unless specifically asked for in Q&A |
| Right altitude | The level of methodological detail appropriate for a time-boxed technical audience, distinct from full written detail |

## Check yourself

A technical audience member asks: "Why should I trust the corrected 5-qubit result over the original one?" Using the running capstone's actual diagnosis (Lesson 17) and the worked presentation's slide 5 approach, draft a concise, honest spoken answer.
