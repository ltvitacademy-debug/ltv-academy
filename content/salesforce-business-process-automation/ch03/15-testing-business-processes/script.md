# Script — Testing Business Processes

## Segment 1 (title)

Build an approval process, submit one quote, watch it land in the right queue, and it's tempting to call it done. One successful run proves the happy path works. It proves almost nothing else.

## Segment 2 (steps: the test matrix)

Four categories, every time. The happy path -- the obvious case it was built for. Boundary values, sitting exactly at the edge of a condition. Bulk changes, many records updating at once. And negative cases -- the record this automation should never touch at all.

## Segment 3 (code: applied to Harborline's approval)

Applied to Harborline's quote approval: fifteen percent routes correctly to the manager. Exactly ten percent should NOT enter approval at all. Fifty quotes updated at once through a data import. And a quote with the discount field left entirely blank.

## Segment 4 (steps: where to run these tests)

Every one of those belongs in a sandbox or Developer Edition org -- never production. Debug logs confirm exactly which criteria evaluated true or false for a given test record, not just that nothing visibly broke on screen.

## Segment 5 (code: what passing actually means)

A quote entering approval when it shouldn't is a failure, full stop, even if zero errors appear anywhere. The automation "running" and the automation running correctly on the right record are two completely different claims.

## Segment 6 (outro)

Two case studies, a documentation method, a hands-on practice lab, and now a testing method. Next lesson pulls all of Chapter 3 together into one review.
