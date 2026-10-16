# Tool Schema & Output Self-Review Checklist

A compiled reference pulled from Chapter 2 (Tool Calling & Function Design).
Run every tool you're about to ship through this before it goes live — not
after something goes wrong in production.

## 1. The description test

Anthropic's own guidance: **detailed descriptions are by far the most
important factor in tool-calling accuracy.** A description should cover what
the tool does, when it should (and should NOT) be used, what each parameter
means, and any important caveats. Aim for at least 3–4 sentences; more for a
complex tool.

The real side-by-side that makes the point:

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

Both are syntactically valid JSON Schema. Only the first tells the model what
"current" means, what format the ticker needs, what currency it returns, and
what it explicitly does *not* do.

## 2. The four-question checklist (Lesson 6)

Before shipping a schema:

- [ ] Does the description say what the tool does, when to use it, when
      *not* to, and what each parameter means?
- [ ] Could this tool's purpose be confused with another tool in the same
      set? If so, consolidate or rename.
- [ ] Are parameter types and `required` fields as tight as the real API
      allows — not just `string` for everything?
- [ ] Does the tool return only what the model needs for its next decision,
      not a dump of every field available?

## 3. Three practices that measurably help at scale (Lesson 6 → 9)

- **Consolidate related operations into fewer tools.** `create_pr` /
  `review_pr` / `merge_pr` → one `manage_pr` tool with an `action`
  parameter. Fewer, more capable tools reduce selection ambiguity.
- **Namespace by service.** `github_list_prs`, `slack_send_message` — keeps
  tools from different domains from ever looking alike, which matters most
  once you're connecting multiple MCP servers (Chapter 3) into one combined
  tool set.
- **Keep responses high-signal.** Return stable identifiers and only the
  fields Claude needs next — not an opaque internal reference or a bloated
  API payload.

## 4. Routing decision tree (Lesson 9)

```
Tool count is small (< 10)?
  -> Good descriptions + consolidation + namespacing is enough.
Tool count is moderate (10-40), several plausibly overlap?
  -> Add explicit routing: classify the sub-goal first, narrow to a
     plausible subset (3-5 tools), THEN let the agent choose.
Tool count is large (hundreds/thousands, many integrations)?
  -> Reach for the platform's own tool-search mechanism instead of
     hand-rolled classification — manual organization stops scaling here.
```

## 5. Output formatting checklist (Lesson 11)

- [ ] Is the raw API/tool payload trimmed down to only what the model needs
      for its next step, not the full JSON blob?
- [ ] Is content that came from outside your control (a web page, an
      inbound email, a third-party API) kept inside a proper `tool_result`
      block rather than folded into a `system` prompt or plain `text`
      block, where it would carry more apparent authority than it should?
- [ ] For a side-effect-only tool with nothing to report, is an empty
      `tool_result` (just `tool_use_id`) being used instead of a fabricated
      "success" string?

## 6. Error-message checklist (Lesson 8)

Compare before shipping an `is_error` message:

```
Bad:   "failed"                      Good:  "Rate limit exceeded. Retry after 60 seconds."
Bad:   "error"                       Good:  "Error: Missing required 'location' parameter"
```

A vague message leaves Claude no better informed than before the call. A
specific one gives it something to actually act on — retry, ask the user,
fall back to another tool.

## When to come back to this checklist

A pattern of invalid calls on one tool during development is almost always a
signal the tool's *description* needs work, not that more error-handling
code is needed to paper over it (Lesson 8). Re-run this checklist against
that tool before adding retry logic.
