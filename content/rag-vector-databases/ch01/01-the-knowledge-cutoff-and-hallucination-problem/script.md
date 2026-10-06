# Script — The Knowledge Cutoff & Hallucination Problem

## Segment 1 (title)

Every LLM has a hard knowledge cutoff — everything it knows was baked into its weights before that date, and it has no way to know anything that happened after, or anything private that was never in its training data.

## Segment 2 (steps: two problems)

Two separate problems point at the same gap. The knowledge cutoff means the model can't know recent events or your private documents. Hallucination means that when it doesn't actually know something, it doesn't say so — it keeps generating fluent, plausible-sounding text anyway, because that's literally what a next-token predictor does.

## Segment 3 (code: the example)

Picture asking a model about your Q3 vendor contract's cancellation policy, with no retrieval involved. It was never trained on that contract, so it pattern-matches to what vendor contracts typically say and presents that guess in the same confident tone as a true fact. If the real contract says ninety days with no fee, that confident answer is simply wrong.

## Segment 4 (steps: why this happens)

There's no built-in signal that separates "I'm confident because I know this" from "I'm confident because that's what confident text sounds like." A made-up policy, a fabricated detail — delivered exactly as fluently as a correct answer. That's the mechanical root of hallucination, not a random glitch.

## Segment 5 (outro)

Both problems trace back to the same root cause: the model only has its frozen weights, with no live connection to real source documents. Next lesson: RAG versus fine-tuning — the two different ways to close that gap, and when each one actually makes sense.
