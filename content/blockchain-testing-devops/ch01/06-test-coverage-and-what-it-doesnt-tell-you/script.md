# Script — Test Coverage, & What It Doesn't Tell You

## Segment 1 (title)

forge coverage reports which lines, statements, branches, and functions your tests actually executed. It's a useful number. It is not proof your contract is correct.

## Segment 2 (code: running coverage)

A summary report shows percentages per file. For CI or an external dashboard, generate an LCOV tracefile instead — forge coverage, report lcov, report-file lcov dot info.

## Segment 3 (why 100% isn't proof)

Coverage answers exactly one question: did any test execute this line. It says nothing about whether that test asserted the right thing. A test that calls withdraw and asserts nothing still counts as covering every line inside it.

## Segment 4 (steps: what each coverage type misses)

Branch coverage at 100% doesn't mean every combination across a call sequence was tested — invariant testing checks that. Line coverage at 100% doesn't mean boundary values were exercised — fuzz testing checks that. Function coverage says nothing about access control.

## Segment 5 (outro)

Use coverage as a map of blind spots, not a target to chase. That closes out rigorous testing — Chapter 2 moves to automating all of it in CI, so none of it depends on someone remembering to run it locally.
