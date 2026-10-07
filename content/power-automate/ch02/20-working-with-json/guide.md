# Working with JSON: Parse JSON and Compose

When Castlebridge Logistics' flow calls Meridian TrackAPI, what comes back is a single block of raw JSON text — not fields you can drop into an email or a SharePoint item. Power Automate treats that response as one opaque string until you tell it otherwise. This lesson covers the two actions that turn raw JSON into something a flow can actually use: Parse JSON and Compose.

## What you'll learn

- Why an HTTP response needs to be parsed before you can reference its fields
- How to generate a Parse JSON schema from a real sample payload
- How the Parse JSON action exposes dynamic content for every field in that schema
- How Compose is used to inspect or reshape a value mid-flow, independent of Parse JSON

## Why you can't just use the raw response

An HTTP action's response body is, as far as Power Automate is concerned, text. Even though that text is structured JSON, the designer has no idea in advance that it contains a `status` field or a `latitude` field — it just sees a string. Parse JSON is the action that reads a schema you provide, matches it against the incoming text, and turns each field into dynamic content you can click and insert anywhere downstream, the same way you'd insert a field from SharePoint or Outlook.

![The Parse JSON action in the Power Automate designer, with its Content field and generated schema box](/courses/power-automate/ch02/20-working-with-json/parse-json-action-designer.png)
*The Parse JSON action in the Power Automate designer — Content on top, the generated schema below it.*

## Generating a schema from a sample payload

You almost never hand-write a Parse JSON schema. Instead, you take one real response — say, an actual status lookup for a Castlebridge shipment — and use the **Use sample payload to generate schema** option. Paste the sample in, and Power Automate builds the schema automatically, matching every field's name and type. If Meridian later adds a new field to their response, your existing schema simply ignores it; if a field your flow depends on disappears, Parse JSON will throw a schema-mismatch error the next time the flow runs, which is exactly the early warning you want.

## Compose: a scratchpad, not a parser

Compose is a different tool for a different job. It doesn't parse anything — it just evaluates one expression and holds the result so you can look at it, reuse it, or feed it into a later step. Teams commonly use Compose to debug a tricky expression before wiring it into the "real" action, or to build a single reusable value (like a formatted shipment reference number) once instead of retyping the same expression in five places.

## Key terms

- **Parse JSON** — the action that converts a JSON string into typed, clickable dynamic content using a schema
- **Schema** — the structure (field names and types) Parse JSON uses to interpret incoming JSON
- **Use sample payload to generate schema** — the designer option that builds a schema automatically from a real example
- **Compose** — an action that evaluates and holds one expression's result, used for debugging or reuse
