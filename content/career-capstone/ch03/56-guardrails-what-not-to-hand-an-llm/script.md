# Script — Guardrails, What Not to Hand an LLM

## Segment 1 (title)

Every AI workflow this chapter covered used sanitized examples on purpose. A prompt to a third-party LLM is, for practical purposes, data leaving your control the moment you send it.

## Segment 2 (code: the hard line)

Real customer PII, API keys, connection strings, passwords, and unredacted production data never belong in a prompt to a hosted model — no matter how much faster it would make the draft. Use synthetic data, masked columns, or a schema with no rows instead.

## Segment 3 (code: confident vs correct)

An LLM's output reads persuasively whether or not it's right — that's a property of how it generates text, not a signal of accuracy. A claim traced to a real log line or a checked sample row is worth more than any amount of fluent-sounding certainty.

## Segment 4 (steps: responsibility doesn't move)

Handing a task to an LLM doesn't transfer responsibility for the output. The engineer who ships a mapping, a test suite, or an RCA owns it, whether they typed every line or reviewed an AI's draft.

## Segment 5 (outro)

Sanitize the input, verify the output, own the result. Next up: what an AI-augmented pipeline actually costs in tokens and latency.
