# Script — Supporting References

## Segment 1 (title)

You've covered journal line rules, account rules, mapping sets, and description rules. This lesson covers the last rule type: supporting references, and why Oracle gives journal lines a way to carry information that isn't an account segment at all.

## Segment 2 (steps)

Your Chart of Accounts has a fixed set of segments - Company, Cost Center, Natural Account, maybe a few more - and every one applies to every transaction in the ledger. A supporting reference is different: extra descriptive detail attached to one specific journal line, without needing to become a full segment, like a supplier number on an accrual line.

## Segment 3 (steps)

Why not just make Supplier a segment? Because every account combination in the ledger would carry it, whether the line involves a supplier or not, and it would balloon as the supplier list grows. Supporting references attach detail at the subledger journal level, right where it's actually relevant, without touching the permanent Chart of Accounts structure.

## Segment 4 (steps)

This matters most for third-party control accounts - one GL account, like Accounts Payable Trade, representing what's owed to every supplier combined. The GL balance alone only shows the total. A supplier-number supporting reference on every line lets you later break that one balance down by individual supplier.

## Segment 5 (code)

Picture a three thousand dollar AP accrual line for Meridian Supply Co. It posts to the shared AP Trade account, but carries a supporting reference: Supplier Number 10452. A later reconciliation report groups by that reference, showing exactly how much of the AP Trade balance belongs to Meridian versus everyone else.

## Segment 6 (outro)

So remember: supporting references carry transaction-specific detail without bloating the Chart of Accounts, and they're what makes reconciling shared control accounts possible. That completes chapter two's four rule types. Up next, chapter three, lesson ten: application accounting definitions, the container that bundles everything together.
