# Lesson 6 — Designing Good Tool Schemas

**Chapter 2 · Tool Calling & Function Design · Lesson 6 of 32**

## What you'll learn

- Why the description is the single biggest lever over tool-calling accuracy
- A real good-vs-poor description, side by side, from Anthropic's own docs
- Three more schema practices that measurably help: consolidation, namespacing, high-signal output
- How to self-review a schema before shipping it

## The description is doing most of the work

Lesson 3 covered the schema's raw shape: `name`, `description`,
`input_schema`. This lesson is about what makes that shape actually work.
Anthropic's own current guidance is specific: **detailed descriptions are
by far the most important factor in tool performance.** A good
description should cover what the tool does, when it should (and
shouldn't) be used, what each parameter means, and any important caveats
— aiming for at least 3–4 sentences, more for a complex tool.

Here is the real side-by-side Anthropic publishes to make the point:

```json
// Good — Claude knows exactly what this does and when to use it
{
  "name": "get_stock_price",
  "description": "Retrieves the current stock price for a given ticker
    symbol. The ticker must be valid on a major US exchange (NYSE or
    NASDAQ). Returns the latest trade price in USD. Use when the user
    asks about a stock's current or most recent price. Does not provide
    any other information about the stock or company.",
  "input_schema": {"type": "object",
    "properties": {"ticker": {"type": "string",
      "description": "The stock ticker symbol, e.g. AAPL for Apple Inc."}},
    "required": ["ticker"]}
}

// Poor — technically valid, practically ambiguous
{
  "name": "get_stock_price",
  "description": "Gets the stock price for a ticker.",
  "input_schema": {"type": "object",
    "properties": {"ticker": {"type": "string"}},
    "required": ["ticker"]}
}
```

Both are syntactically valid JSON Schema. Only the first tells the model
what "current" means, what format the ticker needs, what currency it
returns, and what it explicitly does *not* do — exactly the information
the model needs to decide whether and how to call it.

## Three more practices that measurably help

- **Consolidate related operations into fewer tools.** Rather than
  `create_pr`, `review_pr`, and `merge_pr` as three separate tools, group
  them into one tool with an `action` parameter. Fewer, more capable
  tools reduce selection ambiguity — directly relevant once Lesson 9
  covers routing among many tools.
- **Use meaningful namespacing in tool names.** When tools span multiple
  services, prefix with the service: `github_list_prs`,
  `slack_send_message`. This keeps tool selection unambiguous as a
  library grows — the same problem Lesson 10's multi-tool agents run
  into directly.
- **Design responses to return only high-signal information.** Return
  stable identifiers (slugs, UUIDs) rather than opaque internal
  references, and only the fields Claude actually needs for its next
  step. A bloated tool result wastes context the same way a bloated
  prompt does — Lesson 11 covers this on the output side in depth.

## A self-review checklist

Before shipping a schema, check it against what actually breaks in
practice:

1. Does the description say what the tool does, when to use it, when
   *not* to, and what each parameter means?
2. Could this tool's purpose be confused with another tool in the same
   set? If so, consolidate or rename.
3. Are parameter types and `required` fields as tight as the real API
   allows — not just `string` for everything?
4. Does the tool return only what the model needs for its next
   decision, not a dump of every field available?

## Key terms

| Term | Meaning |
|---|---|
| Tool description | The plaintext explanation of what a tool does, when to use it, and its parameters — the biggest lever on calling accuracy |
| Consolidation | Combining related operations into one tool with a parameter (e.g., `action`) instead of many near-duplicate tools |
| Namespacing | Prefixing tool names by service/resource (`github_list_prs`) to keep large tool sets unambiguous |
| High-signal output | A tool result containing only what the model needs next, not every field the underlying system has |

## Check yourself

You're ready for Lesson 7 when you can take the "poor" `get_stock_price`
example above and rewrite its description to meet all four checklist
items from memory.
