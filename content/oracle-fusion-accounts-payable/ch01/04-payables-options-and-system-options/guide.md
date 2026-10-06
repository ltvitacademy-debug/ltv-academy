# Payables Options and System Options

Item two from last lesson's map of seven. If you've read older Payables documentation, or talked to someone who worked with an on-premises Oracle E-Business Suite system, you may have heard of "Financial Options," "Payables Options," and "System Options" as three separate setup screens. Oracle Fusion Cloud consolidates all of that into a single, business-unit-scoped page: **Manage Payables System Options**. This lesson walks through what's actually on it.

## What you'll learn

- Why Fusion uses one consolidated options page instead of several separate ones
- The three main areas inside it: invoicing, payment, and tax
- What tolerances are, and why they're the setting new users meet first
- How discount and prepayment defaults change behavior without anyone touching an individual invoice

## One page, scoped per business unit

Manage Payables System Options is configured **per business unit**, which is consistent with the rest of Chapter 1: Brightfield Office Supply's US business unit and, hypothetically, a Canadian business unit could carry entirely different tolerances or discount defaults on this one page, because each BU has its own copy of it.

The page is organized into a few areas, the most important of which are:

- **Invoice options** — invoice entry and matching defaults, discount handling, prepayment defaults, approval behavior, and self-service invoice settings.
- **Payment options** — default payment-related behavior for invoices created in this business unit.
- **Tax options** — how this business unit's invoices interact with transaction tax calculation (Chapter 3 goes deeper on invoice tax).

## Tolerances: the setting that produces your first holds

**Tolerances** define how much variance is acceptable between what an invoice says and what the matched purchase order or receipt says, before Payables stops and places a hold. Two tolerance sets matter most:

- **Quantity tolerances** — how much the quantity billed can exceed the quantity ordered or received before a hold is raised.
- **Amount/price tolerances** — how much the price or extended amount billed can exceed the PO price before a hold is raised.

If Brightfield sets a 5% price tolerance and a supplier invoice comes in 3% over the PO price, the invoice validates cleanly. At 7% over, it gets a matching hold. Chapter 4 (validation and holds) and Chapter 5 (matching) both come back to this setting constantly — it's worth remembering it lives here, in invoice options, not somewhere on the invoice itself.

## Discount options: automated, not manual

Rather than an AP clerk deciding supplier-by-supplier whether to take an early-payment discount, Invoice Options sets defaults like:

- **Always take discount** — take the available discount for a supplier regardless of when the invoice is actually paid.
- **Exclude tax from calculation** / **exclude freight from calculation** — whether tax or freight amounts count toward the discountable base.
- **Discount allocation method** — how a taken discount gets spread back across the invoice's distributions for accounting purposes.

## Prepayment defaults

Prepayment options set defaults used whenever someone creates a prepayment invoice (an advance payment to a supplier before the related goods or services are billed) — for example, default payment terms for prepayments and settlement days, the number of days added to calculate when the prepayment should settle. Chapter 5 covers prepayments and applying them in full.

## Recap

What used to be three separate screens in older Payables products is one business-unit-scoped page in Fusion: Manage Payables System Options, with invoicing, payment, and tax areas. Tolerances there are the setting most responsible for the holds you'll meet in Chapter 4; discount and prepayment defaults quietly shape invoice behavior without anyone touching a given invoice directly. Next up, lesson 5: payment terms and how Payables actually calculates a due date.
