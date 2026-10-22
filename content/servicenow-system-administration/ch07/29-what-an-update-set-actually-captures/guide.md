# Lesson 29 — What an Update Set Actually Captures

**Chapter 7 · Update Sets & Change Management (Admin View) · Lesson 29 of 36**

## What you'll learn

- What an Update Set (`sys_update_set`) actually is, and what table it lives on
- The precise boundary: configuration/metadata changes vs. regular data record changes
- Real examples of what gets captured: Business Rules, UI Policies, ACLs, dictionary changes, form layouts, Script Includes
- Why a new Incident or a new user never shows up inside an Update Set
- How this connects back to the Instances & Environments lesson from course 2

## The problem Update Sets solve

Course 2's Instances & Environments lesson introduced the standard Development → Test/QA → Production pattern, and mentioned that promotion between instances is "deliberate and tracked, never a silent copy" — without explaining the mechanism. This lesson is that mechanism. An **Update Set** is a container record, stored on the `sys_update_set` table, that collects the individual customizations you make while it's active, so that whole batch of changes can be exported, reviewed, and applied to another instance as one unit.

## What actually gets captured

Every individual change an Update Set records is stored as a row on `sys_update_xml` — a record of exactly what changed, on which table, down to the field level. In practice, that means an Update Set captures things like:

- A new or modified **Business Rule** (the server-side script and its conditions)
- A new or edited **UI Policy** (which fields it shows, hides, or makes mandatory, and when)
- A new or changed **ACL** (which role gets access to a table or field)
- A **dictionary** change — a new field added to a table, a changed field label, a new choice list value
- A **form layout** change — which fields appear on a form and in what order
- A new or edited **Script Include** (reusable server-side script logic)

Every one of these is a change to how the platform is *defined* — its configuration, its metadata, the rules that govern behavior for every record on that table going forward.

## The boundary that trips up new admins

Here is the distinction worth being precise about: an Update Set captures **customizations**, not **data**. If you create a new Incident, add a new user to `sys_user`, or update a Change Request's state from "New" to "Implement," none of that is recorded in your current Update Set — regardless of whether an Update Set is active. Data records live and die entirely within the instance where they were created. Only changes to the system's *definition* — the tables, fields, rules, scripts, and policies that decide how every future record behaves — get swept into `sys_update_xml`.

A useful way to say it: Update Sets move "how the system behaves," never "the data inside it." If you need to move actual data between instances — a list of vendor records, a batch of imported assets — that's a separate job, usually an Import Set or a Data Source, not an Update Set.

## Why this boundary exists

If Update Sets captured every data change too, moving a Business Rule to Production would risk dragging along every test Incident and dummy user created in Dev while building it — exactly the kind of accidental, silent copy the Instances & Environments lesson warned against. By scoping Update Sets strictly to configuration, ServiceNow guarantees that promoting a change to Production only ever changes *behavior*, never floods it with Dev's throwaway data.

## Key terms

| Term | Meaning |
|---|---|
| Update Set | A container record (`sys_update_set`) that collects configuration changes for export and promotion |
| `sys_update_xml` | The table holding each individual captured change inside an Update Set |
| Configuration/metadata | Definitions of system behavior — Business Rules, ACLs, fields, UI Policies, Script Includes |
| Data record | An ordinary record (Incident, user, Change Request) — never captured by an Update Set |

## Check yourself

Without looking back: if an admin creates a new Business Rule and, in the same session, also creates ten test Incidents, which of those changes land in the active Update Set — and why does the other one never show up there no matter what?
