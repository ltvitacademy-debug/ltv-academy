# Script — Receivables Setup Review

## Segment 1 (title)

Before anyone can enter an invoice, a set of setup objects has to exist. This lesson is a map of that setup, so when we build each piece in detail over the next few chapters, you already know where it fits.

## Segment 2 (steps)

Everything sits underneath a ledger and a business unit, both defined outside Receivables. From there: system options, one record per business unit, control defaults like AutoAccounting and cash accounts. Payment terms define when an invoice is due. The trading community and customer structure is who you're billing. Transaction types define invoice, debit memo and credit memo behavior. Transaction sources control numbering and manual versus imported entry. Receivables activities default accounting for adjustments and write-offs. Memo lines give reusable descriptions for debit memos and credits.

## Segment 3 (steps)

Order matters here. You can't finish a transaction type until you know what activities and memo lines it touches. You can't set up a customer site until the business unit and its system options exist, because the site ties that customer to a specific business unit. In practice, teams work top-down: ledger and business unit, then system options, then customers, then transaction setup, all before go-live.

## Segment 4 (outro)

Quick self-check: a two percent early-payment discount lives in payment terms. A default GL account for invoices lives in AutoAccounting rules. A bad-debt account for a write-off lives in a receivables activity. A recurring service charge description lives in a memo line. Up next, lesson four: system options and accounting setup, in detail.
