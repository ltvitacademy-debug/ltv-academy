# Script — Context Compression Techniques

## Segment 1 (title)

A budget cap means something has to give. Compression is how you keep the facts a long history or a large document carries, without keeping every token it took to say them.

## Segment 2 (code: the same conversation, two ways)

Here's the same fourteen-turn support conversation two ways. Raw, it's 6,400 tokens. Compressed — a rolling summary of the first eleven turns, plus the last three turns kept verbatim — it's 1,850 tokens. Seventy-one percent smaller, and the facts that matter still carry forward into the next call.

## Segment 3 (steps: four techniques)

Four techniques do most of the work. Rolling summarization replaces old turns with a compact running summary instead of dropping them outright. Truncation drops the oldest turns entirely when even a summary is more than you need. Structured extraction turns a long document into the handful of facts actually in play, not the prose around them. And deduplication plus prompt caching means an unchanged prefix — a system prompt, a static reference doc — gets reused instead of re-sent and re-paid-for on every call.

## Segment 4 (code: structured extraction before/after)

Structured extraction in practice: a long policy excerpt about refund windows and exceptions becomes three fields — refund days, premium refund days, final-sale excluded. The model can use those three facts without re-reading the paragraph they came from.

## Segment 5 (outro)

None of these techniques are free — a summary can drop a detail a later turn needed, extraction can miss a nuance the prose carried. Pick the lightest technique that still protects the facts your eval set actually checks for. Next: context ordering and prioritization — where in the window you place what you kept matters almost as much as what you kept.
