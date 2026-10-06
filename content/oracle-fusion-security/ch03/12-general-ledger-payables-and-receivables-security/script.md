# Script — General Ledger, Payables and Receivables Security

## Segment 1 (title)

Lesson eleven named the job roles. This lesson is about what their underlying duty roles and data security actually lock down in each module — the privileges deciding whether an accountant can post a journal, approve an invoice, or write off a receivable.

## Segment 2 (steps)

In General Ledger, creating a journal entry and posting it are commonly controlled by different privileges, so a company can staff those two actions differently even though they happen on the same page. A General Accountant typically has entry and basic posting duty roles; period close and higher-risk adjustments are more commonly reserved for the General Accounting Manager. Data security runs through the data access set mechanics from lesson six — an accountant only posts within the ledgers and balancing segments their data access set covers.

## Segment 3 (steps)

Payables separates invoice entry, invoice validation and matching to a purchase order, payment processing, and invoice approval — often gated by an approval limit tied to the invoice amount. Companies often want the person entering an invoice to be different from the person approving it, which is exactly what segregation of duties, in lesson thirteen, is about. Data security here is primarily business unit — an AP Specialist for US Operations can't touch EMEA Shared Services invoices no matter how their job role is set up.

## Segment 4 (steps)

Receivables separates receipt application, adjustments, and write-offs. Write-offs are typically held more tightly than ordinary adjustments, since they directly affect reported revenue. At Castellan Robotics, an AR Specialist can apply receipts and make routine adjustments, but writing off a balance over a defined threshold requires an AR Manager — a deliberate design choice built into which duty roles each job role inherits.

## Segment 5 (outro)

Across all three modules, the same shape repeats: routine entry sits at the specialist level, higher-risk or irreversible actions sit at the manager level, and data security scopes all of it to the ledger or business unit someone's actually responsible for. Up next, lesson thirteen: segregation of duties, where this separation becomes an explicit control.
