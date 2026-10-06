# Lesson 19 — Fetching Data From an API · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

This chapter has built up the event loop, callbacks, promises, async and
await, and error handling, piece by piece. This lesson puts all of it to
work on the single most common real-world task in web and blockchain
development: fetching data from an API.

## S2 · CODE CARD (SVG: fetch() + response.json() for ETH price)

JavaScript's built-in fetch function takes a URL and returns a promise.
Here we're asking a real public API for the current price of ether. But
notice there are two awaits, not one — awaiting fetch itself only gets you
a Response object, not the actual data yet.

## S3 · STEPS CARD (SVG: await fetch() / await response.json())

That's because an HTTP response arrives in two stages. Awaiting fetch
resolves as soon as the status code and headers show up — the server has
responded, but the body might still be streaming in. Awaiting response dot
json then parses that body as JSON, which is its own separate asynchronous
step with its own promise.

## S4 · CODE CARD (SVG: checking response.ok before parsing)

Here's a detail that catches people off guard: fetch only rejects on an
actual network failure — no connection, DNS failure, that sort of thing. A
404 Not Found, or a 500 server error, still counts as a completed request
as far as fetch is concerned. So checking response dot ok yourself, and
throwing your own error when it's false, is entirely your responsibility.

## S5 · CODE CARD (SVG: getEthPrice combining async/await, try/catch, response.ok)

Put every piece from this chapter together, and you get a function like
this. Async and await keep it reading top to bottom. Try and catch handle
both network failures and the manual error we throw on a bad status. And
when something does go wrong, it fails gracefully, returning null instead
of leaving an unhandled rejection anywhere.

## S6 · CODE CARD (SVG: calling getEthPrice from the caller's side)

And here's the real payoff — look at how the caller gets to use it. One
await, one plain number, one null check. Every bit of complexity — fetch,
response objects, parsing, rejections — is completely hidden behind that
one function. That's the whole point of everything this chapter taught:
wrap the mess once, so calling code doesn't have to think about it again.

## S7 · OUTRO CARD (SVG: Chapter 3 complete, Chapter 4 ahead, LTV seal)

That's Chapter Three complete — the event loop underneath, callbacks as
the original pattern, promises and async-await as the cleaner syntax built
on top, and real error handling tying it together on a genuine API call.
Chapter Four moves to TypeScript: the same JavaScript you already know,
with a type checker watching your back.
