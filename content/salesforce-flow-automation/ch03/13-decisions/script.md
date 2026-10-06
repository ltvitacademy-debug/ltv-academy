# Script — Decisions

## Segment 1 (title)

The Decision element is Flow Builder's if-then statement. It evaluates a set of conditions and routes the flow down whichever path matches — and today we're looking at exactly how that routing actually works.

## Segment 2 (steps: outcome order)

A Decision element holds one or more outcomes, each with its own conditions. With the default method, Define Manually, those outcomes are checked in the exact order they're listed — top to bottom. The first outcome whose conditions are true wins, and nothing after it is even evaluated. If none of them match, the flow falls through to the Default Outcome — a path with no conditions of its own.

## Segment 3 (screenshot: real panel)

Here's a real one: Check Case Details, with four outcomes — Severity 0 through Severity 3, the last one as the Default. The Severity 0 outcome's condition checks whether the triggering case's Case Type equals Downtime. Notice the Outcome Order list on the left — that list order is the evaluation order.

## Segment 4 (screenshot: side panel)

Resize that side panel and you can see every outcome's conditions stacked at once. That becomes genuinely useful once you're past two or three branches and need to audit the whole decision at a glance.

## Segment 5 (screenshot: canvas)

On the canvas, that one element becomes four separate paths fanning out — one connector per outcome, each one ready to carry a different part of your flow.

## Segment 6 (outro)

One more thing worth knowing: Flow Builder now also offers Define with AI, where outcomes are written as instructions instead of conditions, and evaluated all at once rather than in order. Define Manually, with its strict top-to-bottom order, is still the default — and the one you'll use most. Next up: Loops, for running a series of elements once per item in a collection.
