# Security Contexts and Role Assignments

Lessons 6 and 7 introduced two specific security contexts — data access sets and business units — one at a time. This lesson pulls back and gives you the general concept of a **security context**, shows the fuller list of contexts Financials uses, and walks through what a complete role assignment actually looks like end to end.

## What you'll learn

- A precise definition of "security context"
- The main security contexts used across Oracle Fusion Cloud Financials
- What a complete role assignment record contains, field by field
- A worked, end-to-end example at Castellan Robotics Inc.

## What a security context actually is

A **security context** is the specific element of the enterprise structure that a given data security grant is scoped by. It answers "access to *which* dimension am I granting here?" The three-way link Oracle Fusion always requires is **user, role, and data** — and the security context is what names the "data" side of that link precisely enough for the system to enforce it.

## The main contexts in Financials

For Oracle Fusion Cloud Financials, the security contexts you'll encounter most often are:

- **Business Unit** — scopes Payables, Receivables, Procurement, and other transactional data (Lesson 7)
- **Data Access Set** — scopes General Ledger access to ledgers and balancing segment values (Lesson 6)
- **Ledger** — a more direct scoping to a specific ledger, used in some assignment flows
- **Asset Book** — scopes Fixed Assets data to a specific book of assets
- **Control Budget** — scopes budgetary control data to a specific control budget

Each context exists because that's the natural unit the corresponding module organizes its data around — you secure Fixed Assets by asset book because that's how Fixed Assets itself is structured, just as you secure Payables by business unit.

## Anatomy of a role assignment

A complete role assignment, whether made through Manage Data Access for Users or through broader provisioning (Lesson 9), is really four things bound together:

1. **The user** being granted access
2. **The role** that defines what they can do (a job role, usually)
3. **The security context** naming which dimension is being scoped (Business Unit, Data Access Set, etc.)
4. **The context value** — the specific instance of that dimension (e.g., "US Operations," or "East Division Ledger Set")

Change any one of the four and you have a different assignment. A user with the Accounts Payable Specialist role and Business Unit = US Operations has different access than the same user with Business Unit = EMEA Shared Services, even though the role is identical.

## A worked example

At Castellan Robotics Inc., a new accountant, James Okafor, is hired into the General Accounting team covering the East Division. His complete role assignment ends up being: user = James Okafor; role = General Ledger Accountant (a job role); security context = Data Access Set; context value = "East Division Data Access Set" (scoped to that balancing segment value). Every one of those four pieces had to be set correctly — missing the context value, for instance, would leave James with the right job role but no actual ledger data to work with, which circles back to the function-vs-data-security distinction from Lesson 5.

## Key terms

| Term | Meaning |
|---|---|
| Security context | The enterprise-structure dimension a data security grant is scoped by |
| Context value | The specific instance of that dimension in a given assignment |
| Role assignment | The combination of user + role + security context + context value |

## Recap

A security context names which dimension (business unit, data access set, ledger, asset book, control budget) a grant applies to, and a complete role assignment always has four parts: user, role, context, and context value. Next up, Lesson 9: provisioning users and roles, where you'll see how these assignments actually get created.
