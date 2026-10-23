# Lesson 22 — Application File Structure

**Chapter 5 · Scoped Applications · Lesson 22 of 37**

## What you'll learn

- How Studio organizes every customization created inside a scoped application context
- The contrast with how Global-scope customizations sprawl across the instance
- Why that organization is what makes an application exportable as a coherent unit
- How this sets up the real data-model build in Chapter 6

## Everything you build gets filed under the application

Once you're working inside a scoped application context in Studio — the context you entered the
moment you finished Lesson 20's Create Application wizard — every customization you create from
that point forward is automatically organized and tracked under that application's record. Create
a table, and it's filed under the application. Create a Business Rule on that table, a Client
Script, a Script Include, a UI Page — every one of them is automatically associated with the same
application, visible together in Studio's application explorer, without you doing anything extra
to group them.

This isn't a folder you have to remember to file things into. It's automatic, structural behavior
tied to the fact that you're working inside that application's scope. Everything created while
you're in that context belongs to that context.

## Contrast with Global

Compare that to how customizations built in Global scope behave — exactly the kind of
customization this course's earlier chapters had you build, since Chapters 1 through 4 never
required a scoped application to exist. A Business Rule in Global, a Client Script in Global, a
Script Include in Global: each one exists as its own standalone record, with no automatic
grouping tying them together as "the pieces that make up one logical application." An instance
with years of Global customizations accumulated by different admins at different times has no
structural way to answer "which of these hundred Business Rules belong together as one coherent
thing" — you'd have to reconstruct that grouping by hand, from naming conventions or memory or
documentation that may or may not exist.

```javascript
// Global scope: these three customizations have NO structural
// relationship to each other, even if a developer intended them
// to work together as one feature:
//   - Business Rule: "Auto-assign fleet requests"
//   - Script Include: "FleetAssignmentHelper"
//   - UI Page: "fleet_request_status"
// Finding all three later means searching by name or memory.

// Scoped application (x_acme_fleet): these are automatically
// grouped under the same application record the moment they're
// created inside that scope's Studio context — no extra step.
```

## Why this organization matters beyond tidiness

This isn't just a nicer developer experience. The organized, scope-tracked grouping is exactly
what makes an application **exportable and packageable as a coherent unit**. Because Studio
already knows every table, script, and UI artifact that belongs to `x_acme_fleet`, the platform
can treat that whole set as one thing — moving it between instances, publishing it, or sharing it
with another team, without someone having to manually hunt down every piece first.

This course doesn't go deep on packaging and distribution mechanics — that's a topic on its own,
beyond what this course covers — but it's worth understanding the connection: **the same
scope-based organization from Lesson 19 that prevents naming collisions is also what makes an
application a well-defined, movable unit in the first place.** Isolation and packageability are
two outcomes of the same underlying structure, not two unrelated features.

## Setting up Chapter 6

Chapter 6 has you design and build a real custom application's data model: tables, forms, and
modules. Every one of those pieces will be filed under the scoped application you create, visible
together, organized automatically. That's the payoff of this lesson — by the time you're deep in
Chapter 6 creating table after table, you won't be wondering where they're all tracked or how
they relate to each other as an application. Studio already knows.

## Key terms

| Term | Meaning |
|---|---|
| Application explorer | Studio's view showing every customization filed under a given scoped application |
| Scope-tracked organization | Automatic grouping of tables, scripts, and UI artifacts under their owning application |
| Global sprawl | The lack of automatic grouping for customizations built outside any scoped application |
| Packageable unit | An application whose complete, known set of pieces can be exported or distributed as one thing |

## Check yourself

An admin built a Business Rule, a Script Include, and a UI Page in Global scope years ago, meant
to work together as one feature. Why is it harder to export that "application" as a coherent
unit than it would be for the same three pieces built inside a scoped application?
