# Script — Blocking & Long-Running Query Scripts

## Segment 1 (title)

This is the script you run the moment someone says the database is slow, before you even ask follow-up questions. It combines blocking chain detection with the expensive-active-query ranking from Lesson 7 — covering the two most common reasons a database feels slow.

## Segment 2 (code: section 1 — who is blocking whom)

Section one returns every blocked session and its immediate blocker in one pass. An empty result set is good news — nothing is currently blocked. The same blocked_by value repeated across many rows points at the head of a chain worth investigating first.

## Segment 3 (code: section 2 — the head of the chain)

Section two narrows that down to the actual root cause: a session that appears in blocked_by but never in blocked_session. That's blocking others without being blocked itself — the one to look at first. Killing a session further down the chain does nothing; everyone behind the head is waiting on the head, not on each other.

## Segment 4 (code: section 3 — expensive active queries)

Section three is the expensive-query ranking from Lesson 7, sitting in the same script because slow and blocked are two different questions that both come up in the same incident. A row that's both expensive and blocked, thanks to blocking_session_id carried into this section too, is usually the most important line in the whole output.

## Segment 5 (outro)

Blocked, root cause, and expensive — three questions, one script, run the moment a ticket comes in. Next up: the capstone — assembling and presenting the whole toolkit to close out the course.
