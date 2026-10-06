# Chart of Accounts Structure and Segments

Everything in Chapters 2 through 4 — legal entities, ledgers, business units, calendars, currencies — exists to support one final piece: the **chart of accounts**, the classification scheme every transaction gets coded against. This lesson starts Chapter 5 by covering how a chart of accounts is structured, and the critical distinction between a structure and an instance.

## What you'll learn

- What a segment is, concretely, and how segments combine into an account combination
- The difference between a chart of accounts **structure** and a **structure instance**
- Why the number and order of segments is a decision made once, carefully
- What happens once a structure is frozen and deployed

## Segments and account combinations

A chart of accounts is built from **segments** — individual, ordered classification pieces that, together, fully describe one account. Common segments include Company (or Balancing), Cost Center, Account (Natural Account), and sometimes Product, Location, or Intercompany. Every transaction gets coded with one value from *each* segment, and the full combination of segment values is called an **account combination** — the complete "address" a dollar of activity posts to.

```
Example account combination (four segments):
  Company : Cost Center : Account : Intercompany
    110    :    400      :  6100   :    000
```

## Structure vs. structure instance

Oracle Fusion separates two related but distinct concepts, and conflating them is a common source of confusion for new consultants:

- A **chart of accounts structure** defines the segment *shape*: how many segments, what order, how wide each one is (its maximum length), and which segment plays which role (covered fully in Lesson 21). The structure is the blueprint.
- A **chart of accounts structure instance** is an actual, usable deployment of that structure, tied to specific value sets for each segment. You can have more than one instance of the same structure — for example, two ledgers that share an identical segment shape but use different value sets for their Cost Center segment, because they track different departments.

```
Chart of Accounts Structure   (the shape: # of segments, widths, order)
        │
        ▼
Structure Instance             (a real deployment: shape + specific value sets)
        │
        ▼
Account Combinations           (actual values transactions post to)
```

## Deciding segment count and order once

How many segments to use, and in what order, is a decision made during enterprise structure design (Chapter 2, Lesson 5) and should not be revisited casually. Too few segments and the business can't capture everything it needs to report on; too many and every transaction entry screen becomes slower and more error-prone, and every report gets harder to read. A chart of accounts structure, once in real use, is extremely disruptive to redesign — closer to redesigning a building's foundation than repainting a wall.

## Freezing and deploying

Once a chart of accounts structure is defined the way you want it, it must be **frozen** and then **deployed** before it can actually be used by a ledger. Freezing locks the structural definition (segment count, order, widths) against further casual changes; deploying makes the frozen structure instance available for assignment to ledgers and for transaction entry. Lesson 26 in Chapter 6 covers this deployment step in operational detail.

## Recap

A chart of accounts is built from segments that combine into account combinations, with the structure defining the segment shape and a structure instance being an actual, value-set-backed deployment of that shape. Next up, lesson 21: segment labels — balancing, cost center, and natural account — the qualifiers that tell Oracle Fusion what each segment actually means.
