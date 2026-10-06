# Data Migration Strategy

Configuration gives Oracle Fusion its rules; data migration gives it the actual legacy business history those rules operate on. This lesson covers how a Data Migration Lead decides what to migrate, how, and when — decisions made well before any file actually gets loaded.

## What you'll learn

- The three broad categories of legacy data a migration strategy has to address
- Why most implementations migrate open balances, not full history
- The common loading mechanisms: FBDI, ADFdi, manual entry, and REST APIs
- How Brightfield scoped its own Cash Management data migration

## Three categories of legacy data

- **Static / reference data** — the master data every transaction depends on: chart of accounts values, suppliers, customers, employees, bank accounts. This has to be loaded and validated before any transactional data, because transactional records reference it.
- **Open transactional balances** — the business-critical, still-open items: unpaid AP invoices, uncollected AR invoices, the GL trial balance as of cutover, open bank reconciliation items. These are what the business needs on day one to keep operating.
- **Historical / summary data** — closed, fully settled transaction history kept for reporting and audit purposes only, not for further processing.

## Why most projects don't migrate full transaction history

Loading every historical transaction in full detail is expensive, slow, and usually unnecessary — the business doesn't need to re-process a paid invoice from three years ago, it needs to know its balance was correct. The standard approach migrates **open balances** in full detail (because the business will act on them — paying, collecting, reconciling) and **historical data** only as summary-level reporting data, often left in the legacy system (sometimes archived in a read-only reporting tool) rather than loaded into Oracle Fusion at all.

## How data actually gets loaded

- **FBDI (File-Based Data Import)** — a structured spreadsheet template per object, filled out and uploaded; the standard bulk-load mechanism for most conversion objects.
- **ADFdi (Application Development Framework Desktop Integration)** — an Excel-integrated tool for entering or bulk-updating data directly against Oracle Fusion, often used for smaller volumes or ongoing maintenance rather than one-time conversion.
- **Manual entry** — practical only for very low volumes, such as a handful of opening balances.
- **REST APIs** — used when data needs to flow from an integrated system programmatically rather than through a one-time file upload, more common for ongoing integrations than for a one-time legacy conversion.

## Timing: mock loads before the real one

A data migration strategy always includes **mock conversion cycles** — practice loads run well before cutover, using the same FBDI templates and the same validation steps the final load will use, so problems get found and fixed on a non-critical timeline rather than during the real cutover weekend (Chapter 5). The final, live load happens only once, during cutover itself, using whatever the last mock load proved out.

## Brightfield Industrial Group: scoping the Cash Management conversion

Brightfield's Data Migration Lead scopes Cash Management's conversion to: all active bank, branch, and account records (static/reference data, loaded first via FBDI); every unreconciled bank statement line and every open cash-related transaction as of the planned cutover date (open balances, loaded via FBDI shortly before go-live); and nothing from the historical reconciliation archive, which stays in the legacy system's read-only reporting tool for audit purposes.

## Key terms

| Term | Meaning |
|---|---|
| Static/reference data | Master data other records depend on; loaded first |
| Open transactional balances | Still-open items the business needs on day one |
| FBDI | File-Based Data Import — the standard bulk-load spreadsheet mechanism |
| Mock conversion cycle | A practice data load run before the real cutover load |

## Recap

A data migration strategy sorts legacy data into static/reference, open balances, and historical categories, generally loading the first two in full and leaving historical detail behind, using FBDI (and sometimes ADFdi or REST APIs) with mock cycles proving out the process before the real cutover load. Brightfield's Cash Management scope follows exactly that pattern. Next up, lesson 15: cleansing and validating that data before and after it loads.
