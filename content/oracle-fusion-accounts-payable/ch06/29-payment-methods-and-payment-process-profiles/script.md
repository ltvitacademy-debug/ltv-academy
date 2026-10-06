# Lesson 29 — Payment Methods and Payment Process Profiles · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 6, Payments. We start with the two concepts everything else in this chapter builds on: payment methods, and payment process profiles.

## S2 · STEPS

A payment method is simply the mechanism: check, a printed paper check; electronic funds transfer, a direct bank-to-bank transfer; or wire, for urgent or high-value payments. Each supplier site can be restricted to specific allowed methods, tied to whatever bank account details are actually on file.

## S3 · STEPS

But choosing EFT doesn't tell you which bank account funds it, which file format gets generated, how invoices get grouped, or what the payment limits are. That's what a Payment Process Profile defines: the method it applies to, the disbursement account, the file format, grouping rules, and processing limits.

## S4 · CODE

Here's an illustrative example. Cascade Industrial Parts, a domestic fictional supplier, is paid by EFT through a profile called US Domestic ACH, generating a NACHA file from the primary disbursement account. BrightPath Consulting Group, an international fictional supplier, is also paid by EFT — but through a completely different profile, International Wire and SEPA, generating an ISO twenty-oh-twenty-two file from a separate foreign-currency account.

## S5 · STEPS

Same payment method on paper, two different profiles underneath, because the file format and the bank account aren't interchangeable. Keeping these as two layers lets an organization route payments correctly by currency or geography without any of that complexity showing up on the invoice itself.

## S6 · OUTRO

Method is the mechanism; the profile is the rulebook behind it. Next up, lesson thirty: disbursement bank accounts, the source every one of these payments actually draws from.
