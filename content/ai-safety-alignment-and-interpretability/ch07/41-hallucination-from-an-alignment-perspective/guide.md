# Hallucination From an Alignment Perspective

Hallucination — a model confidently generating fabricated facts, citations, or details — is usually introduced as a capabilities or reliability problem. This lesson reframes it through an alignment lens: hallucination as a training-incentive problem, where the way models are evaluated and rewarded systematically favors confident guessing over honest uncertainty. That reframing connects directly to Lesson 40's calibration research and gives a concrete, actionable target for reducing hallucination that doesn't require solving factual recall from scratch.

## What you'll learn

- Why OpenAI's 2025 research frames hallucination as a statistical and incentive artifact, not a mysterious glitch
- The binary-classification analogy: why "I don't know" loses to a confident guess under standard grading
- Real illustrative numbers from a GPT-5 system card eval comparing an abstention-heavy model to a guess-heavy one
- Why the proposed fix targets evaluation scoring rather than adding more hallucination-specific benchmarks
- How this connects back to calibration (Lesson 40) and forward to deception (Lesson 39)

## Hallucination as a statistical, not mysterious, artifact

OpenAI's 2025 paper "Why Language Models Hallucinate" argues for a specific, almost mundane explanation: pretraining optimizes a model to predict plausible continuations of text, and if a particular fact (say, a rare date or a specific person's birthday) cannot reliably be distinguished from an equally plausible but wrong alternative using the patterns available in training data, the model will sometimes produce the wrong one with full confidence — not because it is confused or "trying" to deceive, but because the underlying prediction problem is, in a precise statistical sense, equivalent to a classification problem with an irreducible error rate. This is the key alignment-relevant distinction from Lesson 39's definition of deception: a hallucinating model has no access to a true answer it is concealing. It isn't choosing to withhold or misstate anything — it genuinely cannot reliably tell its wrong guess from a right one.

## Why training and evaluation reward guessing

The paper's more actionable claim is about what happens *after* pretraining, during the evaluation and fine-tuning process that shapes a model's behavior day to day. Most benchmarks grade answers as simply right or wrong. Under that scheme, a model that says "I don't know" gets zero credit — exactly the same score as a model that confidently states a wrong answer. A model that always guesses when uncertain will, on average, score higher on these benchmarks than a model that abstains when uncertain, even though the guessing model produces more hallucinations. The paper's analogy is a student taking a multiple-choice exam with no penalty for a wrong guess: the rational strategy is to guess rather than leave the question blank, even if you don't know the answer. Because so much of model development is driven by benchmark leaderboards that use exactly this scoring scheme, the training process ends up selecting for models that are good at confident guessing rather than good at knowing what they don't know.

## A concrete illustration

The OpenAI research used a real evaluation (SimpleQA, as reported in a GPT-5 system card) to illustrate the effect with two models evaluated on the same questions:

```
Model                    Abstention rate   Accuracy   Error rate
gpt-5-thinking-mini            52%            22%         26%
o4-mini                          1%            24%         75%
```

The second model answers almost every question and is marginally more accurate in absolute terms, but it hallucinates roughly three times as often, because it almost never abstains. A naive read of "accuracy" alone would miss this entirely; the hallucination rate is the number that reveals the cost of near-zero abstention.

## The proposed fix: change the scoring, not just the benchmarks

Given this framing, the paper argues that adding more hallucination-specific benchmarks will not fix the underlying problem, because the dominant leaderboards that actually drive model development still reward confident guessing. The proposed remedy is to change how the existing, widely used benchmarks are scored — for example, penalizing confident wrong answers more than abstentions, or giving partial credit for appropriately expressed uncertainty — so that calibrated abstention becomes the winning strategy rather than a losing one. This is exactly the capability Lesson 40 described: a model that can express calibrated uncertainty in words has what it needs to abstain appropriately, but it will only be trained to actually use that capability if the evaluation scheme stops penalizing it for doing so.

## Key terms

| Term | Meaning |
|---|---|
| Hallucination | A model confidently generating a factually incorrect statement, with no access to a true answer it is concealing |
| Binary-classification framing | Treating "is this statement true?" as a classification problem with an irreducible error rate, explaining hallucination statistically |
| Abstention | A model declining to answer, or expressing explicit uncertainty, rather than guessing |
| Right/wrong grading | A benchmark scoring scheme that gives zero credit for both abstention and a wrong guess, incentivizing guessing |
| Calibrated scoring | An evaluation scheme that rewards appropriately expressed uncertainty rather than penalizing all non-answers equally |

## Recap

Hallucination, viewed through an alignment lens, is less a mysterious capability gap and more a predictable consequence of grading schemes that reward confident guessing over honest abstention — a problem that traces directly back to the binary right/wrong scoring used across most benchmarks, and that connects to the calibration research from Lesson 40. Lesson 42 turns from explaining these behaviors to the harder practical question of detecting them: how researchers probe for sycophancy, deception, and miscalibration in practice, including methods that reach into a model's internals.
