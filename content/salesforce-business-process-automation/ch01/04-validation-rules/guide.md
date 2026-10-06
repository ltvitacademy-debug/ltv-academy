# Lesson 4 — Validation Rules

**Chapter 1 · Declarative Business Logic · Lesson 4 of 18**

## What you'll learn

- What a validation rule actually evaluates, and why the logic feels "backwards" the first time you write one
- The pieces of a validation rule: Rule Name, Error Condition Formula, Error Message, Error Location
- How to read and write the formula functions validation rules depend on most: `AND`, `OR`, `NOT`, `ISBLANK`, `LEN`
- Where a validation rule sits relative to an approval process in the life of a record

## The logic is inverted from what you'd expect

A validation rule's formula doesn't describe what's *allowed* — it describes what's **invalid**. When the formula evaluates to `TRUE`, Salesforce blocks the save and shows the error message. This trips up almost everyone the first time:

```
LEN(AccountNumber) <> 8
```

Read that as "this is TRUE when the account number is NOT 8 characters" — and when it's true, the save is blocked. The rule doesn't say what's correct; it says what to reject.

## The four pieces

| Field | Purpose |
|---|---|
| **Rule Name** | A unique, no-spaces identifier (`Account_Number_8_Characters`) |
| **Error Condition Formula** | The formula that returns TRUE for *invalid* data |
| **Error Message** | What the user sees when the rule blocks their save |
| **Error Location** | Which field the error is attached to, or "Top of Page" if it's not about one specific field |

You create validation rules from **Object Manager → (object) → Validation Rules → New**. Click **Check Syntax** before saving — it catches typos and type mismatches without requiring a full save.

## Formula functions validation rules lean on constantly

- `AND(...)` / `OR(...)` — combine multiple conditions
- `NOT(...)` — inverts a boolean
- `ISBLANK(field)` — true when a field has no value
- `LEN(text)` — character count, useful for format checks
- Comparison operators (`<>`, `>`, `<`, `=`) — compare numbers, dates, or text directly

A validation rule for our discount approval example might read:

```
AND(
  Discount_Percent__c > 40,
  ISBLANK(Discount_Justification__c)
)
```

This blocks a save when the discount exceeds 40% *and* no justification has been entered — forcing the rep to explain an unusually large discount before the record can even reach the approval process from Lesson 2.

## Where validation rules sit in the sequence

A validation rule runs on every save — insert and update — regardless of whether an approval process is involved at all. It fires *before* a record can be submitted for approval, and it fires again on every subsequent edit, including edits an approver makes while the record is locked (covered properly in Lesson 8's order of execution). A validation rule is not a one-time gate; it's a standing rule the record has to satisfy every single time it's saved.

## Recap

- A validation rule's formula describes invalid data; TRUE blocks the save.
- Rule Name, Error Condition Formula, Error Message, and Error Location are the four pieces every rule needs.
- `AND`, `OR`, `NOT`, `ISBLANK`, and `LEN` cover the large majority of real-world validation rules.
- Validation rules run on every save, not just the first one — they're a standing gate, not a one-time check.

## Try it yourself

In a sandbox or Developer Edition org, add a validation rule on Opportunity that blocks saving when `Discount_Percent__c` is greater than 40 and `Discount_Justification__c` is blank. Try saving a record that violates it and read the error message you get back.

## Check yourself

Why does a validation rule's formula have to evaluate to TRUE for *invalid* data instead of TRUE for valid data? What would happen to existing records if that logic were reversed?
