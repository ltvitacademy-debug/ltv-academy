# Common Enterprise Structure Mistakes

This course closes with the mistakes that recur across real Oracle Fusion implementations — not because the concepts are themselves difficult, but because enterprise structure decisions get made early, under time pressure, and then become expensive to undo. Knowing this list is often what separates a consultant who prevents a problem from one who inherits it.

## What you'll learn

- The most common chart of accounts and segment design mistakes
- The most common ledger and legal entity mistakes
- Why most of these mistakes trace back to skipping Chapter 2's design step
- A closing look at where this path goes next

## Chart of accounts and segment mistakes

```
Common Chart of Accounts Mistakes:
  - Too many segments "just in case" (Lesson 5's over-engineering warning)
  - No reserved/Future segment, forcing a disruptive redesign later
  - Cost center segment omitted, then needed for Assets or Expenses
  - Cross-validation rules written against individual values, not hierarchies
  - Cross-validation rules deployed but never actually tested (Lesson 28)
```

Over-engineering and under-planning are, perversely, often the same root mistake: skipping the design conversation from Lesson 5 and either guessing high (too many segments) or guessing narrow (no room for predictable growth).

## Ledger and legal entity mistakes

```
Common Ledger & Legal Entity Mistakes:
  - Legal entity registered with no legal address prepared first
  - Balancing segment value not assigned per legal entity (Lesson 9)
  - Ledgers grouped into a ledger set despite different charts of accounts
  - Reference data sets over-segmented when the Common Set would do
  - Calendar or currency decided without consulting statutory requirements
```

The single most damaging mistake on this list is skipping the balancing-segment-value-to-legal-entity assignment from Lesson 9: it silently breaks the ability to produce a clean trial balance per legal entity, and it often isn't discovered until someone actually needs that separated report — usually at period close, under pressure, far later than when the mistake was made.

## Why these trace back to one root cause

Nearly every mistake on both lists traces back to the same root cause this course opened Chapter 2 with: skipping deliberate design in favor of configuring quickly. A consultant under deadline pressure who starts clicking through setup tasks before answering "how many legal entities, currencies, and reporting requirements does this business actually have" is setting up exactly the kind of structure that needs the disruptive redesigns this course has repeatedly warned about.

## Where this path goes next

This course covered the enterprise structures and chart of accounts that every other Financials module depends on. With legal entities, ledgers, business units, calendars, currencies, and the chart of accounts now understood from the ground up, you are ready for the next course in the Oracle Fusion Financials Consultant path: **Oracle Fusion General Ledger**, where you'll put this foundation to work recording and reporting real journal activity against the structure you now know how to build.

## Recap

Most enterprise structure mistakes — over-engineered or under-planned charts of accounts, skipped balancing-segment assignments, mismatched ledger sets, and untested cross-validation rules — trace back to skipping deliberate design. That completes Enterprise Structures and Chart of Accounts. Next up in this path: Oracle Fusion General Ledger.
