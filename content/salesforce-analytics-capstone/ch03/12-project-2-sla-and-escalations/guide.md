# SLA & Escalation Analysis

Average resolution time tells you how fast the team is. A service-level agreement tells you whether that's fast enough. This lesson adds the promise: what did Alder & Vale Systems commit to, how often did it keep the commitment, and which cases escalated? All numbers are illustrative, and the exact UI wording depends on your org and release.

## What you'll learn

- How to express an SLA as a target per priority
- How to measure compliance with a row-level flag, using the org's own data
- Where Entitlements and Milestones fit, if the org uses them
- How to analyze escalations without drawing the wrong conclusion

## Start with the target

An SLA is a target for a time measure, usually split by priority. The illustrative targets for this project:

| Priority | First response | Resolution |
|---|---|---|
| High | 1 hour | 12 hours |
| Medium | 4 hours | 48 hours |
| Low | 8 hours | 96 hours |

Put these on your definitions sheet. Without a stated target, "slow" is only an opinion.

## Two ways to measure compliance

**If the org uses Entitlements and Milestones**, Service Cloud can track case milestones against an entitlement process. Milestone records typically carry target dates and whether they were violated, and you may be able to report on them with a milestone-related report type. Whether this exists depends entirely on what the org has set up, so check before you plan around it.

**If it doesn't**, build compliance yourself from fields you already have:

1. Use the Cases report type, filtered to closed cases in the quarter.
2. Add a row-level formula that converts closed minus created into hours.
3. Add a second formula that returns 1 when the hours exceed the target for that case's priority, and 0 otherwise. This is the same win-rate pattern you used for opportunities, applied to breaches.
4. Summarize the flag with a sum, and divide by record count in a summary formula for the breach rate.

Illustrative result: of 1,180 closed cases, **142 breached** the resolution target, so compliance is about **88 percent**.

## Break compliance down

The overall figure hides where the pain is. Group by priority. Illustrative breaches: High 41, Medium 78, Low 23, which sums to 142. High-priority cases are about 15 percent of volume, roughly 177 closed, so 41 breaches is about **23 percent**, far worse than Low at roughly 6 percent. A single 88 percent headline would hide that the most urgent cases fail most often.

## Escalations

The Case object has an Escalated checkbox, and the Status picklist may also include an Escalated value, depending on configuration. Case escalation rules, if the org uses them, can set these automatically; agents may also do it by hand. Ask how escalation happens before you interpret the numbers.

Report on Escalated equals true, grouped by priority. Illustrative: **74 escalated cases**, 6 percent of the quarter's 1,240. By priority, High 52 of 186 (28 percent), Medium 19 of 682 (2.8 percent), Low 3 of 372 (0.8 percent).

## Read escalations carefully

A high escalation rate can mean the team struggles, or that the process wisely routes hard problems upward. Look for context: which accounts escalate, whether escalated cases also breached the SLA, and whether the escalation happened before or after the breach. Correlation isn't blame.

## Your turn

Build the compliance report and the escalation report. Decide the chart types, and write down one hypothesis about why High-priority cases fare worst. Then name the data you'd need to test it.

## Recap

An SLA turns average speed into a promise you can keep or break. Measure compliance per priority with either milestones, if present, or a row-level breach flag. Report escalations by priority and interpret them with the process in mind.

## Check yourself

Why is an 88 percent overall compliance rate potentially misleading, and what grouping exposes the problem?
