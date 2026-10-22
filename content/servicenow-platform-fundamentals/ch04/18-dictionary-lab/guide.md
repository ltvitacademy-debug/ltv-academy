# Lesson 18 — Dictionary Lab

**Chapter 4 · Dictionary Entries & Field Types · Lesson 18 of 34**

## What you'll learn

- How to combine everything from this chapter into one realistic field-build task, start to finish
- How to choose Choice as a field's type and reason about why it fits this requirement
- How to define a Choice list's actual values, including what order and wording to pick
- How to decide, deliberately, whether a new field should be Mandatory — and defend that choice

## The scenario

You're building a custom table to track vendor risk assessments, and your manager asks you to add
a **Risk Level** field to it. The requirement, exactly as given: "Risk Level needs to be one of a
fixed set of options — Low, Medium, High, or Critical — and every assessment record needs one set
before it can be saved." Nothing here requires a screenshot — every decision below is something
you'd reason through and describe out loud, the same way you'd justify it in a design review.

## Step 1 — Choosing the field type

The requirement says "a fixed set of options," which immediately rules out String — free text
would let someone type "kinda high" or "medium-ish," defeating the entire point of a fixed set.
It also rules out Boolean, since there are four states here, not two. This is exactly what
Lesson 16's Choice type exists for: a field whose value must come from a predefined list, enforced
by the platform rather than by hoping everyone types consistently. On the new field's dictionary
entry, you set **Type = Choice**. That single decision is also what unlocks the next step — a
Choice-type dictionary entry is what makes a `sys_choice` list relevant to this field at all, per
Lesson 17.

## Step 2 — Defining the choice values

With Type set to Choice, you now add four rows to `sys_choice`, one per value, each tied to your
new table and the `risk_level` field name. For each row you set a **label** (what the user sees)
and a **value** (what's actually stored), plus a **sequence** controlling display order:

```
sequence  label        value
   10     Low             1
   20     Medium          2
   30     High            3
   40     Critical        4
```

Numeric values, increasing with severity, are worth choosing deliberately here — if a future
report ever needs to sort or filter "High and above," a numeric value sorts correctly where a
plain text value like "High" sorts alphabetically, out of severity order. The sequence numbers
control dropdown order independently of the stored value, so Low still appears first even though
you could renumber values later without disturbing the display order.

## Step 3 — Deciding on Mandatory

The requirement says "every assessment record needs one set before it can be saved" — that's not
a suggestion, it's a hard save-time rule, and Lesson 15 covered exactly the dictionary attribute
that enforces it: **Mandatory**. You check that flag on the `risk_level` dictionary entry and save
it. From that moment on, every form built against the vendor risk assessment table — today's form,
and any future one — refuses to save a record with Risk Level left blank, with no code written and
no separate validation rule needed. You'd deliberately leave Mandatory unchecked only if the
requirement had instead said something like "Risk Level is optional until the initial review is
complete" — a different business rule entirely, which this scenario does not have.

## What you just practiced

In three decisions, you picked Choice over String or Boolean because the requirement demanded a
fixed set of options, you defined that fixed set as ordered, numerically-valued `sys_choice` rows
rather than leaving it to free text, and you enforced the save-time rule with the Mandatory flag
instead of guessing it would just work out. That's the same three-decision sequence — type, values,
constraints — behind every field you'll ever add to any ServiceNow table, custom or out-of-box.

## Key terms

| Term | Meaning |
|---|---|
| Fixed set of options | The requirement phrase that should make you reach for Choice, not String |
| Numeric choice value | A stored value chosen to sort correctly by severity, independent of its display label |
| Sequence | The sys_choice attribute controlling dropdown order, separate from the stored value |
| Mandatory | The dictionary flag that enforces a save-time "this field cannot be blank" rule, platform-wide |

## Try it yourself

Before moving to Chapter 5, design one more field from a one-sentence requirement of your own —
for example, "every vendor needs a renewal date, and it can be left blank until the contract is
signed." Decide the type, whether it needs a choice list at all, and whether Mandatory belongs on
it — and be ready to defend each decision the way this lab just did.
