# Lesson 60 — Sets & Dynamic Sets

**Chapter 10 · Groups, Sets, Bins & Hierarchies · Lesson 60 of 95**

## What you'll learn

- What a **set** is, and how it differs from a group (Lesson 59)
- The difference between a **fixed set** (a manual, unchanging list of
  members) and a **dynamic set** (a rule that re-evaluates as your data
  changes)
- How to build both kinds using the real Create Set dialog
- Where sets show up once created, and how you use one in a view

## What a set actually is

A **set** is a custom field that answers one yes/no question for every
member of a dimension: is this member in the set, or not? That's a
subtly different job than a group. A group *relabels* members
("Bookcases" and "Tables" both become "Bookcases & Tables"). A set
*flags* members ("is this customer's total sales over $5,000?") without
renaming or combining anything — every member keeps its own name,
Tableau just tags each one True or False.

You create a set by right-clicking a dimension in the Data pane and
choosing **Create > Set**. That opens the Create Set dialog, which has
three tabs, and the tab you use determines what kind of set you get.

## Fixed sets: a manual list

On the **General** tab, you check off the specific members you want in
the set by hand:

![Create Set dialog, General tab, showing a scrollable list of Product Name values with checkboxes, several already checked.](/courses/tableau/ch10/60-sets-and-dynamic-sets/create-set-general.png)
*A fixed set — a manually checked list of members.*
Source: [Tableau Help — Create Sets](https://help.tableau.com/current/pro/desktop/en-us/sortgroup_sets_create.htm)

This produces a **fixed set**: the exact members you checked stay in
the set even if your underlying data changes later. If a new product
gets added to the data source tomorrow, it will never automatically
join a fixed set — you'd have to go back and check it manually.

## Dynamic sets: a rule that re-evaluates

On the **Condition** tab, instead of checking members by hand, you
write a rule:

![Create Set dialog, Condition tab, showing a condition "By field: Sum of Sales >= 100,000" defining the set "Products with Sales 100K +".](/courses/tableau/ch10/60-sets-and-dynamic-sets/create-set-condition.png)
*A dynamic set — membership is a rule Tableau re-evaluates against your live data.*
Source: [Tableau Help — Create Sets](https://help.tableau.com/current/pro/desktop/en-us/sortgroup_sets_create.htm)

This produces a **dynamic set**: instead of a frozen list, Tableau
re-checks the condition ("Sum of Sales >= 100,000") every time the view
refreshes. If a product's sales cross that threshold next quarter, it
joins the set automatically — no manual editing required. The **Top**
tab works the same way for a specific, common case: "Top 10 customers
by Sales," recalculated live.

An important limitation to remember: **a dynamic set can only be based
on a single dimension.** If you need a rule that spans more than one
dimension, you're usually better off with a calculated field (Chapter 6)
or an LOD expression (Chapter 12).

## Fixed vs. dynamic, at a glance

| | Fixed set | Dynamic set |
|---|---|---|
| Built from | General tab — manually checked members | Condition or Top tab — a rule |
| Updates when data changes? | No — stays exactly as checked | Yes — re-evaluated live |
| Best for | "This specific list of VIP accounts" | "Whoever currently has sales over $X" |

## Using a set once it exists

Every set you create appears under its own **Sets** heading in the Data
pane, with a distinctive set icon. You can drag a set onto Color to
highlight in/out members in a view, onto Filters to show only the set's
members, or use it directly in a calculated field with the `IN`
operator. Lesson 61 goes further: combining two sets together, and
using sets to drive interactivity through Set Actions.

## Key terms

| Term | Meaning |
|---|---|
| Set | A custom field flagging whether each member is "in" or "out," without renaming anything |
| Fixed set | A set built from a manually checked list of members — does not update on its own |
| Dynamic set | A set built from a condition or Top N rule — re-evaluated as data changes |
| Condition tab | The Create Set tab used to build a rule-based dynamic set |

## Lab

1. In Sample Superstore, right-click `Customer Name` and choose
   **Create > Set**. On the General tab, manually check five customers
   to build a fixed set called "My VIP List."
2. Create a second set on `Product Name`, this time on the Condition
   tab: "Sum of Sales >= 50,000." Name it "High-Value Products."
3. Drag each set onto Color in a new worksheet and compare: which one
   would still contain the exact same members a year from now, and
   which one wouldn't?

## Check yourself

You're ready for Lesson 61 when you can explain the difference between
a fixed set and a dynamic set in one sentence, and you've built one of
each using the real Create Set dialog.
