# Lesson 2 — Data Quality Dimensions

**Chapter 1 · Foundations · Lesson 2 of 30**

## What you'll learn

- The six dimensions that make up "data quality" as a measurable thing
- A concrete, real-world example of each dimension failing
- How the dimensions can conflict with each other
- Why Chapter 3 gives each dimension its own full lesson

## Quality is six separate questions, not one

Lesson 1 defined data quality as fitness for use. This lesson breaks
that single idea into the six measurable dimensions that data quality
programs — and this course's Chapter 3 — actually work with. Each
dimension asks a different question about the same data, and a dataset
can score well on some and badly on others at the same time.

## 1. Accuracy — does it reflect the real-world fact?

Accuracy asks whether a value correctly represents the thing it's
describing. A customer record that lists a street address the customer
moved out of two years ago is inaccurate — it may be perfectly
formatted and present, but it's simply wrong. Accuracy is usually the
hardest dimension to check with a query alone, because SQL can't know
what's true in the real world; it can only compare data against other
data or external reference sources (Lesson 11 covers the techniques
that exist anyway).

## 2. Completeness — is anything missing that should be there?

Completeness asks whether all the data that's supposed to exist,
exists. A `NULL` email column on a record that needs one is a
completeness failure. Critically, "complete" depends on context: a
`middle_name` field being `NULL` is often fine; an `order_total` field
being `NULL` on a shipped order usually is not (Lesson 12).

## 3. Consistency — does the same fact agree with itself?

Consistency asks whether the same real-world fact, stored in more than
one place, says the same thing everywhere. A customer whose billing
system lists them in "NY" and whose shipping system lists the same
customer in "New York" might both be *valid* values, but they're
*inconsistent* with each other — and that mismatch breaks any report
that joins the two systems (Lesson 13, and Lesson 20's cross-system
reconciliation checks).

## 4. Validity — does it conform to the rules?

Validity asks whether a value matches its defined format, type, or
allowed set of values. An `order_status` column that's supposed to
only ever contain `Pending`, `Shipped`, `Cancelled`, or `Returned` but
instead contains a row with `Shipp3d` has a validity problem — it's a
typo a `CHECK` constraint should have caught. Validity is the dimension
SQL is best at catching directly, because it's checkable against a rule
without knowing anything about the real world (Lesson 14).

## 5. Uniqueness — does each real thing appear exactly once?

Uniqueness asks whether a single real-world entity — one customer, one
product, one order — is represented by exactly one row, not several.
Duplicate customer records (`John Smith` entered twice from two
different signup forms) inflate counts, split purchase history across
two "different" customers, and quietly break every aggregate report
built on top of that table (Lesson 15).

## 6. Timeliness — is it current enough to be useful right now?

Timeliness asks whether data is fresh enough for the decision being
made with it. A warehouse inventory count that's accurate, complete,
consistent, valid, and unique — but was last refreshed eighteen hours
ago — can still cause a business to oversell a product that actually
sold out ten hours ago. Timeliness is the dimension most tied to *when*
data is used, not just what it contains (Lesson 16).

## The dimensions can conflict

These six aren't independent sliders you can max out separately in
practice — effort spent improving one sometimes comes at the cost of
another. A strict validity rule that rejects any phone number not in
`(XXX) XXX-XXXX` format might *improve* validity while *hurting*
completeness, because legitimate international numbers now get
rejected and the field goes blank instead. Part of the data quality
rules work in Chapter 4 is deciding which dimension matters most for a
specific use — which loops straight back to Lesson 1's fitness-for-use
idea.

## Key terms

| Dimension | One-line test |
|---|---|
| Accuracy | Does the value match the real-world fact? |
| Completeness | Is anything missing that should be present? |
| Consistency | Does the same fact agree with itself everywhere it's stored? |
| Validity | Does the value conform to its defined format/rules? |
| Uniqueness | Does each real-world entity appear exactly once? |
| Timeliness | Is the data current enough for this decision right now? |

## Lab

For a dataset you know well (a spreadsheet, a CRM, a school roster):

1. Pick one column and write one plain-English test for each of the six
   dimensions, as it applies to that column specifically (not every
   dimension will make sense for every column — note which ones don't
   apply and why).
2. Pick one row you suspect has a problem. Name which single dimension
   it's failing, and explain why it isn't one of the other five.
3. Describe one realistic scenario where fixing that row for one
   dimension (say, forcing a stricter format for validity) could hurt a
   different dimension (say, completeness).

## Check yourself

Without looking back at this guide, can you name all six dimensions and
give a one-sentence example of each failing? If you can name five but
keep forgetting one, that's the one to re-read before Lesson 3.
