# Lesson 61 — Combined Sets & Set Analysis

**Chapter 10 · Groups, Sets, Bins & Hierarchies · Lesson 61 of 95**

## What you'll learn

- How to **combine two sets** to compare their members
- The four ways Tableau can combine sets: all members, shared members
  only, or one set except the other's shared members (in both
  directions)
- What a **Set Action** is, and how it lets a click or hover on a view
  update a set's membership live
- A realistic cohort-comparison and dashboard-interactivity use of sets
  together

## Combining two sets

Once you have two sets built on the *same dimension* — say, "Customers
(2012)" (everyone who purchased in 2012) and "Customers (2013)"
(everyone who purchased in 2013) — you can combine them into a new,
third set that answers a comparison question neither set answers alone.
Select both sets in the Data pane, right-click, and choose **Create
Combined Set**:

![Create Set dialog in combine mode, naming a new set "Customers (2012 &2013)" and choosing how to combine "Customers (2012)" and "Customers (2013)": all members in both, shared members in both, or one except the other's shared members.](/courses/tableau/ch10/61-combined-sets-and-set-analysis/create-combined-set-dialog.png)
*The real Create Set dialog in combine mode.*
Source: [Tableau Help — Create Sets](https://help.tableau.com/current/pro/desktop/en-us/sortgroup_sets_create.htm)

You get four options for how the two sets combine:

| Option | Result |
|---|---|
| **All Members in Both Sets** | Union — everyone in either set |
| **Shared Members in Both Sets** | Intersection — only customers in *both* 2012 and 2013 |
| **"Customers (2012)" except shared members** | 2012 customers who did *not* return in 2013 |
| **"Customers (2013)" except shared members** | 2013 customers who are *new* — not in 2012 |

This is exactly how you'd answer "what percentage of last year's
customers came back this year?" — build the two yearly sets, combine
with **Shared Members in Both**, and compare its size to either
original set. One requirement to remember: the two sets being combined
must be built on the same dimension (you can combine two customer sets,
but not a customer set with a product set).

## Set Actions: letting the view update a set

A **Set Action** turns a set from something you configure once into
something your audience controls interactively. Instead of manually
editing a set's condition, a Set Action lets a hover, a click (Select),
or a menu choice on a mark in the view *change which members are in the
set*, live, as people use your dashboard.

![Add Set Action dialog, naming an action "Shipping Profit Set," running it on Select, and configuring which set gets updated and how.](/courses/tableau/ch10/61-combined-sets-and-set-analysis/add-set-action-dialog.png)
*The real Add Set Action dialog.*
Source: [Tableau Help — Use Set Actions](https://help.tableau.com/current/pro/desktop/en-us/actions_sets.htm)

You create one from **Worksheet > Actions > Add Action > Change Set
Values**. You pick the source sheet, whether it runs on Hover, Select,
or Menu, which set gets targeted, and whether running the action
assigns, adds, or removes values from that set — and whether clearing
the selection keeps the set's values, adds everything back, or removes
everything.

This is what powers a common dashboard pattern you've probably used on
a real product: click one region on a map, and every other chart on the
dashboard re-highlights or re-filters to show only that region's
detail — driven entirely by a set whose membership the click just
changed.

## Set analysis, in practice

"Set analysis" isn't a single Tableau menu — it's the general practice
of using sets (plain, combined, or action-driven) as the analytical
building block for comparison questions: cohort retention, "in vs. out"
segment comparisons, and click-driven dashboard interactivity all run
through the same underlying mechanism you just learned.

## Key terms

| Term | Meaning |
|---|---|
| Combined set | A new set built from two existing sets on the same dimension |
| Shared Members in Both Sets | The intersection option — members present in both source sets |
| Except shared members | The option that isolates members unique to one set |
| Set Action | An interaction (hover/select/menu) that changes a set's membership live |
| Change Set Values | The Set Action type used to add, remove, or assign values to a set |

## Lab

1. In Sample Superstore, build two fixed sets on `Customer Name`: one
   for customers who ordered in one year, one for another year (use a
   filter on Order Date while checking members, or a condition on
   `YEAR([Order Date])`).
2. Combine them with **Shared Members in Both Sets** to see returning
   customers, then switch to **"Set A" except shared members** to see
   who didn't come back.
3. On a new worksheet, add a Set Action (**Worksheet > Actions > Add
   Action > Change Set Values**) that runs on **Select** and assigns
   the selected marks to one of your sets. Click a mark and confirm the
   set's membership changes.

## Check yourself

You're ready for Lesson 62 when you can combine two sets and explain
what each of the four combine options returns, and you've built one Set
Action that changes a set's membership when you click a mark.
