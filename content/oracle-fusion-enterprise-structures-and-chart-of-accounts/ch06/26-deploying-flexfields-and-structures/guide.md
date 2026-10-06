# Deploying Flexfields and Structures

Behind every chart of accounts structure is a piece of underlying Oracle technology called a **key flexfield**. This lesson covers how a designed structure (like LTV Manufacturing's from Lesson 25) actually gets technically frozen and deployed so a ledger — and real transactions — can use it.

## What you'll learn

- What a key flexfield is, in plain terms, and how the chart of accounts uses one
- The freeze → deploy sequence in operational detail
- What happens, and what breaks, if you try to change a structure after deployment
- How structure instances get deployed independently of the structure itself

## Key flexfields, briefly

A **key flexfield** is Oracle's underlying mechanism for building a structure out of multiple, independently-defined segments that combine into one composite key — exactly what a chart of accounts needs. The Accounting Flexfield is the specific key flexfield chart of accounts structures are built on. You don't need to become a flexfield technical expert to be a good functional consultant, but it helps to know that "freeze the chart of accounts structure" and "freeze the flexfield definition" are describing the same underlying action from two different angles.

## The freeze → deploy sequence

```
1. Define segments on the structure (count, order, labels, widths)
2. Freeze the structure definition
     (locks it against casual further changes)
3. Deploy the structure
     (generates the database objects + makes it available for use)
4. Create one or more structure instances
     (assign actual value sets to the frozen, deployed structure)
5. Freeze and deploy each structure instance
     (makes that specific instance usable by a ledger)
```

Both the structure itself and each structure instance built on it go through their own freeze-and-deploy cycle. This two-level deployment is what allows the LTV Manufacturing example from Lesson 25 — or any company — to reuse one structure shape across multiple instances with different value sets, as covered back in Lesson 20.

## What happens if you try to change a deployed structure

Oracle Fusion does allow some changes after deployment (for example, adding a brand-new segment to the end of a structure, in specific limited scenarios), but most structural changes — removing a segment, changing segment widths, or reordering segments — require re-deployment and can have significant downstream effects on reporting, open transactions, and historical data. This is the technical reality behind Lesson 20's warning that structure decisions are closer to a building's foundation than a repainted wall: deployment is the point where that foundation gets poured.

## Why this matters to you as a future consultant

In a real implementation, "freeze and deploy the chart of accounts structure" is typically a formally reviewed milestone, often requiring sign-off, precisely because of how disruptive an undo would be. Knowing the freeze → deploy → instance → freeze → deploy sequence means you'll recognize this moment for what it is when it happens on a real project, rather than treating it as "just another setup task."

## Recap

A chart of accounts structure is built on a key flexfield, and both the structure and each structure instance go through their own freeze-and-deploy cycle before a ledger can actually use it — a deliberately disruptive-to-reverse milestone. Next up, lesson 27: rapid implementation spreadsheets, a faster path through much of this setup for companies with straightforward requirements.
