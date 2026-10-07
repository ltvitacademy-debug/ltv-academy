# Script — Structured Logging

## Segment 1 (title)

A log line that just says "checkout failed for user" is nearly useless at two in the morning — not because it's wrong, but because you can't search it. Structured logging means writing every log entry as a consistent, machine-parseable record, almost always JSON, instead of a free-form sentence. It's the foundation everything else in this chapter builds on.

## Segment 2 (code)

Compare the two. The plain-text version only a human can read; a search tool can just grep it, fragile regular expressions and all. The structured version is the same information as JSON — level, service, event, user ID, order ID — and now every one of those is a field you can filter or aggregate on, which is exactly what centralized log search needs in the next lesson.

## Segment 3 (steps)

Use a small, consistent set of log levels across every service: info and warn for normal operation and recoverable hiccups, error for something that actually failed. This discipline matters — if error always means a real failure at Northbridge's checkout service, an alert on error rate is trustworthy. Use it loosely, and you get alert fatigue, which Chapter 6 covers in depth.

## Segment 4 (code)

The single most valuable field you can add is a correlation ID — generated once at the edge of the system and passed through every downstream service a request touches. Checkout, inventory, payment can each log independently, but search for one correlation ID and you reconstruct the full story of that one request, in order, across every service.

## Segment 5 (outro)

That's the foundation: structured, leveled, correlated log lines, written as one JSON object per line so a log shipper can parse them reliably. Next, lesson twenty-one — where those lines actually get shipped, indexed, and searched, with ELK and Loki.
