# Script — Dictionaries

## Segment 1 (title)

Dictionaries are arguably the single most important data structure in this entire course, because of what you'll learn at the end of this lesson. Let's get into them.

## Segment 2 (code: creating and accessing)

A dictionary stores key-value pairs — you look things up by name, not position. response bracket "model" bracket gets you the model name directly, no searching required.

## Segment 3 (code: .get() vs brackets)

Square brackets on a missing key raises a KeyError and crashes your program. .get() returns None instead, or a default value you choose. When working with real API responses, where a field might legitimately be absent, .get() is almost always the safer choice.

## Segment 4 (code: looping)

Three ways to loop: over keys alone, over values alone, or — the one you'll reach for most — .items(), which gives you both the key and value together in one loop.

## Segment 5 (code: dictionaries ARE JSON)

Here's the payoff: every AI API sends back JSON, and Python's json module turns that JSON directly into a dictionary. json.loads on a JSON string gives you a real dict you can index right away. Every AI API call later in this course works exactly this way.

## Segment 6 (outro)

Dictionaries are the backbone of working with any API. Next up: sets and tuples — two more structures, each solving a specific problem lists and dicts don't.
