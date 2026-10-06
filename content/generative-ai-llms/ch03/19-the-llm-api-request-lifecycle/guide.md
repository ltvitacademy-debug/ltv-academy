# Lesson 19 — The LLM API Request Lifecycle, End to End

**Chapter 3 · Working With LLM APIs · Lesson 19 of 31**

## What you'll learn

- The full journey one request takes, from your code to the model and back
- The required authentication headers on a real request
- A verified, current table of HTTP error codes you'll actually see in production
- Every documented `stop_reason` value and what each one means
- How this lesson ties together everything else in Chapter 3

## The journey, step by step

```
Build request → Authenticate → Validate → Tokenize → Generate → Return/Stream → Bill & log
```

1. **Build the request** — your application assembles the JSON body: `model`,
   `max_tokens`, `messages`, and whichever of `system`, `tools`, `output_config`, or
   sampling parameters this call needs (Lessons 13–18, all in one request).
2. **Authenticate** — the request carries real headers:

```
POST /v1/messages HTTP/1.1
x-api-key: sk-ant-...
anthropic-version: 2023-06-01
content-type: application/json
```

3. **Validate** — the API checks the request shape before any model work happens. A
   malformed body, an unsupported parameter for that model, or a bad API key fails here,
   fast and cheap.
4. **Tokenize** — your text gets converted into the token IDs the model actually operates
   on (Chapter 1, Lesson 2).
5. **Generate** — the model runs inference, producing tokens one at a time.
6. **Return or stream** — a blocking call waits for the full reply; a streaming call
   (Lesson 16) sends it back as it's generated.
7. **Bill & log** — `usage` (`input_tokens`/`output_tokens`) is attached to the response
   and is what you're actually charged for; every response also carries a `request-id`
   header for support/debugging.

## Every stop_reason value

The response always tells you *why* generation ended — never assume it just "finished":

| `stop_reason` | Meaning |
|---|---|
| `end_turn` | The model reached a natural stopping point |
| `max_tokens` | Generation was cut off at your `max_tokens` limit |
| `stop_sequence` | A custom string you supplied in `stop_sequences` was hit |
| `tool_use` | The model is pausing to let you run a tool (Lesson 17) |
| `refusal` | The model declined to produce schema-conforming output (Lesson 18) |

`max_tokens` is the one worth watching for specifically: it means the reply is
**incomplete**, not finished — a response your code should treat differently from
`end_turn`.

## A real, current error table

Every error comes back as JSON with a `type` and `message`, plus a `request_id` you'd
quote to support:

```json
{
  "type": "error",
  "error": { "type": "not_found_error", "message": "The requested resource could not be found." },
  "request_id": "req_011CSHoEeqs5C35K2UUqR7Fy"
}
```

| HTTP status | Error type | What it means |
|---|---|---|
| 400 | `invalid_request_error` | Malformed request, bad parameter, or a spend limit hit |
| 401 | `authentication_error` | API key missing, malformed, revoked, or expired |
| 403 | `permission_error` | This key can't access the requested resource |
| 404 | `not_found_error` | The endpoint or resource ID doesn't exist |
| 429 | `rate_limit_error` | You've hit a rate limit or spend cap |
| 500 | `api_error` | An unexpected error inside Anthropic's systems — retry with backoff |
| 529 | `overloaded_error` | The API is temporarily overloaded — retry with backoff |

That last pair — `api_error` and `overloaded_error` — are exactly the ones worth retrying
automatically; the official SDKs already do this with exponential backoff by default.

## Why this lesson closes the chapter

Every earlier lesson in Chapter 3 is one piece of this same journey: roles and system
prompts shape step 1, temperature/top_p/top_k shape step 5, streaming changes step 6, tool
calling and structured output change what `stop_reason` you get back at the end. This is
the whole chapter, as one request's life.

## Key terms

| Term | Meaning |
|---|---|
| `request-id` | A unique header on every response, used for support/debugging |
| `stop_reason` | The field that explains why generation ended |
| Exponential backoff | Retrying a failed request with increasing delay between attempts |
| `rate_limit_error` | A 429 — you've exceeded your allowed request/token rate |

## Lab

1. Write out the three required headers on a real Messages API request.
2. For each of `end_turn`, `max_tokens`, and `tool_use`, write one sentence explaining
   what your application should do differently in response.
3. Identify which two HTTP error codes in the table above are generally safe to retry
   automatically, and which are not.

## Check yourself

Chapter 3 is complete when you can describe a chat completion request's full journey from
memory — build, authenticate, validate, tokenize, generate, return, bill — and explain
what each `stop_reason` value tells your application to do next.
