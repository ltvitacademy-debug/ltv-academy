# Configuration Workbooks

Every fit from Lesson 6 and every approved configuration-type gap from Lesson 7 eventually needs to become an actual setup value inside Oracle Fusion. A configuration workbook is the structured document that captures those setup decisions before anyone touches the Setup and Maintenance work area — turning a design decision into something that can be reviewed, approved, and handed to a consultant to key in.

## What you'll learn

- What a configuration workbook contains and why it exists separately from the live system
- How a workbook is organized by task list, mirroring Oracle's own setup structure
- Who owns, reviews, and signs off a workbook before configuration begins
- How a workbook connects forward to the actual Setup and Maintenance tasks in Chapter 3

## Why document setup decisions before configuring

It would be faster, in theory, to skip the workbook and configure Oracle Fusion directly from workshop notes. In practice, that approach loses the audit trail: nobody can see why a setting was chosen, business sign-off has nothing concrete to approve, and a Technical Consultant building an integration has no single source of truth for values like business unit names or ledger currency. The workbook exists to make every setup decision visible, reviewable, and traceable back to the requirement or gap that drove it — before it becomes a live Oracle configuration.

## Structure of a workbook

A configuration workbook is usually organized to mirror Oracle's own **task lists** inside the Setup and Maintenance work area — one tab or section per task list (e.g., "Define Banks, Branches, and Accounts," "Manage Reconciliation Matching Rules"), with one row per setup object. Each row typically captures: the setup object name, every attribute that needs a value, the proposed value itself, the related requirement or gap ID, and a sign-off column. This structure matters later, because it maps directly onto how the Functional Consultant will navigate Setup and Maintenance to actually key the values in.

## Who owns it

The Functional Consultant for a module drafts the workbook, pulling values from fit-gap outcomes and workshop decisions. The relevant Business Process Owner reviews and signs off each section — confirming, for example, that the proposed bank reconciliation tolerance of a specific dollar amount and number of days is actually correct for their process, not just technically valid. Only after sign-off does the workbook move into the Configure phase, where it becomes the literal input to Setup and Maintenance.

## Brightfield Industrial Group: a workbook row

Brightfield's Cash Management workbook includes a row for the **Manage Reconciliation Matching Rules** task: setup object "Wire Transfer Auto-Match Rule — Operating Account," attributes including matching tolerance (amount and date), transaction type, and bank account; proposed values drawn directly from the configuration-gap resolution in Lesson 7; related gap ID GAP-CM-01; and a sign-off from the Treasury Manager confirming the tolerance values match what Treasury actually needs before the Cash Management functional consultant keys them into Setup and Maintenance.

## Key terms

| Term | Meaning |
|---|---|
| Configuration workbook | A structured document capturing setup decisions before they're keyed into Oracle |
| Task list | Oracle's own grouping of related setup tasks inside Setup and Maintenance |
| Sign-off column | Business confirmation that a proposed setup value is correct |

## Recap

A configuration workbook turns every fit and approved configuration gap into a reviewable, traceable setup decision, organized by Oracle's own task lists and signed off by the business before anyone touches the live system. Brightfield's wire-matching rule moved from a gap resolution straight into a signed-off workbook row. Next up, lesson 9: the enterprise structure decisions that have to be locked down earliest of all.
