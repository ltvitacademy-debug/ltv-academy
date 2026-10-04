# Lesson 3 — Business Impact of Data Quality

**Chapter 1 · Foundations · Lesson 3 of 30**

## What you'll learn

- Two real, sourced dollar figures for what bad data costs
- The four concrete ways poor data quality shows up as business damage
- Why data quality problems are usually invisible until something breaks
- How to make the business case for data quality work to people who
  don't care about databases

## This isn't an abstract problem

It's easy to treat data quality as a technical housekeeping concern —
something a database administrator worries about so the rest of the
business doesn't have to. The research says otherwise. Bad data has a
real, measurable price tag, and it's paid by the whole organization,
not just the data team.

## Two sourced numbers worth knowing

- **Gartner research puts the average cost of poor data quality to
  organizations at $12.9 million per year.** That figure comes from a
  reference-customer survey behind Gartner's data quality research and
  is widely cited as the field's benchmark number — see Gartner's own
  data quality topic page for the current figure:
  [gartner.com/en/data-analytics/topics/data-quality](https://www.gartner.com/en/data-analytics/topics/data-quality).
- **IBM estimated the yearly cost of poor-quality data to the U.S.
  economy alone at $3.1 trillion**, a figure reported by data quality
  researcher Thomas C. Redman in the *Harvard Business Review*. See
  ["Bad Data Costs the U.S. $3 Trillion Per Year"](https://hbr.org/2016/09/bad-data-costs-the-u-s-3-trillion-per-year)
  (HBR, September 2016).

Treat these as directional, not gospel — IBM's own methodology behind
the $3.1 trillion figure was never fully published, and both numbers
are organization- and era-specific. The honest takeaway isn't the exact
digit; it's that independent researchers, years apart, both landed on
"a meaningful fraction of the economy" rather than "a rounding error."

## Four concrete ways the cost shows up

The dollar figures above are totals — here's where that money actually
leaks out, lesson by lesson, department by department:

1. **Bad decisions made with confidence.** A forecasting model built on
   inconsistent regional sales data (Lesson 13's consistency dimension)
   doesn't fail loudly — it quietly produces a wrong-but-plausible
   number that a VP acts on anyway, because nothing *looks* broken.
2. **Wasted operational time.** Data analysts and engineers routinely
   spend a large share of their week — multiple industry surveys put it
   at somewhhere around half — cleaning and reconciling data before
   they can do any actual analysis with it. That's salaried time spent
   fixing problems Chapter 4's rules and checks exist to catch earlier.
3. **Direct customer-facing failures.** An inaccurate shipping address
   (Lesson 11) means a returned package, a frustrated customer, and a
   second shipment the company pays for twice.
4. **Compliance and regulatory exposure.** Industries with data
   accuracy requirements — financial reporting, healthcare records,
   anything tied to an audit — can face fines or failed audits directly
   traceable to a specific bad field, not a vague "our data is messy"
   excuse.

## Why it stays invisible until it doesn't

Data quality problems rarely announce themselves. A `NULL` in a
rarely-used column, a duplicate customer record, a stale timestamp —
none of these throw an error. They sit quietly until a report is wrong,
a customer complains, or an auditor asks a question nobody can answer
cleanly. That silence is exactly why Chapter 2's profiling techniques
matter: profiling finds these problems *before* they surface as a
business incident, instead of after.

## Making the business case

When you need to justify data quality work to someone who isn't going
to read a SQL query, translate the problem into the four categories
above with your organization's own numbers, not Gartner's or IBM's:
how many hours did the team spend last month reconciling two reports
that didn't match? How many support tickets trace back to a bad
address or duplicate account? Specific, local numbers persuade far
more reliably than citing someone else's trillion-dollar statistic.

## Key terms

| Term | Meaning |
|---|---|
| Cost of poor quality (COPQ) | The total measurable business cost attributable to bad data |
| Reconciliation | Manually comparing and correcting mismatched data across systems |
| Invisible failure | A data quality defect with no error message — it just produces a wrong result |

## Lab

1. Think of one report, dashboard, or spreadsheet you or your
   organization relies on regularly.
2. Identify one specific way a data quality problem (pick one of the
   six dimensions from Lesson 2) could silently make that report wrong
   without throwing any error.
3. Estimate, even roughly, what it would cost if that wrong number were
   acted on — a missed sale, a wasted week of work, a bad hire, a wrong
   inventory order. Write one sentence stating that cost in plain
   business terms (not "the JOIN produces duplicate rows" but "we'd
   overstate revenue by roughly $40,000 this quarter").

## Check yourself

Can you state both sourced figures from this lesson (Gartner's and
IBM's) along with which dimension of data quality is most likely to
cause an invisible failure in a report you actually use? If yes, you're
ready for Lesson 4's look at who's actually responsible for preventing
this.
