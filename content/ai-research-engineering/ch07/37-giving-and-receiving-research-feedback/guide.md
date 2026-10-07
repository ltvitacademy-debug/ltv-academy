# Giving & Receiving Research Feedback

Feedback on research work has a different shape than a typical code review. A code review mostly asks "does this do what it's supposed to do, cleanly" — the spec is usually clear. Feedback on a research result has to engage with a messier question: "is this conclusion actually supported by this evidence," where the spec itself (what would even count as sufficient evidence) is often part of what's being debated. This closing lesson covers how to give that kind of feedback usefully, and how to receive it without treating a question about the evidence as a personal critique.

## What you'll learn

- Why "is this result real" is a different kind of review than "is this code correct"
- Specific, actionable feedback moves: asking for the control that's missing, asking about seed count, asking what the result would look like if the hypothesis were false
- Separating feedback on the evidence from feedback on the idea
- Receiving critical feedback on a result without treating it as a referendum on competence

## Research feedback targets the evidence, not just the code

A pull request review checks whether the implementation matches an agreed-on spec. A research result review checks something harder to pin down: whether the specific evidence presented actually supports the specific claim being made. The most useful form this takes is a short set of concrete, answerable questions, not a vague "I'm not convinced":

- How many seeds? What's the variance across them?
- What's the baseline, and was it given the same tuning budget as the treatment?
- What would this result have looked like if the hypothesis were false — and can you distinguish that from what you're showing?
- Is there a confound — something other than the variable of interest that differs between the two conditions being compared?

These are the same questions Lessons 33-34 covered from the writer's side; reviewing is largely checking that the writer already answered them.

## Separate feedback on the evidence from feedback on the idea

A reviewer can believe a hypothesis is plausible and still correctly flag that the specific experiment presented doesn't support it yet — "I think sparsity probably does help here, but one seed with no LR sweep for the sparse variant doesn't show that yet" is a coherent, useful piece of feedback that isn't a rejection of the idea. Conflating "I don't believe this evidence is sufficient" with "I don't believe this idea" is a common failure mode on both sides of a research feedback exchange, and naming the distinction explicitly — "the idea seems promising, the evidence isn't there yet" — defuses a lot of unnecessary friction.

## Receiving feedback on a result

The natural reaction to "I don't think this result is solid yet" can feel like a personal critique, especially after weeks of work on an experiment — but the useful reframe is that a reviewer poking at the evidence is doing exactly the job a researcher should want someone to do before a wrong conclusion gets reported or built upon. A request for another seed, a missing baseline, or a confound check is cheap relative to the cost of a wrong conclusion propagating into a report, a follow-up project, or a published claim. Treating "can you add a baseline" as an attack rather than as the system working as intended is the single most common reason feedback cycles on research results turn unproductive.

## A short checklist for giving feedback well

Before sending feedback on a result, it's worth checking that each point is specific enough to act on: "I'm skeptical" isn't actionable, "what's the seed count, and did you sweep LR independently for the treatment" is. Feedback that names a specific missing control or a specific alternative explanation for the result gives the author something concrete to either address or rebut — which is the actual goal of the exchange, not simply registering doubt.

## Key terms

- **Evidence review** — feedback that checks whether the presented evidence actually supports the specific claim being made, distinct from checking code correctness
- **Confound check** — asking whether something other than the variable of interest differs between the compared conditions, which would make the result ambiguous
- **Idea vs. evidence distinction** — separating skepticism about whether a specific experiment's evidence is sufficient from skepticism about the underlying hypothesis itself
- **Actionable feedback** — a specific, answerable question or named missing control, as opposed to an unspecific expression of doubt
