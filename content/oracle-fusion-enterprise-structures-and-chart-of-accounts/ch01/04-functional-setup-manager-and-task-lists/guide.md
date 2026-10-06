# Functional Setup Manager and Task Lists

You now know what Setup and Maintenance looks like and what enterprise structures you're building. This lesson covers the engine behind both: **Functional Setup Manager (FSM)**, the tool that decides which setup tasks even exist for you to do, and organizes them into a trackable list.

## What you'll learn

- What Functional Setup Manager is and what problem it solves
- How offerings and functional areas generate a task list automatically
- What an implementation project is and why most teams limit it to one offering
- How to use a task list to track progress rather than guess at it

## The problem FSM solves

Oracle Fusion Cloud contains an enormous number of possible setup tasks across every product line — far more than any single implementation needs. If every task were simply presented in one giant list, consultants would spend days just figuring out what applies to them. Functional Setup Manager's job is to take your choice of **offerings** (the product areas you've licensed, such as Financials) and **functional areas** within them, and generate exactly the task list that matches — including every prerequisite task that choice implies.

## Implementation projects

An **implementation project** is the named container FSM uses to hold that generated task list. When you create one, you pick the offering(s) and functional areas relevant to your rollout, and FSM builds a hierarchical task list automatically, right down to dependent/prerequisite tasks you might not have thought to include yourself.

```
Create Implementation Project
  → Select Offering: Financials
      → Select Functional Areas: Enterprise Profile, Ledger and Reporting...
          → FSM generates the full task list, with prerequisites included
```

Oracle's own guidance is to keep an implementation project scoped to **no more than one offering** wherever practical. A project spanning multiple offerings is harder to export, import, and hand off between environments (for example, from a test instance to production) than several smaller, single-offering projects.

## Working the task list

Once generated, the task list is more than a reading list — it is a tracking tool. Each task can be assigned an owner, marked with a status (not started, in progress, complete), and annotated with notes. In a real implementation, a functional consultant (your future role) spends a large share of the project literally working down this list: open a task, configure it, mark it complete, move to the next one. The predefined **offering top task list** you get from FSM already reflects the correct dependency order — for example, it will not let "Manage Ledger" show up logically before the chart of accounts and calendar it depends on.

## Why this matters for the rest of this course

This course's chapters roughly mirror how a real implementation project's task list is organized: enterprise profile tasks (legal entities, business units) before ledger tasks, ledger tasks before chart of accounts detail, and chart of accounts structure before the fine-grained segment and value set work. You will not be required to build a formal implementation project for this course's exercises, but recognizing that every task you perform maps to a real node in a real FSM task list is what separates "I clicked some buttons" from "I understand how a consultant actually works."

## Recap

Functional Setup Manager turns your choice of offerings and functional areas into a generated, trackable task list, held inside an implementation project that Oracle recommends scoping to one offering at a time. Chapter 1 is complete — you can sign in, navigate Setup and Maintenance, see the big picture of enterprise structures, and understand the tool that organizes the work. Chapter 2 starts building: legal entities and ledgers.
