# Custom Report Types

**Chapter 2 · Report Management · Lesson 9 of 22**

Every standard report type in Salesforce is a pre-built join someone else decided on: "Opportunities," "Accounts with Contacts," "Cases." Sooner or later a business user asks for a report that none of those combinations can produce — leads with their related campaign history, or accounts that have never logged a single activity. That's the job of a **custom report type**: an admin-built template that defines exactly which objects, relationships, and fields a report is allowed to see.

## What you'll learn

- Why standard report types eventually run out of road
- How to build a custom report type in Setup
- The difference between "must have" and "may or may not have" relationships
- Why the primary object can't be changed once you save
- In Development vs. Deployed, and why that status matters

## Why standard types aren't enough

A standard report type is fixed by Salesforce: it exposes a primary object plus whatever related objects Salesforce decided to wire up, in whatever combinations ship out of the box. That covers the common cases well. It does not cover a custom object you built, a relationship between two standard objects that no standard type exposes, or a report that needs fields from several hops away. When the Fields pane is missing something a user swears should be there, the report type — not the report — is almost always the reason.

## Building one: Setup → Report Types

In Setup, search **Report Types** and click **New Custom Report Type**. You:

1. Pick a **primary object** — the object every row in the report represents. This can't be changed once you save.
2. Give it a unique **display label**, **API name**, and a **description** users will actually read.
3. Pick a **category**, so the report type shows up where users expect to find it.
4. Choose a status: **In Development** (hidden from everyone except admins with Manage Custom Report Types, for testing) or **Deployed** (visible to anyone with access).

## The relationship choice

If you add a related object, Salesforce asks how the two should relate:

- **Each "A" must have a related "B"** behaves like an inner join — only primary records that have at least one matching related record show up.
- **"A" records may or may not have a related "B"** behaves like a left join — every primary record shows up, related fields blank where there's no match.

That second option is what makes custom report types uniquely useful: it's how you build "accounts with no opportunities" or "leads nobody has called," which no standard type can do.

## Field layout and deploying

The **Edit Layout** screen controls which fields every report built on this type can use. Drag fields from the Fields panel into sections, rename sections, hide ones you don't want cluttering the report builder, and use **Lookup Fields** to pull in fields from objects outside the type's core relationship. Once it looks right, flip the status to **Deployed** so report builders across the org can actually select it.

## Recap

- Custom report types exist for object combinations standard types don't cover.
- The primary object is permanent once saved — everything else (fields, related objects, layout) can be revisited later.
- "Must have" vs. "may or may not have" is the inner-join/left-join choice that decides whether records with no related data show up.
- Keep a type **In Development** while testing it, then **Deploy** it when it's ready for everyone.

## Check yourself

A sales manager wants a report listing every account that has never had an opportunity created against it. Which relationship setting makes that possible, and why would the more restrictive option fail to show those accounts at all?
