# Lesson 20 — Creating a Scoped Application

**Chapter 5 · Scoped Applications · Lesson 20 of 37**

## What you'll learn

- The real path through Studio to create a new scoped application
- Which fields you set at creation, and what each one actually controls
- The one field you cannot change after creation, and why that's true
- Where the Version field fits into application lifecycle, briefly

## The real process: Studio, not a form you fill out blind

A new scoped application is created through **Studio**, ServiceNow's dedicated development
environment. You get there from **System Applications > Studio**, then choose **Create
Application**. This isn't a side door — Studio is the real, intended entry point for scoped
application development, and it's also where you'll spend most of Chapters 5 through 9 of this
course once the application exists: creating tables, Business Rules, Script Includes, and UI
Pages inside it.

Choosing **Create Application** walks you through a short wizard. Two fields on that wizard
matter far more than the others, and one of them deserves real caution before you type anything.

## The fields that matter: Scope ID / Name, and Version

**Scope ID (Name).** This is the application's display name and, critically, the source of its
scope identifier — the prefix you saw in Lesson 19 baked into every table and field name the
application will ever create (`x_acme_fleet`, `x_acme_vms`, and so on). You pick a name like
"Fleet Management," and Studio derives a scope identifier from it (typically something like
`x_<vendor>_<short_name>`).

Here's the caution: **the scope identifier cannot be changed after the application is created.**
This isn't a UI limitation someone might fix in a later release — it's structural. The identifier
gets woven into the real name of every table, field, and other scoped artifact the moment they're
created inside that application. Renaming the scope after the fact would mean renaming every
table (`x_acme_fleet_vehicle`), every field reference in every script, and every Script Include
call (`new x_acme_fleet.SomeClass()`) across the entire application — not a safe or supported
operation. Decide your scope's naming convention before you click Create Application, not after.

A reasonable naming convention most teams settle on:

```javascript
// Pattern: x_<vendor-or-company-prefix>_<short-app-name>
// Fleet Management for "Acme":
x_acme_fleet

// Visitor Management for "Acme":
x_acme_vms

// Avoid: generic names like x_acme_app1 that won't mean anything
// to the next developer reading x_acme_app1_vehicle in six months
```

**Version.** Scoped applications carry a version number (commonly starting at something like
`1.0.0`) used for application lifecycle — tracking what's been published, and later, what
customers or instances are running which release if the application is ever packaged for
distribution through the ServiceNow Store or shared across instances via Update Sets or app
repositories. This course doesn't go deep on publishing and distribution — that's genuinely
beyond this course's scope — but it's worth knowing the Version field exists from the moment of
creation, not bolted on later.

## What happens the moment the application is created

Creating the application generates a new `sys_scope` record — the same record type from Lesson
19 — and Studio immediately sets up that application's file structure: a dedicated, organized
container that every table, Business Rule, Script Include, and UI Page you build from this point
forward will be filed under. Lesson 22 covers that file structure in depth. For now, the important
point is that this organization starts the instant the application exists, not after you've built
a few things and asked for it.

## Why this lesson matters before Chapter 6

Chapter 6 has you design and build an actual custom application's data model — tables, forms, and
modules, all inside a scope. None of that is possible without a scoped application already
existing to build it in. This lesson is the one-time setup step that makes everything after it
possible, which is exactly why the Scope ID decision deserves more care than it might seem to at
first glance: get it wrong, and the fix isn't an edit, it's starting over.

## Key terms

| Term | Meaning |
|---|---|
| Studio | ServiceNow's dedicated development environment; the real entry point for creating and building scoped applications |
| Scope ID (Name) | The application's name, which Studio uses to derive its permanent scope identifier |
| Version | A version number tracking the application's lifecycle, relevant to publishing and distribution |
| sys_scope record | The record Studio creates automatically the moment a new scoped application is created |

## Check yourself

Why does ServiceNow prevent you from changing a scope identifier after the application has been
created, and what would have to happen across the application for a rename to even be
theoretically possible?
