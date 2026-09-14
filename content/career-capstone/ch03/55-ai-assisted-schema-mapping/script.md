# Script — AI-Assisted Schema Mapping

## Segment 1 (title)

Before data lands in the star schema from Lesson 8, something has to decide which source column becomes which target column. That mapping work is tedious and repetitive — exactly what an LLM can draft quickly from two column lists.

## Segment 2 (code: proposed mapping)

Give an LLM the source columns, the target columns, and some sample rows, and it proposes a mapping with a confidence signal per pair — high confidence when names and types match, low confidence when a column like "status" could mean several different things.

## Segment 3 (code: wrong mapping vs wrong test)

A wrong test case fails loudly and gets caught. A wrong schema mapping ships silently — every downstream report built on that dimension is now quietly wrong, with nothing throwing an error to say so.

## Segment 4 (steps: the verification)

Never load a mapping straight from the proposal. Check every low-confidence pair against real sample data, spot-check the high-confidence ones too, and only load the verified mapping into the actual dimension table.

## Segment 5 (outro)

Confidence signals help triage, but only real sample data confirms a mapping. Next up: the honest guardrails on what you should never hand an LLM in the first place.
