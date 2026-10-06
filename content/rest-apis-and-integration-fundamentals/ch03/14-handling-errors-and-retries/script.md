# Lesson 14 — Handling Errors and Retries · Voiceover script

Segments map 1:1 to slides. Chapter 3 · Authentication and Security · Lesson 14 of 19.

---

## S1 · TITLE CARD

A call to Oracle Fusion's REST API fails for a reason, and that reason is reported in a predictable JSON shape — one you'll recognize instantly once you've seen it, because it's consistent across almost every Financials resource.

## S2 · CODE CARD

A real Oracle Fusion error response carries a title summarizing the problem, the numeric status code, a detail string explaining exactly what went wrong, and often an o colon errorCode — an Oracle-specific code you'd quote if you needed to escalate the issue to support or a developer.

## S3 · STEPS CARD

The status code alone tells you whether retrying is even worth attempting. A 400, 401, or 403 means something about your request itself was wrong — bad data, bad credentials, no permission — and sending the exact same request again produces the exact same failure. A 404 means the resource doesn't exist; retrying won't make it appear. But a 429 rate limit, or a 500 or 503 server-side issue, is genuinely transient, and worth retrying.

## S4 · CODE CARD

When something is worth retrying, exponential backoff is the standard approach: wait a little after the first failure, longer after the second, longer still after the third, instead of hammering a struggling server immediately. One second, then two, then four — giving the transient problem time to actually clear before you try again.

## S5 · OUTRO CARD

A predictable error shape, a clear line between what's worth retrying and what never will succeed, and backoff instead of hammering — that's error handling done right. Chapter 4 starts next, looking at the different shapes an integration between Fusion and the outside world can actually take.
