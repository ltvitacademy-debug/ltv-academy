# Lead Conversion Analysis

Marketing hands sales a stream of leads, and the first question leadership asks is simple: how many of them turn into real business? In this lesson you will build the native reports that measure lead conversion rate, time to convert and source quality, and you will learn the traps that make a conversion report look better or worse than reality.

## What you'll learn

- Which standard report types describe converted and unconverted leads
- How to calculate conversion rate by source, owner or campaign
- How to measure days to convert with a row-level formula
- Why conversion rates need a cohort filter to be fair

## What "converted" means

In the Fundamentals course you saw that converting a lead creates an Account and Contact, and optionally an Opportunity, while the lead record itself stays in the database with its **Converted** checkbox set to true. That is what makes conversion reportable: converted leads do not disappear. Two report types cover most needs. The standard **Leads** report type gives you every lead with its status, source, owner and dates. The **Leads with Converted Lead Information** type adds the account, contact and opportunity that the conversion created, so you can follow a lead all the way to revenue. Exact names can vary slightly with release, so browse the Leads category in the report type picker.

## Conversion rate by source

The basic question is what percentage of leads from each source converted. One reliable way to build it:

- Report type: Leads
- Format: Matrix
- Rows: Lead Source
- Columns: Converted
- Metric: Record Count

Each row now shows converted and unconverted counts side by side, and the row total is all leads from that source. The rate is converted divided by total. You can also make the rate a single column using a row-level formula that returns 1 for converted leads and 0 for the rest (an IF on the Converted field), then average that formula by group. The average of ones and zeros is the conversion rate.

## Time to convert

Speed matters as much as rate. A second row-level formula can subtract the lead's Created Date from its Converted Date to give days to convert. Summarize it as an average and a maximum, grouped by source or owner, and filter to converted leads only. A source that converts slowly can still be valuable, but it should not be staffed like one that converts in a day. Formula details were covered in Chapter 3, and date arithmetic in report formulas is worth checking against your org before you publish it.

## The cohort trap

Suppose you report on all leads created this month. Most of them are only days old, so of course few have converted yet. Comparing that month to a mature month makes marketing look worse than it is. Fix it in one of two ways:

- Report on leads created in a closed period, such as three months ago, so every lead has had time to convert
- Group by Created Date (month) and read the rate as a cohort, expecting the newest months to still be climbing

## Other things to check

- **Lead Status values are custom.** Do not assume "Qualified" or "Working" exist; read your picklist first.
- **Duplicates and junk.** If bad leads are deleted or never worked, your denominator changes. Decide whether to filter out unqualified or spam statuses and say so on the report.
- **Conversion is not creation of an opportunity in every org.** Some teams convert leads without creating one. If you care about pipeline, use the converted opportunity information rather than the checkbox alone.

## Recap

Leads stay in the database after conversion, so a matrix of Lead Source by Converted gives you rate by source, and a row-level formula gives you time to convert. Always control for lead age with a cohort filter, and confirm your org's status values and conversion habits before you publish a number.
