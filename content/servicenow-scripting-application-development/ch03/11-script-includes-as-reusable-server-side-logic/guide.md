# Lesson 11 — Script Includes as Reusable Server-Side Logic

**Chapter 3 · Script Includes · Lesson 11 of 37**

## What you'll learn

- A quick recap of what a Script Include is, from where course 5 left off
- The real lazy-loading behavior that makes Script Includes cheap at scale
- Why an instance can carry thousands of Script Includes with no performance cost from the ones nobody calls
- A preview of the "Accessible from" field — full scoping is Chapter 5's job
- When server-side logic belongs in a Script Include instead of a Business Rule

## Quick recap: what a Script Include is

JavaScript for ServiceNow Developers introduced Script Includes as
reusable server-side JavaScript — functions you write once, in one
place, and call from Business Rules, Client Scripts (via GlideAjax),
other Script Includes, Scripted REST APIs, or background scripts.
That's still true. What that course didn't cover is *how* the
platform actually loads that code, and the real class-based pattern
professional ServiceNow developers write instead of loose functions.
This lesson covers the loading model; Lesson 12 covers the class
pattern itself.

## Lazy loading: code loaded on first use, not on startup

A Script Include's JavaScript is **not** parsed, compiled, or loaded
into server memory when the instance starts up. It's loaded the
moment something actually references it by name — the first time a
Business Rule, Client Script, or another script calls
`new ApprovalUtils()` (or whatever the class is named) during a
transaction. Before that first call, the record in the
`sys_script_include` table is just inert text sitting in the
database, costing nothing.

```javascript
// Defined in sys_script_include, but not loaded into memory
// until a line like this actually executes somewhere:
var utils = new ApprovalUtils();
var canApprove = utils.isApprover(gs.getUserID(), current);
```

That first call triggers the platform to compile the script and cache
it in memory for reuse by later calls in the same node, until the
node's script cache is cleared (a plugin install, an update set
commit, or an instance restart).

## Why this matters: thousands of unused Script Includes cost nothing

Because loading is lazy, a large instance can have thousands of
Script Includes — most of them written for one specific integration,
one specific form, one specific workflow — and the ones nobody is
calling during a given transaction add zero measurable overhead.
This is exactly why experienced developers don't hesitate to factor
logic out into a new, narrowly-scoped Script Include rather than
cramming it into an existing one: there's no "startup tax" for having
more of them. The cost you *do* pay is the first-call compile cost
(tiny) and the ongoing cost of whatever work the method itself does
once called — the same as any other function.

## A preview of "Accessible from"

Every Script Include has an **Accessible from** field with two
values: **All application scopes** or **This application scope
only**. A Script Include built for general-purpose use (string
helpers, date math, approval logic shared across the instance) is
typically set to all scopes. One built as an internal implementation
detail of a single scoped app is typically restricted to that scope,
so other apps can't quietly depend on it and break when it changes.
That's the whole idea at this level — Chapter 5 covers scoped
applications and cross-scope access rules in real depth.

## Key terms

| Term | Meaning |
|---|---|
| Script Include | A reusable block of server-side JavaScript, stored once and callable from many places |
| Lazy loading | A Script Include's code loads into memory only on its first actual call, not at instance startup |
| Script cache | Where a compiled Script Include is held in memory for reuse after that first call |
| Accessible from | The field controlling whether a Script Include is callable from any scope or only its own |

## Check yourself

Without looking back: why can an instance safely carry thousands of
Script Includes that are each used by only one specific form or
integration, with no meaningful performance penalty from the ones
that never get called?
