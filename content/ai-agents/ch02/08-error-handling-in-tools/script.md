# Script — Error Handling in Tools

## Segment 1 (title)

A failed tool call doesn't break the normal shape from Lesson 7 — it's still a tool_result block, just with one more field: is_error set to true. Claude reads that and incorporates the failure into its response instead of the loop simply breaking.

## Segment 2 (code: a real error tool_result)

The result carries a real error message as its content, with is_error true. Claude can then tell the user it couldn't retrieve the weather and suggest trying again later — the loop continues, now reasoning about a failure instead of a success.

## Segment 3 (code: write instructive error messages)

Anthropic's own guidance is blunt: don't just write "failed." Write "rate limit exceeded, retry after 60 seconds" instead of "error." The good version gives Claude what it needs to actually recover — wait, retry, ask for a missing value — without guessing.

## Segment 4 (code: invalid calls and strict mode)

When Claude's own call is invalid, like a missing parameter, the same is_error pattern applies, and Claude will typically retry two to three times with corrections before giving up. For tools where you can't tolerate even that, strict mode guarantees schema-valid input before the call ever reaches your code.

## Segment 5 (outro)

A pattern of invalid calls on one tool is usually a sign the description needs work, not that more error-handling code is needed to cover for it. Next up: what happens once an agent has more than one tool to choose from.
