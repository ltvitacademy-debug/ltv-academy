# Lesson 32 — Capstone Kickoff: Explore a Real Instance

**Chapter 8 · Capstone: Platform Fundamentals in Practice · Lesson 32 of 34**

## What you'll learn

- The scenario this three-lesson capstone runs on, start to finish
- How to use the Application Navigator to orient yourself in an unfamiliar instance
- Which base tables you should expect to find, and why they're there
- How to confirm which applications are actually installed, not just assumed
- What you'll produce across Lessons 32-34

## The capstone scenario

You've just been given admin access to a ServiceNow instance that belongs
to a mid-size logistics company — call them Meridian Freight. Nobody
handed you a map. There's no onboarding document, no list of "here's
what we have installed." You have a login, a blank Application
Navigator, and the same job every new ServiceNow admin actually starts
with: figure out what this instance is before you try to change
anything in it. If you have your own free Personal Developer Instance
(PDI), open it now and follow along click for click. If you don't,
everything below still holds — it's written as a real walkthrough, not
a screenshot of one.

## First stop: the Application Navigator

Every exploration starts the same place it did back in Chapter 2: the
Application Navigator's filter field, top-left of the screen. Typing
into it doesn't just search labels — it searches module names across
every installed application at once, which makes it the fastest way to
answer "does this instance even have X?" For this capstone, the first
thing worth typing is **"tables"**, which surfaces **System Definition
\> Tables** — the list of every table in the instance (the `sys_db_object`
table, if you want its real name). That one list is the single most
useful starting point for a new admin, because a table list tells you
what the instance is actually built to track, independent of what
anyone claims it tracks.

## Confirming the base tables exist

From Chapter 3 you already know ServiceNow ships a small set of base
tables that almost everything else extends. Opening System Definition
\> Tables on Meridian Freight's instance, you'd expect — and should
confirm, not assume — three in particular. The `task` table, because
it's the parent every one of ITSM's work-tracking records extends from.
The `cmdb_ci` table, because any company running asset or configuration
management needs a Configuration Item base to extend from, even before
you know which CI subtypes they use. And `sys_user`, because no
instance functions without a user table — it's where every `caller_id`
and `assigned_to` reference field, going all the way back to Chapter 4,
actually points. Finding these three confirms the instance has a normal
ITSM foundation under it, not something custom-built from scratch.

## Identifying what's installed

A table existing doesn't mean an application is active — Chapter 1
covered how ServiceNow ships a huge standard table structure whether or
not a company turns the matching application on. To confirm what
Meridian Freight actually runs day to day, the next stop is the
Application Navigator's main module list itself (or, for a fuller
picture, **System Applications \> All Available Applications \>
Installed**). For a logistics company's service desk, you'd expect to
find the core ITSM modules from Course 1's practices: **Incident**,
**Problem**, **Change**, and **Request** — the same four you worked
with hands-on earlier in this track. Seeing all four installed and
populated with real records tells you this is a live, in-use instance,
not a demo shell — which changes how carefully you'll want to move in
Lessons 33 and 34.

## What comes next

This lesson was reconnaissance: find the navigator's fastest path to a
table list, confirm the base tables you'd expect, and verify which
applications are actually turned on. Lesson 33 goes one level deeper —
documenting the table hierarchy under `task`, and the specific
dictionary entries and field types on the Incident table itself.

## Key terms

| Term | Meaning |
|---|---|
| Application Navigator | The left-side filter/search panel used to find any module or table in an instance |
| System Definition > Tables | The admin view listing every table in the instance (the `sys_db_object` table) |
| Base table | A foundational table (`task`, `cmdb_ci`, `sys_user`) that other tables extend from |
| Installed application | A ServiceNow app/plugin that's active and in use, not just present in the schema |

## Check yourself

Before moving to Lesson 33: without opening anything, can you name the
three base tables this lesson expects to find on almost any ITSM
instance, and explain in one sentence each why that specific table has
to exist?
