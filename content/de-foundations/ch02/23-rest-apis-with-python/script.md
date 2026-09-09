# Lesson 23 — REST APIs with Python · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Not every dataset comes as a file. REST APIs are how you pull data
that has no file to download at all — and requests is Python's
standard tool for exactly that.

## S2 · CODE CARD (basic GET)

A basic GET request. Requests dot get sends it, status code tells you
what happened, and dot JSON parses the response body into real Python
objects. NYC's own Open Data portal — the same agency behind this
course's taxi data — exposes a real API doing exactly this.

## S3 · CODE CARD (status codes)

Always check the status code. Two hundred means success. Four oh
four means not found. Four two nine means you're being rate limited.
Five hundred means the server itself failed. This solves a different
problem than Lesson 19's exception handling — exceptions catch a
crash; status codes tell you a request completed, but maybe didn't
succeed.

## S4 · CODE CARD (pagination)

And here's Lesson 17's while loop, put to real, practical use. Many
APIs return data one page at a time. You don't know in advance how
many pages exist — so you keep requesting, page after page, until an
empty page tells you you're done.

## S5 · OUTRO CARD

Requests gets the data. Status codes tell you if it worked. A while
loop handles as many pages as it takes. Next lesson: processing JSON
— for when the shape isn't quite this simple. See you there.
