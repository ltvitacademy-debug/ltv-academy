# Lesson 4 — Security Model

**Chapter 1 · Design · Lesson 4 of 25**

## What you'll learn

- The four distinct user types at Solstice and what each one must and must not see
- How org-wide defaults, role hierarchy, sharing rules, and permission sets combine into one security model
- The specific OWD and sharing decisions for every object in this platform's data model
- Why permission sets and permission set groups — not profiles — carry most of this model's object access

## Four user types, four different views of the same data

Solstice's platform has to serve four kinds of users on the same records, each needing a different slice of visibility:

| User type | Needs to see |
|---|---|
| **Sales Rep** | Their own Accounts, Contacts, and Opportunities; not other reps' open pipeline |
| **Service Agent** | Cases, Installation Jobs, and Warranty Claims across the team, to triage and reassign work |
| **Technician** | Only the Installation Jobs assigned to them |
| **Sales/Service Manager** | Everything their direct and indirect reports can see, via the role hierarchy |

This is a textbook case for Salesforce's standard security layering: **organization-wide defaults (OWD)** set the strictest baseline, **role hierarchy** opens visibility upward to managers, **sharing rules** open specific, named exceptions across those boundaries, and **permission sets** grant the object- and field-level access each user type needs beyond their profile's baseline.

## Org-wide defaults, object by object

| Object | OWD | Why |
|---|---|---|
| Account / Contact | Public Read Only | Both sales and service need to find the customer; only the owning rep should edit |
| Opportunity | Private | Pipeline value is sensitive; reps shouldn't see each other's deals |
| Case | Private | Service Agents triage via sharing rules and role hierarchy, not blanket visibility |
| `Installation_Job__c` | Controlled by Parent (Case) | A job is only ever visible to whoever can already see its Case |
| `Warranty_Claim__c` | Private | Claim amounts and manufacturer decisions are sensitive, access is explicit |
| `Service_Contract__c` | Controlled by Parent (Account) | A contract's visibility should always match its Account's |

## Role hierarchy

Solstice's hierarchy has the VP of Sales and Service at the top, branching into a Sales Manager line and a Service Manager line, each with reps/agents/technicians beneath them. Role hierarchy in Salesforce automatically grants a user read access (and, depending on the OWD, read/write) to every record owned by someone below them in the hierarchy — which is exactly how Renata and the two managers get the broad visibility a Private OWD would otherwise block, without a single manual sharing rule.

## Sharing rules: the two specific exceptions

Role hierarchy and OWD aren't enough on their own, because Sales and Service are parallel branches, not one above the other — a Service Manager isn't above a Sales Rep in the hierarchy, so hierarchy alone wouldn't give Service any visibility into Opportunities. This capstone adds exactly two criteria-based sharing rules to close that gap:

1. **Opportunities where Stage = "Closed Won"** are shared **Read Only** with the Service Agent role, so Service can see what was actually sold once it becomes their job to install and support it.
2. **Cases where Asset is populated** are shared **Read/Write** with the Sales Rep role, so a rep can check on an open service issue affecting their account relationship without being able to see every Case in the org.

## Profiles, permission sets, and permission set groups

Four custom profiles (Sales Rep, Service Agent, Technician, Sales/Service Manager) set the baseline object and tab access each user type needs day to day. The finer-grained, add-on access is deliberately kept out of the profiles and granted through permission sets instead, because a profile is one-per-user and hard to combine, while permission sets stack:

- **`Warranty_Claim_Submitter`** — object and field-level access to create and edit `Warranty_Claim__c`, assigned to Service Agents who actually file claims.
- **`Technician_Mobile_Access`** — read/edit access to `Installation_Job__c` plus the fields the Lesson 12 Lightning Web Component needs, assigned to the Technician profile.

A **permission set group** called **Service Agent Bundle** then combines `Warranty_Claim_Submitter` with any future service-side permission sets into one assignable unit, so a new Service Agent gets the full, correct set of access in one assignment instead of several separate ones a hiring admin could forget.

## Key terms

| Term | Meaning |
|---|---|
| Organization-wide default (OWD) | The baseline, most-restrictive access level for an object before role hierarchy or sharing opens it up |
| Role hierarchy | A structure that grants users read (or read/write) access to records owned by anyone below them |
| Criteria-based sharing rule | A rule that shares records matching specific field criteria with a target role or group |
| Permission set | A stackable, assignable unit of object- and field-level access beyond a user's profile |
| Permission set group | A bundle of permission sets assigned to a user as one unit |

## Lab

Write out the full security matrix for this platform: a table with the six objects down the side and the four user types across the top, marking each cell None/Read/Edit based on OWD, role hierarchy, and the two sharing rules above. Flag any cell where you had to add a sharing rule or permission set to get the access right — that's your evidence this model isn't just "make everything public."

## Check yourself

- Why is Case's OWD Private even though Service Agents need broad visibility into Cases?
- What problem do the two criteria-based sharing rules solve that role hierarchy can't?
- Why does `Warranty_Claim_Submitter` access live in a permission set instead of directly on the Service Agent profile?
