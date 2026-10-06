# Script — Payment and Accounting

## Segment 1 (title)

Meridian's invoice matched cleanly. Two steps remain before the money side of this transaction is finished: validating and accounting the invoice, and actually paying Meridian.

## Segment 2 (steps)

Validation is a broader check beyond matching - confirming there's no hold of any kind, whether a tax issue, a missing field, or a budgetary control failure. An invoice with any unresolved hold can't be accounted or paid. Meridian's invoice passes cleanly.

## Segment 3 (steps)

Accounting the invoice debits the same uninvoiced receipts accrual account the receipt credited back in lesson eighteen, and credits accounts payable. That's the step that turns a generic accrual into a specific liability owed to Meridian, by invoice number.

## Segment 4 (steps)

Payment doesn't happen one invoice at a time. A Payment Process Request selects a batch of eligible invoices - by due date, supplier, or payment method - and pays them all together in a regular payment run. Meridian's invoice joins whatever else is due around the same time.

## Segment 5 (outro)

Payment terms like net thirty set the due date, and an early payment discount, if one exists, can reduce what LTV actually pays by settling within the discount window. Up next, lesson twenty-one: following this transaction's accounting the rest of the way into the General Ledger.
