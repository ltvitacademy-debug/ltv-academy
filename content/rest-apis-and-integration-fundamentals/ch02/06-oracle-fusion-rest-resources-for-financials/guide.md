# Lesson 6 — Oracle Fusion REST Resources for Financials

**Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 6 of 19**

## What you'll learn

- The base URL pattern every Oracle Fusion Financials REST call follows
- Key Financials REST resources: invoices, receivablesInvoices, journals, glAccountCombinations
- What "fscmRestApi" stands for and why Financials shares it with SCM
- The difference between a fixed version string and "latest" in the URL

## The base URL pattern

Every Oracle Fusion Cloud Financials REST call starts with the same
shape:

```
https://<pod>.fa.<region>.oraclecloud.com
  /fscmRestApi/resources/<version>/<resource>
```

- `<pod>` is specific to the customer's Fusion environment.
- `fscmRestApi` is the shared REST root for **F**inancials and
  **S**upply **C**hain **M**anagement — Financials shares this root
  with Procurement and SCM resources.
- `<version>` is either a fixed version string (e.g.
  `11.13.18.05`) or the literal word `latest`.
- `<resource>` is the specific collection you're calling, like
  `invoices`.

## Key Financials resources

| Resource | Subledger / area |
|---|---|
| `invoices` | Accounts Payable invoice headers and lines |
| `receivablesInvoices` | Accounts Receivable transactions |
| `journals` | General Ledger journal entries |
| `glAccountCombinations` | Chart of Accounts segment combinations |
| `erpintegrations` | Bulk inbound/outbound data (ESS-based, covered more in Chapter 4) |

## Fixed version vs. `latest`

A **fixed version string** (like `11.13.18.05`) stays stable — an
integration built against it keeps behaving the same way even after
Oracle updates the environment. The word `latest` always resolves to
whatever is newest, which is convenient for exploration but risky for a
production integration, since a Fusion update could change a
resource's shape underneath it. Confirming which one an existing
integration uses is a routine part of troubleshooting.
## Key terms

| Term | Meaning |
|---|---|
| fscmRestApi | The shared REST root for Financials and Supply Chain Management resources |
| Pod | The customer-specific hostname segment of an Oracle Fusion environment's URL |
| invoices | The AP invoice headers/lines resource |
| receivablesInvoices | The AR transactions resource |

## Check yourself

An integration calls /fscmRestApi/resources/latest/invoices. What's the risk of using "latest" instead of a fixed version string in a production integration?
