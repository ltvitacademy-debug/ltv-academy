# Lesson 19 — Fetching Data From an API

**Chapter 3 · Asynchronous JavaScript · Lesson 19 of 39**

## What you'll learn

- How `fetch()` works, and why it needs two `await`s, not one
- Why `fetch()` doesn't reject on a 404 or 500 — and what to do about it
- Combining `async`/`await` and `try`/`catch` into one real, reusable function
- How wrapping the mess once keeps calling code simple

## The built-in fetch() function

```js
const response = await fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
);
const data = await response.json();
console.log(data); // { ethereum: { usd: 2531.14 } }
```

`fetch()` takes a URL and returns a promise that resolves to a `Response`
object — **not** the data itself yet.

## Why two awaits

| Step | What settles |
|---|---|
| `await fetch(url)` | Resolves once the status code and headers arrive — the server has responded |
| `await response.json()` | Resolves once the body has actually been read and parsed as JSON |

These are genuinely two separate asynchronous steps, each with its own
promise.

## fetch() doesn't reject on a 404 or 500

```js
const response = await fetch("https://api.example.com/missing");
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
const data = await response.json();
```

`fetch()` only **rejects** on a genuine network failure — no connection,
DNS failure, and similar. An HTTP error status (404, 500, …) still counts
as a "successful" request as far as `fetch()` is concerned. Checking
`response.ok` yourself, and throwing your own error when it's `false`, is
your responsibility.

## Putting the whole chapter together

```js
async function getEthPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.ethereum.usd;
  } catch (err) {
    console.error("Price fetch failed:", err.message);
    return null;
  }
}
```

This single function uses every idea from this chapter: `async`/`await`
for readable top-to-bottom flow, `try`/`catch` for both network failures
and the manually-thrown HTTP-status error, and a graceful `null` return
instead of an unhandled rejection.

## Calling it

```js
const price = await getEthPrice();
if (price !== null) {
  console.log(`ETH is $${price}`);
}
```

The caller never has to think about `fetch`, `Response` objects, JSON
parsing, or rejections — all of that complexity is wrapped once, inside
`getEthPrice`.

## Key terms

| Term | Meaning |
|---|---|
| `fetch()` | Built-in function that starts an HTTP request and returns a promise resolving to a `Response` |
| `Response` | The object `fetch()`'s promise resolves to — headers and status, with the body read separately |
| `response.ok` | `true` for any 2xx status; `false` for 4xx/5xx — `fetch()` does not treat this as a rejection |

## Lab

1. Call `fetch()` against a real public API (CoinGecko's simple price endpoint works with no API key) and log the parsed JSON.
2. Deliberately request a URL that 404s, and confirm `fetch()` resolves rather than rejects — then add the `response.ok` check that turns it into a thrown error.
3. Wrap your call in a function like `getEthPrice` that returns `null` on failure instead of throwing, and call it from code that checks for `null`.

## Check yourself

Chapter 3 is complete when you can write, from memory, a function that
fetches JSON from a URL, checks `response.ok`, and returns `null` on any
failure instead of letting an exception or rejection escape uncaught.
