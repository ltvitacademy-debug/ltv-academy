# Lesson 8 — Diagramming Standards and Notation

**Chapter 2 · Communicating Architecture · Lesson 8 of 17**

## What you'll learn

- Why a team needs an agreed notation standard, not just correct individual diagrams
- The legend problem: why a diagram without a key is a diagram only its author can fully trust
- How Salesforce's own architecture resources (architect.salesforce.com) use a consistent visual convention across their decision guides
- A practical checklist for making any diagram in this course's chapter 1 "standards-compliant"

## Correct isn't the same as consistent

Chapter 1 taught four diagram types, each with its own correct notation. A single architect drawing a single diagram, using the rules from Chapter 1, will produce a technically correct diagram. The problem shows up at the next layer: when a second architect draws the next diagram, slightly differently — a different shape for "external system," no crow's-foot marks at all, an arrow direction convention that's reversed from the first architect's — the documentation set as a whole stops being trustworthy, even though each individual diagram might still be internally correct. A reader can no longer assume that what a shape or line means on page 3 is what it means on page 12. **Diagramming standards** exist to fix exactly this: an agreed, written convention that every diagram in a given organization's documentation follows, so meaning doesn't have to be re-derived diagram by diagram.

## The legend problem

The single most common standards failure is a diagram with no **legend** — no key explaining what each shape, line style, and color means. Lesson 2 already surfaced a concrete version of this: a plain line between two Salesforce objects can't tell a reader whether it's a lookup or a master-detail relationship, and that distinction has real behavioral consequences (cascading delete, roll-up summaries). A legend doesn't just decorate a diagram — it's the thing that turns an ambiguous line into an unambiguous one. A minimal legend for a Salesforce ERD might read:

| Symbol | Meaning |
|---|---|
| Solid line, single tick both ends | One-to-one relationship |
| Solid line, tick + crow's foot | Lookup relationship (one-to-many) |
| Bold line, tick + crow's foot | Master-detail relationship (one-to-many, cascading) |
| Dashed line | Relationship planned but not yet implemented |

Any diagram without an equivalent legend is, strictly, only fully trustworthy to the person who drew it — everyone else is guessing at convention.

## A consistent house style across a documentation set

Beyond individual legends, a mature documentation practice settles a small set of conventions that every diagram in the set follows, regardless of which architect drew it or which tool they used:

- **A fixed shape vocabulary** — the same shape always means the same kind of thing (a rectangle is always a system or object, a rounded box is always a process, and so on), matching Lesson 3's and Lesson 4's notation rather than inventing new shapes per diagram.
- **A fixed color convention**, used sparingly and consistently — for example, always coloring external systems one color and internal Salesforce components another, never swapping the meaning diagram to diagram.
- **A fixed labeling style** for relationship lines and data flows — always stating direction and what's moving, not just drawing an unlabeled arrow.
- **A version and date stamp** on every diagram, tying it to the document revision it belongs with (Lesson 15 covers why this matters for catching documentation rot).

Salesforce's own architect.salesforce.com decision guides are a useful reference point here: across dozens of different guides and different diagram topics, they consistently use the same visual vocabulary for things like "Salesforce platform component," "external system," and "data flow direction," which is exactly what lets someone move from one guide to the next without relearning the notation each time. Teams building internal documentation benefit from the same discipline, even at much smaller scale.

## A standards-compliance checklist

Before treating any diagram as finished, check it against this list:

1. Does it have a legend, if it uses any notation that isn't universally self-evident?
2. Does every shape and line style match the rest of this documentation set's conventions, not just this one diagram's internal logic?
3. Is every line and arrow labeled with what it represents, not left as an unlabeled connector?
4. Does it carry a version/date stamp tying it to a specific document revision?
5. Could a reader who has seen one other diagram in this set — but not this one — correctly interpret it without asking the author a clarifying question?

If the answer to #5 is no, the diagram isn't done yet, even if it's technically accurate.

## Key terms

| Term | Meaning |
|---|---|
| Diagramming standard | An agreed, written convention for notation that every diagram in an organization's documentation follows |
| Legend | The key on a diagram explaining what each shape, line style, and color means |
| House style | The specific set of shape, color, and labeling conventions a team has settled on for its own diagrams |

## Lab

Take the ERD you drew in Lesson 2's lab (Project, Task, Skill via a junction object). Run it against the five-point standards-compliance checklist above. Add a legend if it's missing one, add a version/date stamp, and make sure every relationship line states lookup vs. master-detail explicitly rather than leaving it to a plain crow's-foot line. Write one sentence on what a reader would have gotten wrong if they'd seen the diagram before you added the legend.

## Check yourself

Can you explain why a technically correct diagram can still fail a documentation set's standards if it's inconsistent with other diagrams in the same set? Can you explain the "legend problem" using the lookup-vs.-master-detail example? Can you list at least three elements of a house style a documentation set should settle on?
