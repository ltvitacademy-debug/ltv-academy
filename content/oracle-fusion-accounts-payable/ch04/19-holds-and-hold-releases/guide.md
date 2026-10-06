# Holds and Hold Releases

Lesson 18 kept saying validation "applies or releases holds" without stopping to say what a hold actually is, where it comes from, or how it goes away. This lesson closes that gap: the categories of holds Payables uses, and the very different ways each category gets released.

## What you'll learn

- The main categories of holds and what each one is reacting to
- Why some holds release themselves and others need manual intervention
- Where to actually click to release a hold, across several possible screens
- Why an invoice can carry more than one hold at a time

## The main hold categories

Holds group roughly into a handful of categories, each reacting to a different kind of problem:

- **Account holds** — the invoice distribution references an invalid or incorrect GL account combination.
- **Matching holds** — the invoice violates matching criteria against its purchase order or receipt (price, quantity) beyond the configured tolerance (lessons 4 and Chapter 5).
- **Variance holds** — the invoice's own numbers don't add up internally, such as the invoice amount not equaling the sum of its distributions (lesson 14).
- **Funds holds** — for budgetary control organizations, the invoice distribution amount exceeds available budget.
- **Installment holds** — placed on a specific installment rather than the whole invoice, sometimes manually (to stop one installment from paying while the rest proceed) and sometimes automatically (like an amount-limit hold if the invoice exceeds a configured limit for that supplier).
- **Supplier site holds** — a hold condition tied to the site itself, such as "matching required" when a site requires PO or receipt matching but the invoice wasn't matched.

An invoice is not limited to one hold — as lesson 18 noted, several unrelated holds can be present simultaneously, each needing its own resolution.

## Automatic release vs. manual release

This is the distinction that actually matters day-to-day:

- **Automatically releasable holds** — holds the application itself placed, based on a condition it can re-check. Run validation again after the underlying problem is fixed (say, the GL account combination corrected, or the invoice amount edited to match its distributions), and the hold clears itself as part of that re-validation, with no separate "release" click needed.
- **Manually releasable holds** — some holds, including certain system holds like a line or distribution variance, cannot simply be released by clicking a button; they only go away by correcting the invoice and running validation again. Other holds — most notably a manually placed hold someone added on purpose — are released only by a deliberate action, and even then only if that hold was configured to allow manual release in the first place. There's also a setting (Release Manual Holds) that lets validation evaluate even manually-placed holds for automatic release, if an organization wants that behavior.

## Where you actually release a hold

Depending on the screen you're in, hold release shows up in several places: a Release button on the Payables dashboard or the Invoices landing page, a Manage Holds action from the Create/Edit Invoice page, the Validate action itself (which re-checks and can clear self-resolving holds), a Release button on the invoice details page, or a Release Holds action from the Manage Invoices page. They all ultimately do the same job — the right one to use just depends on where you're already working.

## A worked example

Brightfield's invoice from Vantree Industrial Parts comes back from validation with two holds: a **matching hold** (price 7% over tolerance) and an **account hold** (a distribution posted to an inactive account). The account hold is fixed by editing the distribution's account and re-validating, which clears it automatically. The matching hold requires either a tolerance override (with appropriate authority) or getting Vantree to correct the PO price — simply clicking "release" without addressing the underlying mismatch is not how this particular hold is designed to be cleared.

## Recap

Holds fall into categories — account, matching, variance, funds, installment, and supplier site — each reacting to a different problem, and an invoice can carry several at once. Application-placed holds that are configured for it typically clear through re-validation after the underlying issue is fixed; manually placed holds need a deliberate release action, and some system holds can only be removed by correcting the invoice. Next up, lesson 20: invoice approvals, the workflow that runs once an invoice is clean.
