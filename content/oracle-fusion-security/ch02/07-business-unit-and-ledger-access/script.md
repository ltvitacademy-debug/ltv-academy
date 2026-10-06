# Script — Business Unit and Ledger Access

## Segment 1 (title)

Lesson six covered data access sets, General Ledger's tool for scoping access by ledger. This lesson covers the equivalent idea for the subledgers — Payables, Receivables, and most transactional modules — which scope data primarily by business unit.

## Segment 2 (steps)

A business unit is an organizational unit representing a department or operating unit that processes transactions — US Operations, say, or EMEA Shared Services. It's the primary way Payables and Receivables scope data, because invoices and receipts are naturally created and owned inside a specific business unit. Where General Ledger asks which ledger and which balancing segment, these modules ask which business unit.

## Segment 3 (steps)

Business unit access is granted alongside a job role, through the same Manage Data Access for Users task from lesson six. An administrator specifies the user, the job role like Accounts Payable Specialist, sets the security context to Business Unit, and picks the specific business unit. A user can get more than one if their job spans multiple units. The job role already says what they can do; the business unit assignment says whose invoices they can do it to.

## Segment 4 (steps)

Business units aren't independent of ledgers — each one is associated with a primary ledger for subledger accounting. So business unit access and ledger access describe the same transactions from two angles. At Castellan Robotics, US Operations posts to the Castellan Primary ledger. An AP Specialist with US Operations access can manage invoices there, but a Senior Accountant who also needs to review the resulting journal entries in General Ledger needs a separate grant — a data access set on that ledger. One doesn't carry over into the other.

## Segment 5 (outro)

Business unit access and ledger-level data access sets are related but separate grants. Up next, lesson eight: security contexts and role assignments, where these pieces start fitting together.
