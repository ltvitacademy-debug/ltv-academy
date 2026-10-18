# Technical Debt: When to Pay It Down vs. Ship Around It

"We should really refactor this" is one of the most common sentences in engineering, and one of the least consistently followed up on, usually because nobody runs the actual numbers. This lesson treats technical debt the way Lesson 7 treated build-vs-buy: a real financial decision with a computable break-even point, not a vague feeling that something is messy and should eventually get fixed.

## What you'll learn

- Why "this is messy, we should clean it up" isn't, by itself, a decision
- A worked break-even calculation: when a refactor actually pays for itself
- Why the same debt can be worth paying down in one situation and not worth it in another
- The real question a Staff/Principal engineer asks that a mid-level engineer often skips: how long will this code even be around?

## The debt: duplicated prompt-assembly logic

Northbeam's prompt-assembly logic — how retrieved documents get formatted into the LLM's input — has been copy-pasted into five different code paths as the product grew feature by feature. Every time that logic needs to change (a new document type, a formatting fix), an engineer has to find and update all five copies, at roughly 2 extra hours of work per change compared to a single, shared implementation. This happens about once a month.

```python
extra_hours_per_change = 2
changes_per_year = 12
engineer_hourly_cost = 90   # fully loaded rate

annual_carrying_cost = extra_hours_per_change * changes_per_year * engineer_hourly_cost
print(f"Annual carrying cost of the debt: ${annual_carrying_cost:,}")
```

```
Annual carrying cost of the debt: $2,160
```

Refactoring into a single shared implementation is estimated at one engineer-week (40 hours):

```python
refactor_hours = 40
refactor_cost = refactor_hours * engineer_hourly_cost
print(f"One-time refactor cost: ${refactor_cost:,}")

break_even_months = refactor_cost / (annual_carrying_cost / 12)
print(f"Break-even point: {break_even_months:.1f} months")
```

```
One-time refactor cost: $3,600
Break-even point: 20.0 months
```

**The refactor pays for itself after about 20 months of carrying the debt.** This single number reframes the whole decision: it's not "should we clean this up" in the abstract, it's "do we expect this code to still be in active use, getting monthly changes, 20 months from now?"

## The real question: how long will this code even be around?

If Northbeam's roadmap has this exact prompt-assembly logic being replaced by a different architecture (say, a shift to a more structured prompt-templating system) within the next year, the refactor never breaks even — the team would pay the $3,600 upfront cost and then retire the code before the savings materialize. If this logic is expected to be a stable, long-lived part of the system for years, the refactor is a clear win. This is precisely the question a Staff/Principal engineer asks before approving debt-paydown work, and precisely the question a mid-level engineer, focused on "this code is messy," often skips entirely — code cleanliness and code *longevity* are different questions, and the second one actually determines whether cleanup is worth the cost.

## When "ship around it" is the right call

Sometimes the right answer genuinely is to leave the debt in place and build around it — not out of laziness, but because the break-even math doesn't support paying it down given the code's real expected lifetime, or because something more urgent has a better return on the same engineering time right now. "Ship around it" should be a deliberate, reasoned decision (ideally captured in an ADR, per Lesson 6, or at minimum a comment explaining the reasoning), not a default that happens by never explicitly deciding anything.

## Key terms

| Term | Meaning |
|---|---|
| Carrying cost | The ongoing, recurring cost of living with a piece of technical debt |
| Break-even point | How long it takes a one-time fix's cost to be recovered by the carrying cost it eliminates |

## Check yourself

Why does the break-even calculation alone not fully answer whether Northbeam should refactor the prompt-assembly logic — what additional, forward-looking question does a Staff/Principal engineer need to ask first?
