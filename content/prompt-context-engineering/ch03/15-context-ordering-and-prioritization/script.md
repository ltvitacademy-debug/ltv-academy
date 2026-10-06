# Script — Context Ordering & Prioritization

## Segment 1 (title)

You can fit everything inside budget and still get a wrong answer, because where you placed it inside the window matters too.

## Segment 2 (steps: lost in the middle)

Research on long-context models documents a real effect nicknamed "lost in the middle": content near the start of a context window is reliably attended to, content near the end is reliably attended to, and content buried in the middle is where recall is weakest — even when every word is technically inside the budget.

## Segment 3 (steps: an ordering recipe)

That gives you an ordering recipe. System instructions go first — rules the model must never drop. High-priority reference material goes near the start, where it won't get lost. Lower-priority background material, the stuff that can tolerate weaker recall, goes in the middle. And the single most relevant piece of retrieved content goes right before the user's actual question, at the end — the strongest position in the window.

## Segment 4 (code: a real assembly order)

In practice, that's an assembly order: system prompt, tool schemas, background documents, conversation history oldest to newest, then the top-ranked retrieved chunk placed last, immediately before the user's question — not wherever a retrieval step happened to rank it in its own results.

## Segment 5 (outro)

A reranking step that puts the best match first in a list of retrieved chunks is solving the wrong problem if that chunk then gets assembled into the middle of the window. Rank for relevance, then place for position. Next: tool descriptions as context — the schemas in that assembly order aren't free, and their wording is as much a context-engineering decision as anything else in this chapter.
