# Customer Statements

A dunning letter (lesson 32) is a pointed message about a specific overdue amount. A **customer statement** is the broader, routine document: a periodic summary of everything on a customer's account — every transaction, every payment, every remaining balance — the same basic idea as a monthly credit card statement. This lesson covers what a statement includes, who gets one, and how statement cycles are configured.

## What you'll learn

- What a customer statement includes
- Statement cycles and frequency
- Which customers receive statements, and which don't
- Statement messages and how they differ from dunning letters

## What's on a statement

A standard Receivables statement typically includes:

- Every open transaction, with transaction number, date, due date, and remaining balance
- Payment activity for the period — receipts applied, credit memos issued
- A running or ending account balance
- Aging information, often broken into the same buckets used in aging reports (next lesson)
- A statement message, if one is configured — a short printed note, which can be purely informational ("Thank you for your business") or softly collections-oriented ("Please remit payment for amounts over 30 days past due") depending on how overdue the account is

The key difference from a dunning letter: a statement is informational and routine, covering the whole account regardless of whether anything is overdue, while a dunning letter is specifically a collections escalation tool triggered by past-due amounts.

## Statement cycles

Statements are usually generated on a recurring cycle — monthly is the most common, though some companies run them more or less frequently depending on customer volume and industry norms. The statement cycle can be configured per customer or customer site, since not every customer needs the same cadence; a high-volume wholesale account might get a statement every month without exception, while a smaller, infrequent customer might only need one when there's actually an open balance.

## Who gets a statement

Not every customer automatically receives a statement. A customer profile (set up back in Chapter 2) typically includes a flag controlling whether statements are sent, and some companies restrict statements only to customers who currently carry an open balance, to avoid mailing a routine zero-balance statement to every customer every month regardless of activity. This is a configuration decision made with the customer's profile and the company's own customer-service philosophy in mind.

## Statement messages

Because a statement goes to every customer with activity — not just delinquent ones — Receivables supports **statement messages** that can vary depending on how overdue the account is. A customer with everything current might get a plain "thank you," while a customer carrying a 60-day-past-due balance might get the same statement format but with a firmer message appended, all without the heavier escalation structure of a formal dunning letter. This gives a lighter-touch nudge alongside the routine document, before things reach the point of a dedicated collections letter.

## Recap

A customer statement is a routine, periodic account summary covering every transaction and payment, distinct from a dunning letter's pointed collections purpose. Statement cycles and whether a customer receives one at all are configurable, and statement messages can vary with how overdue the account is, giving a gentle nudge without full dunning escalation. Next up, lesson 34: aging reports, the tool that quantifies exactly how overdue every customer's balances are.
