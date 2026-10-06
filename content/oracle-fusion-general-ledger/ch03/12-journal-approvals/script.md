# Script — Journal Approvals

## Segment 1 (title)

Not every journal needs a human to sign off on it. Chapter three starts with how Oracle Fusion decides whether a journal needs approval at all, and who it routes to when it does.

## Segment 2 (steps)

Journal approval runs on the same workflow engine used elsewhere in Fusion Financials. Approval rules evaluate a journal's own attributes — ledger, source, category, amount, account combination, preparer — to decide if and how it routes. A rule might require approval only for manual journals over ten thousand dollars, while routine system-generated journals need none at all.

## Segment 3 (steps)

Rules can route three ways. Single sends it to one user, group, or role — any one person in a group can approve. Parallel sends it to several people at once, and everyone has to approve, which is how a batch spanning multiple lines of business gets sign-off from each controller. Serial routes through people one after another, most commonly a supervisory chain.

## Segment 4 (code)

Here's what that looks like in practice: a forty-five-thousand-dollar manual payroll accrual matches a rule requiring approval above ten thousand, and routes serially through a supervisory chain. Stage one, the preparer's manager, has already approved. Stage two, the controller, is where the journal sits right now.

## Segment 5 (outro)

Rules themselves get configured in the Business Process Management Worklist application, though Oracle also offers a simplified spreadsheet-based option for straightforward rule sets. And once a journal's submitted, Manage Journal Approvals shows exactly where it stands. Next up, lesson thirteen: importing journals with FBDI.
