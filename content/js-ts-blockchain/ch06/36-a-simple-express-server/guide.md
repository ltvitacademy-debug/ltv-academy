# Lesson 36 — A Simple Express Server

**Chapter 6 · Node.js Basics · Lesson 36 of 39**

## What you'll learn

- How to stand up a minimal Express server with one real route
- How to wire a route handler to an actual on-chain call (tying together ethers/viem, env config,
  and async error handling from earlier lessons)
- A basic error-handling middleware pattern so a failed RPC call returns a clean JSON error
  instead of crashing the server
- Reading the `PORT` from an environment variable, the server-side analog of Lesson 34's pattern

## Install and the minimal server

```
$ npm install express
$ npm install -D @types/express
```

```ts
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
```

`app.get(path, handler)` registers a route; `res.json(...)` sends a JSON response with the
correct `Content-Type` header set automatically. `process.env.PORT || 3000` follows the exact
pattern from Lesson 34 — read from the environment, fall back to a sane default.

## A real route: balance lookup

Everything from Chapter 5 and this chapter comes together in one route:

```ts
import { JsonRpcProvider, formatEther, isAddress } from "ethers";

const provider = new JsonRpcProvider(process.env.RPC_URL);

app.get("/balance/:address", async (req, res) => {
  const { address } = req.params;
  if (!isAddress(address)) {
    return res.status(400).json({ error: "Invalid address" });
  }
  const balance = await provider.getBalance(address);
  res.json({ address, balanceEth: formatEther(balance) });
});
```

`req.params.address` comes from the `:address` segment of the route path. Validating it with
`isAddress` before ever touching the network is the Lesson 26/30 instinct applied to HTTP input
instead of a CLI argument or an env var — the same discipline, a new source of untrusted input.

## Error-handling middleware

An `async` route handler that throws doesn't automatically produce a clean response — without
handling it, the request hangs or the process crashes. Wrap risky calls, and add a final
error-handling middleware as a safety net:

```ts
app.get("/balance/:address", async (req, res, next) => {
  try {
    const balance = await provider.getBalance(req.params.address);
    res.json({ balanceEth: formatEther(balance) });
  } catch (err) {
    next(err); // hands off to Express's error-handling middleware below
  }
});

// Must be registered AFTER all routes — Express recognizes it by its 4 arguments
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
```

A bad RPC endpoint or a reverted call now returns a clean `500` with a JSON body, instead of
leaving the client's request hanging or crashing the whole server process for every other
in-flight request.

## Key terms

| Term | Meaning |
|---|---|
| `app.get(path, handler)` | Registers a route for GET requests at that path |
| `req.params` | Values captured from `:segments` in the route path |
| `res.json(obj)` | Sends a JSON response with the correct Content-Type |
| Error-handling middleware | A 4-argument `app.use()` registered last, catching errors passed via `next(err)` |

## Lab

1. Install `express` and `@types/express`, and stand up the minimal server above.
2. Add the `/balance/:address` route with `isAddress` validation.
3. Add the error-handling middleware, then deliberately break `RPC_URL` and confirm you get a
   clean `500` JSON response instead of a crash.

## Check yourself

Chapter 6 is complete when you can explain how a request flows from `app.get` through an
`async` handler to an RPC call and back as JSON, and why error-handling middleware has to come
last.
