# Lesson 19 — IntegrationHub Lab

**Chapter 5 · IntegrationHub · Lesson 19 of 29**

## What you'll learn

- How to work through designing a custom spoke action end to end, on paper
- How to define Inputs for a real scenario before touching a single step
- How to configure an internal REST step against a real external endpoint, using an Authentication Profile
- How to define Outputs that hide the target system's API shape from consumers
- How to sanity-check the finished action the way Lesson 18 told you to, before calling it done

## The scenario

Your company runs a niche internal inventory system with no official ServiceNow spoke — a
homegrown platform the warehouse team built years ago, reachable only over its own REST API.
Multiple teams keep asking the same question inside their flows: "does this item still have
stock?" Right now, every flow builder who needs that answer either drops in a generic REST step
and configures the inventory API by hand, or asks a developer to write a Script step. Neither
scales. Your task: design a reusable custom action, **Check Inventory Level**, so any flow
builder across the company can ask that question without ever touching the inventory system's
API.

## Step 1 — Define the Inputs

Before opening the action builder, you work out what a consumer actually needs to supply. The
inventory system's API identifies items by SKU, so the action needs exactly one required Input:

- **Item SKU** (string, required) — the inventory system's unique identifier for the item being checked.

You deliberately don't add inputs for things like the warehouse location or an API key — those
belong to the internal step and the Authentication Profile, not to what a flow builder should
have to think about.

## Step 2 — Configure the internal REST step

Inside the action, you add a single internal REST step. This step does the same kind of work as
course 4's generic REST step, except it's configured once, here, instead of on every consuming
flow:

- **Endpoint** — the inventory system's real API path, something like
  `https://inventory.internal.example.com/api/v1/items/{sku}/availability`, with the SKU Input
  substituted into the path.
- **Method** — `GET`, since this is a read-only lookup.
- **Authentication Profile** — a profile already set up in Chapter 3 against the inventory
  system's credentials, referenced here rather than re-entered. Whoever uses "Check Inventory
  Level" later inherits this authentication automatically; they never see a credential.
- **Response handling** — the inventory system returns a JSON body like
  `{"sku": "...", "qty_available": 42, "warehouse": "DC-3"}`. The internal step parses that
  response so later steps in the action can reference its fields.

## Step 3 — Define the Outputs

You don't expose every field the API happened to return — only what a consumer actually needs
to act on:

- **Quantity Available** (number) — mapped from the response's `qty_available` field.

You leave out `warehouse` and the raw `sku` echo; they're internal details of how the lookup
happened, not something a flow deciding "can we fulfill this order?" needs to see.

## Step 4 — Sanity-check before calling it done

Running through Lesson 18's checklist: the Input name "Item SKU" is clear to anyone who's never
seen the inventory system. The single Output, "Quantity Available," is exactly what a consumer
flow needs and nothing more. The Authentication Profile is the inventory team's shared service
account, not a personal credential that will break when someone leaves. The action is ready to
publish — and from this point on, any flow builder in the company can drop "Check Inventory
Level" into a flow, supply a SKU, and read back a quantity, with no idea the inventory system's
REST API even exists.

## Key terms

| Term | Meaning |
|---|---|
| Check Inventory Level | This lab's worked example custom action — checks stock for one item SKU |
| Item SKU | The inventory system's unique identifier for an item; the action's one required Input |
| Internal REST step | The GET call to the inventory system's API, configured once inside the action |
| Quantity Available | The action's one Output, mapped from the API response's quantity field |

## Check yourself

If the warehouse team later adds a second inventory location and the API response shape
changes, what — specifically — has to change inside "Check Inventory Level," and what stays
exactly the same for every flow builder who already uses it?
