# Lesson 26 — Application Navigation & Menus

**Chapter 6 · Tables, Forms & Modules for a Custom Application · Lesson 26 of 37**

## What you'll learn

- The real relationship between an Application Menu and the Modules nested underneath it
- The four distinct, selectable Module link types, and when each one is the right fit
- How the Order field controls where a module lands inside its menu
- How a role requirement on a single module ties back to Chapter 5's scope-level access control

## Recap: applications and modules, from the outside

ServiceNow Platform Fundamentals' Application Navigator lesson taught you to read this structure
as a user: applications as the top-level groups in the tree (Incident, Service Catalog, System
Definition), and modules as the clickable items nested underneath each one. Lesson 25 had you
build one module yourself — "Room Bookings," pointing at the Room Booking table — without
explaining what actually holds that module in place. This lesson opens that up: the two real
record types, `sys_app_application` and `sys_app_module`, that together define what your
application's own section of the navigator looks like.

## The Application Menu: the top-level bucket

When you create a scoped application in Studio, the platform automatically creates an **Application
Menu** record — a row in `sys_app_application` — carrying the application's own name. That record
is the top-level entry a user sees in the navigator: expand "Facilities" (or whatever your app is
named) and everything nested underneath is a module whose **Application menu** field points back
at that one record. You rarely create a new Application Menu by hand inside an existing scoped
app; it already exists the moment the app does. What you build constantly, as Lesson 25 showed, is
the modules that live inside it.

## The Module: what actually appears, and where

Every Module record needs its **Application menu** field set to the app's menu record — that's
what nests it under the right top-level entry instead of floating loose or landing under someone
else's application. Beyond that, the **Order** field is a plain number controlling where this
module falls relative to its siblings: a module with Order 100 appears above one with Order 200.
This is exactly how a thoughtfully built app puts its most commonly used module — the main list
view — at the top, with setup or admin-only modules pushed further down.

## Four real module types, each a genuinely different thing

The **Link type** field on a module isn't cosmetic — each value produces a meaningfully different
click behavior. **List of Records** is the one Lesson 25 used: clicking the module opens a list
view of a chosen table, optionally pre-filtered by a condition (a "My Open Room Bookings" module
could point at the same table with a filter already applied). **Record** opens one *specific*
record directly — useful for a module that should always land on a single configuration record,
like an application-wide settings record, rather than a list of many. **URL** opens an external or
internal address directly, fixed or built from arguments — handy for linking out to a related
system or an internal KB article without building a table-backed screen for it at all. **UI Page**
opens a UI Page you built the way Chapter 4 covered — a custom-rendered screen, reached as a
module exactly like any table's list view would be. Choosing the wrong one isn't a styling
mistake; it changes what actually happens when a user clicks.

## Roles on a module: visibility, not just position

A module can also carry a **Role** — if set, only users holding that role see the module in the
navigator at all; everyone else's tree simply omits it, with no error and no visible gap. This is
a navigator-level visibility control, distinct from the scope-level protection Chapter 5 covered:
scope decides whether code outside your application can even call into it, while a module's role
decides which logged-in users, inside or outside your scope, see that entry point in the tree in
the first place. An approval-only module, for instance, might carry a role that only the
Facilities team holds, so a regular employee's navigator never shows it.

## Key terms

| Term | Meaning |
|---|---|
| Application Menu (`sys_app_application`) | The top-level entry in the navigator, automatically created with a scoped app |
| Module (`sys_app_module`) | A clickable item nested under an Application Menu via its "Application menu" field |
| Link type | The field selecting what a module does on click: List of Records, Record, URL, or UI Page |
| Order | The number controlling a module's position relative to its sibling modules |
| Role (on a module) | Restricts which users even see that module in the navigator |

## Check yourself

Without looking back: a module's Link type is set to Record instead of List of Records. What does
that actually change about what happens when a user clicks it, and when would that be the right
choice?
