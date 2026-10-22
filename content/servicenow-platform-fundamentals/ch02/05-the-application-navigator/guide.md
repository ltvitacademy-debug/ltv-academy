# Lesson 5 — The Application Navigator

**Chapter 2 · Navigation & Workspaces · Lesson 5 of 34**

## What you'll learn

- The real anatomy of the Application Navigator: the filter box, the All/Favorites/History
  views, and the application-to-module tree beneath them
- How ServiceNow groups related screens into "applications" and "modules," and why that
  grouping matters more than it looks like it does
- How the live filter narrows matches as you type, across both application names and module
  names at once
- The direct-navigation shortcut — typing a table name straight into the filter — that every
  working admin uses daily instead of clicking through menus

## Anatomy of the Application Navigator

The Application Navigator is the panel pinned to the left edge of almost every classic/UI16
screen in ServiceNow. At the very top sits a text field, usually showing placeholder text like
"Filter navigator," followed by a row of views: **All**, **Favorites**, and **History** (some
instances also surface a **Workspaces** entry here once workspaces are configured). Below that
row is the actual tree: a list of **applications** — Incident, Problem, Change, Service Catalog,
System Definition, and so on — and each application expands to reveal its **modules**, which are
the individual clickable screens underneath it. Expanding the Incident application, for example,
typically reveals modules like "Create New," "Open," "Assigned to me," and "All." Each of those
modules is really just a saved link to a specific list or form configuration — a list view of the
`incident` table with a particular filter already applied, in most cases.

## Browsing by application and module

The slowest but most discoverable way to use the navigator is to scroll the All view and expand
applications by name until you find the module you want. This matters early on because it teaches
you the real shape of the instance: which applications exist, how ServiceNow groups functionality,
and where a given piece of functionality actually lives. An admin who has never browsed the full
All tree tends to not know what's installed on their own instance. Favorites lets you pin modules
you use constantly — right-click (or use the star icon next to a module) to add it — so you stop
re-expanding the same application every session. History automatically tracks the last several
modules and records you opened, which is the fastest way back to something you had open five
minutes ago but didn't think to favorite.

## Filtering as you type

Typing into the filter box narrows the tree live, and it matches against both application names
and module names simultaneously — type "inc" and you'll see the Incident application along with
any other application or module containing those letters, such as modules inside unrelated
applications that happen to have "inc" in their label. This is almost always faster than
expanding trees by hand once you already know roughly what you're looking for, and it's the
method most working admins default to for anything other than first-time exploration.

## Jumping straight to a table: the direct-navigation shortcut

The fastest method of all skips the module tree entirely. Typing a table's name followed by
`.list` directly into the filter box — for example `incident.list` — and pressing Enter opens
that table's list view immediately, with no saved module required. The equivalent `.do` suffix
(for example `incident.do`) opens a new, blank form for that table instead of a list. This works
for any table you have access to, including tables that have no module pointing at them at all,
which makes it the tool admins reach for when they need to inspect a table directly rather than
through whatever filtered view a module happens to apply.

## Key terms

| Term | Meaning |
|---|---|
| Application Navigator | The left-side panel used to find and launch modules across the instance |
| Module | A saved link inside an application pointing to a specific list or form configuration |
| Favorites | User-pinned modules for one-click access, bypassing the full application tree |
| Direct-navigation shortcut | Typing `<table>.list` or `<table>.do` into the filter box to jump straight to that table |

## Check yourself

Without looking back: what's the difference between typing `incident.list` and `incident.do`
into the Application Navigator's filter box, and why would an admin use the direct-navigation
shortcut instead of clicking through the Incident application's modules?
