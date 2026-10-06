# Script — Role Design for a Real Company

## Segment 1 (title)

Chapter three has covered financials job roles, the duty roles beneath them, segregation of duties, and reporting. This lesson pulls it all together into one worked exercise: designing security for a small finance department at Castellan Robotics, end to end.

## Segment 2 (steps)

Castellan Robotics' US Operations finance team has four people. Priya Nair, the Controller, oversees the team and approves high-value transactions. Marcus Webb, Senior Accountant, posts journal entries but can't approve his own. Dana Ferreira, AP Lead, enters and matches invoices but can't approve payments. Tom Aldeen, AR Lead, applies receipts and routine adjustments but can't write off balances.

## Segment 3 (steps)

Mapping people to seeded job roles first: Priya gets General Accounting Manager, AP Manager, and AR Manager. Marcus gets General Accountant. Dana gets Accounts Payable Specialist. Tom gets Accounts Receivable Specialist. No custom roles needed — every requirement matches a seeded role already. Then each role needs a security context and value: data access sets and business unit, scoped to US Operations throughout.

## Segment 4 (steps)

Checking for SoD conflicts: Marcus's General Accountant role includes basic posting, but the brief says he can't approve his own entries — that's enforced with an approval workflow rule layered on top, not by stripping his posting duty role entirely. Dana's AP Specialist role doesn't include payment approval, which stays with Priya. Tom's AR Specialist role doesn't include write-offs, for the same reason from lesson twelve. No unresolved conflicts.

## Segment 5 (outro)

The repeatable checklist: list real responsibilities, map to seeded roles first, assign data access deliberately, check for SoD conflicts before provisioning, and document anything accepted. Chapter three is complete. Up next, chapter four and lesson sixteen: requesting and approving access.
