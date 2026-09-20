# Script — Record Types

## Segment 1 (title)

Lesson 17 covered how a Picklist's values are configured per org. This lesson covers something related but distinct: Record Types, which let a single object run more than one business process at once.

## Segment 2 (code: the problem they solve)

A company might sell both new business and renewals through the same Opportunity object, but with completely different stages. Without Record Types, an admin would have to force both into one compromised picklist or build two separate objects entirely.

## Segment 3 (steps: a concrete example)

Picture two Opportunity Record Types: New Business and Renewal. A New Business record shows Stage values like Prospecting and Proposal. A Renewal record, on the exact same object, shows a completely different Stage picklist — maybe just Renewal Review and Renewed.

## Segment 4 (outro)

Filter Opportunity Stage without checking Record Type, and you can quietly mix two unrelated business processes into one misleading report. Next up: Page Layouts — why a field can exist and hold data even when you can't see it.
