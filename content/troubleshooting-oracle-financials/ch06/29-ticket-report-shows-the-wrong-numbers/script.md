# Script — Ticket: Report Shows the Wrong Numbers

## Segment 1 (title)

Our last ticket. LTV Manufacturing Corporation, ticket forty-eight-forty-nine. The controller says this morning's Balance Sheet run shows total assets three hundred forty thousand dollars higher than what GL shows in Smart View, and needs to know which one is right. Critical — it's feeding a board report due today.

## Segment 2 (steps)

The report shows the wrong numbers is about the vaguest ticket you can get. It could be a currency conversion issue, a wrong parameter, a timing cutoff like lesson fourteen, a reconciliation break like lessons eleven or eighteen, or a report that genuinely ran against incomplete data. The first job isn't guessing which — it's getting a specific, comparable number from whoever reported it, which here narrows straight to one fixed asset line, exactly three hundred forty thousand dollars.

## Segment 3 (steps)

Checking when each number was actually generated: the Balance Sheet report ran at seven AM. A batch of new manufacturing equipment — mass additions, familiar territory from lesson twenty-one — posted into the active asset register at seven forty-five, the same morning, after the report already ran. Smart View, refreshed later in the morning, already reflected that posting. The report didn't.

## Segment 4 (code)

So both numbers were actually correct for the moment each was generated. This isn't a data error or a broken report — it's a timing difference, the same underlying idea as lesson fourteen's statement cutoff, just showing up in a different report entirely. The fix: re-run the Balance Sheet report now that the batch has posted, confirm it matches Smart View, and explain to the controller specifically why the two numbers differed in the first place, not just that they match now.

## Segment 5 (outro)

Every ticket in this course reduced to the same discipline: get specific, isolate what's actually different, check the real evidence, confirm before you fix, apply the narrowest correct fix, and document the symptom, cause, fix, and verification honestly. That closes Troubleshooting Oracle Financials and the Production Support stage. Next up is the capstone: LTV Manufacturing Corporation. It's January 31st, the books don't balance, and the period won't close — you're the consultant who has to find out why and fix it.
