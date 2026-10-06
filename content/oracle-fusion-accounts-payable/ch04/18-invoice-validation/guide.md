# Invoice Validation

Every lesson in Chapter 3 ended with some version of "but it still needs to pass validation." This is the lesson that finally explains what that actually means. **Validation** is the single process standing between a saved invoice and an invoice that's allowed to move toward approval, accounting, and payment — and it does considerably more than just check for typos.

## What you'll learn

- What the Validate action actually does, step by step
- Why validation both generates distributions and checks them
- How validation interacts with matching, tax, and budgetary control in one pass
- What "Invoice Status: Validated" actually certifies

## Validation is not optional, and it's not just a typo check

Lesson 2 established that invoice status, approval status, accounting status, and payment status are independent fields. **Invoice status** is specifically what validation controls — an invoice cannot be accounted or paid until it reaches a Validated status. Before that happens, running the **Validate** action triggers a surprising amount of real work, not a cosmetic check:

- **Generates distributions** — building out the actual GL distributions from the invoice's lines, default coding, any distribution set applied, and freight/miscellaneous allocations (Chapter 3).
- **Calculates tax** — invoking Oracle Fusion Tax to create the invoice's tax lines and distributions (lesson 17).
- **Calculates withholding**, where applicable, generating any withholding-related invoices or distributions.
- **Checks matching variances** — comparing ordered, received, consumed, and invoiced quantities or amounts against configured tolerances (lesson 4, and Chapter 5 in depth).
- **Checks the GL period status** — an invoice can't validate into a period that's closed.
- **Checks conversion rate information** — for invoices in a foreign currency, confirming the exchange rate data needed to account the invoice is present and usable.
- **Applies or releases holds** — the natural output of all the checks above.
- **Reserves funds**, for organizations using budgetary control, and holds the invoice if funds aren't available.

## Why this matters: one action, many systems

It's worth noticing how much ground a single Validate click covers — tax, matching, currency, GL period, and (for some organizations) budgetary control all get checked in the same pass. This is exactly why a single invoice can come back from validation with several different holds stacked on it at once: a price variance from matching *and* a closed-period problem *and* an insufficient-funds hold are all plausible on the same unlucky invoice, because validation evaluates all of these independently rather than stopping at the first failure.

## What "Validated" actually certifies

When an invoice reaches **Validated** status, it means: distributions exist and are generated correctly, tax and (if applicable) withholding have been calculated, matching variances fall within tolerance (or there are none to check), the GL period is open, currency conversion data is sound, and no unresolved holds remain. It does *not* mean the invoice has been approved (a separate status, lesson 20) or paid (also separate, Chapter 6) — Validated is specifically the invoice-status field clearing, nothing more and nothing less.

## Recap

Validation is the process, triggered by the Validate action, that generates and checks an invoice's distributions, tax, withholding, matching variances, GL period status, and currency data — and applies or releases holds based on all of it in one pass. Validated status means the invoice itself is clean; it says nothing about approval or payment. Next up, lesson 19: holds and hold releases, what happens when validation finds a problem.
