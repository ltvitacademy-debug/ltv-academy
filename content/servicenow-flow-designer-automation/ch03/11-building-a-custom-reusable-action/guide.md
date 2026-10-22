# Lesson 11 — Building a Custom Reusable Action

**Chapter 3 · Flow Actions · Lesson 11 of 27**

## What you'll learn

- Why built-in actions eventually run out, and what Action Designer is for
- The three parts of any custom action: Inputs, internal steps, and Outputs
- A real use case: a "Calculate SLA Due Date" action shared across many flows
- Why centralizing logic in one action beats copying the same steps into every flow
- How a custom action gets used inside a flow once it's built

## When Create, Update, and Notify aren't enough

Lesson 9 and 10 covered the actions that ship out of the box. They go a long way, but eventually
a flow needs a piece of logic that isn't a single built-in action — some calculation, some
multi-step sequence, something you'll need again in three other flows next month. Rebuilding that
same sequence of steps inside every flow that needs it is exactly the kind of duplication this
platform tries to design away. **Action Designer** is the tool for building your own custom,
reusable action once, so every flow that needs that logic calls the same action instead of
re-implementing it.

## The three parts of a custom action

Every custom action you build in Action Designer has the same three-part shape:

- **Inputs** — the data the action needs to do its job, defined explicitly (a date, a priority
  level, a record reference — whatever the calculation or sequence requires).
- **Internal steps** — the actual logic, built from a sequence of steps that can include the same
  built-in actions you already know (Create Record, Update Record), scripting steps for anything
  that needs real logic, or even IntegrationHub actions if the action needs to reach outside the
  platform.
- **Outputs** — the data the action hands back once it finishes, which the calling flow can then
  use as a data pill in its own later steps, exactly like any built-in action's output.

## A real example: Calculate SLA Due Date

A genuinely common use case is a custom action called something like "Calculate SLA Due Date." Its
Input is a priority level (and maybe a start timestamp). Internally, it runs the business logic
that maps priority to a response window and computes the actual due date/time — logic that, if
written once correctly, doesn't need to be re-derived by whoever builds the next flow. Its Output
is the calculated due date, ready to feed into a data pill. Any flow that needs an SLA due date —
an Incident flow, a Change flow, a Service Catalog fulfillment flow — calls this one action
instead of re-implementing the date math three separate times, with three separate chances to get
it slightly wrong.

## Why centralizing this logic actually matters

If the SLA calculation logic lives inside a custom action, fixing a bug or adjusting the business
rule (say, priority definitions change) means updating it in exactly one place, and every flow
that calls that action picks up the fix automatically. If that same logic had been copy-pasted
into five different flows instead, fixing it means finding and correctly re-editing all five —
and missing one is how flows quietly drift out of sync with each other over time.

## Using a custom action inside a flow

Once built, a custom action shows up in the flow action picker right alongside the built-in
actions from Lesson 9 — there's no special syntax or extra step to "import" it. You drop it into
a flow, map its Inputs the same way you'd map any action's fields, and consume its Outputs as data
pills the same way you'd consume a built-in action's output. From the flow-builder's point of
view, a well-built custom action looks and behaves exactly like a native one.

## Key terms

| Term | Meaning |
|---|---|
| Action Designer | The tool used to build a custom, reusable Flow Designer action |
| Inputs | The data a custom action requires to run, defined explicitly when building it |
| Internal steps | The built-in actions, scripts, or IntegrationHub steps that make up a custom action's logic |
| Outputs | The data a custom action returns, usable as a data pill by the calling flow |

## Check yourself

You're ready for Lesson 12 when you can explain: if three different flows each need to calculate
an SLA due date, what's the real cost of copy-pasting that logic into all three instead of
building one custom action?
