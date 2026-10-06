# Lesson 15 — Pagination · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

No API is ever going to hand you ten million rows in one response. Every
list endpoint you'll ever call — issues, customers, batch jobs — splits
its results into pages. Today: the two real ways that happens.

## S2 · CODE CARD (GitHub Link header)

GitHub's REST API uses page and per_page parameters, and — this is the key
part — tells you the next page's exact URL in a real Link header on the
response. Your client just reads the rel equals next URL out of that
header. No guessing required.

## S3 · CODE CARD (Stripe cursor pagination)

A lot of other APIs, including Stripe's, and the pattern you'll see on AI
provider list endpoints, paginate by cursor instead — the ID of the last
object you saw. has_more tells you if there's another page; starting_after
is how you ask for it.

## S4 · STEPS CARD (page vs cursor comparison)

So two real styles. Page-based: page numbers, a Link header pointing you
forward. Cursor-based: has_more and an object ID cursor. Cursors have one
real advantage — they don't skip or repeat items if the list changes
between your requests, which page numbers can.

## S5 · OUTRO CARD

Whichever style an API uses, the loop is the same: fetch a page, process
it, check if there's more, repeat. Next lesson: webhooks — when the API
calls you, instead of the other way around.
