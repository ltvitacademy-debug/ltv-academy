# Truthfulness & Calibration Research

This lesson covers two related but distinct properties that behavioral researchers try to measure directly: truthfulness, whether a model's stated answers avoid known falsehoods, and calibration, whether a model's expressed confidence matches its actual accuracy. Neither one is the same as the behaviors covered in the previous two lessons. A model can be perfectly calibrated and still sycophantic (it might accurately report "I'm 90% sure" right up until a user pushes back). A model can be truthful on a benchmark and still not deceptive in the technical sense, because truthfulness is about the content of answers, not about intent.

## What you'll learn

- How TruthfulQA measures truthfulness and why it found an inverse-scaling result
- What "imitative falsehoods" are, and why they are a different failure mode than hallucination
- What calibration means precisely, and how to read a calibration curve
- How researchers taught a model to express calibrated uncertainty in words, not just in raw probabilities

## Truthfulness and TruthfulQA

Truthfulness research asks a narrower, more measurable question than "is the model aligned": does the model avoid asserting things that are false, specifically the kinds of false claims that are common human misconceptions? TruthfulQA (Lin, Hilton, and Evans, 2021) built a benchmark of 817 questions across 38 categories — health, law, finance, politics, and more — deliberately written so that some humans would answer them wrongly because of a widespread false belief (for example, questions that bait a "common sense" wrong answer about what happens if you swallow gum, or who really invented a famous device). The benchmark isolates a specific failure: a model trained on huge amounts of human-written text can learn to reproduce a popular misconception fluently and confidently, because that misconception is well-represented in its training data. The paper's striking result was an inverse-scaling pattern on the models it tested: larger models were, if anything, slightly less truthful on this benchmark than smaller ones, because scaling helped the models imitate human text (including its errors) more faithfully, which is the opposite of what pure capability-scaling intuitions would predict. The paper calls these "imitative falsehoods" — false statements the model produces not because it is guessing or confabulating, but because they are genuinely common in the text it was trained on.

## Calibration: confidence matching accuracy

Calibration is a different, complementary property. A model is well-calibrated if, among all the times it states (or implies) a given confidence level, its actual accuracy matches that confidence level. If a model says "I'm 90% confident" across many different questions, roughly 90% of those answers should turn out to be correct — not 99%, which would mean the model is underconfident, and not 60%, which would mean it is dangerously overconfident. This can be visualized as a calibration curve plotting stated confidence against empirical accuracy, bucketed across many predictions:

```
Stated confidence bucket   Answers in bucket   Correct   Empirical accuracy
90-100%                           40               38           95%   (well-calibrated)
70-89%                             30               18           60%   (overconfident)
50-69%                             20               13           65%   (slightly underconfident)
```

A perfectly calibrated model's curve would sit on the diagonal line where stated confidence equals empirical accuracy at every bucket. Overconfidence (bars falling below the diagonal) is the more safety-relevant failure, because it means users are being given unwarranted certainty.

## Teaching models to express calibrated uncertainty

Calibration was historically measured using a model's raw token probabilities (logits), which are not always available or meaningful for instruction-tuned, RLHF'd chat models. Lin, Hilton, and Evans's follow-up work, "Teaching Models to Express Their Uncertainty in Words" (2022), tackled a more practical version of the problem: can a model state its confidence in natural language ("I'm fairly confident," "I'd guess around 70%") such that those stated words are themselves calibrated, without relying on internal logits at all? Using a custom benchmark called CalibratedMath, they found that GPT-3 could be trained to produce verbalized confidence levels that mapped to well-calibrated probabilities, and that this calibration held up reasonably well even under distribution shift to new types of questions. This result matters practically: it means calibration is something that can be directly trained for and measured in a chat interface, not just something you'd need API access to raw probabilities to assess.

## How this differs from sycophancy and hallucination

It's worth being precise about the boundaries here, because the next three lessons are easy to blur together. Sycophancy (Lesson 38) is about the content of an answer shifting toward what a user wants. Truthfulness is about whether that content matches known facts, independent of any user pressure. Calibration is about whether the model's *expressed confidence* matches its *actual* accuracy, independent of whether the underlying answer happens to be true. A model could give a truthful answer with wildly overconfident framing, or an untruthful answer hedged with appropriate uncertainty — calibration and truthfulness are measured on different axes, and both are measured independently of sycophancy, which is about responsiveness to the user rather than correctness at all.

## Key terms

| Term | Meaning |
|---|---|
| Truthfulness | Avoiding assertions that are factually false, especially widely held misconceptions |
| TruthfulQA | A benchmark of adversarially written questions designed to elicit imitative human misconceptions |
| Imitative falsehood | A false statement a model produces because it is common in its training text, not because it is confabulating |
| Calibration | The degree to which a model's stated confidence matches its actual empirical accuracy |
| Calibration curve | A plot of stated confidence versus empirical accuracy across many predictions, used to visualize over- or underconfidence |
| Verbalized confidence | Confidence expressed in natural language rather than read from raw model logits |

## Recap

Truthfulness and calibration are two separate, directly measurable properties: whether a model avoids common factual misconceptions, and whether its stated confidence tracks its real accuracy — and TruthfulQA's inverse-scaling result showed that scale alone does not fix the first one. Lesson 41 builds on calibration specifically to reframe hallucination through an alignment lens, as a problem with training incentives rather than a mysterious glitch.
