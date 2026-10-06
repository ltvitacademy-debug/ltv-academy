# Lesson 33 — Payment Files and Electronic Payments

**Chapter 6 · Payments · Lesson 33 of 42**

## What you'll learn

- How a Payment Process Request turns into an actual file or document
- The common electronic payment file formats and where each is used
- What a positive pay file is and why it exists for checks
- How a payment file reaches the bank

## From proposed payments to a physical output

Once a Payment Process Request has built its payments (Lesson 32), the final step is **formatting** — generating the actual output that either goes to a printer or gets transmitted to a bank. The format used is determined by the **Payment Process Profile**, which was already pointed at a specific format when it was set up.

Two broad categories of output exist:

| Output | Used for |
|---|---|
| **Printed document** | A check layout, rendered through Oracle's XML Publisher-based templates |
| **Electronic payment file** | A structured data file in a format the receiving bank can process automatically |

## Common electronic file formats

| Format | Common use |
|---|---|
| **NACHA** | US domestic ACH transfers |
| **ISO 20022** | International standard, widely used for SEPA transfers in Europe and increasingly elsewhere |
| **BAI2** | Often used for bank statement reconciliation rather than outbound payment, but worth knowing by name |

Which format a given PPP generates is a one-time setup decision, not something chosen per payment run — this is exactly why Lesson 29 split "payment method" from "payment process profile": the same EFT method can point at different formats for different populations of suppliers.

## Positive pay: a control specific to checks

For check payments, many organizations also generate a **positive pay file** — a separate file transmitted to the bank listing every check issued (check number, amount, payee) in that run. When a check is later presented for payment, the bank compares it against this file before honoring it. A check that doesn't match an entry on file — wrong amount, altered payee, a check number never issued — gets flagged instead of paid automatically. It's a fraud-prevention control specific to paper checks, since electronic payments don't carry the same forgery risk.

## Illustrative example

**Cascade Industrial Parts** (fictional, reused from Lesson 23) is paid through the "US Domestic ACH" PPP. Once its proposed payment is approved, the PPR formats a NACHA file containing the routing number, account number, and amount, ready for transmission to the bank. On the same day, a separate check run for smaller suppliers generates both the printed checks and a positive pay file sent ahead to the bank, so each check clears only if it matches what was actually issued.

## How the file actually reaches the bank

Depending on the organization's banking setup, the generated file is either transmitted automatically (a direct connection between Oracle Fusion and the bank, sometimes through a banking integration service) or downloaded and uploaded manually to the bank's own portal. Either way, the file itself — not the underlying payment records in Oracle — is what the bank actually acts on.

## Key terms

| Term | Meaning |
|---|---|
| Electronic payment file | A structured data file a bank processes automatically to move funds |
| NACHA | The US domestic ACH file format |
| ISO 20022 | The international payment file standard, common for SEPA |
| Positive pay file | A file listing issued checks, used by the bank to detect fraudulent checks |

## Check yourself

You're ready for Lesson 34 when you can answer, without looking: what is a positive pay file, and why doesn't it apply to electronic payments?
