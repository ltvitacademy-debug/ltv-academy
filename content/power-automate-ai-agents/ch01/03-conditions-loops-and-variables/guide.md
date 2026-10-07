# Conditions, Loops and Variables: The Essentials

If triggers and actions are a flow's statements, conditions, loops, and variables are its control flow and local state — the same three constructs you'd reach for in any procedural code, expressed as drag-and-drop cards instead of `if`, `for`, and `let`. This lesson covers all three quickly, because you'll use every one of them in Chapter 2 the moment a flow needs to branch on a model's classification, loop over a list of extracted line items, or accumulate a running total across a batch.

## What you'll learn

- How the Condition action maps to an `if` statement, including its two branches
- How Apply to each maps to a `for` loop over an array
- How variables work — and the one restriction that catches almost everyone the first time
- Where each of these shows up in a realistic Castlebridge Logistics flow

## Conditions: branching logic

The **Condition** action compares one value to another — equals, greater than, contains, and so on — and produces exactly two branches: **If yes** and **If no**. Everything you put in the first branch runs only when the comparison is true; everything in the second runs only when it's false. That's the entire feature. Under the hood, a condition compiles to an `if`/`else` expression in the flow's underlying JSON definition, so if you've ever read raw workflow JSON, the Condition card is just a friendlier face on something already familiar.

![Screenshot of a Condition action card in the Power Automate designer, comparing a Retweet count value to the number 10 using "is greater than"](/courses/power-automate-ai-agents/ch01/03-conditions-loops-and-variables/condition-card.png)
*A Condition card: left value, operator, right value — evaluates to the If yes or If no branch.*

At Castlebridge, a document-classification flow might run a Condition on the AI model's confidence score: if it's above 0.9, file the document automatically; if not, route it to a human for review. You'll build exactly that pattern in Chapter 3.

## Loops: Apply to each

**Apply to each** is Power Automate's loop — it takes an array and runs its inner actions once per item, the same as a `for...of` loop over a list. You select the array (usually a trigger or action output like a set of email attachments or extracted table rows), and anything nested inside the loop card has access to the **current item** on each pass.

![Screenshot of adding an Apply to each loop in the Power Automate designer, with the loop card shown below an Initialize variable step](/courses/power-automate-ai-agents/ch01/03-conditions-loops-and-variables/apply-to-each.png)
*Apply to each takes an array (here, a set of attachments) and repeats its inner actions once per item.*

One behavior worth knowing early: by default, Apply to each runs its iterations **sequentially**, not in parallel. You can switch a loop to run concurrently in its settings for speed, but if anything inside the loop writes to a variable, you generally want to keep it sequential — otherwise two iterations can race to update the same variable and produce an unpredictable result.

## Variables: declare, then change

**Initialize variable** creates a named variable with a type (String, Integer, Float, Boolean, Array, or Object) and an optional starting value — closest to a `let` or `var` declaration with an initializer. After that, four more actions change it over time: **Set variable** (assign a new value), **Increment variable** and **Decrement variable** (add or subtract a number, integer and float types only), and **Append to string variable** / **Append to array variable** (add to the end).

![Screenshot of the Initialize variable action configured with a Name, Type, and Value field in the Power Automate designer](/courses/power-automate-ai-agents/ch01/03-conditions-loops-and-variables/initialize-variable.png)
*Initialize variable sets the name, type, and starting value — always set a starting value as a best practice.*

The restriction that catches almost everyone the first time: **you can only initialize a variable at the top level of a flow** — never inside a Condition branch, a Scope, or an Apply to each loop. If you need a counter inside a loop, initialize it *before* the loop starts, at the top level, and then use Set or Increment *inside* the loop to change it on each pass.

## Key terms

- **Condition** — a branching action with two outcomes, If yes and If no
- **Apply to each** — a loop that runs its inner actions once per item in an array
- **Current item** — the value available inside a loop on each pass
- **Initialize variable** — declares a variable's name, type, and starting value; top-level only
- **Set / Increment / Decrement / Append** — the actions that change a variable after it's declared
