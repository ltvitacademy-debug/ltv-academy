# Lesson 29 — Late-Arriving Dimensions

**Chapter 6 · Advanced Warehouse Patterns · Lesson 29 of 39**

## What you'll learn

- Why fact data sometimes arrives before the dimension row it needs
  to reference even exists
- The inferred member pattern: how the fact load process handles a
  failed dimension-key lookup without dropping or blocking the fact
- The `IsInferredMember` audit attribute, and what happens once the
  real dimension details finally arrive
- Why this is treated as a late-arriving detail, not a Slowly
  Changing Dimension change

## When the fact beats the dimension to the warehouse

Every fact load you've designed so far assumes the dimension side is
already in place: the ETL process looks up the surrogate key for
"this customer" or "this product," finds it, and stores it on the
fact row. Chapter 5 taught you to process dimensions before facts for
exactly this reason.

Sometimes that ordering breaks down for a legitimate business reason,
not an ETL mistake. Microsoft's own guidance gives a clean example: a
hotel guest checks in and joins the loyalty program on the spot. A
membership number is issued immediately — the fact of "this guest
stayed at this hotel" needs to be recorded right now — but the actual
paperwork with the guest's name, address, and other details might not
be processed for days, if ever. The fact arrives; the full dimension
row does not, yet.

## What the fact load process does about it

Zooming out to the general fact-load process makes clear exactly
where this fits. For each dimension key a fact row needs, the ETL
process looks up the current surrogate key. If that lookup succeeds,
processing continues normally. If it **fails** — no matching dimension
row exists yet — the process has to make a choice, because the fact
row still needs to be inserted with a valid dimension key.

![Diagram of the fact-load process: a dimension-key lookup that, on failure, creates a new inferred dimension member.](/courses/data-warehousing/ch06/29-late-arriving-dimensions/process-fact-table.svg)

*A failed dimension-key lookup during fact load leads to inserting a new dimension row.*

One option, which you've already met, is to fall back to a special
dimension member like *Unknown*. But when the fact load process is
confident the natural key is valid — this loyalty number genuinely
belongs to a real, if not-yet-detailed, guest — a better option is to
insert a brand-new dimension row right then, using placeholder
"Unknown" values for every attribute except the natural key. That new
row is called an **inferred member**, and the fact load process must
set an audit attribute, `IsInferredMember`, to `TRUE` on it.

## Closing the loop when the real details show up

The `IsInferredMember` flag exists for exactly one reason: so that
when the guest's actual paperwork does arrive — days, weeks, however
long later — the dimension load process knows this row is different
from an ordinary existing member. Microsoft's guidance is explicit
that these updates should be handled as **late-arriving dimension
details**, not as a Slowly Changing Dimension change: the attributes
get updated in place, and `IsInferredMember` flips to `FALSE`. This
matters because an SCD Type 2 change would insert a whole new row and
version to preserve history — but there's no real "before" state
worth preserving here. The inferred row never had real values; it's
just now getting its first ones.

## Key terms

| Term | Meaning |
|---|---|
| Late-arriving dimension | A dimension whose full details arrive after a fact referencing it has already been loaded |
| Inferred member | A dimension row inserted by the fact load process itself, using Unknown placeholder values, when a dimension-key lookup fails but the natural key is trusted |
| IsInferredMember | An audit attribute set to TRUE on an inferred row, and flipped to FALSE once its real attribute values are sourced and updated |

## Lab

1. Sketch the column list for a `Customer` dimension row inserted as
   an inferred member: which columns get the real natural key value,
   and which get placeholder "Unknown" values?
2. Write out, in plain steps, what the dimension load process should
   do differently for a row where `IsInferredMember = TRUE` versus an
   ordinary SCD Type 1 or Type 2 update.

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why
a fact can legitimately arrive before its dimension, what an inferred
member is, and why updating one later is not treated as an SCD change.
