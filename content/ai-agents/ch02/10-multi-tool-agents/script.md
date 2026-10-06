# Script — Multi-Tool Agents

## Segment 1 (title)

By default, Claude may call more than one tool in a single response. The content array just has more than one tool_use block, each with its own id — two independent sub-goals requested at once instead of looping twice for the same information.

## Segment 2 (code: the formatting rules, exactly)

Return one tool_result for each tool_use block, all together in the next user message, matched by tool_use_id, with every tool_result block before any text content. Miss one and you get a formatting error — the same one from Lesson 7, now with more blocks to keep straight.

## Segment 3 (code: concurrent or sequential, your call)

The API doesn't prescribe how you actually run multiple calls. Independent, read-only operations are usually safe to run concurrently for lower latency. Tools with side effects or a real ordering dependency are often safer run one at a time, even though Claude requested them together.

## Segment 4 (code: if you skip a call)

If an earlier call fails during sequential execution, or you decide not to run a later one, it still needs a tool_result — with is_error true and a short explanation. Every tool_use id from that turn needs a matching result, run or not.

## Segment 5 (outro)

Parallel tool use buys real latency when sub-goals are genuinely independent — but every one of those calls still returns real, often messy, real-world output. Next up: how to format what comes back so the model can actually use it.
