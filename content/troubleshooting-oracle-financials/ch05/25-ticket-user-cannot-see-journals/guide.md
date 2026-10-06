# Ticket: User Cannot See Journals

**Chapter 5 · Assets, Expenses and Setup Tickets · Lesson 5 of 5**

## What you'll learn

- How GL data access adds a layer beyond the business-unit scoping from Lesson 24
- Segment value security as a specific, finer-grained restriction
- Why this is the same diagnostic method as Lesson 24, applied one layer deeper
- A resolution note that distinguishes "wrong scope" from "intentionally restricted scope"

## Same method, one layer deeper

Lesson 24 was about business unit access. GL data access can go further: beyond which **ledger** a user's data role covers, Oracle supports **segment value security**, which can restrict access down to specific values of a single chart-of-accounts segment — commonly the segment representing legal entity, company, or division. A user can have full access to a ledger and still be unable to see journals tagged with a specific segment value if that value is excluded by a segment value security rule.

## The ticket

> **Ticket #40742 — Thornfield Materials Holdings.** Controller for the Fixtures Division reports: "I can see our division's journals fine, but I can't see anything for the Structural Division, even journals in the same ledger. Is that supposed to happen?" Severity: Low (asking a question, not reporting a break).

## Investigating

1. **Check whether this is actually a bug or an intentional restriction.** First question, same instinct as always: is this one user, or does it match a pattern? Checking other Fixtures Division controllers — same restriction, same pattern. This isn't isolated to one misconfigured user.
2. **Check the ledger-level data role.** The controller's data role does include the full ledger (both divisions share one ledger here) — so this isn't a Lesson 24-style business unit/ledger gap.
3. **Check segment value security.** A segment value security rule exists on the "Division" segment, explicitly restricting Fixtures Division controllers' roles to the Fixtures Division value only, excluding Structural.

## Root cause

This is not a misconfiguration — it's a deliberately configured segment value security rule restricting each division's controllers to their own division's segment value, confirmed by the fact that every Fixtures Division controller shows the identical restriction.

## Resolving it

Because this is intentional, the resolution is **confirmation, not correction**: explain to the controller that this is a designed restriction (division controllers see their own division only, consistent across all of them), not a bug. If there's a genuine business need for this specific controller to see Structural Division journals too (e.g., a temporary cross-division assignment), that's a deliberate access change request to route through whoever owns segment value security — not something to quietly override on a ticket.

## Documenting it

> **Ticket #40742 — Thornfield Materials Holdings.** Fixtures Division controller asked why they can't see Structural Division journals in the same ledger.
> **Root cause:** Confirmed as intentional — a segment value security rule on the Division segment restricts each division's controllers to their own division's value, consistent across all Fixtures Division controllers checked.
> **Fix:** None required; explained the designed restriction to the controller.
> **Verified:** Confirmed the same restriction applies identically to other Fixtures Division controllers, ruling out a user-specific misconfiguration.
> **Note:** If a genuine cross-division need arises, route it as a deliberate access request to the segment value security owner rather than treating it as a defect.

## Key terms

| Term | Meaning |
|---|---|
| Segment value security | Restricts data access to specific values of a chart-of-accounts segment, independent of ledger/BU access |
| Intentional restriction | A working-as-designed access limitation, confirmed by consistency across similar users |

## Recap — and the end of Chapter 5

Lessons 24 and 25 both used the same underlying question — "is this one person, or does the pattern repeat?" — to tell a genuine access gap (Lesson 24) apart from a working-as-designed restriction (this lesson). Not every access ticket is a bug to fix; some are a design to confirm and explain. Next up, Chapter 6: Data and Integration tickets, starting with a failed FBDI import.
