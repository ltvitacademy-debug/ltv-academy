# Working with JSON: Parse JSON and Compose

The HTTP action from the last lesson hands you back a response body as a single opaque string — even when it's JSON underneath, Power Automate can't yet dot into its fields. **Parse JSON** fixes that: give it a schema, and every property in the payload becomes a named, typed token you can select from the dynamic content list, the same way a typed object's fields autocomplete in your editor. **Compose** solves the opposite problem: building a single reusable value — often a JSON object or string — from scratch, once, instead of retyping an expression in five different actions.

## What you'll learn

- Why Parse JSON exists and what a schema actually buys you
- The fast way to get a schema — generate it from a real sample instead of writing it by hand
- What Compose is for, and why "don't repeat an expression" is reason enough to use it
- How a classification response from a model becomes usable flow data, end to end

## Why Parse JSON exists

Without Parse JSON, referencing a field inside an HTTP response body means writing a raw expression by hand — something like `body('HTTP')?['choices']?[0]?['message']?['content']` — in every single action that needs it, with no autocomplete and no validation until the flow actually runs and fails. Parse JSON trades that for a one-time cost: you give it the response body as input and a JSON schema describing its shape, and from then on every property in that schema shows up as a clickable token in the dynamic content picker, just like a field on the trigger.

For an AI engineer, this matters most right where a model's response comes back as JSON — a classification result, a structured extraction, a function-call-style payload. Parse JSON is how that payload stops being a string and starts being data your flow can branch on, loop over, or write to a table.

## Getting a schema the fast way

You can write a JSON schema by hand, but almost nobody does. Instead, you run the flow once, copy a real example of the response body from a test run, and use **Generate from sample** — paste the example payload in, and Power Automate writes the schema for you. This is the same "generate from an example, not from a spec you write by hand" workflow you'd use with a tool like `json-schema-generator`, just built into the designer.

## Compose: define once, reuse everywhere

**Compose** takes any input — a literal value, an expression, or a combination of outputs from earlier steps — and produces a single named output. The point isn't that Compose does anything you couldn't do inline; it's that defining a value once, in a card with a name you choose, beats pasting the same expression into five separate actions and having to update all five if it changes. Here's Compose being selected from the Add an action search:

![Screenshot of searching for and selecting the Compose - Data Operation action in the Power Automate designer](/courses/power-automate-ai-agents/ch01/05-working-with-json-parse-and-compose/compose-search-select.png)
*Compose lives under Data Operation — search "compose" to find it directly.*

Configuring it is just one field: the input you want to save for reuse.

![Screenshot of the Compose action configured with an array of numbers as its Inputs value](/courses/power-automate-ai-agents/ch01/05-working-with-json-parse-and-compose/compose-configure.png)
*One field, Inputs — whatever you put here becomes Compose's reusable output.*

And once it runs, any later action can reference that output by name, the same way you'd reference a variable — here, a Join action pulls directly from Compose's output instead of retyping the array:

![Screenshot of a Join action referencing the Outputs value from a previous Compose action using the dynamic content picker](/courses/power-automate-ai-agents/ch01/05-working-with-json-parse-and-compose/compose-use-output.png)
*A later action referencing Compose's output by name — define once, use anywhere downstream.*

## Putting it together: a classification response

Picture a Castlebridge Logistics flow where an HTTP action calls a model to classify an incoming support ticket, returning JSON like this:

```json
{
  "category": "billing",
  "confidence": 0.94,
  "suggested_owner": "accounts-receivable"
}
```

Run Parse JSON on that body with a schema generated from exactly this sample, and `category`, `confidence`, and `suggested_owner` all become tokens the rest of the flow can use directly — `confidence` feeds a Condition that checks whether it's above 0.9, and `suggested_owner` goes straight into an assignment action. No string-splitting, no brittle hand-written expression. That handoff — a model's JSON response becoming structured flow data — is the mechanism Chapter 2 builds on for every AI Builder and Azure OpenAI action you'll add.

## Key terms

- **Parse JSON** — an action that turns a JSON string into named, typed tokens using a schema
- **Schema** — the shape definition Parse JSON needs; usually generated from a real sample payload
- **Generate from sample** — the feature that writes a schema for you from an example JSON payload
- **Compose** — an action that saves any input as a single, reusable, named output
