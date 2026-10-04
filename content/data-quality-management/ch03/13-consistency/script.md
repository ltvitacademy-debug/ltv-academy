# Lesson 13 — Consistency · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Consistency isn't "is it true" and it isn't "is it well-formed." It's
a third question entirely: does this value agree with the other copies
of the same fact?

## S2 · STEPS — What consistency means

A state code can be perfectly valid — a real two-letter code — and
still be inconsistent, if the zip code in the very same row is
actually in a different state. Consistency checks agreement, not
truth and not format.

## S3 · STEPS — Two kinds of consistency

Internal consistency: two columns in the same row agree with each
other — an order date that's never before the customer's own signup
date. Cross-system consistency: the same fact, stored in two different
systems, agrees — a customer's email in the CRM matches their email in
billing.

## S4 · CODE — Internal consistency check

One query, one table. Join orders to customers and flag any order
dated before that customer even signed up — a relationship that should
never be able to happen, and did.

## S5 · CODE — Cross-system consistency check

Now the same fact lives in two systems. Join CRM customers to billing
customers on the shared key and pull back every row where the email
disagrees between them.

## S6 · STEPS — The key difference from accuracy

This query looks almost identical to the accuracy check from Lesson
eleven — and that's the point. An accuracy check tells you a value is
wrong. A consistency check only tells you two copies disagree. Which
one is actually correct is a separate question.

## S7 · OUTRO

Consistency finds the disagreement. It doesn't resolve it. Next up:
validity — the dimension that's easiest to automate, because it's
purely about rules.
