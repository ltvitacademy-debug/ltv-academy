# Script — Tool Output Formatting

## Segment 1 (title)

A tool_result's content can be a plain string, one or more text blocks, an image, or a document block — and an empty result is valid too, for a side-effect tool that genuinely has nothing to report.

## Segment 2 (code: a real bloated API response)

A real weather API doesn't return "91 degrees, clear" — it returns coordinates, pressure, humidity, wind, a numeric weather code, and a dozen other fields most tasks never need. Passing that whole blob back wastes context and forces the model to dig the one number it needs out of a nested structure.

## Segment 3 (code: format it down)

Trimming that down to "91°F, clear, feels like 93°F" before it goes back is the same high-signal discipline from Lesson 6's schema design — now applied to the actual payload every single call produces, not just the definition.

## Segment 4 (code: treat tool output as untrusted)

A tool result very often carries content from outside your control — a web page, an email, a third-party API. Anthropic's own guidance is direct: treat that as untrusted. An attacker who can influence it could embed hidden instructions trying to redirect Claude, which is why it belongs in a proper tool_result block, not folded into a system prompt.

## Segment 5 (outro)

Good formatting makes every call in the loop cheaper and clearer, and keeping untrusted content properly contained keeps it from carrying more authority than it should. Chapter 3 starts from here: the architectures these calls actually get wired into.
