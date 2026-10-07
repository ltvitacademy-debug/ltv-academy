# Variables and Initializing Data

Every flow you've built so far has worked directly with whatever a trigger or action handed it. That's fine for a one-step flow, but Castlebridge Logistics' real flows need to carry a running total, a growing list, or a flag across many steps — a dock-door count, a list of flagged shipment IDs, a "needs escalation" switch. That's what a **variable** is for: a named container that holds a value for the lifetime of a single flow run, which you can read, change, and build on as the flow progresses.

## What you'll learn

- What a variable is in Power Automate, and how it differs from a dynamic content value you've used so far
- The **Initialize variable** action: name, type, and starting value
- The four other variable actions — Set, Increment, Decrement, and Append — and when each one applies
- A real limitation: variables can only be declared at the top level of a flow, never inside a Condition, Apply to each, or Scope
- A worked Castlebridge Logistics example: counting flagged shipments as a loop runs

## What a variable actually is

A dynamic content value (like "Subject" from a trigger) only ever holds what the trigger or action produced — you can't change it. A **variable** is different: you create it yourself, give it a starting value, and then update it as many times as you like as the flow runs. It exists only for that one run of the flow; the next run starts fresh.

Castlebridge Logistics' dispatch team uses this constantly. A flow that processes a batch of incoming shipment requests needs somewhere to keep a running count of how many were flagged for manual review — that count has to survive from one loop iteration to the next, which a plain dynamic content value cannot do.

## Initialize variable

Every variable starts with the **Initialize variable** action, found under the designer's **Built-in** actions (search "initialize variable").

![Screenshot of selecting the Initialize variable action from the Actions list in the Power Automate designer.](/courses/power-automate/ch01/06-variables-and-initializing-data/select-initialize-variable-action.png)
*Search "variable" in the Add an action search box, then pick Initialize variable from the Actions list.*
Source: [Microsoft Learn — Store and manage values in variables in Power Automate](https://learn.microsoft.com/en-us/power-automate/create-variable-store-values)

It takes three fields:

- **Name** — what you'll call the variable everywhere else in the flow
- **Type** — String, Integer, Float, Boolean, Array, or Object
- **Value** — the optional starting value (best practice: always set one, so you know exactly what you're starting from)

![Screenshot of a configured Initialize variable action showing the Name, Type, and Value fields filled in.](/courses/power-automate/ch01/06-variables-and-initializing-data/initialize-variable.png)
*A configured Initialize variable action — Name, Type, and an explicit starting Value.*
Source: [Microsoft Learn — Store and manage values in variables in Power Automate](https://learn.microsoft.com/en-us/power-automate/create-variable-store-values)

One important restriction: **Initialize variable** can only run at the flow's top level — directly under the trigger, or under another top-level action. You cannot place it inside a Condition branch, an Apply to each loop, or a Scope. If you need a variable's value to change inside one of those, initialize it beforehand at the top level, then use **Set variable** inside the loop or condition to change it.

## The other four variable actions

Once a variable exists, four actions change it:

- **Set variable** — replaces the variable's current value with a new one of the same type. Works anywhere in the flow, including inside loops and conditions.
- **Increment variable** — adds a number to an Integer or Float variable (default: 1). Common for counters.
- **Decrement variable** — subtracts a number from an Integer or Float variable (default: 1).
- **Append to string variable** / **Append to array variable** — adds a value to the end of an existing string or array, rather than replacing it. This is how you build up a growing list across loop iterations.

## Worked example: counting flagged shipments at Castlebridge Logistics

Castlebridge Logistics runs a nightly flow over the day's shipment requests. Here's the variable pattern end to end:

1. **Initialize variable** — Name: `FlaggedCount`, Type: Integer, Value: `0`. This sits right after the trigger, at the top level.
2. **Apply to each** over the day's shipment requests.
3. Inside the loop, a **Condition** checks whether the shipment's declared weight exceeds the truck's rated capacity.
4. If true, **Increment variable** adds 1 to `FlaggedCount`.
5. After the loop ends, an action references `FlaggedCount` to report how many shipments need dispatcher review.

Because `FlaggedCount` was initialized at the top level — not inside the loop — it keeps accumulating across every iteration instead of resetting each time.

## Key terms

- **Variable** — a named container for a value that persists for the duration of one flow run
- **Initialize variable** — the action that creates a variable, setting its name, type, and starting value; top-level only
- **Set variable** — replaces a variable's current value; works anywhere in the flow
- **Increment / Decrement variable** — adds or subtracts a number from an Integer or Float variable
- **Append to string/array variable** — adds a value onto the end of an existing string or array instead of replacing it
