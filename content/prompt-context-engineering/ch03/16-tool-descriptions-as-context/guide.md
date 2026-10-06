# Lesson 16 — Tool Descriptions as Context

**Chapter 3 · Context Engineering · Lesson 16 of 24**

## What you'll learn

- Why tool/function schemas are part of the context window, not
  separate from it
- A real before/after comparison of a vague vs. a well-written tool
  description
- Four concrete rules for writing tool descriptions that earn their
  tokens
- Why a vague description is the worst combination in a context
  budget: same cost, less value

## Tool schemas are context, not metadata

The Generative AI & LLMs course covered the mechanics of function/tool
calling: a tool is defined as a name, a description, and a parameter
schema (`input_schema`), offered to the model alongside the prompt so
it can choose to call it. What that lesson didn't emphasize is that
every one of those tool definitions is sent as part of the context
window on *every single call* — whether or not the model ends up
calling that tool. A chatbot offered eight tools pays the token cost
of all eight schemas on every turn, not just the one it uses.

That means the wording of a tool's `description` field isn't
documentation written for a human developer reading the code later —
it's context the model reads, right now, to decide whether and how to
call that tool. Lesson 12's distinction applies here directly: a model
calling the wrong tool, or the right tool with bad arguments, can be a
context problem, not a reasoning problem.

## The same tool, two ways

A vague definition:

```
{
  "name": "get_order_status",
  "description": "Gets order info.",
  "input_schema": {
    "type": "object",
    "properties": {
      "id": { "type": "string" }
    }
  }
}
```

This tells the model almost nothing: what counts as "order info,"
when to call this instead of some other order-related tool, or what
format `id` should be in. A model given this schema is guessing.

The same tool, written as real context:

```
{
  "name": "get_order_status",
  "description": "Read-only lookup of
   ONE order's ship status by ID.
   Use after the ID is confirmed.",
  "input_schema": {
    "properties": {
      "order_id": {
        "type": "string",
        "description": "e.g. ORD-48291"
      }
    },
    "required": ["order_id"]
  }
}
```

This version states what the tool does (a status lookup), when to use
it (after the ID is confirmed), that it's read-only (no risk of it
being mistaken for a cancel/modify action), and shows the parameter's
expected format directly in its own description.

## Four rules

1. **Say what it does and when.** The tool's name alone ("get_order_status")
   isn't enough — the description should state the trigger condition
   for calling it, not just restate the name in a sentence.
2. **Describe parameters precisely.** "type: string" tells the model
   almost nothing about what a valid value looks like. An example
   format, units, or an enum of valid values does the actual work.
3. **State constraints and side effects.** Is the tool read-only or
   does it change data? Does it require user confirmation first? Can
   it be called more than once safely? These are exactly the details
   that prevent a model from, say, cancelling an order it was only
   asked to check on.
4. **Keep it short.** Every word in a tool description is a token paid
   on every call this tool is offered, regardless of whether it's
   used. Precision and brevity aren't in tension here — a precise
   description is usually also a short one; a vague one just as often
   runs long without saying anything specific.

## Why vague is the worst case, not just a weak case

A vague tool description costs exactly as many tokens as a precise one
of similar length — but gives the model less to work with when
deciding whether to call it and how to fill in its arguments. In a
context budget (Lesson 13) that's the worst combination available:
full price, reduced value. Treating tool descriptions with the same
scrutiny as the rest of the context — not as an afterthought bolted
onto a working prompt — is what this lesson adds to the mechanics
already covered in the tool-calling lesson.

## Key terms

| Term | Meaning |
|---|---|
| Tool schema | The name, description, and parameter definition offered to a model for a callable tool |
| input_schema | The parameter definition (type, format, required fields) inside a tool's schema |
| Trigger condition | The specific circumstance under which a tool should be called, stated in its description |

## Lab

1. Take a tool definition you've written in an earlier chapter (or
   write a simple one) and rate its description against the four
   rules above.
2. Rewrite it to state its trigger condition, precise parameter
   formats, and any constraints or side effects — and compare the
   rewritten version's token length to the original.

## Check yourself

You're ready for Lesson 17 when you can look at a tool schema and
identify, specifically, which of the four rules it's violating — not
just that it "could be clearer."
