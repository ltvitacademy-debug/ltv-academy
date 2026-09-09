# Lesson 31 — Driver and Executors · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson showed the whole architecture. This lesson zooms into
just one connection in it — the Driver talking to an Executor —
because what actually travels there matters a lot.

## S2 · SCREENSHOT (same diagram, zoomed)

Same diagram as before, but now the focus narrows to one
relationship: what really moves between the Driver on the left, and
one Executor on the right.

## S3 · CODE CARD (what's sent)

The Driver doesn't send data. It sends instructions — a serialized
plan, describing the computation to run against data that's already
sitting on that Executor's own machine. And it builds this ENTIRE
plan before a single Executor does any real work.

## S4 · CODE CARD (what comes back)

And what comes back depends entirely on what you asked for. Most of
the time, Executors write results straight to storage and just report
back that they're done — not the actual data. But for something
genuinely small that the Driver explicitly asked for — a count, a
collect on a tiny result — the real values do come back.

## S5 · OUTRO CARD

That exact distinction is what Lesson 35 calls transformations versus
actions. Next lesson: clusters and nodes — zooming into the machines
themselves. See you there.
