# Script — Designing Good Tool Schemas

## Segment 1 (title)

Anthropic's own guidance is specific: detailed descriptions are by far the most important factor in tool performance. A good one covers what the tool does, when to use it, when not to, and what each parameter means.

## Segment 2 (code: good vs poor, real example)

Here's Anthropic's own real side-by-side. The good get_stock_price description says the ticker must be valid on a major exchange, returns the latest trade price in USD, and explicitly what it doesn't do. The poor version is syntactically valid but tells the model almost nothing useful.

## Segment 3 (steps: three more practices)

Three more things measurably help. Consolidate related operations into fewer tools with an action parameter instead of many near-duplicates. Namespace tool names by service so a growing tool set stays unambiguous. And design responses to return only high-signal information — stable identifiers and just what the model needs next, not a dump of every field.

## Segment 4 (code: self-review checklist)

Before shipping a schema: does the description cover what, when, when-not, and each parameter? Could this tool be confused with another one in the same set? Are types and required fields as tight as the real API allows? Does the output return only what's needed for the next decision?

## Segment 5 (outro)

A tight schema is the single highest-leverage thing you control in tool calling — before any routing logic, before any error handling. Next up: what actually happens when that schema meets a real conversation.
