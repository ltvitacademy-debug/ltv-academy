# Lesson 23 — The Unpaid Invoices Challenge · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson one's question, finally built for real: every unpaid supplier
invoice over ten thousand dollars that's more than thirty days old. You
now have every tool you need. Let's build it.

## S2 · STEPS CARD (breaking the question into conditions)

Three business phrases, three conditions. Unpaid supplier invoice: payment
status flag not equal to Y. Over ten thousand: invoice amount greater than
ten thousand. More than thirty days old: that one doesn't even live on the
invoice — it's on the payment schedule table, due date, not on
AP_INVOICES_ALL at all.

## S3 · CODE CARD (the full query)

Join invoices to suppliers for a readable name, join invoices to payment
schedules for what's actually still owed and when it was due, then filter
on all three conditions at once. Notice it's amount remaining being
compared to ten thousand, not the original invoice amount — a partially
paid invoice might have started above ten thousand but have less than
that actually outstanding now. Over ten thousand should mean what's still
owed.

## S4 · STEPS CARD (sanity-checking the result)

Before this goes anywhere near Finance: is days overdue always positive?
Does the supplier name look like a real company, not blank or garbled?
This exact kind of review is what catches a join mistake — like
accidentally using an outer join where an inner join was intended, quietly
letting in rows that shouldn't qualify.

## S5 · STEPS CARD (the general method)

And here's the method for the next new question, whatever it is:
translate each business phrase into a condition, find which table each
condition actually lives on, join only what you need, filter everything
at once, and sanity-check before you trust it.

## S6 · OUTRO CARD

That's the flagship challenge, built end to end. Next lesson: tracing a
single payment all the way back to its invoice — an audit trail, not a
list.
