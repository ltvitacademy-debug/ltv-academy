# Lesson 22 — Impairment

**Chapter 4 · Depreciation and Adjustments · Lesson 22 of 33**

## What you'll learn

- What triggers an impairment review in the first place
- How recoverable amount is defined and compared to carrying value
- How to calculate and record an impairment loss
- How impairment differs from ordinary depreciation and from revaluation

## When an asset is worth less than its books say

Depreciation assumes an asset loses value in a predictable, planned way. **Impairment** handles the case where something unplanned happens: a piece of equipment becomes technologically obsolete ahead of schedule, a facility is damaged, a product line it supports is discontinued, or market conditions shift so sharply that the asset's carrying value on the books is no longer realistic. Oracle Fusion Assets' impairment functionality is designed around the framework in IAS 36 (Impairment of Assets): when there's an indicator that an asset might be impaired, its **recoverable amount** needs to be tested against its current **carrying amount** (its net book value).

## Recoverable amount versus carrying amount

The recoverable amount is defined as the **higher** of two figures:

- **Fair value less costs to sell** — roughly what the asset could be sold for, minus the costs of selling it.
- **Value in use** — the present value of the future cash flows the asset is expected to generate if kept in use.

If the recoverable amount is **less than** the asset's carrying amount, the asset is impaired, and the difference is recorded as an **impairment loss** — reducing the asset's carrying value down to its recoverable amount and recognizing the loss as an expense.

## Working through an example

Meridian Fabrication Co. has a specialized packaging line with a carrying amount (net book value) of $280,000. A major customer that used that line exclusively just went out of business, and Meridian determines the line's recoverable amount — the higher of its sale value or its value in use for other work — is now only $190,000.

```
Carrying amount (net book value):   $280,000
Recoverable amount:                  $190,000

Impairment loss = Carrying amount - Recoverable amount
                = $280,000 - $190,000
                = $90,000
```

That $90,000 impairment loss is recognized as an expense, and the asset's carrying value is written down to $190,000. Depreciation going forward is recalculated on the new, lower $190,000 basis over its remaining useful life — a permanently different, lower depreciation charge than before the impairment, unless and until the impairment is later reversed.

## Impairment versus depreciation versus revaluation

These three can look superficially similar — all affect an asset's book value — but they answer different questions:

- **Depreciation** — the planned, routine consumption of value over a known useful life.
- **Revaluation (Lesson 21)** — a deliberate restatement of value under a specific accounting policy, which can go up or down.
- **Impairment** — an unplanned, indicator-driven write-down triggered by a specific adverse event, almost always a one-directional loss at the time it's recorded (though it can sometimes be partially reversed later if conditions improve, depending on the applicable standard).

## Key terms

| Term | Meaning |
|---|---|
| Impairment | A write-down of an asset's carrying value when its recoverable amount falls below it |
| Recoverable amount | The higher of an asset's fair value less costs to sell, or its value in use |
| Impairment loss | Carrying amount minus recoverable amount, recognized as an expense |

## Lab

Meridian's packaging line has a $280,000 carrying amount and a $190,000 recoverable amount after losing its major customer. Confirm the $90,000 impairment loss calculation, and explain in one sentence why this is treated differently from an ordinary cost adjustment even though both reduce the asset's book value.

## Check yourself

Without looking back, can you define recoverable amount in your own words, and explain what distinguishes impairment from revaluation?
