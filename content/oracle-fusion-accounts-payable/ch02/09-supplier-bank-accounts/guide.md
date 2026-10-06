# Supplier Bank Accounts

Lesson 7 flagged the Payments tab as "where the bank account eventually attaches," and promised we'd come back to it. This is that lesson. A bank account on a supplier record is what makes electronic payment possible at all, and it's one of the pieces most often missing when a perfectly valid, approved invoice still can't be paid.

## What you'll learn

- Why a bank account is required for electronic payment, but not for a check
- What has to be specified for domestic versus international electronic payments
- How Oracle Fusion protects a stored account number from casual exposure
- What a missing or incomplete bank account looks like from the AP side

## Electronic payment needs a bank account; a check doesn't

To pay a supplier electronically — by EFT (electronic funds transfer) or similar methods — Payables needs a bank account on file for that supplier. A domestic check payment, by contrast, doesn't require a bank or branch on the supplier's account at all; the check simply gets printed and mailed. This is why a brand-new supplier can sometimes be paid immediately by check while their electronic payment setup is still catching up — and also why forcing a supplier onto EFT before their bank details are complete is a common way to generate a payment failure.

## Domestic vs. international requirements

For a **domestic** electronic payment, Fusion can often work with just the account number and basic routing information for the country involved. For an **international** electronic payment, more is required: both a specific **bank** and **branch** need to be identified on the account, because cross-border payment rails need to know exactly which financial institution and location are receiving the funds, not just an account number. If Brightfield onboards an international supplier and skips specifying the bank and branch, the payment can validate everywhere else and still fail at the point of actually transferring funds.

## Masking protects the account number

Because a bank account number is sensitive, Fusion doesn't display it in full once stored. A profile option controls how the number is **masked** — the default commonly shows only the last four digits, similar to how a credit card statement masks most of its digits. The original full number remains stored for processing, but casual viewing (even by AP staff) only shows the masked version unless someone has the specific access needed to see more. This is a security control, not a bug, if a report or screen shows "****1234" instead of the full account number.

## What an incomplete bank account looks like from AP's side

If a supplier's bank account is missing entirely, or missing the bank/branch detail an international payment requires, the invoice itself can still validate and get approved cleanly — remember, invoice validation and payment are two separate statuses from lesson 2. The failure shows up later, at the payment step: either the supplier never gets selected for a payment run that requires electronic details, or a payment file generation step errors out. Chapter 6 covers payment process requests and payment files in detail; the point here is simply to recognize that this particular failure traces back to the supplier's bank account, not to anything wrong with the invoice.

## A worked example

Brightfield's fictional supplier **Vantree Industrial Parts** is a domestic US supplier and needs only its account number and domestic routing details to be paid by EFT. A separate fictional supplier, **Nordwell Freight Partners**, based overseas, requires both a bank and branch specified on its account before Brightfield's international payment method will work for them — until that's done, Vantree can be paid by EFT quickly while Nordwell may need to be paid by an alternate method or wait on setup.

## Recap

A bank account is required for electronic payment, not for a check; international payments additionally require a specific bank and branch, not just an account number. Fusion masks the stored account number for security, and a missing or incomplete bank account surfaces as a payment-stage failure, not a validation-stage one. Next up, lesson 10: supplier registration and qualification, how a prospective supplier becomes a trusted one in the first place.
