# Lesson 32 — Payment Process Requests · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Hundreds of invoices can be due on a single day. The Payment Process Request is how Payables handles that at scale.

## S2 · STEPS

A PPR moves through five stages. Selection scans open, validated, unpaid invoices against criteria you define. Build proposed payments groups them according to the payment process profile's rules. Review lets someone check the batch before anything is final. Build payments creates the actual payment records. And format generates the output — a check layout or an electronic file.

## S3 · STEPS

Selection criteria matter a lot here. Pay-through date controls which due dates get picked up. Pay group separates different invoice populations, like employees versus trade suppliers. Business unit restricts the run. And payment priority can sequence which invoices get paid first if funds are limited.

## S4 · CODE

Here's an illustrative example. Solace Robotics runs a weekly PPR every Thursday for its Trade Suppliers pay group. It selects forty-two validated invoices across fifteen suppliers, groups them into fifteen proposed payments, one per supplier, under the US Domestic ACH profile.

## S5 · STEPS

Before anything is final, the AP supervisor reviews that batch — and pulls one supplier's invoice out because a credit memo is expected imminently. The remaining fourteen proposed payments get approved, and the PPR builds and formats them into a NACHA file.

## S6 · OUTRO

Selection, grouping, review, build, format — automated at scale, but never without a human checkpoint before money moves. Next up, lesson thirty-three: payment files and electronic payments, the output this whole process is building toward.
