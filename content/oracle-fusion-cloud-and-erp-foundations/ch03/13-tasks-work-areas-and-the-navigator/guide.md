# Tasks, Work Areas and the Navigator

**Chapter 3 · Working in Oracle Fusion · Lesson 13 of 20**

Lesson 12 introduced the Navigator as the directory of work areas. This lesson looks at the layer underneath each work area — the **tasks** inside it — and puts the whole hierarchy together: Navigator, work area, task.

## What you'll learn

- The three-level hierarchy: Navigator → Work Area → Task
- What a "work area" actually is, beyond just "a menu item"
- What the Tasks panel looks like inside a typical work area
- Quick Actions, and why they exist alongside the Tasks panel

## The hierarchy

Think of it as three nested levels:

1. **Navigator.** The top-level directory of everything a user can reach (Lesson 12).
2. **Work Area.** A landing page for one specific function — for example, the **General Accounting** work area, or the **Manage Invoices** work area inside Payables. Clicking a work area in the Navigator takes you here.
3. **Task.** A specific activity available inside that work area — for example, inside General Accounting, tasks might include "Create Journal," "Review Journal Batches," or "Manage Allocations."

A work area is more than a menu item — it's a dedicated landing page with its own layout, often including a Tasks panel, relevant infolets, and sometimes a worklist of items needing attention, all scoped to that one function.

## The Tasks panel

Inside most work areas, a **Tasks panel** (sometimes called a Tasks pane) lists the specific activities available there, often grouped by category. A General Accounting work area's Tasks panel might group "Journals," "Period Close," and "Allocations" as separate sections, each expandable to show individual tasks underneath. This is where a user actually starts doing something — clicking a task opens the specific page needed to perform it.

## Quick Actions

Some common tasks are important and frequent enough that Oracle surfaces them as **Quick Actions** — shortcuts available directly from the home page or springboard, without navigating into a work area and its Tasks panel first. A "Create Journal" quick action, for instance, might appear right on the home page for a GL accountant who creates journals constantly, saving several clicks compared to going Navigator → General Accounting → Tasks panel → Create Journal every time.

## Why this hierarchy matters

When you eventually configure security in Oracle Fusion Security (a later course on this path), access is often granted at exactly this level of granularity: a role might grant access to a work area, specific tasks within it, or both. Understanding the Navigator/Work Area/Task hierarchy now means that when a security conversation happens later — "why can't this user see the Create Journal task?" — you'll already know where to look.

## Key terms

| Term | Meaning |
|---|---|
| Work area | A dedicated landing page for one function, reached via the Navigator |
| Task | A specific activity available inside a work area |
| Tasks panel | The list of available tasks shown inside a work area, often grouped |
| Quick Action | A shortcut to a common task, available directly from the home page |

## Check yourself

You're ready for Lesson 14 when you can describe the three-level hierarchy — Navigator, Work Area, Task — using General Accounting as the example, and explain what a Quick Action saves a user from doing.
