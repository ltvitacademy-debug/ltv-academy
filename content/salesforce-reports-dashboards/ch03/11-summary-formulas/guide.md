# Summary Formulas

Grouping gave you sums, counts, and averages. A **summary formula** lets you calculate on top of those numbers: win rate, average deal size, share of total. If you have written `SUM(Won) / COUNT(*)` in T-SQL, you already understand the idea. The report builder calculates the aggregate first, then applies your formula to the result.

## What you'll learn

- What a summary formula is and which report formats support it
- How to add one from the Columns menu
- The shape of a summary-formula expression, including `RowCount`
- How to control the format and the grouping level where the formula appears
- Why a ratio of sums is the right way to compute a rate
- Honest limits to plan around

## Where summary formulas live

A summary formula works on **summarized** values, so it needs grouped data. That means it is available on summary and matrix reports, not on plain tabular reports. If the Add Summary Formula option is missing, the first thing to check is whether your report has any groupings.

To add one, open the dropdown next to **Columns** in the Outline panel. In the screenshot, the menu offers Add Bucket Column (from Lesson 8) and **Add Summary Formula**. Choose the second, and a formula dialog opens.

## The formula dialog

The dialog asks for a few things, in most orgs:

- **Column name**, which becomes the header, for example `Win Rate`
- **Description**, optional but kind to future readers
- **Format**, such as Number, Currency, or Percent
- **Decimal places**
- **Where will this formula be displayed?** All summary levels, or only specific grouping levels and the grand total

Below that is the formula editor with two tabs, **Fields** and **Functions**. On the Fields tab you search for a numeric field, choose how to summarize it (Sum, Average, Min, or Max), and click **Insert**. The editor writes the token for you, so you rarely type field names by hand.

## The shape of a formula

Summary-formula tokens generally look like a field name, a colon, and the summary type, for example `AMOUNT:SUM`. There is also a built-in `RowCount`, the number of records in the group. Two very common formulas:

```
Win Rate     =  Opportunity.Won:SUM / RowCount
Avg Deal     =  AMOUNT:SUM / RowCount
```

The exact tokens for your object may differ, which is why you insert them from the editor instead of typing them. The screenshot's **Sales Rep Win Rates** report shows the result: a column marked with an fx icon called Win Rate, calculated per Opportunity Owner and again for the grand total.

## Why a ratio of sums matters

Suppose one rep closed 1 of 2 deals and another closed 9 of 10. The team win rate is 10 of 12, about 83 percent. Averaging the two reps' rates (50 and 90) gives 70 percent, which is wrong. A summary formula divides the summed values, so it produces the correct weighted rate at every grouping level. This is one of the strongest reasons to compute rates in a summary formula rather than exporting and averaging.

## Choosing the display level

If you group by Owner and then by Stage, a formula shown at "all summary levels" will appear on every subtotal. Sometimes that is wrong: percent of a parent group only makes sense at the child level. Use the display-level option to show the formula only where it belongs, and keep the grand total in mind.

## Limits to plan around

- Summary formulas need grouped data, so they do not work on tabular reports.
- A report can hold only a limited number of them; the cap has been around ten per report, so check current documentation.
- They calculate on summarized values only. If you need a per-record calculation, that is the next lesson, row-level formulas.
- Dividing by zero produces an error or blank, so wrap ratios defensively, for example with an `IF` on `RowCount`.

## SQL mapping

```sql
SELECT OwnerId,
       SUM(Won) * 1.0 / COUNT(*) AS WinRate
FROM Opportunity
GROUP BY OwnerId
```

Same idea, built with clicks instead of code.

## Recap

Summary formulas calculate on grouped totals. Add them from the Columns menu, insert summarized fields with the Fields tab, use `RowCount` for record counts, set the format and display level, and prefer ratios of sums to averages of ratios. They live only in summary and matrix reports, so a per-row calculation needs a different tool.

## Check yourself

You group Opportunities by Owner and want each rep's win rate, where Won is a numeric field that is 1 for won deals and 0 otherwise. Write the formula in words, and explain why it stays correct on the grand total row.
