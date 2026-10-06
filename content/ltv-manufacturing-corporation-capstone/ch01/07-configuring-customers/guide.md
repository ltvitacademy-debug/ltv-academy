# Configuring Customers

**Chapter 1 · Design and Configuration · Lesson 7 of 25**

With suppliers configured, this lesson covers the other side of the business: the customers LTV sells control panels and automation components to. One of these three customers, and one invoice you'll create against it in Chapter 2, sits at the center of Chapter 3's AR investigation.

## What you'll learn

- LTV's three customers, their locations, and which business unit serves each
- How a customer account, site, and profile class fit together
- Why Harborview Industrial Supply gets full credit and payment detail configured
- The setup this lesson produces that Chapter 2's invoicing lessons depend on

## LTV's three customers

| Customer | Location | Served by |
|---|---|---|
| **Harborview Industrial Supply** | Charlotte, NC | US Manufacturing & Distribution BU |
| **Tidewater Energy Systems** | Norfolk, VA | US Manufacturing & Distribution BU |
| **Great Lakes Automation Group** | Ontario, Canada | Canada Operations BU |

Harborview and Tidewater are served by the US business unit from the Savannah plant and distribution center; Great Lakes Automation Group is served by the Canadian subsidiary from Windsor.

## Configuring Harborview Industrial Supply

Harborview is LTV's largest distributor customer and the one Chapter 2's customer-invoicing and cash-receipts lessons follow in detail:

- **Customer account:** Harborview Industrial Supply, customer type "Distributor," account classified under a standard commercial profile class.
- **Customer site:** one bill-to/ship-to site combination in Charlotte, NC, with a receivables **profile class** of Net 30 payment terms and standard credit limit review.
- **Credit management:** a credit limit is set and reviewed, consistent with Harborview's order history and the volume of business you'll run through it in Chapter 2.
- **Remit-to and receipt method:** configured so cash receipts (lesson 13) can be applied against Harborview's open invoices without manual lookup.

Harborview already has order history in LTV's system before this capstone's events begin — including an older, smaller open invoice that will matter later — a realistic detail for an established distributor relationship, not a brand-new customer.

## Configuring Tidewater Energy Systems and Great Lakes Automation Group

Both get the same basic pattern as Harborview — one bill-to/ship-to site, a standard commercial profile class, Net 30 terms — without the extended order history. Great Lakes Automation Group is configured under the Canada Operations BU, billed and collected in CAD, consistent with lesson 3's decision to run the Canadian entity on its own ledger and currency.

## Why customer setup has to come before invoicing

A Receivables transaction can't be created for a customer that doesn't exist, and cash can't be applied without a receipt method and remit-to address on file. This is the master data Chapter 2's customer-invoicing and cash-receipts lessons rely on directly.

## Key terms

| Term | Meaning |
|---|---|
| Profile class | A set of default Receivables terms (payment terms, credit review, statement cycle) applied to a customer account or site |
| Remit-to address | The address a customer is instructed to send payment to, tied to a receipt method |

## Recap

LTV's three customers — Harborview Industrial Supply, Tidewater Energy Systems, and Great Lakes Automation Group — are now configured, with Harborview given full credit and receipt-method detail as the customer Chapter 2's invoicing and cash-receipts lessons follow closely. Next up, lesson 8: configuring bank accounts and assets — the last piece of master data before Chapter 2 begins.
