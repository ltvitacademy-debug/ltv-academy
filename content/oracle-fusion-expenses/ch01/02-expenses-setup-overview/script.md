# Script — Expenses Setup Overview

## Segment 1 (title)

Before a single Castellan Supply Co. employee can submit an expense report, a consultant configures a chain of setup objects in a specific order. This lesson is the map of that chain. We'll go deep on several of these pieces in later lessons — today the goal is seeing how they connect.

## Segment 2 (steps)

Almost every setup object in Expenses is defined per business unit, not once for the whole company. Castellan has three: US Operations, Canada Operations, and Field Services. Each can have its own templates, policies, and approval routing, because a per diem rate that works in the US may not work in Canada.

## Segment 3 (steps)

The sequence starts with system options at the business unit level: receipt thresholds, itemization requirements, default currency, whether cash advances are even allowed. Next come expense report templates, the container everything else sits inside, and then the expense types and categories nested inside those templates.

## Segment 4 (steps)

After types exist, you set conversion rate policies for foreign currency, then expense policies and limits like a maximum hotel rate. Only then do audit rules and the audit list make sense, because now there's something for a rule to evaluate. Approval rules and corporate card program setup come last, building on the organizational structure that's already in place.

## Segment 5 (code)

Why does order matter? You can't cap a Hotel expense type before Hotel exists. You can't route approvals by cost center before the business unit's cost center structure exists. Experienced consultants build this list top to bottom and resist jumping straight to the interesting parts, like audit rules, before the foundation is there.

## Segment 6 (outro)

Keep this sequence in mind: system options, templates and types, conversion rates, policies, audit rules, approval rules, corporate card setup. Up next, lesson three: a close look at expense templates and expense types themselves.
