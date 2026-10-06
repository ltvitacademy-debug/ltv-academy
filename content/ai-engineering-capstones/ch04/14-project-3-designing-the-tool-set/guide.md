# Lesson 14 — Designing the Tool Set

**Chapter 4 · Project 3 — Tool-Using Agent With Human Approval · Lesson 14 of 23**

## What you'll learn

- How to design 2–3 real tools for an action-taking agent, using the
  real Messages API tool-definition shape
- Why every tool in this project needs an explicit risk tier, decided
  at design time — not improvised later
- How the AI Agents course's schema-design checklist applies with extra
  weight once a tool can actually do something
- A concrete worked example: a support-ticket agent with one read-only
  tool and one high-risk action tool

## The schema bar is higher once a tool can act

The AI Agents course's tool-design lesson covered writing a detailed
`description` — what the tool does, when to use it, when not to, and
what each parameter means. That bar doesn't change here. What's new is
the *stakes*: a poorly-described read-only tool gets called at the wrong
time and wastes a turn. A poorly-described action tool gets called at
the wrong time and does something real. Every tool in this project's set
needs that same disciplined description, with the "when NOT to use this"
clause doing more work than usual.

## A worked example: a support-ticket agent

Two tools, two different risk tiers, both real Messages API tool
definitions:

```json
{
  "name": "look_up_order",
  "description": "Looks up an order by ID and returns its status,
    items, and total. Read-only -- makes no changes. Use whenever the
    agent needs order details to answer a question or decide on an
    action.",
  "input_schema": {
    "type": "object",
    "properties": {"order_id": {"type": "string"}},
    "required": ["order_id"]
  }
}
```

```json
{
  "name": "issue_refund",
  "description": "Issues a refund for an order, up to its paid total.
    Irreversible once processed. Only use after look_up_order confirms
    the order and amount. Never use to refund more than the original
    paid total.",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_id": {"type": "string"},
      "amount_cents": {"type": "integer"},
      "reason": {"type": "string"}
    },
    "required": ["order_id", "amount_cents", "reason"]
  }
}
```

Both are valid tool definitions Claude can call. Only one of them should
ever run without a human looking at it first.

## Classify every tool's risk tier at design time

Alongside each tool's Messages API definition, your application keeps
its own metadata — not sent to Claude, but used by your code to decide
whether the approval workflow (Lesson 15) applies:

| Tool | Risk tier | Requires approval? |
|---|---|---|
| `look_up_order` | Read-only | No |
| `issue_refund` | Irreversible, financial | Yes |

Deciding this now, per tool, at design time is what makes Lesson 15's
checkpoint simple: the approval logic just checks a flag your own code
already set, instead of trying to infer risk from a tool call after the
fact.

## Key terms

| Term | Meaning |
|---|---|
| Risk tier | A design-time classification of how consequential a tool's action is |
| Read-only tool | A tool that only retrieves information and changes nothing |
| Action tool | A tool that modifies state, spends money, or sends something externally |
| `requires_approval` | An application-level flag (not part of the Anthropic tool schema) your code checks before executing a given tool |

## Lab

Write the real Messages API tool definitions for your own Project 3's
2–3 tools, following the same description discipline as the worked
example. For each one, write down its risk tier and whether it requires
approval, in a short table like the one above.

## Check yourself

- Why does a vague "when NOT to use this" clause matter more for an
  action tool than a read-only one?
- In the worked example, why does `issue_refund`'s description require
  that `look_up_order` run first?
- Where does the `requires_approval` flag live, and why isn't it part of
  the tool's `input_schema`?
