# Lesson 23 — Agent Security: Tool Use and the Blast Radius of Autonomy

**Chapter 6 · Securing AI Application Architecture · Lesson 3 of 4**

## What you'll learn

- Why giving a language model the ability to call tools turns a
  text-generation security problem into a real-world-action security
  problem
- What **blast radius** means for an agent, and how tool scoping
  shrinks it
- Why some actions should never run fully autonomously, and how to
  draw the line between what an agent can do on its own and what
  needs a human approval gate — the same pattern Course 10 used for
  SOAR playbooks
- Why narrow, parameterized tool schemas are themselves a security
  control, not just an API design choice

## Tool use changes what a wrong answer costs you

Everything in this course up to now has largely been about controlling
what a model *says*. An agent — a model wired up with tool-calling
access — can *do* things: send an email, modify a record, run a
database query, execute code, call another service. The moment a
model's output can trigger a real action instead of just being
displayed to a user, the cost of the model being wrong, misled, or
successfully prompt-injected stops being "it said something incorrect"
and becomes "it did something." That's the same reasoning-over-
untrusted-input problem from earlier chapters, except now the thing
being manipulated has hands.

## Blast radius: what one bad decision can actually reach

**Blast radius** is the right frame for sizing this risk: not "could
the agent be tricked," because against a sufficiently motivated
attacker you should assume sometimes it will be, but "if it is tricked
or simply wrong, what's the worst it can do with the access it
currently holds." An agent wired to a single read-only lookup tool has
a small blast radius — a bad decision returns a wrong answer. An
agent wired to a tool that can delete records, send money, or execute
arbitrary shell commands, using a credential with broad standing
permissions, has an enormous one — a bad decision can cause real,
possibly irreversible damage. The fix isn't trying to make the model
unfoolable. It's making sure that when it is fooled, the damage is
small, contained, and recoverable.

## Minimum tool access, scoped per tool, not per agent

Least privilege applies to agent tools exactly the way it applies to
service accounts: each tool should hold the minimum permission
necessary for its specific job, not a shared, broad credential reused
across every tool the agent happens to have. A tool that looks up
order status should use a read-only, order-scoped credential. A tool
that issues refunds should use a separate credential limited to
issuing refunds up to a defined amount, not a general finance-system
credential that can also alter prices or close accounts. Scoping at
the tool level, rather than granting the whole agent one broad
identity, means a prompt-injection attack that successfully convinces
the model to misuse one tool still can't reach further than that one
tool's narrow permission.

```
# WRONG — one broad credential, reused by every tool
agent_credential = get_token(scope="finance:*")

# RIGHT — each tool scoped to exactly what it needs
lookup_tool_credential = get_token(scope="orders:read")
refund_tool_credential = get_token(scope="refunds:issue", max_amount=200)
```

## Draw an explicit line: autonomous vs. approval-gated

Not every action a tool-enabled agent can take should run without a
human in the loop. The same pattern Course 10 used for SOAR playbooks
— a security tool proposes an action, and a human approves it before
anything irreversible happens — applies directly here. Low-risk,
easily reversible, read-only actions are reasonable to let an agent
execute fully autonomously: looking something up, drafting a message
for review, running a read-only query. Higher-risk, hard-to-reverse,
or financially or operationally significant actions — deleting data,
sending an external communication, moving money, changing a
production configuration — belong behind an explicit approval gate:
the agent proposes the action and its justification, and a human
confirms before it executes. This line has to be drawn deliberately,
tool by tool, as a design decision up front, not discovered after an
agent does something costly on its own.

## Narrow tool schemas are a security control

The last piece is how a tool is exposed to the model in the first
place. A tool defined as a narrow, parameterized function — `issue_refund(order_id, amount)`
with validated inputs — constrains what the model can even request,
because the model can only call the function with the parameters it
was given, not arbitrary free-form commands. A tool defined as "run
this shell command" or "execute this SQL" hands the model a
general-purpose capability with no structural limit on what it can
be asked to do, which erases most of the benefit of scoping
credentials carefully in the first place. Prefer specific, narrow,
validated tool functions over general-purpose execution tools
wherever the underlying task allows it, and log every tool call — its
inputs, its output, and which credential it ran under — so a bad
decision is at minimum visible and auditable after the fact.

## Key terms

| Term | Meaning |
|---|---|
| Blast radius | The worst-case damage an agent can cause if a given decision is wrong or successfully manipulated, given the access it currently holds |
| Tool scoping | Granting each individual tool the minimum credential and permission it needs, rather than one broad identity shared across all of an agent's tools |
| Human-in-the-loop approval gate | A required human confirmation step before a high-risk or hard-to-reverse agent action executes — the same pattern used for SOAR playbook approval gates |
| Narrow tool schema | A tool exposed to the model as a specific, parameterized function rather than a general-purpose execution capability, constraining what the model can request |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: what
does "blast radius" mean for an AI agent, and name two concrete design
choices — one about credentials, one about approval — that shrink it.
