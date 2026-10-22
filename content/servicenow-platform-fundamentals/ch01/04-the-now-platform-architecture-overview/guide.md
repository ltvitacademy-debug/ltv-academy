# Lesson 4 — The Now Platform Architecture: Overview

**Chapter 1 · What ServiceNow Actually Is · Lesson 4 of 34**

## What you'll learn

- The four-layer mental model this entire course (and later courses) will keep returning to
- What lives in the database layer and why it's called the Glide Data Model
- What lives in the application layer — forms, lists, and the logic that drives them
- What lives in the UI layer, including the shift toward the Next Experience
- What "platform services" means and why security, workflow, and integration cut across every layer

## Why a layered model, and why now

Lesson 1 made the case that ServiceNow is a platform, not just ITSM. This lesson gives you the
actual shape of that platform — a mental map you'll keep coming back to for the rest of this
course and the courses after it. Nothing here needs to be memorized in depth yet; each layer gets
its own deep-dive later. The goal right now is just to know the layers exist and roughly what
belongs in each one, so later lessons have somewhere to attach to.

## Layer 1 — the database layer

Everything in ServiceNow ultimately sits on top of a relational database, organized according to
what ServiceNow calls the **Glide Data Model**. Every piece of data — every incident, every user,
every Configuration Item — lives in a **table**. Tables can extend other tables (the `incident`
table extends the base `task` table, for instance, inheriting its common fields), and tables relate
to each other through **reference fields**. This layer is purely structural: it defines what data
exists and how it's shaped, with no behavior of its own.

## Layer 2 — the application layer

On top of the data sits the application layer: the **forms** users fill out, the **lists** they
scan through, and the **logic** that makes those forms and lists behave intelligently rather than
just sitting there as a static database front end. That logic is where ServiceNow's scripting
engine lives:

- **Business Rules** — server-side logic that runs when a record is inserted, updated, deleted, or
  queried (for example, auto-assigning a new incident based on its category)
- **Client Scripts** — logic that runs in the user's browser as they interact with a form (for
  example, making a field mandatory only when another field has a certain value)
- **Script Includes** — reusable server-side script libraries that Business Rules and other logic
  can call into, instead of duplicating code

## Layer 3 — the UI layer

The UI layer is how all of the above actually gets rendered to a person looking at a screen.
ServiceNow has been through more than one UI generation: the long-standing **Classic UI / UI16**
look (the traditional list-and-form browser experience most existing customers still run parts of
their instance in), and the newer **Next Experience**, including **Workspaces** — a more modern,
app-like, configurable interface ServiceNow has been pushing customers toward for agent-facing
work. Both UI generations render the same underlying tables, forms, and logic — the UI layer is a
presentation choice, not a different platform underneath.

## Layer 4 — platform services that cut across everything

The last piece isn't really a layer stacked on top of the others — it's a set of services that
reach into every layer at once:

- **ACLs (Access Control Lists)** — security rules that govern who can read, write, create, or
  delete specific tables, fields, or records, enforced no matter which UI layer someone's using
- **Flow Designer / workflow** — the modern tool for building multi-step automated processes that
  span tables, approvals, and notifications
- **Integration (REST APIs, IntegrationHub)** — how data moves in and out of the instance to and
  from other systems entirely

Each of these touches the database, application, and UI layers simultaneously, which is exactly
why they're treated as cross-cutting platform services rather than a single layer in the stack.

## Key terms

| Term | Meaning |
|---|---|
| Glide Data Model | ServiceNow's underlying relational data model — tables, fields, and table extension |
| Business Rule | Server-side script logic that runs on database operations (insert, update, delete, query) |
| Next Experience / Workspaces | ServiceNow's modern, configurable UI generation, alongside the older Classic UI/UI16 |
| ACL (Access Control List) | A security rule controlling who can access a given table, field, or record |

## Check yourself

Without looking back: name the four layers of this chapter's architecture model, and explain why
ACLs, Flow Designer, and integration are described as cutting across all of them rather than
belonging to just one.
