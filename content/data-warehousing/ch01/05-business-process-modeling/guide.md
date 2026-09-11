# Lesson 5 — Business Process Modeling

**Chapter 1 · Dimensional Modeling Fundamentals · Lesson 5 of 39**

## What you'll learn

- The four-step design process every dimensional model follows, in
  the correct order, and why that order isn't optional
- What a "business process" actually means in this context — and why
  it's a verb, not a department
- How the four steps connect everything this chapter has covered so
  far into one repeatable method
- Why modeling the wrong business process is a much more expensive
  mistake than any later table-design detail

## The four-step design process

Ralph Kimball's dimensional design method — the industry-standard
approach this entire course is built on — comes down to four
questions, asked and answered strictly in this order for every star
schema you build:

1. **Choose the business process.**
2. **Declare the grain.**
3. **Identify the dimensions.**
4. **Identify the facts.**

Each step depends on the one before it. You already met step 2
in depth last lesson. This lesson is about step 1 — the one that has
to come first — and how all four connect.

## Step 1: choose the business process

A **business process** is an activity your organization performs and
wants to measure — not a department, not a report, and not a table
that already exists somewhere. "Sales" isn't precise enough on its
own; "order processing" and "shipping" are two different business
processes that might both touch the word "sales," and each deserves
its own fact table with its own grain.

Getting this step wrong is the most expensive mistake in the entire
method, because every later step inherits it. If you model "sales"
when the business actually needed "order processing" and "shipping"
modeled separately, no amount of clever column design in steps 2-4
fixes that — you're rebuilding the fact table from scratch.

The most reliable way to identify a business process correctly:
listen for what source system or operational event actually produces
the data. "Order processing" corresponds to what happens the moment a
sales order is placed and its lines are recorded — a single,
identifiable operational event, which is exactly the kind of thing a
business process should map to.

## Steps 2-4, in order

Once the business process is chosen, the remaining three steps follow
in strict sequence:

- **Declare the grain** (Lesson 4): state, in one sentence, what a
  single fact row represents for *this* business process. For order
  processing, that's most likely "one row per order line."
- **Identify the dimensions**: given that grain, which business
  entities describe each row? An order line naturally has a product,
  a customer, an order date, and a salesperson — each becomes a
  dimension table.
- **Identify the facts**: still governed by that same grain, which
  numeric measures belong on each row? Order quantity and extended
  line amount are meaningful per order line; they become the fact
  table's measure columns.

Notice the dependency chain: you cannot correctly identify dimensions
or facts until the grain is locked, and you cannot correctly declare
the grain until you know which business process you're modeling.
Skipping ahead — picking dimensions before grain, say — is how tables
end up with columns that don't actually belong at the grain they were
built for.

## Why the order matters

Each of the four steps constrains the ones that follow it. Reversing
the order, or working on two steps at once, is how a fact table ends
up needing "and" or "or" in its grain statement (the mixed-grain
problem from Lesson 4) — because the business process wasn't pinned
down precisely enough before grain got declared, or the grain wasn't
locked before dimensions got chosen.

## Key terms

| Term | Meaning |
|---|---|
| Business process | An organizational activity to measure, tied to an identifiable operational event — not a department or report |
| Four-step design process | Choose the business process, declare the grain, identify the dimensions, identify the facts — always in that order |
| Dimension identification | Determining which business entities describe a row, once the grain is fixed |
| Fact identification | Determining which numeric measures belong on a row, once the grain is fixed |

## Lab

1. Pick two business processes at a retail company that both involve
   the word "sales" but are genuinely different processes (hint:
   think about what happens when an order is placed vs. what happens
   when it ships). Write one sentence describing each as its own
   business process.
2. For AdventureWorksDW2014's `FactInternetSales`, walk all four
   steps in order: name the business process, state the grain
   (you already did this in Lesson 4), list three dimensions, and
   list three facts.

## Check yourself

You're ready for Chapter 2 when you can name Kimball's four design
steps in the correct order, explain why business process has to be
chosen before grain is declared, and why choosing the wrong business
process is more costly to fix than any other mistake in the process.
