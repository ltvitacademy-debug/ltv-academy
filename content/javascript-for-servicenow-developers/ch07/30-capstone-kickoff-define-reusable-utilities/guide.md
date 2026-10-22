# Lesson 30 — Capstone Kickoff: Define Reusable Utilities

**Chapter 7 · Capstone: a Reusable Script Include Library · Lesson 30 of 32**

## What you'll learn

- A real, recognizable team problem: the same three bits of logic rewritten across Business Rules and Client Scripts
- Why a Script Include is the right fix, and how to plan one before writing a line of implementation
- How to sketch method signatures first, the way a senior developer reviews a design before code
- Which of your three planned methods needs to be client-callable, and why that decision shapes the whole class

## The problem: the same logic, copied three times

Picture your team's ServiceNow instance six months in. A Business Rule on
`incident` checks whether the assigned user belongs to the Network group
before auto-routing a ticket. A different Business Rule on `change_request`
checks group membership too, with its own copy of the same GlideRecord
query, written by a different developer, slightly differently. A Client
Script formats a due date for display in a UI message. Another script,
on a different table, does the same date formatting again, with a subtly
different result. A third script reads a reference field's display value
defensively, in case the field is empty — and a fourth script skips that
check and throws an error in production.

None of this logic is hard. Chapter 3 taught you GlideRecord queries,
Chapter 2 taught you date handling, and you already know how reference
fields return sys\_ids instead of display text. The problem isn't
difficulty — it's duplication. Three small pieces of logic, copied into
five or six places, each copy drifting slightly from the others over
time. The fix is the same one every language eventually teaches you:
write it once, in one reusable place, and call it from everywhere else.
On the ServiceNow platform, "one reusable place" usually means a
**Script Include**.

## Planning before implementing

Before writing a single working line, a senior developer sketches *what*
the class will expose — its public method signatures — and only after
that settles down, fills in *how* each method works. This capstone
builds one Script Include, which we'll name `TaskUtils`, with three
planned methods:

```javascript
// TaskUtils — planned public methods (Lesson 30: signatures only)

// 1. isUserInGroup(userId, groupName)
//    Returns true/false. Replaces copy-pasted group-membership
//    GlideRecord queries scattered across Business Rules.

// 2. formatDueDate(glideDateTime)
//    Returns a display-ready string, flagging overdue dates.
//    Replaces inconsistent date formatting in multiple scripts.

// 3. getReferenceDisplayValue(gr, fieldName)
//    Safely returns a reference field's display value, or an
//    empty string if the field doesn't exist or isn't set.
```

Naming the methods now, before implementing them, is deliberate: it
forces you to decide what each one takes in and returns *before* you're
distracted by GlideRecord syntax. `isUserInGroup` takes a user's sys\_id
and a group name and returns a Boolean — nothing fancier. `formatDueDate`
takes a `GlideDateTime` object (not a raw string) and returns a string.
`getReferenceDisplayValue` takes a `GlideRecord` and a field name and
returns a string, defensively.

## The class skeleton

A Script Include starts life as a plain JavaScript "class" built with
ServiceNow's `Class.create()` helper — the same pattern Chapter 4 used
when you first built a Script Include for GlideAjax. Here is the empty
shell this capstone starts from:

```javascript
var TaskUtils = Class.create();
TaskUtils.prototype = {
  initialize: function() {},

  isUserInGroup: function(userId, groupName) {
    // Lesson 31 implements this with a GlideRecord query
    // against sys_user_grmember.
  },

  formatDueDate: function(glideDateTime) {
    // Lesson 31 implements this using GlideDateTime methods
    // from Chapter 2.
  },

  getReferenceDisplayValue: function(gr, fieldName) {
    // Lesson 31 implements this defensively, checking the
    // field exists before reading it.
  },

  type: 'TaskUtils'
};
```

`type: 'TaskUtils'` at the bottom is required on every Script Include
built this way — it's how ServiceNow's internal class system identifies
the prototype. Every method above is a stub for now; nothing runs yet.

## One decision to carry into Lesson 31: client-callable or not?

Chapter 4 taught you that a Client Script can never talk to the server
directly — it needs GlideAjax, and GlideAjax can only call a Script
Include that extends `AbstractAjaxProcessor` with the "Client callable"
checkbox ticked. Of this capstone's three methods, only one realistically
gets called from client-side code: a Client Script might want to check
group membership before showing a UI message (`isUserInGroup`). The other
two — `formatDueDate` and `getReferenceDisplayValue` — are naturally
server-side helpers, called from Business Rules and other Script Includes
that already have a `GlideRecord` or `GlideDateTime` object in hand.

That means `TaskUtils` needs to support **both** calling styles at once:
plain server-side method calls, and one client-callable entry point for
`isUserInGroup`. Lesson 31 shows exactly how one Script Include does both
by extending `AbstractAjaxProcessor` and adding a thin client-callable
wrapper method alongside the real logic.

## Key terms

| Term | Meaning |
|---|---|
| Method signature | A method's name, its parameters, and what it returns — planned before implementation |
| `Class.create()` | ServiceNow's helper for defining a Script Include as a prototype-based class |
| `type` property | The required string at the bottom of a Script Include identifying its class name |
| Client-callable | A Script Include method flag required before GlideAjax can invoke it from a Client Script |
| Stub | A method defined with a signature but no working implementation yet |

## Check yourself

Before moving to Lesson 31, make sure you can answer this without
looking back: why does `isUserInGroup` need to be reachable from a
Client Script, while `formatDueDate` and `getReferenceDisplayValue`
don't — and what does that difference mean for how `TaskUtils` needs
to be structured?
