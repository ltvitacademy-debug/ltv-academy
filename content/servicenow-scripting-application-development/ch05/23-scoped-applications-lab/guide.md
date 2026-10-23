# Lesson 23 — Scoped Applications Lab

**Chapter 5 · Scoped Applications · Lesson 23 of 37**

## What you'll learn

- How to apply Lessons 19–22 to one real application scenario, start to finish
- How to name tables correctly inside a new scope
- How to decide, for two different Script Includes, which access mechanism each one needs
- How to connect naming, access, and file structure into one coherent design decision

## The scenario

You're building a new application for Acme Corp: **Visitor Management**, which tracks visitors
checking in at corporate offices, prints badges, and logs each visit. You've just finished the
Studio wizard from Lesson 20 and created the application with:

- **Scope ID (Name):** Visitor Management
- **Scope identifier:** `x_acme_vms`
- **Version:** `1.0.0`

You chose `x_acme_vms` deliberately, following the naming convention from Lesson 20 —
`x_<vendor>_<short-name>` — knowing it's permanent the moment the application is saved.

## Step 1 — Naming the tables that will live in this scope

Visitor Management needs two tables: one for each visitor's profile information, and one logging
each individual visit (check-in and check-out time, host employee, badge number issued). Applying
Lesson 19's naming convention, you name them in Studio as "Visitor" and "Visit Log." ServiceNow
automatically produces their real, scope-prefixed names:

```javascript
// Table: "Visitor"   -> real name:
x_acme_vms_visitor

// Table: "Visit Log" -> real name:
x_acme_vms_visit_log

// A Business Rule script running on the Visit Log table
// refers to fields the normal way, since current is already
// scoped to the table it's running on:
(function executeRule(current, previous) {
    if (current.check_out_time.changes()) {
        current.visit_duration_minutes =
            gs.dateDiff(current.check_in_time, current.check_out_time, true);
    }
})(current, previous);
```

Notice that nothing in this Business Rule script explicitly types `x_acme_vms_visit_log` — the
scope prefix lives in the real table name, not in every line of every script that touches it.
That's the naming isolation from Lesson 19 doing its job quietly: this script would work
identically if some other scope also had a table a developer called "Visit Log," because the two
tables' real names never collide.

## Step 2 — Deciding access for the badge-number utility Script Include

Visitor Management needs a Script Include, `BadgeNumberFormatter`, that takes a visitor record and
generates a formatted badge number string (something like `VIS-2026-00482`). Nothing outside
Visitor Management has any legitimate reason to call this — it's purely internal formatting logic
for this one application's own badges.

```javascript
// Script Include: BadgeNumberFormatter
// Scope: x_acme_vms
// Accessible from: This application scope only   <- the right call here

var BadgeNumberFormatter = Class.create();
BadgeNumberFormatter.prototype = {
    initialize: function() {},

    formatBadgeNumber: function(visitorGR) {
        var year = new GlideDateTime().getYear();
        var seq = visitorGR.getValue('sys_id').substring(0, 5);
        return 'VIS-' + year + '-' + seq.toUpperCase();
    },

    type: 'BadgeNumberFormatter'
};
```

You leave **Accessible from** at its default, **This application scope only**. There's no
legitimate caller outside `x_acme_vms`, so there's no reason to widen access — doing so would be
an unnecessary, unaudited grant to the entire instance for a Script Include that nothing else
should ever need to touch. This is the straightforward case from Lesson 21: no cross-scope need,
default wins.

## Step 3 — Deciding access for the company directory lookup

Visitor Management also needs a `DirectoryLookup` Script Include that looks up an employee by
badge ID or name, to find the "host" an arriving visitor is there to see. It turns out this same
lookup logic is also genuinely needed by the core ITSM scope (`x_acme_itsm`), which wants to
resolve an employee's manager chain for unrelated ITSM ticket-routing logic.

This is a real cross-scope need, so the badge-utility's "leave it closed" answer doesn't apply
here. The two real options from Lesson 21 are: open `DirectoryLookup`'s "Accessible from" to **All
application scopes**, or grant a targeted **Cross-Scope Access Control** record to `x_acme_itsm`
specifically. Because `DirectoryLookup` touches real employee data — not a harmless formatting
utility — the better choice is the targeted grant:

```javascript
// Script Include: DirectoryLookup
// Scope: x_acme_vms
// Accessible from: This application scope only   (left at default)

// Cross-Scope Access Control record (sys_scope_privilege):
//   Target scope:   x_acme_vms
//   Target API:     DirectoryLookup
//   Caller scope:   x_acme_itsm
//   (grants x_acme_itsm, and only x_acme_itsm, permission
//    to call this one Script Include)

var lookup = new x_acme_vms.DirectoryLookup();
var employee = lookup.findByBadgeId(badgeId);   // callable from x_acme_itsm
```

This keeps `DirectoryLookup` closed to the rest of the instance by default, while giving the one
legitimate caller exactly the access it needs — auditable, least-privilege, and reversible if
`x_acme_itsm` ever stops needing it, without touching `DirectoryLookup`'s own configuration at all.

## Step 4 — Why this all stays organized automatically

Every piece built in this lab — the `Visitor` and `Visit Log` tables, the `BadgeNumberFormatter`
and `DirectoryLookup` Script Includes, and the Cross-Scope Access Control record connecting
`x_acme_itsm` to one of them — is automatically filed under the `x_acme_vms` application in
Studio's application explorer, exactly as Lesson 22 described. Nobody has to manually group these
pieces together as "the Visitor Management application." Studio already knows, because everything
was created inside that scope's context.

## Putting it together

This lab's three decisions map directly onto the chapter's three real mechanisms: a naming
convention that prevents collisions no matter what any other scope calls its tables, a default
that keeps access closed unless there's a real reason to open it, and a targeted grant when that
real reason exists — all automatically organized into one coherent, exportable application.

## Key terms

| Term | Meaning |
|---|---|
| Scope-prefixed table name | The real name (`x_acme_vms_visitor`) ServiceNow generates from a table's display name and its scope |
| Default-closed access | The baseline assumption that cross-scope access must be explicitly granted, not assumed |
| Targeted Cross-Scope grant | A `sys_scope_privilege` record naming one caller scope and one specific target API |
| Application explorer grouping | Automatic filing of every artifact created inside a scope's Studio context under that application |

## Check yourself

Why was it correct to leave `BadgeNumberFormatter`'s "Accessible from" at its default, while
`DirectoryLookup` needed a targeted Cross-Scope Access Control grant instead of simply being
opened to all scopes — even though both are Script Includes inside the same application?
