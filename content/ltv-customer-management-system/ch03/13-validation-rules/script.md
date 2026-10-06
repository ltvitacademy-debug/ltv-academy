# Lesson 13 — Validation Rules · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Four validation rules, across three objects, each one closing a real data-quality gap in Cascade's build — not a generic required-field example.

## S2 · CODE — Loss Reason required on Closed Lost

Rule 1 finally builds what Lesson 8 set up and deferred: Loss Reason becomes required, but only the moment Stage is set to Closed Lost. Every other stage still saves fine with it blank.

## S3 · STEPS — The Decision Maker rule

Rule 2 makes good on a promise from Lesson 6. It needs one new field first — Primary Contact, a lookup to Contact, added to Opportunity right in this lesson — so there's something concrete to check the Decision Maker flag against.

## S4 · CODE — The Decision Maker rule, built

The rule itself blocks a move to Negotiation/Review or Closed Won unless a Primary Contact is set and that Contact's Decision Maker checkbox is true. The __r relationship name is what lets this formula reach across from Opportunity to a field on the related Contact.

## S5 · CODE — Target Install Date

Rule 3 is simpler: Target Install Date on an Installation Project can't be in the past. One line, but it stops a real scheduling mistake before it happens.

## S6 · CODE — Annual Value

Rule 4 keeps Service Contract's Annual Value honest — it has to be greater than zero, so bad contract data never reaches the renewal reports you'll build in Chapter 4.

## S7 · OUTRO

Next lesson, you'll build an approval process — routing any Opportunity with a big enough discount to Monica Reyes before it can close.
