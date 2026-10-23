# Lesson 9 — Why CSDM Exists

**Chapter 3 · The Common Service Data Model (CSDM) · Lesson 9 of 26**

## What you'll learn

- What the Common Service Data Model (CSDM) actually is, and what kind of thing it is — a reference framework, not a feature you switch on
- The real, documented problem CSDM was built to solve
- Why letting every implementation invent its own model became expensive
- How CSDM acts as a shared vocabulary across ITSM, ITOM, and Service Portfolio Management (SPM)
- What adopting CSDM changes about how you'll model data for the rest of this course

## CSDM is a reference framework, not a feature

CSDM is ServiceNow's real, published, vendor-maintained reference model for how configuration items, applications, and services should relate to one another. It isn't a module you install or a checkbox you enable — it's documentation and a recommended structure, meant to be followed consistently by every team modeling service data, rather than invented independently each time an instance is implemented.

## The problem before a standard model existed

Chapters 1 and 2 built CIs and relationships inside a single, self-contained example. In a real instance, that same CMDB has to serve several ServiceNow modules at once: Incident and Problem management in ITSM, service mapping and event management in ITOM, and portfolio and investment planning in Service Portfolio Management. Before a standard model like CSDM was published, ServiceNow didn't enforce one fixed way to represent "this is a service," "this is an application," or "this is the infrastructure underneath it." Each module had grown its own expectations about how that data should be shaped, and every implementation team made its own judgment calls about table usage, naming, and relationship direction.

## Why that inconsistency was genuinely expensive

Two real outcomes followed from the lack of a shared model. Inside one instance, data shaped to ITSM's expectations didn't always match what Service Portfolio Management needed a service record to look like, so a dashboard or report built for one module could misread, or simply fail to find, records intended for another. Across customers, every implementation partner re-derived its own service/application/infrastructure structure from scratch, so lessons learned on one engagement rarely transferred to the next — and admins had to relearn a bespoke, one-off model every time they changed jobs or clients.

## CSDM as a shared contract

CSDM is ServiceNow's answer to that problem: a documented structure for how CIs, applications, and services relate, meant to be followed by every module and every implementation instead of reinvented independently. It gives ITSM, ITOM, and SPM a common vocabulary to read and write against, and it gives implementers a well-tested starting point instead of a blank page. You don't have to guess what "correct" looks like for a given situation — CSDM documents it.

## What this changes going forward

From here on in this course, the structures you build will follow CSDM's vocabulary rather than the ad hoc shapes used in Chapters 1 and 2's standalone examples. That isn't complexity added for its own sake. It's the difference between CMDB data only one person understands and CMDB data that more than one module, and more than one person, can actually use without a custom translation layer in between.

## Key terms

| Term | Meaning |
|---|---|
| CSDM (Common Service Data Model) | ServiceNow's published reference framework for structuring CMDB, application, and service data consistently |
| Service Portfolio Management (SPM) | The ServiceNow module that plans and manages services and applications as a portfolio, and one of CSDM's consumers |
| Reference framework | A documented structure meant to be followed consistently, not a feature that gets "turned on" |
| Modeling inconsistency | The real-world problem of different modules or implementers structuring the same kind of service data differently |

## Check yourself

Without looking back at the lesson, explain in your own words: what specific, real cost did the lack of a standard model impose on an organization running ITSM, ITOM, and Service Portfolio Management against the same CMDB?
