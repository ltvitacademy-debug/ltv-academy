# Lesson 9 — Journal Validation and Errors

**Chapter 2 · Manual Journals · Lesson 9 of 37**

## What you'll learn

- The five most common reasons a journal fails validation
- What a cross-validation rule is, and why it exists
- How to read the error General Ledger gives you and fix the actual cause
- Why validation happens before posting, not after

## Validation happens before posting, not after

General Ledger checks a journal's correctness at the point you try to **complete** it — not after it's already posted. This matters: a journal that fails validation simply stays **Incomplete**; it never touches a balance. Validation is a gate, not a cleanup step.

## Five errors you'll actually hit

| Error | What's actually wrong |
|---|---|
| **Unbalanced journal** | Debits don't equal credits for some balancing segment value (Lesson 6) |
| **Invalid or disabled account combination** | The account combination doesn't exist, or has been end-dated/disabled since it was last used |
| **Closed period** | The accounting date falls in a period that is Closed or Permanently Closed (Lesson 4) |
| **Missing required segment value** | A chart-of-accounts segment was left blank where a value set requires one |
| **Cross-validation rule violation** | The combination of segment values is individually valid, but the specific *pairing* is disallowed |

## Cross-validation rules: valid segments, invalid pairing

A **cross-validation rule** blocks a combination of segment values that are each individually fine, but shouldn't exist together. For example, Solara Fixtures might have a rule preventing Cost Center 500 (a European sales office) from ever combining with Company 01 (the US entity), because that cost center only ever books under Company 02. Both values are valid on their own — 500 is a real cost center, 01 is a real company — but the *pairing* violates how Solara's organization actually works.

```
Cost Center 500 (EU Sales) + Company 01 (US)  → blocked by cross-validation rule
Cost Center 500 (EU Sales) + Company 02 (EU)  → allowed
```

## Reading the error, fixing the cause

When a journal won't complete, General Ledger's error message points at one specific line and one specific reason — read it literally before assuming the problem is somewhere else. "Period status is Closed" means check the accounting date against Lesson 4's period statuses, not the account. "Invalid account combination" means check whether that exact combination has ever been enabled, not whether the amount is right. Fixing the wrong thing (re-typing an amount when the real problem is a closed period) wastes time without resolving anything.

## Key terms

| Term | Meaning |
|---|---|
| Validation | The check General Ledger runs before allowing a journal to be marked complete |
| Cross-validation rule | Blocks a combination of individually-valid segment values that shouldn't be paired |
| Incomplete | The status a journal stays in when it fails validation |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: how is a cross-validation rule violation different from simply using an invalid account combination?
