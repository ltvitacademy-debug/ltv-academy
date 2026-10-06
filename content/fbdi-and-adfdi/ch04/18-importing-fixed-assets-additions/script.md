# Script — Importing Fixed Assets Additions

## Segment 1 (title)

Fixed Assets has a distinctive, two-step flavor of this pipeline worth calling out on its own: new assets come in as Mass Additions, and getting them from "staged" to "a depreciating asset on the books" takes one extra deliberate step.

## Segment 2 (steps)

A mass addition is a candidate asset waiting to be formally added to the register — a building, equipment, a vehicle, a fleet of laptops. They arrive two ways: directly through the Mass Additions Create FBDI template, for a legacy register conversion, or automatically from Payables, when an invoice line gets coded as a capital purchase rather than an ordinary expense.

## Segment 3 (steps)

Both paths feed FA_MASS_ADDITIONS, the Fixed Assets staging table. A row here isn't a real asset yet — it's a candidate, holding a description, a cost, a unit, and a proposed category, waiting to be reviewed and formally created.

## Segment 4 (steps)

Unlike journals or invoices, this module goes through two distinct actions after staging: Mass Additions Create, which turns staged rows into formal, reviewable asset records, and a separate posting step that actually adds the asset to the books and starts depreciation. That extra review step exists because category, useful life, and depreciation method all deserve a human check before they're locked in.

## Segment 5 (outro)

Because one entire source of mass additions is capital-coded Payables invoice lines, a Fixed Assets consultant doing a go-live conversion often reviews mass additions that trace directly back to invoices loaded in the last chapter — these five modules aren't unrelated topics, they're connected stops data actually travels through. Up next, lesson nineteen: importing bank statements.
