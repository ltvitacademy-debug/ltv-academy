# Script — Working With Nested, JSON-Like Structures

## Segment 1 (title)

This is where the last four lessons come together. Real AI API responses are nested — dicts inside lists inside dicts — and this lesson is about navigating that without it turning into a mess.

## Segment 2 (code: a realistic response shape)

Here's a simplified but realistic shape modeled on how chat completion APIs actually respond: a model name, a list of choices, each with a nested message, and a usage dictionary with token counts.

## Segment 3 (code: chaining lookups)

You chain lookups — a key, then a list index, then another key. response bracket "choices" bracket 0 bracket "message" bracket "content". Read it right to left in your head: the response's choices, the first one, its message, the content.

## Segment 4 (code: safe navigation with chained get)

Real responses sometimes omit fields — an error response might have no choices at all. Chaining raw brackets crashes the instant one link is missing. Chain .get() calls instead, each with a sensible default, so a missing field falls back gracefully instead of crashing.

## Segment 5 (code: json.dumps going the other direction)

json.loads turns JSON text into a dict; json.dumps does the reverse — a Python dict back into JSON text, which is exactly what you send TO most AI APIs when you make a request.

## Segment 6 (outro)

That's the full toolkit: lists, dicts, sets, tuples, and navigating them nested. Last lesson of this chapter: file I/O — reading and writing files, including the JSON files you'll use to save and load data.
