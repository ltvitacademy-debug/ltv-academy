# Lesson 43 — VARCHAR(MAX) · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

VARCHAR of a specific number caps out at 8,000 characters. Plenty for a
name or an address, but nowhere near enough for a product description, a
blog post, or a full support ticket. That's where VARCHAR of MAX comes
in.

## S2 · CODE CARD (VARCHAR(MAX) example)

VARCHAR MAX can hold up to about 2 gigabytes of text — for practical
purposes, unlimited. It behaves exactly like regular VARCHAR in every
other way: variable length, storing only what's actually used. Use it for
content that's genuinely unbounded — descriptions, comments, article
bodies.

## S3 · STEPS CARD (DOCUMENTATION / STORAGE ENGINE)

So why not just declare every text column as MAX and stop worrying about
length entirely? Two real reasons. First, documentation — VARCHAR 50 on a
first name column tells the next developer this is genuinely bounded.
MAX tells them nothing. Second, storage — large MAX values can get stored
off-row once they exceed a certain size, which has real, if usually
minor, performance implications compared to smaller in-row columns. Use
MAX only when the content really is unbounded; use a specific length
everywhere else.

## S4 · CODE CARD (NVARCHAR(MAX) + TEXT warning)

And just like VARCHAR has NVARCHAR for Unicode, VARCHAR MAX has NVARCHAR
MAX — unlimited length, full Unicode support, for large international
text. One more note: older code sometimes uses a type called TEXT for
this. TEXT is deprecated. Always reach for VARCHAR MAX in new code
instead.

## S5 · OUTRO CARD

MAX for genuinely unbounded text, a specific length for everything with a
real-world limit, and NVARCHAR MAX when Unicode matters too. Next lesson:
your first string functions, starting with LEN, UPPER, and LOWER. See you
there.
