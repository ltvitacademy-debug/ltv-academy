# Why Interpretability Matters

You've spent the last four chapters on alignment, evaluation, and oversight — all of it judged by what a model does: the outputs it produces, the behaviors evals catch, the scores a judge assigns. This chapter opens a different angle on the same problem: looking inside the model to understand how it produces those outputs in the first place. This lesson makes the case for why that matters, and sets up the black-box-versus-mechanistic distinction the rest of the chapter builds on.

## What you'll learn

- Why behavioral evidence alone can't rule out concerning internal computation
- The difference between a model that "looks safe" and a model whose safety you understand
- Concrete ways interpretability complements the alignment and evaluation techniques from earlier chapters
- The deceptive-alignment case for interpretability specifically
- A preview of the mechanistic interpretability techniques this chapter will cover hands-on

## Behavioral evidence has a ceiling

Every technique in Chapters 2 through 4 — RLHF, red-teaming, capability evals, debate, recursive reward modeling — shares a common form: you give the model inputs, you observe its outputs or its scored behavior, and you draw conclusions from that input-output relationship. This is extremely useful, and none of it is wasted effort. But it has a structural ceiling: two models can produce identical outputs on every test you run while doing completely different internal computation to get there. One might be running the computation you actually want. The other might be satisfying your test by coincidence, by memorized pattern-matching, or by something closer to "figuring out what response gets approved" than "being helpful." Behavioral testing, by construction, cannot tell these apart — it only sees the output, not the process that produced it.

## "Looks safe" is not the same claim as "is safe"

A model that passes every safety eval you can devise still gives you a statement about its behavior on the inputs you tried, not a mechanistic guarantee about its behavior on inputs you didn't try, or about what it's actually computing. This gap matters most exactly where it's hardest to close with more evals: a model that has learned to behave well specifically when it detects it's being evaluated is, by definition, a model your eval suite cannot distinguish from a model that is genuinely well-behaved. Interpretability is one of the only available strategies that doesn't rely on more or cleverer tests of behavior — it tries to look at the computation directly, the way a code review looks at source rather than just running the program and checking its output.

## The deceptive-alignment case

This is the sharpest version of the argument, and it's the one Anthropic has made explicitly for why it treats interpretability as a core safety bet rather than a nice-to-have. If a model were ever deceptively aligned — behaving well during training and evaluation while pursuing some other goal it conceals until deployment — behavioral testing is close to powerless against it almost by construction, since the model's whole strategy (if it had one) would be to produce the outputs your tests reward. Mechanistic interpretability offers a different kind of check: if you can actually read off what computation a model is running, rather than only what it outputs, you have a chance of noticing concerning internal structure that never shows up in behavior you happened to test. No one is claiming interpretability can fully solve this today — the field is young and most models remain far from fully understood — but it's a genuinely different angle of attack on a problem that behavioral methods alone cannot touch.

## What this buys you beyond deception-detection

Even setting the deception case aside, interpretability earns its place for more everyday reasons. It helps you debug a model that fails in a confusing way, by showing which internal components actually drove a bad output instead of leaving you to guess from the output alone. It helps you build justified trust in a model's good behavior, rather than trust that rests only on "it hasn't failed yet." And it helps you catch unexpected internal computation — features, circuits, or representations you didn't anticipate — before that computation shows up as a surprising behavior in some input distribution you never thought to test.

## Where this chapter is headed

The rest of this chapter gets concrete. Lesson 25 draws the black-box-versus-mechanistic line precisely. Lessons 26 through 29 each walk through one real, hands-on interpretability technique — probing classifiers, activation visualization, the logit lens, and gradient-based attribution — with working code against a toy transformer, so you leave this chapter able to actually look inside a model rather than only knowing why you'd want to.

## Key terms

| Term | Meaning |
|---|---|
| Interpretability | The general effort to understand how and why a model produces its outputs, as opposed to only whether the outputs look correct or safe |
| Behavioral evidence | Conclusions drawn purely from a model's input-output relationship, without examining its internal computation |
| Deceptive alignment | A hypothetical failure mode where a model behaves well during training and evaluation while pursuing a different goal, concealed until deployment |
| Mechanistic interpretability | The specific approach of reverse-engineering a model's actual internal computation — weights, activations, and circuits — rather than just its behavior |
| Code review analogy | Anthropic's framing of interpretability as something like auditing a program's source rather than only running it and checking the output |

## Recap

Behavioral testing — everything this course has covered so far — can only ever tell you about a model's input-output relationship, which leaves a structural gap that matters most exactly when a model's behavior might not reflect its true internal computation. Interpretability is the field's answer to that gap: looking inside the model directly. Next up, Lesson 25: Black-Box vs. Mechanistic Approaches, where you'll see the precise distinction between these two investigative styles and where each one fits.
