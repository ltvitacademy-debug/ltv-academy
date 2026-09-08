# Lesson 20 — Until Activity

**Chapter 4 · Control Flow & Orchestration · Lesson 4 of 6**

## What you'll learn

- How Until differs from ForEach — looping by condition, not by collection
- How to configure its expression and child activities
- The default and maximum timeout, and why the default matters
- A real pattern: polling an external process until it's done

## A do-until loop, not a for-each loop

Where **ForEach** (Lesson 19) repeats over a fixed collection, the
**Until** activity provides exactly what a **do-until** loop provides
in programming languages: it runs its child activities repeatedly
**until an expression evaluates to true**, with no fixed number of
iterations known in advance.

![Screenshot of the Until activity's Settings tab, showing the expression field to evaluate after each loop.](/courses/data-factory/ch04/20-until-activity/until-activity.png)

## Configuring the expression

The expression is evaluated **after every pass** through the child
activities — not before. If it's `false`, the loop runs its child
activities again; the moment it evaluates `true`, the Until activity
completes:

![Screenshot of the dynamic content editor showing an expression checking whether a pipeline variable named TestVariable equals the value "done".](/courses/data-factory/ch04/20-until-activity/check-variable-value.png)
*A common pattern: check a variable's current value against what "finished" actually looks like.*

## Adding the child activities

Select **Edit Activities** to add whatever the loop should actually
run each pass — often a **Wait** activity (Lesson 15) paired with
something that checks status, and a **Set Variable** activity that
updates the value the expression is watching:

![Screenshot of the Until activity's child-activities editor, showing a Set Variable activity configured inside the loop.](/courses/data-factory/ch04/20-until-activity/child-activities-editor.png)

One real behavior worth knowing: if a child activity inside the loop
**fails**, the Until activity **doesn't stop** — it keeps looping
until the expression is true or the timeout is reached.

## Timeout: the safety net

Every Until activity carries a **timeout**, defaulting to **seven
days** if you don't set one, with a **maximum of 90 days**. Without a
sensible timeout, a condition that never actually becomes true would
otherwise loop essentially forever — the timeout is what stops that
from silently consuming resources indefinitely.

## A real pattern: polling until something finishes

A genuinely common real use: an external system is processing
something asynchronously, and there's no webhook telling you when
it's done. An Until activity polls it — a **Web activity** checking
status, a short **Wait**, repeated — until the status actually comes
back as complete, or a reasonable timeout is hit:

```
"expression": {
  "value": "@equals('Failed', coalesce(body('CheckStatus')?.status, 'null'))",
  "type": "Expression"
},
"timeout": "00:10:00"
```

This is exactly the shape of pattern this course keeps returning to:
check something, wait, check again, until a real condition is met.

## Key terms

| Term | Meaning |
|---|---|
| Until activity | Loops its child activities until an expression evaluates true |
| Timeout | The maximum time an Until activity runs before giving up — default 7 days, max 90 |
| Polling | Repeatedly checking an external status until it changes, using Until plus Wait |

## Lab

1. Build an Until activity with a Set Variable activity inside it
   that sets a Bool variable to true on the first pass, and an
   expression checking that variable.
2. Run it in Debug and confirm it exits after exactly one iteration.
3. Set an explicit `timeout` well under the seven-day default, and
   explain in one sentence why you'd want to set it deliberately
   rather than rely on the default in a real pipeline.

## Check yourself

You're ready for Lesson 21 when you can explain, in one sentence,
what happens to an Until activity if a child activity inside it fails
during one of its loop iterations.
