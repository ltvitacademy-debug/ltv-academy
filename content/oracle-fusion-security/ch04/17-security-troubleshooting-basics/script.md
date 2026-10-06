# Script — Security Troubleshooting Basics

## Segment 1 (title)

Chapters one through three gave you the full vocabulary and mechanics. This lesson turns that into a repeatable method for the moment someone says "I can't do the thing I'm supposed to be able to do."

## Segment 2 (steps)

Before touching the Security Console, ask one question: can you reach the page at all, or can you reach it but something about the data looks wrong. That single split sends you down one of two different paths, and conflating them wastes time.

## Segment 3 (steps)

For function security problems: confirm the expected role was actually provisioned. If it's there, use Simulate Navigator to confirm it includes the menu item in question. If it doesn't, trace down to the duty role that should carry that privilege — missing from the job role, or present but not inherited. And check whether the privilege itself was recently modified; that's a commonly overlooked cause.

## Segment 4 (steps)

For data security problems: confirm the expected security context and value are actually assigned — a blank or wrong context value is the single most common root cause. Check for multiple roles with overlapping but inconsistent data access. Confirm the data actually exists in the scope being checked — sometimes it's not a security problem at all. And use a matching test user account to isolate whether it's this specific user or the role itself.

## Segment 5 (outro)

Avoid two traps: fixing a symptom by over-provisioning a broader role, which is exactly how segregation of duties conflicts get quietly created, and assuming every complaint is a security problem when it might be a setup gap. Up next, lesson eighteen: access issue practice scenarios, applying this method to real cases.
