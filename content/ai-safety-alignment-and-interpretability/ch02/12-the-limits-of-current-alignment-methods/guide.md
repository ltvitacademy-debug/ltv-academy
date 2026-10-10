# The Limits of Current Alignment Methods

This chapter covered four distinct techniques — RLHF, Constitutional AI (and RLAIF more broadly), red-teaming, and refusal training. Each one is real, useful, and already deployed at scale in production models. This closing lesson doesn't introduce a new technique; it steps back and names what all four actually have in common, and why that common limitation is the reason the rest of this course exists.

## What you'll learn

- The common thread running through RLHF, Constitutional AI, red-teaming, and refusal training
- Why every one of these methods ultimately rests on human or human-derived judgment
- Why that reliance doesn't obviously scale to tasks or models that exceed human evaluation ability
- How this gap motivates the next two chapters: evaluations, then scalable oversight

## Four methods, one common thread

RLHF shapes behavior against a reward model fit to human preference labels. Constitutional AI and RLAIF shape behavior against an AI judge, itself grounded in a document humans wrote. Red-teaming finds places where trained behavior fails, using human and automated testers working from human-set goals about what counts as a failure. Refusal training shapes a specific class of that behavior — when to say no — using the same fine-tuning and RLHF machinery as everything else. Four different mechanisms, one shared property: every one of them primarily shapes the model's **observed behavior**, and none of them comes with a built-in guarantee that the change runs deeper than that.

## The judgment behind every one of them

Look at where the standard being optimized toward actually comes from in each case, and a pattern holds up. RLHF's standard comes directly from human raters. Constitutional AI's standard comes from a document human authors wrote, even though the moment-to-moment judgments are made by an AI. Red-teaming's standard for what counts as a "bad" output comes from human-set policies about what shouldn't be produced. Refusal training's categories of what to refuse are themselves human-chosen. None of these methods derive their standard from anywhere other than human judgment, applied either directly or through a tool (a reward model, an AI judge) trained on human-derived input.

## Why this doesn't obviously scale

That reliance is fine as long as the humans doing the judging can actually evaluate what they're judging. The scalability ceiling named back in lesson seven is the general version of this problem: a rater, a constitution author, or a red-teamer can only reliably assess outputs within reach of their own expertise. As models are pushed toward tasks that are harder to verify — dense technical work, long multi-step reasoning, domains where even an expert struggles to check the answer — the judgment these methods are built on gets less reliable exactly where it matters most. This isn't a flaw unique to any one of the four methods; it's a property of relying on human or human-derived evaluation as the alignment target in the first place, no matter how it's implemented.

## What's next: evaluations, then scalable oversight

Two things follow directly from naming this gap. First, before trying to fix it, the field needs reliable ways to actually measure where models stand — which is the subject of the next chapter, on evaluations. Second, once the gap is measured, something has to be done about the part of it that human judgment structurally can't reach on its own: techniques collectively known as **scalable oversight**, which try to extend reliable evaluation and training signal to tasks that exceed what a human judge can directly assess. Nothing in this chapter is wasted by that framing — RLHF, Constitutional AI, red-teaming, and refusal training remain genuinely useful, deployed techniques. They are simply not, on their own, a complete answer to the problem this course is built around.

## Key terms

| Term | Meaning |
|---|---|
| Surface-level alignment | a change in a model's observed behavior that isn't guaranteed to reflect a corresponding deeper change in how that behavior is generated |
| Human-derived judgment | a standard that traces back to human evaluation, whether applied directly (a human rater) or through an intermediate tool (a reward model, an AI judge trained on a human-written constitution) |
| Scalability ceiling | the limit on how well human or human-derived judgment can evaluate outputs on tasks that exceed the judge's own expertise |
| Scalable oversight | the general name for techniques aiming to extend reliable evaluation and training signal to tasks beyond what a human judge can directly assess, introduced here and covered starting next chapter |

## Recap

RLHF, Constitutional AI, red-teaming, and refusal training all ultimately trace back to human or human-derived judgment, and that judgment doesn't obviously scale to tasks or models that exceed what a human evaluator can directly assess — a real ceiling on this chapter's whole toolkit, not a flaw in any one method. That gap is exactly why the course turns next to measuring it directly (Chapter 3: evaluations for safety) before tackling how to extend oversight past it (Chapter 4: scalable oversight). Next up, Lesson 13: capability evaluations vs. safety evaluations.

