# Setup and Maintenance and Implementation Projects

Design is signed off. Chapter 3 is where the configuration workbook from Lesson 8 finally becomes a live Oracle Fusion configuration. This lesson covers the two things every functional consultant uses constantly during Configure: the Setup and Maintenance work area itself, and the Implementation Project that organizes and tracks the work inside it.

## What you'll learn

- What Functional Setup Manager (FSM) is and how Setup and Maintenance is organized
- What an Implementation Project is and why it's not just "all of Setup and Maintenance"
- How task list progress gets tracked and assigned
- How Brightfield scoped its Cash Management implementation project

## Setup and Maintenance and Functional Setup Manager

**Setup and Maintenance** is the work area where every configuration task in Oracle Fusion lives, organized through **Functional Setup Manager (FSM)**. FSM groups related configuration steps into **functional areas** (e.g., Cash Management), which break down into **task lists** (e.g., "Define Banks, Branches, and Accounts"), which contain individual **tasks** (e.g., "Manage Bank Branches"). This is the same structure the configuration workbook was built to mirror back in Lesson 8 — the workbook's sections map directly onto these task lists.

## Implementation Projects

Rather than exposing every possible task list across all of Oracle Fusion to every consultant, a team creates an **Implementation Project**: a named container that scopes only the functional areas and task lists actually relevant to this implementation (or this phase of it). Each task inside the project can be assigned an owner and a target date, and FSM tracks a completion percentage as tasks get marked done. This gives the Project Manager a real-time view of configuration progress without manually surveying every consultant.

## Why scoping matters

Oracle Fusion's full task list catalog spans every module Oracle offers, most of which have nothing to do with a given project. An Implementation Project scoped tightly to Brightfield's Phase 1 (GL, AP, AR, Cash Management for US operations, per Lesson 3) keeps the Cash Management functional consultant looking only at the task lists relevant to their module, instead of hunting through an unscoped list of hundreds of tasks across modules Brightfield isn't even implementing.

## Brightfield Industrial Group: the implementation project

Brightfield's partner creates an Implementation Project named "Brightfield Phase 1 — Financials," scoped to the GL, AP, AR, and Cash Management functional areas. Inside it, the Cash Management functional consultant is assigned every task list under the Cash Management functional area — "Define Banks, Branches, and Accounts," "Manage Reconciliation Matching Rules," and others — each with a target date tied back to the project's WBS from Lesson 3. As tasks are completed, the project's tracked completion percentage feeds directly into the weekly status report the Project Manager sends to the Executive Sponsor.

## Key terms

| Term | Meaning |
|---|---|
| Functional Setup Manager (FSM) | The framework organizing Setup and Maintenance into functional areas, task lists, and tasks |
| Setup and Maintenance | The work area where configuration tasks are performed |
| Implementation Project | A scoped container of task lists relevant to a specific implementation or phase |

## Recap

Setup and Maintenance, organized through Functional Setup Manager, holds every configuration task Oracle Fusion offers — functional areas, task lists, and tasks — and an Implementation Project scopes just the task lists this project actually needs, with owners, target dates, and a tracked completion percentage. Brightfield's Phase 1 project keeps its Cash Management consultant focused on exactly the task lists their module needs. Next up, lesson 12: moving that configuration between environments using configuration packages.
