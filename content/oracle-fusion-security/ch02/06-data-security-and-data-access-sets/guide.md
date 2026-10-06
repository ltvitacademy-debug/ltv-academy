# Data Security and Data Access Sets

Chapter 1 defined data security in general terms. Chapter 2 is about the specific mechanics Oracle Fusion Financials uses to scope data — starting with the tool that controls access to ledgers: the data access set.

## What you'll learn

- A closer look at data security policies as database-level rules
- What a data access set is and what it secures
- How a data access set can restrict access below the full ledger, down to balancing segment values
- How data access sets connect to the General Ledger job roles you'll study in Chapter 3

## Data security policies, one level more concrete

Recall from Lesson 5 that a data security policy pairs a condition with a set of allowed actions on a resource, attached to a role. Concretely, a condition is often implemented as a SQL WHERE clause-style filter — for example, "rows where BUSINESS_UNIT_ID = this user's assigned business unit." When a role carrying that policy is provisioned to a user, the filter applies automatically every time that user queries the underlying business object. The user never sees or writes the filter; it's enforced transparently by the application.

## Data access sets: scoping ledgers

A **data access set** is the specific mechanism Oracle Fusion General Ledger uses to secure access to one or more ledgers or ledger sets. Every ledger, when created, automatically gets a data access set that grants full read-and-write access to the entire ledger — but an implementation can define narrower data access sets that restrict a user to:

- A single ledger or a defined ledger set (a grouping of ledgers)
- Read-only vs. read-and-write access
- **Primary balancing segment values** within a ledger — for example, restricting a user to only the "100 - East Division" balancing segment value, rather than every division in the ledger

That last point matters in practice. At Castellan Robotics Inc., the ledger covers the whole company, but a regional controller for the East Division should only ever see East Division transactions and balances. Rather than building a separate ledger for each division, Castellan assigns that controller a data access set scoped to the East Division's balancing segment value — one ledger, selectively visible.

## How a data access set gets attached to a user

A data access set isn't provisioned on its own; it's associated with a role (frequently a data role, as introduced in Lesson 3) or directly assigned to a user for a General Ledger-specific job role through **Manage Data Access for Users**, which you'll use hands-on in Lesson 8. The practical effect: a General Ledger Accountant job role plus a specific data access set together determine exactly which ledger(s) and which balancing segment values that accountant can work with.

## Why this is General Ledger's answer to data scoping

Where Payables and Receivables primarily scope data through business unit assignment (Lesson 7), General Ledger primarily scopes data through data access sets. Both are applications of the same underlying data security policy mechanism — they just use different dimensions (business unit vs. ledger/balancing segment) because that's how each subledger's data is naturally organized.

## Key terms

| Term | Meaning |
|---|---|
| Data security policy | A condition plus allowed actions on a resource, attached to a role (recap from Lesson 5) |
| Data access set | The mechanism securing access to one or more ledgers, down to balancing segment values |
| Manage Data Access for Users | The task used to assign data access, covered hands-on in Lesson 8 |

## Recap

A data access set is General Ledger's specific tool for scoping data security: it can grant a full ledger, a ledger set, or narrow a user down to specific balancing segment values, as read-only or read-write. Next up, Lesson 7: business unit and ledger access — the equivalent concept applied to Payables and Receivables.
