# Graph Data Modeling Fundamentals

Chapter One introduced the NoSQL principle that data modeling should start from the actual
access pattern, not the theoretical structure of the data — "how will this be read," not
"how do I normalize this." Graph modeling follows the exact same spirit, with its own
specific version of that question: **model around the questions you'll actually ask.**
This lesson covers how to do that deliberately, especially the recurring decision of
whether something should be a node or just a property.

## What you'll learn

- Why graph modeling starts from the questions the graph needs to answer, not an abstract
  entity list
- The concrete test for deciding whether something should be its own node or a property
- Common graph modeling mistakes and how to recognize them

## Start from the questions, not the entities

It's tempting to approach graph modeling the way ER modeling works relationally: list every
"thing" in the domain, make each one a node type, and move on. This produces a
technically-valid graph that's often awkward to query. The better starting point,
consistent with the access-pattern-first philosophy from Chapter 1, is to write down the
actual questions the graph needs to answer first:

- "Which employees report, directly or indirectly, to this manager?"
- "Which customers who bought Product A also bought Product B?"
- "Is there any path connecting these two accounts within 4 hops?"

Each question implies which **relationships** need to exist and in which **direction**,
which properties need to be queryable versus just descriptive, and which nodes actually
need their own identity versus being folded into an existing node's properties. A model
built to answer real questions is shaped very differently from a model built to represent
every entity that theoretically exists in the domain.

## Node or property? The concrete test

This is the single most common real modeling decision, and it has a genuinely concrete
test: **does this thing need to be referenced, queried, or connected to independently?**

- If a piece of data is only ever looked up **through** its parent and never queried,
  filtered, or connected on its own, it's a **property**. An order's `orderDate` doesn't
  need to be its own node — nothing else in the graph ever needs to point *at* a specific
  date directly.
- If a piece of data needs its **own relationships**, needs to be **queried or filtered on
  directly**, or is **shared across multiple parents**, it should be a **node**. A
  `Product` should be its own node (not a property of every order line) because many
  different `Order` nodes need to relate to the *same* product, and questions like "which
  customers bought this product" require traversing to it directly.

A useful heuristic version of the same test: if you'd ever write a Cypher `MATCH` clause
that starts at or filters on that thing by itself, it's a node. If it only ever shows up
inside `SET` or as part of another node's data, it's a property.

## Common mistakes

- **Making everything a node**, including simple scalar attributes, which bloats the graph
  and makes simple lookups unnecessarily indirect
- **Making everything a property**, including things that are genuinely shared and
  relationship-bearing (like the `Product` example above), which loses the whole point of
  using a graph in the first place
- **Overly generic relationship types** — a single `RELATED_TO` relationship type used for
  everything instead of specific, meaningful types like `PURCHASED`, `MANAGES`, or
  `FRIENDS_WITH`, which makes queries harder to write and the model harder to reason about
- **Modeling for today's questions only**, with no thought for the next reasonable
  question — while you shouldn't create speculative nodes for questions that will never be
  asked, a model that can only answer the one query it was built for is often a sign the
  underlying entities weren't identified correctly

## Key terms

| Term | Meaning |
|---|---|
| Access-pattern-first modeling | Designing the graph around the actual questions it needs to answer, not an abstract list of entities |
| Node-or-property test | Whether a piece of data needs independent identity, its own relationships, or is shared across parents |
| Relationship type | The specific, meaningful label on a relationship (e.g. PURCHASED), as opposed to an overly generic catch-all |

## Check yourself

A team is modeling an e-commerce graph and is deciding whether `orderDate` should be its
own node or a property on the `Order` node. Using the test from this lesson, which should
it be, and why?
