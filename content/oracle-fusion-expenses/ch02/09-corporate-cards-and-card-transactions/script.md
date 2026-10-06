# Script — Corporate Cards and Card Transactions

## Segment 1 (title)

This lesson closes Chapter 2 with corporate cards, the single most common way expense transactions enter Oracle Fusion Expenses at a company like Castellan. Instead of typing every amount by hand, card transactions arrive already dated, amounted, and merchant-coded.

## Segment 2 (steps)

A corporate card program has three pieces. The program itself: which issuer, which business units. A usage policy: the allowable amount per category that can still go on cash before the card is required instead. And transaction feed code mapping: the merchant's category code maps automatically to an expense type, so a restaurant charge defaults to Business Meal instead of landing unclassified.

## Segment 3 (steps)

Card issuers send transaction files on a regular schedule, typically daily. Each one lands as an unassigned card transaction tied to the card holder. The employee sees these in a queue separate from manual entries, and for each one confirms or corrects the guessed expense type, adds justification if needed, and attaches it to a report. Nothing posts to the ledger until that report gets submitted through the normal lifecycle.

## Segment 4 (steps)

There are two liability models, and they decide who Payables actually pays. Individual-liability: the employee owes the issuer personally, so once the report is approved, Payables reimburses the employee, who pays their own bill. Company-liability: Castellan owes the issuer, so Payables pays the issuer directly and the employee is never reimbursed for that line.

## Segment 5 (code)

Castellan uses company-liability cards for frequent travelers, to reduce their personal cash-flow risk, and doesn't issue cards at all to occasional travelers, who use personal cards and get reimbursed normally. Individual-liability pays the employee. Company-liability pays the card issuer.

## Segment 6 (outro)

A card charge that sits unassigned too long is a real problem - a liability with no accounting entry and no justification on file. Castellan's audit rules flag unassigned transactions older than thirty days and escalate to the manager. That closes Chapter 2. Up next, Chapter 3 begins with lesson ten: expense audit rules, the automated checks we've referenced throughout this chapter.
