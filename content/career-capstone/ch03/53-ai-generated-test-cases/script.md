# Script — AI-Generated Test Cases for Pipelines

## Segment 1 (title)

An LLM can draft a first pass of test cases in seconds — but only if you give it the transformation's spec, not just the code. A prompt built from code alone just re-derives what the code already does.

## Segment 2 (code: weak vs strong prompt)

A weak prompt says "write unit tests for this function" and hands over the code. A strong prompt hands over the spec too — the business rules, the types, the nullability — so the LLM can check whether the function actually satisfies the spec, not just describe itself back to you.

## Segment 3 (code: what it catches vs misses)

An LLM reliably drafts boundary cases from a spec — zero, a hundred, a negative number, a null. What it can't know is the undocumented stuff: a legacy source sending dates as Unix epochs, a seasonal volume spike, a known test-account ID that should never hit the fact table.

## Segment 4 (steps: draft, review, trim, run)

Treat every AI-generated test list as a draft outline. Draft with the LLM, review each case against what you actually know about the source systems, trim anything that isn't real, then run the survivors as part of the actual suite.

## Segment 5 (outro)

Spec in, breadth out — and a human review before anything joins the suite. Next up: feeding an LLM a pipeline failure to draft a first-pass root cause analysis.
