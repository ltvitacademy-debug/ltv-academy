# Lesson 25 — Sandboxing Agent Actions

**Chapter 5 · Agent Safety & Guardrails · Lesson 25 of 32**

## What you'll learn

- Why sandboxing is Anthropic's own first-listed safeguard for agent deployment
- The difference between limiting an agent's *behavior* and limiting its *environment*
- Least privilege applied concretely to an agent's credentials and tool access
- A real worked example: a scoped API key versus an over-broad one

## A limit on behavior isn't a limit on blast radius

Chapters 4 and this chapter so far have been about controlling what an
agent *decides* to do: approve the risky calls, cap the loop, budget the
cost. Sandboxing is a different kind of control entirely — it's about
limiting what the agent is even *capable* of doing, regardless of what it
decides, by constraining the environment it runs in. A perfectly-designed
approval checkpoint is still only as good as the credentials behind it: if
the agent's tool-execution environment holds admin access to the production
database, a bug in your checkpoint code is a production incident, not a
caught mistake.

Anthropic's own guidance on building agents puts this first among concrete
recommendations: "extensive testing in sandboxed environments, along with
the appropriate guardrails." Sandboxing isn't a nice-to-have on top of
behavioral controls — it's the backstop for when those controls fail, are
bypassed, or simply weren't anticipated for this exact case.

## Least privilege, applied concretely

The core principle is simple to state and easy to under-apply in practice:
an agent's credentials should grant exactly the access its tools need, and
nothing more. In practice that means auditing every credential an agent's
tool-execution environment holds against what its tools actually call:

```
// Over-broad: one key, full account access
api_key: "sk_live_FULLACCESS...", scopes: ["*"]

// Scoped: narrow key, matches exactly what this
// agent's tools are allowed to do
api_key: "sk_live_refund_only...",
scopes: ["refunds:write", "orders:read"]
```

The scoped key means that even if the agent is tricked into calling
`issue_refund` with the wrong arguments, or a prompt injection tries to get
it to call something it was never given a tool for, the credential itself
makes most of the worst outcomes structurally impossible — not just
unlikely. That's a stronger guarantee than any amount of careful prompting.

## Environment isolation, not just credential scope

Least privilege covers *what* the agent can reach through its APIs. A
second layer covers *where* its code actually executes: tools that run
code (a Python sandbox, a shell command, a browser) should run in an
isolated environment — a container or VM with no access to your production
filesystem, network, or secrets beyond what that specific tool needs —
so that even a successfully "working as intended" tool call can't reach
beyond its own sandbox walls.

```
sandbox:
  network: egress_allowlist: ["api.internal-pricing.com"]
  filesystem: read_only, scratch_dir: /tmp/agent_run_42
  credentials: scoped_refund_key_only
```

## Trusted environments, not every environment

Anthropic's guidance also frames this as a condition for autonomy at all:
agents are "ideal for scaling tasks in trusted environments." A trusted
environment here specifically means one where sandboxing and credential
scoping have already been done — not an assumption that the agent will
behave, but a guarantee about what happens if it doesn't.

## Key terms

| Term | Meaning |
|---|---|
| Sandboxing | Running an agent's tool execution in an isolated environment that limits what it can reach |
| Least privilege | Granting exactly the access needed and no more — applied to API scopes, credentials, and environment |
| Scoped credential | An API key or token limited to specific actions/resources, rather than full account access |
| Trusted environment | One where sandboxing and credential scoping bound the damage even if behavioral controls fail |

## Check yourself

An agent's `run_python` tool currently executes with the same credentials
and network access as your main production backend. List two concrete
changes, from this lesson, you'd make before trusting it with real tasks.
