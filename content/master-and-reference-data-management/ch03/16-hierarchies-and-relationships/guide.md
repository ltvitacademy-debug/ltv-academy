# Lesson 16 — Hierarchies and Relationships

**Chapter 3 · Master Data Domains · Lesson 16 of 25**

## What you'll learn

- Why master data needs explicit hierarchies, not just flat records
- The difference between a recursive hierarchy and a fixed-level hierarchy
- Why reorganizations and mergers make hierarchy maintenance an ongoing governance task
- A simple way to model a hierarchy so reporting can roll up correctly at any level

## Why flat records aren't enough

Every domain in this chapter has leaned on a hierarchy without formally defining one: a customer's corporate family tree (Lesson 12), a product's brand-to-SKU classification (Lesson 13), an employee's reporting chain (Lesson 15). A **hierarchy** is a structure of parent-child relationships layered on top of flat master records, and it exists because a single record rarely answers the question people actually ask: not "what is this one customer's data," but "how do all the customers under this parent company look together."

Without an explicit hierarchy, that roll-up question gets answered by writing new logic every time someone asks it — brittle, inconsistent, and a different answer depending on who wrote the query. Modeling the hierarchy once, as data, means every report and system pulls from the same structure.

## Two shapes of hierarchy

A **fixed-level hierarchy** has a known, consistent number of levels — brand → category → subcategory → product is always exactly four levels deep, for every product. These are easy to model as separate columns or separate lookup tables, one per level.

A **recursive (variable-depth) hierarchy** doesn't have a fixed number of levels — a corporate customer family tree might be two levels deep for one customer and six levels deep for another, depending on how many subsidiaries and sub-subsidiaries actually exist. Recursive hierarchies are usually modeled with a simple self-referencing structure: each record stores its own ID and its direct parent's ID, and software walks the chain of parent pointers to assemble the full tree at query time.

## A parent-child table, concretely

The simplest working model for a recursive hierarchy is a table where every row has an ID and a parent ID pointing to another row in the same table. "Acme Europe GmbH" has a parent_id pointing to "Acme Inc," which has no parent (parent_id is null, marking it the ultimate parent, Lesson 12). The same shape works for an employee's manager chain, or a product category's parent category — the pattern is domain-independent.

## Why hierarchies break, and why that's expected

Hierarchies aren't "set once." A merger adds an entire subsidiary tree overnight. A reorg moves a department under a different manager. A product gets reclassified into a new category because the business redefined what the category means. Every one of these events is a **hierarchy change**, and each one is exactly the kind of change that needs the same discipline as any other master data change: who approved the move, when it became effective, and what reports will look different as a result.

This is why hierarchy maintenance belongs explicitly inside master data governance (Lesson 5) rather than being treated as a one-time modeling exercise during the initial MDM build. A hierarchy that was correct on launch day and never revisited quietly becomes wrong the first time the business reorganizes — and nobody notices until a roll-up report looks off.

## Key terms

| Term | Meaning |
|---|---|
| Hierarchy | A parent-child structure layered on top of flat master records, used to roll data up for reporting and control |
| Fixed-level hierarchy | A hierarchy with the same known number of levels for every record (e.g., brand → category → product) |
| Recursive hierarchy | A variable-depth hierarchy modeled by each record storing a pointer to its own parent record |
| Roll-up | Aggregating data from lower levels of a hierarchy up to a higher level (e.g., sales by store rolled up to region) |

## Lab

Pick one hierarchy from an earlier lesson in this chapter (customer corporate family tree, product category tree, or employee reporting chain). Sketch it as a simple parent-child table with three or four made-up rows — an ID column and a parent ID column — and trace by hand how you'd roll a number up from the bottom row to the top.

## Check yourself

Explain the difference between a fixed-level hierarchy and a recursive hierarchy, and give one example of each from a domain covered earlier in this chapter.
