# Script — Agent Memory & Context: Threads in Cortex Agents

## Segment 1 (title)

"Memory" gets used loosely across the AI industry — everything from "remembers the last message" to "learns your preferences forever." In Cortex Agents specifically, the real, shipped feature behind multi-turn conversation has a precise name and mechanism: a thread.

## Segment 2 (steps: the real mechanism)

A thread maintains conversation history server-side, inside Snowflake, so the client doesn't have to resend the whole transcript on every turn. Mechanically that runs through two fields on the agent:run request: thread_id, created once via a Create Thread call and reused across every turn in that conversation, and parent_message_id, which is zero for the first message and the ID of the last successful assistant message for every turn after that.

## Segment 3 (code: a thread across two turns)

Here's what that looks like: the first message in a new thread passes parent_message_id zero; a follow-up question — "what about last year?" — reuses the same thread_id and points parent_message_id at the prior assistant response, with no need to resend the original question. That same parent_message_id chain also lets an application fork a conversation or recover from a failed response, by pointing at an earlier, known-good message instead of the most recent one.

## Segment 4 (steps: don't oversell it)

Be precise about the boundary. A thread is not a standing memory of a user across separate, later conversations, and it's not personalization — if you want that, it's a separate design decision, like storing a user profile in a Snowflake table and feeding it into a new thread yourself. A thread solves "remember this conversation," not "remember this person forever."

## Segment 5 (outro)

Next lesson moves outward: the Snowflake-managed MCP server, which lets agents running on other platforms entirely reach Cortex Analyst, Search, and Agents as governed tools.
