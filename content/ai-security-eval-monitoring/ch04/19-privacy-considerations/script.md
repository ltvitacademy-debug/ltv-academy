# Script — Privacy Considerations: PII in Prompts

## Segment 1 (title)

A prompt or response can carry personal data, and most teams don't decide that on purpose — it just arrives. Direct user input, retrieved context in a RAG system, conversation history that accumulates across turns, even the model's own output.

## Segment 2 (steps: direct vs quasi-identifiers)

Direct identifiers have a recognizable shape — email, phone, Social Security number — catchable with pattern matching. Quasi-identifiers don't look like PII alone but can identify someone combined — a ZIP code, a birth date, a job title together.

## Segment 3 (code: redaction pattern)

A real, working first layer: a redact function that pattern-matches common direct identifiers and replaces them with a placeholder, run before a prompt is logged, sent to a third-party provider, or included in an eval dataset.

## Segment 4 (steps: where regex stops being enough)

Regex catches an email address reliably because it has a fixed shape. It does not catch a name and a location with no fixed pattern at all. Production-grade handling layers a named entity recognition model on top specifically to catch what regex structurally can't.

## Segment 5 (outro)

Pattern-based redaction catches the obvious cases and misses the rest — knowing which is which is the point. Next up: compliance — the regulatory landscape this is actually in service of.
