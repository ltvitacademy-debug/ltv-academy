# Lesson 5 — Flow Variables & Data Pills

**Chapter 2 · Flow Logic & Data · Lesson 5 of 27**

## What you'll learn

- What a data pill actually is, and where the data it holds comes from
- What a flow variable is, and how it's genuinely different from a data pill
- When to reach for a data pill vs. when a flow variable is the right tool
- How to define a flow variable and reference it anywhere in a flow
- A real example showing both mechanisms in the same flow

## Data pills: referencing data you already have

Every trigger and every action in Flow Designer produces output — a
record was created, a field changed, an approval was requested. Flow
Designer exposes that output as **data pills**: small draggable
tokens that represent a specific piece of data, like the trigger
record's Short Description or the output of Step 2's "Look Up
Record" action. You build a flow by dragging these pills directly
into a later step's input field — no scripting, no manual typing of
field names.

Say your flow triggers on "Incident Created." The trigger immediately
exposes pills for every field on that incident: Short Description,
Priority, Caller, Assignment Group, and so on. If Step 3 is a Notify
action, you open its message body field and drag the trigger's Short
Description pill directly into the text. At runtime, Flow Designer
swaps that pill for the actual value from the record that fired the
flow. Pills aren't limited to the trigger — every action's output
(the record a "Create Record" step just created, the boolean result
of an "Ask for Approval" step) becomes a pill available to every
step that comes after it.

## Flow variables: data you define up front

A data pill only ever comes from somewhere upstream — the trigger or
a prior step's output. A **flow variable** is different: it's a
value you explicitly define, ahead of time, in the Flow Variables
panel on the flow's properties, independent of any trigger or step
output. You give it a name, a data type (String, Integer, Boolean,
Reference, etc.), and optionally a default value — then it behaves
like a pill you can drag into any input field anywhere in the flow.

Flow variables earn their place when a value needs to be reused
across multiple steps, or calculated once and referenced repeatedly,
rather than being pulled fresh from a record. A constant approval
threshold, a calculated due date, a flag you set partway through the
flow and check again three steps later — all of these are flow
variables, not data pills, because nothing upstream already holds
that value for you.

## Choosing between them

The test is simple: does this value already exist somewhere earlier
in the flow (the trigger record, or an action's output)? Use a data
pill. Does this value need to be defined once, by you, and reused —
a constant, a computed value, something with no natural upstream
source? Use a flow variable. Most flows use both: pills to move real
record data between steps, variables to hold the constants and
working values the logic itself depends on.

## A combined example

Picture a flow that triggers on "Requested Item Created." The flow
defines one flow variable, `approval_threshold`, set to 1000, used
later to decide whether an item needs extra approval. A subsequent
"Look Up Record" action pulls the requested item's price. The If/Else
condition (covered next lesson) compares the price *data pill*
against the `approval_threshold` *flow variable* — one value came
from the record, the other was defined by the flow itself, and both
are referenced the same drag-and-drop way.

## Key terms

| Term | Meaning |
|---|---|
| Data pill | A draggable token representing output from the trigger or a prior step |
| Flow variable | A value explicitly defined in the Flow Variables panel, independent of trigger/step output |
| Trigger output | The set of fields from the record that started the flow, exposed as pills |
| Action output | Data produced by a step (a created record, an approval result) available as pills to later steps |

## Check yourself

A coworker asks: "Why not just use a flow variable for everything,
since it works everywhere a data pill does?" What's the real
difference you'd point to — specifically, where does each one's value
actually come from, and why can't a flow variable automatically hold
today's incoming record's Priority field without extra steps?
