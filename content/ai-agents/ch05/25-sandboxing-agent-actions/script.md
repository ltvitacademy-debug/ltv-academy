# Script — Sandboxing Agent Actions

## Segment 1 (title)

Everything so far has controlled what an agent decides to do. Sandboxing controls what it's even capable of doing, regardless of its decision. Anthropic's own guidance lists this first: extensive testing in sandboxed environments, along with the appropriate guardrails.

## Segment 2 (code: least privilege, concretely)

The principle: credentials should grant exactly what the agent's tools need, nothing more. An over-broad key with full account access turns one bad tool call into a production incident. A scoped key — refund-write, order-read only — makes most worst-case outcomes structurally impossible, not just unlikely.

## Segment 3 (code: environment isolation)

Credential scope covers what the agent can reach through APIs. A second layer covers where its code actually runs — a sandbox with an egress allowlist, a read-only filesystem, scoped credentials only. Even a tool working exactly as intended can't reach past its own sandbox walls.

## Segment 4 (steps: trusted environment as a condition)

Anthropic frames trusted environments as the condition for autonomy at all — not an assumption the agent will behave, but a guarantee about what happens if it doesn't. Scope the credentials. Isolate the execution. Trust the boundary, not the behavior, because behavior is exactly what the rest of this chapter's controls are there to catch when they fail.

## Segment 5 (outro)

Sandboxing contains the blast radius from a tool executing badly. Next up: a risk that comes from outside the agent entirely — prompt injection through content it reads.
