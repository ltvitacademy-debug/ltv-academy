# Lesson 22 — Lineage Case Study: A Revenue Report · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A full, illustrative case study: Brightleaf Outfitters, a fictional
mid-sized outdoor-gear retailer, used purely as a realistic composite
scenario — not a real company, and not based on any specific company's
data. A revenue report is off by two hundred thousand dollars, and
we'll trace it start to finish using everything from the first four
chapters, through the same problem, trace, impact, fix structure you'll
reuse on real investigations.

## S2 · STEPS CARD (problem)

Finance flags that this month's revenue report shows $2.1 million, but
the point-of-sale system's own daily totals, added up by hand, come to
roughly $2.3 million. Nobody can immediately say where the $200K
went — the report has looked "probably fine" for over a year, and
nobody currently working on it built the original pipeline.

## S3 · STEPS CARD (trace — five hops)

The analyst pulls up the existing lineage record for the NetRevenue
figure and walks it hop by hop. Source: POS.Transactions, every sale
and return recorded at checkout. Extraction: a nightly job loads
yesterday's rows into stg.Transactions_Raw. Transformation:
stg.Transactions_Clean computes NetAmount as SaleAmount minus
ReturnAmount, filtering out rows where TransactionType equals 'Voided'.
Load: dw.FactSales.NetRevenue sums that cleaned amount by month.
Report: the executive dashboard's NetRevenue tile reads straight from
dw.FactSales.

## S4 · STEPS CARD (the bug)

Using column-level lineage rather than stopping at the table level, the
analyst checks the actual filter condition in that step and finds it:
TransactionType equals 'Voided' was meant to exclude only truly voided
transactions, but a recent POS-side change started tagging all returns
processed after store close with that same 'Voided' type — nobody told
the data team. Those late returns were correctly excluded, but so were
legitimate after-hours sales sharing a transaction batch ID with voided
ones, through a join condition in that same step.

## S5 · STEPS CARD (impact and fix)

Before touching anything, the analyst checks what else reads from that
same transformation step: three other reports depend on it — this is
the root cause, the specific hop where the problem began, quietly
undercounting revenue, inventory, and commissions everywhere
downstream, not just on one report. The fix corrects the filter to key
off the POS system's new, specific VoidReason field. Just as important,
the lineage record itself gets updated to flag this as a fragile
dependency — a hop whose upstream meaning can change without notice.

## S6 · OUTRO CARD

Next up: a second case study — tracing customer data across multiple
systems, where the problem isn't a wrong number but duplicate and
inconsistent records. Same structure: problem, trace, impact, fix.
