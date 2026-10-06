# Lesson 18 — Error Handling in Async Code · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every example so far has quietly assumed the happy path — the promise
always resolves. Real network calls, real blockchain RPC endpoints, real
file reads fail constantly: timeouts, bad input, a server that's just down.
This lesson is about handling that honestly instead of hoping it never
happens.

## S2 · CODE CARD (SVG: try/catch around await getBlockNumber)

When a promise behind an await rejects, it doesn't just vanish — it gets
thrown as a completely normal JavaScript exception, right at that await
line. Which means the tool you already know handles it perfectly well: a
regular try/catch block. Wrap the await in try, and any rejection jumps
straight to catch, with the error available there just like any other
thrown exception.

## S3 · CODE CARD (SVG: missing try/catch, UnhandledPromiseRejection)

Here's the trap people fall into constantly: forgetting the try/catch
entirely. If getBlockNumber rejects here, there's nothing to catch it. In
Node, that's an unhandled promise rejection — in older versions a warning,
in current versions, a process crash. Silence is never actually silence
here; it's a crash waiting to happen in production.

## S4 · CODE CARD (SVG: getBlock().catch(...) at the call site)

There's a second valid option: skip try/catch inside the function, and
instead catch at the call site. Remember, an async function always returns
a promise — so calling getBlock and chaining catch onto it works exactly as
well as a try/catch would have inside. Pick whichever location makes the
error easier to handle where you actually are in the code.

## S5 · CODE CARD (SVG: one try/catch around three awaited steps)

And just like last lesson's flat await chain, one try/catch block can wrap
several awaited steps at once. Get the user, then the balance, then the
transactions — if any single one of those three rejects, execution jumps
immediately to the same catch block, skipping whatever steps were left.

## S6 · STEPS CARD (SVG: Wrap every await / Catch specific errors / Never swallow silently)

Three habits to keep straight going forward. Wrap every await somewhere —
in a try/catch, or with a dot-catch on the call. Check what kind of error
you actually got before deciding how to react, instead of treating every
failure identically. And never leave a catch block empty — swallowing an
error silently doesn't make the bug go away, it just hides it from you
until it shows up somewhere far more confusing.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

That covers async error handling — the same try/catch you already know,
applied to rejected promises. Next lesson, we put everything from this
chapter to work on something real: fetching data from an actual API.
