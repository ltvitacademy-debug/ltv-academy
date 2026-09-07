# Lesson 10 — Connecting to Web, JSON & REST API Data · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

One connector, three very different jobs: ordinary web pages, JSON files,
and REST APIs all go through the exact same door in Power BI. Let's see how.

## S2 · IMAGE: web-basic-url.png (Basic mode, Wikipedia URL)

Basic mode wants exactly one thing: a URL. This one points at a Wikipedia
page listing U.S. states. Same simple dialog, no matter what's actually at
that address.

## S3 · IMAGE: web-credentials.png (five authentication options)

First time connecting to a new site, Power BI asks how to authenticate.
Five options — and Web API is the one worth remembering. It's built
specifically for sites and APIs that authenticate with an API key, which is
most of them once you start working with real REST APIs.

## S4 · IMAGE: web-navigator.png (Navigator with detected tables)

Land in Navigator, and for a page like this, you get every table it found —
twenty-two of them, on this one Wikipedia page. There's a Web View tab too,
which highlights exactly where each table sits on the actual page, in case
it's not obvious which one you want from the list alone.

## S5 · IMAGE: web-json.png (Basic mode, JSON URL)

Now here's the same exact dialog, pointed at a JSON file instead of a web
page. Power BI notices, and automatically treats the response as structured
JSON data — no separate mode to hunt for. A REST API endpoint that returns
JSON works exactly the same way.

## S6 · IMAGE: web-advanced-url.png (Advanced mode)

When Basic isn't enough — building a URL from separate pieces, or adding
request headers, which is often where an API key actually gets sent —
switch to Advanced. URL parts, a command timeout, and header parameters,
all in one place.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Basic for a simple URL, Web API for key-based authentication, Advanced when
you need more control — and it all works identically whether you're
pointing at a web page, a JSON file, or a REST API. That closes out how we
get data into Power BI. Next lesson: the decision that shapes everything
after — Import versus DirectQuery. See you there.
