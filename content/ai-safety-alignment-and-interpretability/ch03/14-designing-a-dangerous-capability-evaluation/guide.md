# Designing a Dangerous-Capability Evaluation

The last lesson named the categories labs test for — cyber-offense, bio/chem uplift, autonomous replication, persuasion — but naming a category isn't the same as building an evaluation that actually measures it. This lesson gets concrete: the real structural pieces that go into designing a dangerous-capability evaluation, from task design through scoring, and the containment considerations that apply to the evaluation itself.

## What you'll learn

- How task design works for a dangerous-capability evaluation, and why difficulty needs to span a meaningful range
- Why uplift over a baseline, not a raw pass/fail score, is the metric that actually matters
- How human-in-the-loop scoring works and why it's still necessary at the frontier
- The containment and ethical considerations that apply to running the evaluation itself

## Task design

A dangerous-capability evaluation is built from a suite of concrete tasks, each one a specific, scoreable instance of the capability being tested — not a single question, but a graded set. METR's publicly released autonomy task suite is a working example: tasks range from things a non-expert human could do in a few minutes to things that would take an experienced professional on the order of a day, spanning software engineering, ML engineering, cybersecurity, and open-ended research. That range matters because a model that can only pass the easiest tasks and a model that can pass the hardest ones represent very different risk levels, and a suite with only easy tasks can't tell them apart.

Task design for this kind of evaluation also has to resist contamination: if the exact task and its solution are published and end up in a model's training data, the model can appear far more capable than it is by having memorized the answer rather than worked out the task. METR addresses this by publishing full source for only a subset of its tasks and keeping the rest available on request — a tradeoff between transparency and keeping the evaluation meaningful, a tension the next lesson covers in more depth.

## Measuring uplift, not raw performance

Raw task success is a weak signal on its own for the categories that matter most. The question that actually determines risk is **uplift**: how much more capable does the model make someone at the dangerous task, compared to what that person could already do with existing resources, like a search engine or a standard textbook? A model that can recite steps already freely available online isn't providing meaningful uplift even if it "passes" the task. A model that closes a real gap — supplying judgment, troubleshooting, or synthesis a person couldn't easily get elsewhere — is a different story even at a lower raw score.

This is why serious dangerous-capability evaluations compare a baseline condition (a human with ordinary resources) against an assisted condition (the same human with model access), rather than reporting the model's standalone score as if it meant anything by itself.

## Human-in-the-loop scoring

At the frontier, dangerous-capability tasks are often open-ended enough that automated grading can't reliably tell whether a model's output actually achieved the dangerous outcome — writing working exploit code, for instance, or giving genuinely actionable synthesis guidance rather than something that looks plausible but wouldn't actually work. Human experts review the model's output and judge whether it meets the task's success criteria, which keeps the evaluation anchored in a real-world outcome rather than a surface pattern a model might satisfy without actually being capable. METR's example evaluation protocol is built explicitly around this kind of human judgment, paired with formal elicitation guidelines so the human scorers are evaluating the model's best possible attempt rather than an under-elicited one.

## Containment and ethics of the evaluation itself

Designing a dangerous-capability evaluation means deliberately eliciting the exact behavior the eval exists to screen out — which creates a real responsibility to contain the evaluation itself. In practice this means: running elicitation and scoring in controlled environments without external network access where uplift could translate into real-world harm, restricting detailed task content (especially in bio/chem domains) to people with a legitimate need to know, and never publishing a working exploit or synthesis pathway as part of reporting results. The evaluation has to produce a risk signal without itself becoming a source of the risk it's measuring.

## Key terms

| Term | Meaning |
|---|---|
| Task suite | A graded set of concrete, scoreable tasks spanning a meaningful difficulty range, used to test a dangerous capability |
| Contamination (evaluation) | When task content or solutions leak into training data, inflating a model's apparent capability through memorization rather than genuine ability |
| Uplift | How much more capable a model makes a person at a dangerous task compared to their baseline resources, such as a search engine |
| Human-in-the-loop scoring | Having human experts judge whether a model's output actually meets a task's real-world success criteria, rather than relying on automated grading alone |
| Containment (of an evaluation) | Operational and ethical safeguards that prevent the evaluation process itself from producing real-world uplift or harm |

## Recap

A real dangerous-capability evaluation is a graded task suite, scored against a baseline to measure genuine uplift rather than raw pass/fail, checked by human experts, and run under containment that keeps the test itself from becoming a source of harm. The next lesson, "Eval Design Pitfalls," looks at what goes wrong when any of these pieces is built carelessly — contamination, prompt sensitivity, saturation, and weak construct validity.
