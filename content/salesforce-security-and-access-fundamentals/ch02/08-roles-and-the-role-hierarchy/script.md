# Script — Roles and the Role Hierarchy

## Segment 1 (title)

OWD sets the floor. This lesson covers the first mechanism that automatically widens it — the role hierarchy, and exactly which direction that widening flows.

## Segment 2 (screenshot: Roles tree)

Here's a real role hierarchy in Setup — each role reports up to one above it. Anyone above a given role in that chain gets the same access to records owned by people in that role that OWD already grants the owner, as long as Grant Access Using Hierarchies is on for the object.

## Segment 3 (steps: one direction)

It only flows upward. A manager sees their reports' records, and their reports' reports, down that one branch — but peers in parallel branches see nothing extra from each other, and reports never see anything extra from their managers. It's strictly one direction.

## Segment 4 (screenshot: role detail)

A role isn't just a position in a tree. Its detail page spells out exactly what it grants — Opportunity Access and Case Access language describing precisely what users in that role can do with records owned below them, not a vague "more access" but a specific, readable rule.

## Segment 5 (screenshot: sample hierarchy)

And the role hierarchy doesn't have to match the org chart. It's often modeled on it, but it exists purely to control data visibility — this sample is built around sales territories, reps reporting to regional directors, purely so records roll up correctly, not to mirror who manages whom on paper.

## Segment 6 (outro)

Role hierarchy is the first automatic widening above OWD. Up next: sharing rules — extending access to groups the hierarchy doesn't reach at all.
