# Lesson 13 — Mass Additions from Payables Invoices

**Chapter 3 · Adding Assets · Lesson 13 of 33**

## What you'll learn

- How an asset clearing account turns a Payables invoice line into a mass addition candidate
- What the Create Mass Additions process actually does
- Where mass addition lines land before they become real assets
- Why this is the most common way assets enter the system in a mature implementation

## The invoice-to-asset bridge

Lesson 1 mentioned that an invoice coded to an asset clearing account becomes a candidate for an asset addition. This lesson is about exactly how that happens. When an Accounts Payable invoice distribution is coded to a GL account flagged as an **asset clearing account** rather than a normal expense account, Payables recognizes that line as something Fixed Assets needs to know about — the company bought something that should probably become a depreciable asset, not an immediate expense.

## Create Mass Additions

The **Create Mass Additions** process, run from Payables, scans for eligible invoice distributions — validated, accounted, coded to an asset clearing account — and sends them to an interface table that belongs to Fixed Assets, separate from the main asset tables. This is a deliberate design: a mass addition line existing in the interface table doesn't mean an asset exists yet. It means a *candidate* for an asset exists, waiting for someone in Fixed Assets to review it.

For Meridian Fabrication Co., imagine Payables processes a $45,000 invoice for a new injection-molding machine, with the distribution coded to the "Machinery Clearing" account. Once that invoice is validated and accounted, running Create Mass Additions sends that $45,000 line into the Fixed Assets interface table as a new mass addition, carrying along useful context: the vendor, the invoice number, the description, the amount, and the GL date.

## Why this matters more than manual entry, in practice

In any implementation handling real purchasing volume, the overwhelming majority of new assets arrive this way, not through manual entry or even Quick Additions. Nobody wants an accounting team retyping invoice amounts that Payables already captured correctly. The entire point of mass additions is: capture the financial data once, in Payables, where the invoice and the approval already live, and let it flow into Assets rather than being duplicated by hand.

## What happens next

A mass addition line sitting in the interface table isn't yet a depreciating asset — it still needs to be reviewed, categorized, and either merged into an existing asset or set up as a brand-new one. That review step is **Prepare Mass Additions**, covered in Lesson 14, and only after that does **Post Mass Additions** (Lesson 15) turn a prepared line into an actual, depreciating asset record.

## Key terms

| Term | Meaning |
|---|---|
| Asset clearing account | A GL account used on a Payables invoice distribution to flag a purchase as a fixed-asset candidate |
| Create Mass Additions | The Payables process that sends eligible invoice distributions into the Fixed Assets interface table |
| Interface table | A holding area for mass addition candidates, separate from the main asset tables, until they're prepared and posted |

## Lab

Meridian Fabrication Co. receives and pays a $45,000 invoice for an injection-molding machine, coded to "Machinery Clearing." Walk through, in your own words, what has to be true about that invoice before it's eligible for Create Mass Additions, and explain why the line sitting in the interface table afterward doesn't yet mean an asset exists.

## Check yourself

Without looking back, can you explain what makes a Payables invoice distribution eligible for Create Mass Additions, and where that data lands immediately afterward?
