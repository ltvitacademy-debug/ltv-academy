# Lesson 10 — Working with a REST Client · Voiceover script

Segments map 1:1 to slides. Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 10 of 19.

---

## S1 · TITLE CARD

Everything in this chapter so far has been about the shape of a request. A REST client is the practical tool consultants actually use to build, send, and inspect those requests, without writing any integration code.

## S2 · STEPS CARD

A REST client lets you try a call safely before any real integration tool depends on it, see the exact fields Fusion's response actually contains instead of guessing from documentation alone, and save a working request so it becomes a repeatable test case instead of something rebuilt from scratch every time.

## S3 · CODE CARD

A saved request holds exactly the pieces you'd expect by now: the method, the URL with its base and version placeholders, the authentication to use, the headers, and any query parameters — here, filtering to unpaid invoices only.

## S4 · STEPS CARD

The workflow repeats every time. Set authentication once at the collection level so every request in it reuses the same credentials. Build the request from its pieces — method, URL, parameters, body. Send it and inspect both the status code and the response body. Then save it, so the next person troubleshooting the same integration doesn't start from zero.

## S5 · OUTRO CARD

A REST client turns everything from this chapter into something you can actually click through and verify. Chapter 3 starts next, with the piece every one of these calls has depended on so far: proving who's calling before Fusion answers at all.
