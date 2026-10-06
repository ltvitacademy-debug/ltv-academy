# Fiscal Year and Currencies

**Chapter 2 · Configuring the Organization · Lesson 13 of 36**

Two more org-wide settings round out this early part of the chapter, and both are the kind of
decision you make once and live with for a long time: **Fiscal Year**, which defines what "this
quarter" means for every forecast and report in the org, and **Multiple Currencies**, which
lets a global company record deals in the currency they were actually sold in.

## What you'll learn

- The difference between a Standard and a Custom fiscal year
- Why changing the fiscal year later is a serious, data-affecting decision
- What Multiple Currencies turns on, and what "corporate currency" means
- How conversion rates work, and who has to maintain them

## Fiscal Year: Standard vs. Custom

From Setup, enter **Fiscal Year** in the Quick Find box. You're offered two options:

- **Standard Fiscal Year**: pick a start month (the default is January), and whether the fiscal
  year is named for the year it begins in or the year it ends in. This covers the vast majority
  of orgs — a company whose fiscal year just starts in, say, April instead of January.
- **Custom Fiscal Year**: lets you define fiscal periods that don't follow a normal calendar
  month pattern at all (a common need in manufacturing and retail, for 4-4-5 week calendars).
  Once enabled, custom fiscal years **cannot be turned back off** — this is a one-way door.

Changing the fiscal year start month on an existing org shifts every fiscal period going
forward and affects opportunities and forecasts organization-wide, which is why the setup page
itself recommends exporting your data to CSV before making the change.

![A Company Information detail page showing "Fiscal Year Starts In: January" and "Activate Multiple Currencies" checked, alongside Default Time Zone and Corporate Currency fields.](/courses/salesforce-administration/ch02/13-fiscal-year-and-currencies/company-information-fiscal-year.png)
*Fiscal Year Starts In and Activate Multiple Currencies both live on Company Information — this is where the "on" switch is, even though each has its own dedicated setup page for the details.*

## Multiple Currencies: one corporate currency, many active ones

By default, every org has a single **corporate currency** — the currency all amount fields are
ultimately rolled up into for org-wide reporting. Activating Multiple Currencies (via **Activate
Multiple Currencies** on Company Information) doesn't change that corporate currency; it adds
the ability to mark additional currencies **Active**, each with its own conversion rate against
the corporate currency.

Once active, every user gets a personal default currency on their user record, and every
opportunity, quote, and other amount-bearing record is created in a specific currency — not
necessarily the corporate one.

![A Conversion Rates edit page: Corporate Currency "U.S. Dollar," with Active Currencies (Euro, British Pound, Japanese Yen, Singapore Dollar) each showing a numeric conversion rate, and Inactive Currencies (Argentine Peso, Brazilian Real) below.](/courses/salesforce-administration/ch02/13-fiscal-year-and-currencies/conversion-rates.png)
*Every active currency needs a conversion rate back to the corporate currency — and someone has to keep these current.*

## Adding a new active currency

From the Currency Setup page, **New** opens a form to pick a currency type, set its conversion
rate to the corporate currency, and set how many decimal places it displays. Once a currency is
active, it can never be deleted — only deactivated — so this is worth getting right the first
time rather than activating currencies "just in case."

![A New Currency edit form with fields for Currency Type (dropdown), Conversion Rate, and Decimal Places, under a note: "Enter information for the new currency. Note that you cannot delete a currency once you activate it."](/courses/salesforce-administration/ch02/13-fiscal-year-and-currencies/new-currency-form.png)
*The warning in the page's own instructions is accurate — activation is permanent.*

## Why conversion rates matter for reporting

Conversion rates aren't automatic or live — they're manually maintained numbers. If EUR/USD
moves and nobody updates the rate, every euro-denominated opportunity rolls up into the
corporate currency at a stale rate. Keeping conversion rates current is an ongoing administrative
responsibility, not a one-time setup task, in any org with Multiple Currencies active.

## Key terms

| Term | Meaning |
|---|---|
| Standard Fiscal Year | A fiscal year defined by a start month, following normal calendar periods |
| Custom Fiscal Year | Fiscal periods that don't follow a normal calendar pattern; cannot be disabled once enabled |
| Corporate Currency | The single currency all amounts ultimately roll up into for org-wide reporting |
| Conversion Rate | The manually-maintained rate converting an active currency into the corporate currency |

## Check yourself

Why does the Currency Setup page prevent you from ever deleting an active currency, only
deactivating it?
