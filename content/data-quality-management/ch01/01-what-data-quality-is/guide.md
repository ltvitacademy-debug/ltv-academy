# Lesson 1 — What Data Quality Is

**Chapter 1 · Foundations · Lesson 1 of 30**

## What you'll learn

- Why "no errors" is the wrong definition of data quality
- The real definition: fitness for use
- Why the same piece of data can be high quality for one purpose and
  worthless for another
- The six dimensions you'll spend the rest of this course measuring
- Who actually gets to decide whether data is "good enough"

## The definition everyone gets wrong

Ask most people what "data quality" means and you'll get some version of
"data without errors" or "data that's complete." Both sound reasonable.
Both are incomplete, and treating them as the whole definition is how data
quality programs quietly fail.

A table of customer addresses can be 100% complete, perfectly
formatted, and still fail completely at the one thing the business needs
it for — reaching customers by mail — if half the ZIP codes belong to
the wrong state. Completeness didn't save it. Accuracy did, and
accuracy is a different dimension (Lesson 11 covers it in depth).

## The real definition: fitness for use

The data quality field — and the standard most data governance programs
build on, DAMA's *Data Management Body of Knowledge* (DMBOK) — defines
data quality as **the degree to which data is fit for its intended
purpose(s)**, not some abstract standard of perfection.

That one phrase, "fit for its intended purpose," does all the work:

- **It's relative to a use, not absolute.** A customer's phone number
  missing an area code is unusable for an SMS marketing platform but
  completely fine for a support agent who already knows the region.
- **The same dataset can be high quality for one team and low quality
  for another.** Sales might consider a lead list "good" if it has a
  name and email; compliance might consider the exact same list
  unusable without a verified consent timestamp.
- **"Fit for purpose" is a judgment call made by the people who use the
  data**, not a fixed checklist applied by whoever owns the database.
  That's why Lesson 4 spends a whole lesson on who actually holds that
  responsibility.

## Quality is not the same as quantity, cleanliness, or completeness

These three get confused with data quality constantly, and each is only
part of the picture:

- **More data** is not better data — a bloated table with duplicate rows
  and abandoned test records is *lower* quality than a smaller, trusted
  one.
- **Clean-looking data** can still be wrong. A column full of
  perfectly formatted dates is not "quality" if half of them are typos
  (`2095-03-14` instead of `2025-03-14`) that passed formatting checks
  because they're still valid dates.
- **Complete data** can still be unfit for purpose, as the address
  example above shows. Completeness (Lesson 12) is one dimension among
  several — never the whole story by itself.

## The six dimensions, previewed

Data quality isn't one number — it's measured along six distinct
dimensions, each with its own chapter later in this course (Chapters 3
and 4 build directly on this list):

1. **Accuracy** — does the data reflect the real-world fact?
2. **Completeness** — is anything missing that should be there?
3. **Consistency** — does the same fact agree with itself across systems?
4. **Validity** — does the data conform to its defined format and rules?
5. **Uniqueness** — does each real-world entity appear exactly once?
6. **Timeliness** — is the data current enough to be useful right now?

Lesson 2 gives each of these a full, standalone treatment with examples.
For now, just notice that "error-free" doesn't appear anywhere on that
list by itself — it's a mix of all six, weighed differently depending on
what the data is used for.

## Why this definition matters in practice

If you walk into a data quality conversation assuming "quality" means
"zero errors," you'll chase an unreachable, and often pointless, goal —
polishing fields nobody uses while the fields that actually drive
decisions stay broken. Defining quality as *fitness for use* forces a
different, more useful question first: **fit for what, and for whom?**
Every lesson from here forward — profiling (Chapter 2), the six
dimensions (Chapter 3), rules and checks (Chapter 4), remediation
(Chapter 5) — exists to answer that question for a specific, real use
of the data.

## Key terms

| Term | Meaning |
|---|---|
| Data quality | The degree to which data is fit for its intended purpose(s) |
| DMBOK | DAMA's Data Management Body of Knowledge — the field's reference standard |
| Fitness for use | Quality judged against a specific, named purpose, not an absolute standard |
| Dimension | One measurable facet of quality (accuracy, completeness, etc.) — Chapter 3's subject |

## Lab

1. Pick any dataset you have access to at work or school (a spreadsheet,
   a CRM export, even your phone's contacts list).
2. Write down one specific use for that data (e.g., "mailing a renewal
   notice," "calling a customer back," "running a monthly revenue
   report").
3. For that one use only, list three things about the data that would
   make it unfit for that purpose if they were wrong — be specific
   (e.g., "the mailing address's ZIP code" rather than "address
   accuracy").
4. Now imagine a second, different use for the same dataset. Does your
   list from step 3 change? If it does, you've just demonstrated fitness
   for use in your own data.

## Check yourself

Can you explain, in one sentence and without using the word "error,"
why a dataset can be high quality for one team and low quality for
another using the exact same rows? If yes, you're ready for Lesson 2's
tour of the six dimensions.
