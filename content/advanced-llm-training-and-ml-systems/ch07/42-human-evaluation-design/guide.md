# Human Evaluation Design

Lesson 41 closed on a gap: standard benchmarks need a definitively correct answer to grade, but many of the qualities that matter most about a model's outputs — is this response helpful, is it well-written, does it actually address what the user meant — don't have one. Human evaluation is how the field measures those qualities directly, by having people judge outputs rather than running them against an automated scorer. This lesson covers how to design a human evaluation that produces a trustworthy signal instead of noise.

## What you'll learn

- Why some qualities require human judgment and can't be reduced to an automated score
- Pairwise comparison vs. Likert-scale rating, and when to use each
- Why a clear rubric matters more than asking annotators to "rate quality"
- Inter-annotator agreement and why low agreement invalidates the whole exercise
- The practical cost and scale trade-offs of running human evaluation

## Why some evaluation needs a human

Properties like "is this response actually helpful for what the user was trying to accomplish," "does this writing sound natural rather than stilted," or "would a domain expert consider this medical explanation accurate and appropriately cautious" don't reduce cleanly to an automated check — they require judgment informed by context, domain knowledge, or taste that current automated metrics don't reliably capture. Human evaluation is slower and far more expensive per data point than running a benchmark script, which is exactly why it's reserved for the properties that matter but can't be measured any other way, rather than used as a blanket replacement for benchmarks.

## Pairwise comparison vs. Likert rating

Two common designs:

- **Pairwise comparison** — an annotator sees two model outputs for the same prompt (not told which model produced which) and picks the better one, or declares a tie. This is usually easier and more consistent for annotators than independently rating each output, because judging *relative* quality ("which of these two is better") is a simpler cognitive task than assigning an absolute score, and it directly answers the comparison questions most evaluation is actually trying to answer (is the new checkpoint better than the old one?).
- **Likert-scale rating** — an annotator rates a single output on a numeric scale (commonly 1-5) against stated criteria. This gives an absolute score usable for tracking a model's quality over time rather than only relative to one specific alternative, but it's more prone to annotator-specific scale drift (one annotator's "4" is another's "3") than pairwise comparison is.

Many production evaluation setups use both: pairwise comparison for head-to-head checkpoint decisions, and periodic Likert ratings for longer-term quality tracking.

## Why a rubric beats "rate the quality"

Asking an annotator to "rate how good this response is" produces low-consistency results, because different annotators silently apply different, unstated criteria — one might weight factual correctness heavily, another might weight tone or length. A rubric makes the criteria explicit and consistent across annotators: for example, a customer-support response rubric might specify checking, in order, whether the response (1) addresses the actual question asked, (2) contains no factual errors, (3) uses an appropriately professional tone, and (4) is appropriately concise. A detailed rubric with concrete examples of a 1 vs. a 5 response measurably improves agreement between annotators compared to an open-ended quality judgment.

## Inter-annotator agreement

Before trusting any human evaluation result, you need to know the annotators actually agree with each other on an overlapping sample — if they don't, the "average score" is just averaging noise. Cohen's kappa (for two annotators) and Fleiss' kappa (for more than two) measure agreement while correcting for the agreement expected by pure chance, which raw percent-agreement doesn't do:

```python
from sklearn.metrics import cohen_kappa_score

# Two annotators' pairwise-preference labels on the same 100 examples
annotator_a = [0, 1, 1, 0, 1, ...]  # 0 = model A preferred, 1 = model B preferred
annotator_b = [0, 1, 0, 0, 1, ...]

kappa = cohen_kappa_score(annotator_a, annotator_b)
# kappa > 0.6 is generally considered substantial agreement
```

A kappa in the 0.6-0.8 range is typically read as substantial agreement; below roughly 0.4, the rubric or task is likely ambiguous and needs revision before the resulting scores can be trusted at all.

## Key terms

- **Pairwise comparison** — an annotator judges which of two outputs is better, rather than scoring either in isolation
- **Likert-scale rating** — an annotator assigns a numeric score to a single output against stated criteria
- **Rubric** — an explicit, shared set of criteria that makes annotator judgments consistent rather than idiosyncratic
- **Inter-annotator agreement** — the degree to which independent annotators reach the same judgment on the same items
- **Cohen's / Fleiss' kappa** — agreement statistics that correct for the agreement expected by pure chance
