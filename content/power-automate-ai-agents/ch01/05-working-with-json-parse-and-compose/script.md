# Script — Working with JSON: Parse JSON and Compose

## Segment 1 (title)

The HTTP action hands you back a response as one opaque string, even when it's JSON underneath. Parse JSON and Compose are how you turn that into usable flow data.

## Segment 2 (steps)

Without a schema, referencing a field means hand-writing a raw expression in every action that needs it, with no autocomplete. Parse JSON trades that for a one-time cost: give it a schema, and every property becomes a clickable token. And you don't write that schema by hand — Generate from sample builds it from a real example response you paste in.

## Segment 3 (screenshot)

Compose solves a different problem: reuse. It takes any input and produces a single named output you can reference later instead of retyping the same expression five times. It lives under Data Operation in the action search.

## Segment 4 (screenshot)

Configuring it is one field: Inputs. Whatever you put there — a literal value, an expression, an earlier output — becomes Compose's result.

## Segment 5 (screenshot)

And once it runs, any later action can reference that output by name, the same way you'd reference a variable, instead of rebuilding the same value again.

## Segment 6 (code)

Picture a model classifying a support ticket and returning JSON like this. Run Parse JSON with a schema generated from exactly this sample, and category, confidence, and suggested owner all become tokens — confidence feeds a condition, suggested owner goes straight into an assignment. No string-splitting required.

## Segment 7 (outro)

That handoff — a model's JSON response becoming structured flow data — is what the next two chapters build on constantly. Next up, lesson six: error handling and run after.
