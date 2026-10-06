# Lesson 33 — Payment Files and Electronic Payments · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Once a payment process request has built its payments, something actually has to go to a printer or to a bank. This lesson is about that final output.

## S2 · STEPS

Two broad outputs exist. A printed document, a check layout rendered through Oracle's template engine. Or an electronic payment file, a structured data file the receiving bank can process automatically. Which one gets generated is determined entirely by the payment process profile, set up once, not chosen per run.

## S3 · STEPS

The common electronic formats each have their own lane. NACHA handles US domestic ACH transfers. ISO twenty-oh-twenty-two is the international standard, especially common for SEPA transfers in Europe. BAI2 shows up more for bank statement reconciliation than outbound payment, but it's worth knowing by name.

## S4 · CODE

Here's an illustrative example. Cascade Industrial Parts is paid through the US Domestic ACH profile. Once its proposed payment is approved, the PPR formats a NACHA file with the routing number, account number, and amount, ready for transmission.

## S5 · STEPS

For checks specifically, many organizations also generate a positive pay file — a separate file listing every check issued, sent ahead to the bank. When a check is presented, the bank checks it against that file. Anything that doesn't match gets flagged instead of paid automatically. It's a fraud control unique to paper checks.

## S6 · OUTRO

Format is decided once, by the profile; positive pay adds a fraud check specific to paper. Next up, lesson thirty-four: voiding, stopping, and reissuing payments, for when something goes wrong after the file is already out the door.
