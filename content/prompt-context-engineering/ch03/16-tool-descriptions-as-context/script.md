# Script — Tool Descriptions as Context

## Segment 1 (title)

Every tool you offer a model is part of the context window too. The schema's wording isn't documentation for a human reader — it's context the model uses to decide when and how to call it.

## Segment 2 (code: a vague tool definition)

Here's a vague tool definition: get_order_status, description "Gets order info," one parameter called "id" with no explanation of its format. It costs tokens on every single call, and it tells the model almost nothing about when to use it or what "id" should actually look like.

## Segment 3 (code: the same tool, written as real context)

The same tool, written as real context: a description that says it's a read-only lookup, by ID, and to use it only after the ID is confirmed. The parameter is renamed order_id with a description showing the expected format, like ORD-48291. This is the same JSON schema shape covered in the Generative AI & LLMs course's tool-calling lesson — name, description, input_schema — just written like context that has to earn its tokens.

## Segment 4 (steps: four rules)

Four rules make that difference reliably. Say what the tool does and when to use it, not just its name. Describe each parameter precisely — format, units, valid values — not just its type. State constraints and side effects: is it read-only, does it need confirmation first, can it modify data. And keep it short, because every tool definition you offer is sent on every single call, whether or not the model ends up using it.

## Segment 5 (outro)

A vague description doesn't just read badly — it costs the same tokens as a good one while giving the model less to work with, which is the worst combination in a context budget. Next: memory strategies — what stays inside this call's context window, and what gets stored outside it and recalled only when needed.
