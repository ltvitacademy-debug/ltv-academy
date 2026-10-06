# Common Financial BI Publisher Reports

Chapter 4 closes with the reports you'll actually run as a working consultant — predefined BI Publisher reports Oracle ships across the financial modules, built on exactly the data-model-plus-template architecture you've spent this chapter learning.

## What you'll learn

- Why Oracle ships so many predefined BI Publisher reports already
- Representative examples across Payables, Receivables, and other modules
- The difference between using a predefined report as-is and customizing its template
- How this connects forward to the detailed reports in Chapter 6

## Oracle ships predefined reports so you rarely start from zero

Just as Financial Reporting Studio ships seeded financial statements (Chapter 2) and OTBI ships curated subject areas (Chapter 3), BI Publisher ships a large catalog of predefined reports covering the common, recurring needs of each financial module — invoices, payments, reconciliations, period close, tax forms, and more. A working consultant's job is far more often *configuring and running* these predefined reports, or lightly adjusting their templates, than building an entirely new data model and template from a blank page.

## Representative examples by module

- **Payables** ships predefined reports covering areas including invoices, payments, the Payables-to-Ledger Reconciliation report, period close, prepayments, income tax and withholding, and netting. The **Payables Invoice Aging Report**, for instance, lists unpaid invoices grouped into aging periods — directly answering the kind of "what's overdue" question raised throughout this course.
- **Receivables** ships predefined reports including aging reports, customer statements, an invoice register, and a receipts register — the formal, often customer-facing or audit-facing counterparts to the ad hoc OTBI aging analysis you might build for internal use.
- **Fixed Assets** ships predefined reports including an Asset Register, documenting the organization's tangible assets alongside their depreciation and value over time.
- Other modules, including Cash Management, General Ledger, and Subledger Accounting, ship their own sets of predefined reports suited to their specific close and reconciliation needs.

## Using as-is versus customizing

Most implementations start by running a predefined report exactly as Oracle ships it — checking whether its existing layout and parameters already satisfy the business requirement before touching anything. When a predefined report is close but not quite right (a client wants an extra column, or their own logo on a statement), the most common next step is **copying the predefined report's template** and modifying the copy, rather than altering Oracle's original — preserving the ability to fall back to the seeded version and keeping the modification visible and auditable as a separate, intentional change. Building a brand-new data model from scratch is reserved for genuinely new reporting needs that no predefined report comes close to covering.

## Where this connects forward

Chapter 6 of this course returns to many of these same reports — Trial Balance, AP and AR aging, Fixed Assets and Cash Management reports, the full month-end package — but from the *content* side: what each report is actually telling you, and how it's used in a real close process. This chapter gave you the *mechanics* of BI Publisher; Chapter 6 gives you the *substance* of the specific reports a consultant is expected to know cold.

## Recap

BI Publisher ships predefined reports across Payables, Receivables, Fixed Assets, and other modules, built on the same data-model-plus-template architecture from this chapter; most real work is running or lightly customizing these existing reports rather than starting from a blank data model. This closes Chapter 4. Next up, Chapter 5: Smart View and Excel reporting.
