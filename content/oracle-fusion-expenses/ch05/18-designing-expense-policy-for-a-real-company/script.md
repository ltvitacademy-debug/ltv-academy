# Script — Designing Expense Policy for a Real Company

## Segment 1 (title)

Every lesson so far assumed Castellan's policy already existed. This lesson works the problem backward: you're handed a blank slate for a new client, Harrowgate Freight Logistics, a 600-employee trucking company that's never used a formal expense system. Your job is to design the policy before any Oracle configuration begins.

## Segment 2 (steps)

Before opening a single setup screen, a consultant needs answers. Who travels, and how much - dispatchers rarely, forty regional sales reps two to three nights a week. What's historically gone wrong - the controller names fuel card misuse and unsubstantiated client meals as the top complaints. What's the risk tolerance - tight cost control, but not more enforcement overhead than it's worth. And what already exists - a separate fleet fuel card program that must not be confused with a corporate travel card program.

## Segment 3 (steps)

Because those two pain points were named specifically, policy design concentrates there instead of spreading effort evenly. A Regional Sales Travel template caps hotel at one sixty a night, caps business meals at sixty-five per person with a receipt always required regardless of amount, and puts client entertainment under one hundred percent audit - the named pain point.

## Segment 4 (code)

Here's the framework: two business units, one template for regional sales travel with those three caps, a company-liability card issued only to the forty reps, and two audit rules - repeat missing receipts at two or more in ninety days, and every single client entertainment instance, both routing to complete audit.

## Segment 5 (steps)

Notice what's deliberately NOT heavily audited: routine ground transportation and standard in-policy hotel stays, since discovery never flagged those as a problem. Auditing everything equally would waste reviewer time on low-risk spend while the two real risk areas get no more scrutiny than anything else.

## Segment 6 (outro)

The technical configuration is the easy part once decisions are made. The harder part is getting the controller and CFO to actually agree on numbers - is sixty-five dollars defensible in Harrowgate's markets? A consultant proposes a draft, benchmarks it if data exists, and iterates with the client before building anything. Building the wrong policy correctly in Oracle is still the wrong policy. Up next, lesson nineteen: corporate card reconciliation, the course's final lesson.
