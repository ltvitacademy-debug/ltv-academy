# Lesson 21 — Cross-Scope Access & When It's Allowed

**Chapter 5 · Scoped Applications · Lesson 21 of 37**

## What you'll learn

- Why Script Includes and tables are not reachable across scopes by default
- The "Accessible from" field, and the real difference between its two settings
- Cross-Scope Access Control records (`sys_scope_privilege`), and why they're the preferred mechanism
- How to decide, for a real Script Include, which of the two mechanisms actually fits

## The default: closed, not open

Lesson 19 established that scope isolates naming. It also isolates access. By default, a Script
Include or a table that lives inside one scoped application is **not** reachable from code
running in a different scope — not Global, and not another custom application. This is
deliberate: ServiceNow assumes isolation unless a developer explicitly opens a door, rather than
assuming openness unless someone explicitly locks one. That default matters for security review
and for predictability — nobody auditing an application has to go hunting for hidden access paths
that were never intentionally granted.

There are two real, distinct mechanisms for opening that door when a legitimate cross-scope need
exists. They are not interchangeable, and choosing the wrong one for a given situation is a real
mistake worth understanding, not a stylistic preference.

## Mechanism one: the Script Include's "Accessible from" field

Every Script Include has an **Accessible from** field with two real values:

- **This application scope only** (the default) — only code running inside the same scope as the
  Script Include can instantiate and call it.
- **All application scopes** — any scope on the instance, including Global and every other
  scoped application, can instantiate and call it.

```javascript
// Script Include: BadgeNumberFormatter
// Scope: x_acme_vms
// Accessible from: This application scope only  (the default)

// Only code already running inside x_acme_vms can do this:
var formatter = new x_acme_vms.BadgeNumberFormatter();
var badgeId = formatter.formatBadgeNumber(visitorRecord);
```

Flipping "Accessible from" to **All application scopes** is a broad grant — it opens that one
Script Include's entire API to literally every scope on the instance, with no record of which
scope actually uses it or why. That's exactly why ServiceNow, and this course, treat it as the
mechanism of last resort: fine for a genuinely generic utility with no sensitive logic, risky for
anything that touches data, security decisions, or business logic you'd want to audit later.

## Mechanism two: Cross-Scope Access Control (`sys_scope_privilege`)

The real, auditable, least-privilege mechanism ServiceNow recommends instead is a **Cross-Scope
Access Control** record, stored in the `sys_scope_privilege` table. Each record grants one
specific calling scope permission to reach one specific target — a specific Script Include, a
specific table, or a specific API — in another scope. Nothing broader than that.

```javascript
// Conceptually, a Cross-Scope Access Control record says:
// "Scope x_acme_itsm is granted access to call
//  x_acme_vms.DirectoryLookup, and nothing else in x_acme_vms."

// The calling scope (x_acme_itsm) can now do this:
var lookup = new x_acme_vms.DirectoryLookup();
var employee = lookup.findByBadgeId(badgeId);

// But x_acme_itsm still cannot reach any OTHER Script Include
// or table inside x_acme_vms — only the one explicitly granted.
```

This is the mechanism ServiceNow recommends over broadly opening a Script Include to all scopes,
specifically because it's auditable and least-privilege: anyone reviewing the instance can see
exactly which scope was granted access to exactly what, and why that grant exists, instead of
discovering that something was quietly opened to the entire instance.

## Deciding which mechanism fits

A practical way to decide: ask whether the API is genuinely generic utility code with nothing
sensitive in it (a date formatter, a string sanitizer), or whether it's doing something
specific enough that you'd want a record of exactly who's allowed to call it. Generic utilities
with no sensitive data can reasonably use "All application scopes." Anything else — anything
touching real business data, security-relevant logic, or an API you'd want to trace later — should
get a targeted Cross-Scope Access Control grant instead, naming the specific scope that needs it.

## Key terms

| Term | Meaning |
|---|---|
| Accessible from | A Script Include field controlling whether only its own scope, or all scopes, can call it |
| This application scope only | The default "Accessible from" value — no other scope can call the Script Include |
| All application scopes | A broad "Accessible from" value opening the Script Include to every scope on the instance |
| Cross-Scope Access Control (`sys_scope_privilege`) | A targeted, auditable record granting one specific scope access to one specific target in another scope |

## Check yourself

A core ITSM Script Include needs to be called from one other scoped application, and nowhere
else. Which mechanism should grant that access, and why is it the better choice over simply
setting "Accessible from" to "All application scopes"?
