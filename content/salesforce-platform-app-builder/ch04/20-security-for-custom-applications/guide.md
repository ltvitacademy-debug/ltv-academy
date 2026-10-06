# Security for Custom Applications

**Chapter 4 · Delivering Applications · Lesson 20 of 24**

Every object and field you've built so far has been wide open to anyone with admin access testing it. A real application needs a deliberate answer to one question, asked over and over: *who should see, edit, or delete this record, and why?* Salesforce's security model answers it in layers, from the object down to the individual field.

## What you'll learn

- The security layers, in the order Salesforce actually checks them
- Object, field, and record-level security, and what each one controls
- Profiles vs. permission sets vs. permission set groups
- A practical model for a new custom application's access

## The layers, outside in

1. **Object-level security** — can this user see the object tab at all, and Create/Read/Edit/Delete on it? Set by **profiles** and **permission sets**. This is the first gate: if object access is off, nothing else matters.
2. **Field-level security (FLS)** — within an accessible object, which specific fields can this user see or edit? Also set by profiles/permission sets. A user can have object access but still have a sensitive field (salary, SSN) hidden entirely.
3. **Record-level security** — of the records this user *could* see based on 1 and 2, which ones do they actually have access to? This is the layer with the most moving parts: **Organization-Wide Defaults (OWD)** set the baseline (Private, Public Read Only, Public Read/Write), the **role hierarchy** grants access upward to managers, and **sharing rules** grant additional access by criteria or ownership (for example, a queue, or "all records owned by the West region role").

## Profiles vs. permission sets vs. permission set groups

A **profile** is the one mandatory baseline every user has exactly one of — it sets object/field access, default page layouts, and login hours/IP ranges. **Permission sets** layer additional access on top, and a user can have many: this is how you grant one extra object's access to a handful of users without cloning an entire profile for them. **Permission set groups** bundle several permission sets into one assignable unit, useful when a role (like "App Builder Beta Tester") needs five permission sets together, consistently. Salesforce's own long-standing guidance is to keep profiles minimal and lean on permission sets for anything beyond the baseline — profiles that accumulate object-specific grants over years become unmaintainable.

## A practical model for a new custom app

When a new custom application ships, a sensible default:

- Set the new objects' **OWD to Private** unless there's a clear reason for broader default visibility
- Grant object and field access through a **dedicated permission set** for the app (not the base profile), so it can be assigned or removed independently of a user's main profile
- Use **sharing rules** for the predictable exceptions (a support queue should see all Cases; a regional manager's role should see their region's records via the role hierarchy)
- Reserve **manual sharing** and **Apex-managed sharing** for the genuinely one-off or programmatically-driven exceptions that criteria-based rules can't express

## Honest limits

Security is layered, not additive in the forgiving sense — a user needs object access *and* field access *and* record access; a gap in any one layer blocks them, even if the other two are wide open. And OWD can only get *stricter* as you look at object relationships (a master-detail child inherits its parent's sharing, it can't be more open than the parent), which is one more reason the object design decisions from Chapter 1 ripple forward into security decisions here.

## SQL mapping

Object/field-level security resembles column-level `GRANT`s; record-level security resembles row-level security policies (`CREATE POLICY ... USING (owner_id = current_user())`), except Salesforce composes OWD, role hierarchy, and sharing rules together rather than a single predicate.

## Recap

Security checks object access, then field access, then record access — in that order, and a gap in any layer blocks the user regardless of the others. Profiles set the mandatory baseline; permission sets and permission set groups layer on top and are the preferred tool for anything app-specific. A new app's default posture: private OWD, a dedicated permission set, sharing rules for predictable exceptions. Next: moving this finished, secured application from a sandbox into production.

## Check yourself

A custom object's OWD is Private. A support rep is not the record owner, not above the owner in the role hierarchy, and has full object and field access on their permission set. Can they see a specific record? What would need to change for them to see it?
