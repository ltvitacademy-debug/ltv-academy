# Agent Performance Analysis

The Head of Support's third worry was whether the team needs a hire or a better process. To answer that, you need to look at the four agents at Alder & Vale Systems, Ines Costa, Ravi Menon, Hannah Berg, and Omar Aziz, without making the classic mistake of comparing raw numbers as if every agent got the same work. Figures are illustrative, and field names and UI wording vary by org.

## What you'll learn

- How to build a per-agent scorecard from the Cases report type
- Why case mix can make a raw comparison unfair
- How to adjust for mix with a simple expected-versus-actual method
- How to present agent data responsibly

## The scorecard

Use the Cases report type, filtered to cases closed in the quarter. Group by Case Owner. Add Record Count, Average age (resolution hours, using the age field or the row-level formula from earlier), and your satisfaction measure, if the org collects one. Illustrative result:

| Agent | Closed | Avg hours | CSAT |
|---|---|---|---|
| Ines Costa | 340 | 34 | 4.5 |
| Ravi Menon | 310 | 36 | 4.3 |
| Hannah Berg | 290 | 40 | 4.2 |
| Omar Aziz | 240 | 45 | 4.2 |
| Team | 1,180 | 38 | 4.3 |

Check the arithmetic: the closed counts sum to 1,180, and the weighted average hours (340 x 34 + 310 x 36 + 290 x 40 + 240 x 45, divided by 1,180) is about 38.2. A team scorecard should always reconcile to the team total from your earlier reports.

## The trap: raw comparison

Read that table quickly and Omar looks slowest by 11 hours. But you learned in lesson 11 that Low-priority cases take about 61 hours for everyone, while High-priority cases take about 9.5. What if the work isn't evenly distributed?

Group by Case Owner and then Priority in a matrix. Illustrative mix of each agent's closed cases:

| Agent | High | Medium | Low |
|---|---|---|---|
| Ines | 15% | 60% | 25% |
| Ravi | 15% | 60% | 25% |
| Hannah | 18% | 52% | 30% |
| Omar | 12% | 43% | 45% |

Omar handled far more Low cases, the slowest category for everyone.

## Expected versus actual

Compute what each agent's average would be if they worked at the team's speed for each priority, given their mix. Use the team averages: High 9.5, Medium 34, Low 61.

- Omar: 0.12 x 9.5 + 0.43 x 34 + 0.45 x 61 is about **43** expected, versus 45 actual, only about 2 hours slower
- Ines: about 37 expected, 34 actual, faster than her mix predicts
- Ravi: about 37 expected, 36 actual
- Hannah: about 38 expected, 40 actual

Mix-adjusted, the spread is a few hours, not eleven. This is a simple form of standardization, and you can build it in a spreadsheet after exporting the matrix.

## Data pitfalls

- **Case Owner may be a queue** for unassigned cases, which won't appear under an agent's name.
- **Reassignment** credits the current owner. If the org tracks case history, you may be able to find the original owner; otherwise, state the limit.
- **Small samples:** if roughly a third of customers respond to surveys, a single agent may have only dozens of ratings. Show the response count, and avoid conclusions from tiny differences.

## Present it responsibly

Performance data affects real people. Frame it as workload and coaching: who is carrying the hardest or slowest work, who might benefit from support, and whether routing rules should change. Avoid a public ranking, and don't let one metric stand alone. Speed, quality, and volume tell different stories.

## Your turn

Build the scorecard and the mix matrix. Compute expected hours for at least one agent yourself, then draft two sentences for the Head of Support: one about what the data says, and one about what it can't say.

## Recap

A scorecard needs reconciliation, a mix check, and honest caveats. Expected-versus-actual keeps you from blaming an agent for the work they were given.

## Check yourself

Why can Omar's 45-hour average be less alarming than it looks, and what data would you show to explain it?
