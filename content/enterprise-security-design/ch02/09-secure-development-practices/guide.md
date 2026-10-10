# Lesson 9 — Secure Development Practices

**Chapter 2 · Applying Security Architecture · Lesson 9 of 15**

## What you'll learn

- Why custom Apex and Lightning Web Components can silently bypass the authorization layers built in earlier lessons, if written carelessly
- The `with sharing` / `without sharing` / `inherited sharing` distinction, and why it matters for reused code
- Why Apex does not enforce object and field-level security by default, and the mechanisms that do
- SOQL injection and how it differs from the SQL injection most developers already know about
- A short, practical checklist an architect can hold code reviews against

## Custom code sits inside the platform's security model — unless it's told not to

Chapter 1 built up a picture of boundaries, least privilege, and defense in depth largely in terms of platform-native configuration: profiles, sharing rules, field-level security. Custom code — Apex classes, triggers, Lightning Web Components calling Apex controllers — runs *inside* that same org, and the critical design question for an architect is whether that code respects the authorization layers already in place, or quietly steps around them.

## Sharing keywords: with, without, and inherited

**`with sharing`** is an Apex class keyword that enforces the running user's record-sharing rules inside that class's logic — queries and DML inside it respect Org-Wide Defaults, role hierarchy, and sharing rules exactly as if the user were clicking through the UI. **`without sharing`** does the opposite: code in that class runs with the system's full access to records, ignoring sharing rules entirely, regardless of who's running it.

A third keyword, **`inherited sharing`**, exists specifically for reusable utility classes. A class declared this way runs in `with sharing` mode whenever it's the actual entry point into Apex — called directly from an `@AuraEnabled` method on a Lightning Web Component, a Visualforce controller, or an Apex REST service — but runs `without sharing` only if it's explicitly called from a context that was already `without sharing`. That gives a shared utility class a sensible, safe default no matter who ends up calling it later, instead of silently taking on whatever sharing mode happened to be in effect. A class declared plain `without sharing` for a legitimate original reason (a nightly batch job that needs to process every record regardless of sharing) but then reused months later from an unrelated feature, without anyone revisiting that decision, is a real, recurring way for record-level authorization to get silently bypassed by code nobody threat-modeled against that specific reuse.

## Apex does not enforce CRUD/field-level security by default

This is the detail that catches people off guard: sharing and CRUD/field-level security (FLS) are two *separate* checks, and `with sharing` only controls the first one. By default, Apex runs in system context — a SOQL query or DML statement will succeed even if the running user's profile doesn't actually have access to the object or field involved at all. `with sharing` restricts which *records* are visible; it says nothing about whether the user is allowed to touch a given object or field in the first place.

Enforcing CRUD/FLS has to be done deliberately, using one of several real mechanisms: `WITH USER_MODE` (or the `AccessLevel.USER_MODE` parameter on DML and queries), `WITH SECURITY_ENFORCED` in SOQL, explicit `isAccessible()` / `isCreateable()` / `isUpdateable()` checks before a sensitive operation, or `Security.stripInaccessible()` to strip out fields a user shouldn't see or write before they're exposed or committed. An architect reviewing code that touches a sensitive object should expect to see one of these mechanisms in use — not assume the platform is already handling it just because the class happens to be `with sharing`.

## SOQL injection: the platform-specific cousin of SQL injection

Developers who already know **SQL injection** — building a query by concatenating untrusted user input directly into a query string, letting an attacker alter the query's logic — need to recognize Apex has the same category of risk under its own name: **SOQL injection**. If a search or filter feature builds a SOQL query string by concatenating raw user input (say, from a Lightning component's search box) instead of using bind variables, a malicious input string can change what the query actually returns or does. The fix is the same shape as the SQL world's fix: use bind variables (`:variableName`) instead of string concatenation, and when dynamic SOQL genuinely can't be avoided, escape user input properly (Apex provides `String.escapeSingleQuotes()` for this), though bind variables remain the preferred approach wherever the query structure allows it.

## A practical secure-code-review checklist

An architect doesn't need to personally read every line of every Apex class in a large org, but a design review (and the kind of review board covered in Lesson 11) should be able to ask, for any piece of custom code touching sensitive data:

- Is the sharing behavior (`with sharing`, `without sharing`, `inherited sharing`) deliberate and documented, not just whatever the original developer happened to type?
- Does the code explicitly enforce CRUD/FLS (`WITH USER_MODE`, `WITH SECURITY_ENFORCED`, explicit checks, or `stripInaccessible()`) for operations on sensitive objects, especially where `without sharing` or elevated context is in play?
- Does any dynamic SOQL use bind variables rather than string concatenation of user input?
- Does any Lightning Web Component expose an Apex method (`@AuraEnabled`) more broadly than it needs to, and does that method independently validate what it's being asked to do rather than trusting the client?
- Is sensitive data ever written to debug logs, which may be visible to a broader audience than the data's normal access controls would allow?

## Key terms

| Term | Meaning |
|---|---|
| With sharing | Apex class keyword enforcing the running user's record-sharing rules inside that class |
| Without sharing | Apex class keyword running with full system record access, ignoring sharing rules |
| Inherited sharing | Keyword giving a reusable class a safe with-sharing default at entry points, while still honoring an already-without-sharing caller |
| CRUD/FLS enforcement | Object and field-level permission checks, which Apex does not apply by default and must be added explicitly (USER_MODE, SECURITY_ENFORCED, explicit checks, stripInaccessible) |
| SOQL injection | Building a SOQL query from unescaped/unbound user input, letting an attacker alter query behavior |
| Bind variable | A `:variableName` reference in SOQL that safely substitutes a value instead of concatenating raw text |

## Lab

A developer writes an Apex class marked `without sharing` so that a nightly batch job can process every Case in the org regardless of sharing rules — a legitimate original reason. Eighteen months later, a different developer calls a method from that same class directly from a new Lightning Web Component feature, to let a support agent search Cases from a custom UI. Explain, step by step, what authorization gap this reuse creates, and propose two different fixes that would close it without breaking the original nightly batch job's need. (Consider whether `inherited sharing` would have prevented this gap from being introduced in the first place.)

## Check yourself

Can you explain, from memory, what `with sharing` actually enforces, and why it's a different check from CRUD/field-level security? Can you describe, in your own words, what SOQL injection is and the specific code-level fix that prevents it?
