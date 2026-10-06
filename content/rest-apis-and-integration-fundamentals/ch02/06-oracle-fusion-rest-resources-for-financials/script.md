# Lesson 6 — Oracle Fusion REST Resources for Financials · Voiceover script

Segments map 1:1 to slides. Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 6 of 19.

---

## S1 · TITLE CARD

Every Oracle Fusion Financials REST call follows the same base URL pattern: the pod's hostname, then fscmRestApi slash resources slash a version string slash the specific resource name. Only that last piece changes from call to call.

## S2 · CODE CARD

fscm stands for Financials and Supply Chain Management — the shared REST root Oracle uses for ERP-family modules. The pod hostname is specific to each customer's Fusion environment.

## S3 · STEPS CARD

Financials maps one key resource to roughly one subledger. Invoices covers Accounts Payable invoice headers and lines. ReceivablesInvoices covers Accounts Receivable transactions. Journals and glAccountCombinations cover General Ledger entries and the chart of accounts segments behind them.

## S4 · STEPS CARD

That version string in the URL can be a fixed number, like 11.13.18.05, which stays stable so an integration doesn't shift under you — or the literal word "latest," which always resolves to the newest available version and can change behavior when Oracle updates it. Part of a consultant's job is knowing which one any given integration is actually built against.

## S5 · OUTRO CARD

Base URL pattern, the resource names mapped to each subledger, and what the version string controls — that's the lay of the land. Next lesson, we make an actual GET request against one of these resources.
