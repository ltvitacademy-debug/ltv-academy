# Business Unit and Ledger Access

Lesson 6 covered data access sets, General Ledger's tool for scoping access by ledger and balancing segment. This lesson covers the equivalent idea for the subledgers — Payables, Receivables, and most other transactional modules — which scope data primarily by **business unit**.

## What you'll learn

- Why business units are the primary data security dimension for subledgers
- How business unit access gets assigned to a user
- How ledger and business unit scoping relate to each other in one company
- A worked example tying both mechanisms together

## Business units as a security boundary

A **business unit** is an organizational unit in Oracle Fusion's enterprise structure representing a department, function, or operating unit that processes transactions — "US Operations" or "EMEA Shared Services," for example. Business units are the primary way Payables, Receivables, Procurement, and several other transactional areas scope data security, because invoices, receipts, and purchase orders are naturally created and owned within a specific business unit.

Where General Ledger asks "which ledger and which balancing segment," Payables and Receivables instead ask "which business unit." A user assigned to the US Operations business unit sees US Operations invoices; a user assigned to EMEA Shared Services sees EMEA Shared Services invoices — regardless of which ledger those business units ultimately post to.

## How business unit access gets assigned

Business unit access is granted to a user alongside a job role, through the same **Manage Data Access for Users** task introduced in Lesson 6 (hands-on practice comes in Lesson 8). An administrator specifies the user, the job role (such as **Accounts Payable Specialist**), and the security context — set to **Business Unit** — with the specific business unit's name as the value. A user can be assigned access to multiple business units if their job spans more than one.

This is functionally the data-security half of the equation: the job role (from Lesson 3) already determined what the user can do (create invoices, approve them, and so on); the business unit assignment determines which company's invoices they can do it to.

## How business unit and ledger scoping relate

A business unit isn't independent of the ledger structure — each business unit is associated with a primary ledger (and, through that ledger, a chart of accounts and calendar) for the purpose of subledger accounting. That means business unit access and ledger access describe the same underlying transactions from two different angles: a Payables invoice lives inside a business unit, but once it's accounted for, it posts into a ledger that the General Ledger-side data access set (Lesson 6) also governs.

A worked example: at Castellan Robotics Inc., the US Operations business unit posts to the Castellan Primary ledger. An AP Specialist with access to the US Operations business unit can create and manage invoices there. A Senior Accountant who also needs to review the resulting journal entries in General Ledger needs a *separate* grant — a data access set covering the Castellan Primary ledger — because business unit access alone does not carry over into General Ledger visibility.

## Key terms

| Term | Meaning |
|---|---|
| Business unit | An organizational unit that processes transactions, the primary data security dimension for Payables/Receivables |
| Manage Data Access for Users | The task used to assign business unit (or ledger) access to a user and role |
| Security context | The dimension being secured — e.g., Business Unit, Data Access Set, Ledger |

## Recap

Payables and Receivables scope data security primarily by business unit, assigned per user/role through Manage Data Access for Users. Business unit access and ledger-level data access sets describe related but separate grants — having one doesn't automatically grant the other. Next up, Lesson 8: security contexts and role assignments, where you'll see how all these security contexts fit together.
