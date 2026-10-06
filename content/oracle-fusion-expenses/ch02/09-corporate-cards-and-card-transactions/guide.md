# Corporate Cards and Card Transactions

This lesson closes out Chapter 2 by covering corporate cards, the single most common way expense transactions enter Oracle Fusion Expenses at a company the size of Castellan Supply Co. Instead of an employee typing in every amount by hand, card transactions arrive already dated, amounted, and merchant-coded, and the employee's main job becomes reviewing and assigning them rather than re-entering data.

## What you'll learn

- How a corporate card program is configured, at a high level
- How card transactions get from the issuer into Expenses
- The difference between an individual-liability and company-liability card
- What happens to a card charge an employee never turns into an expense report

## Setting up a corporate card program

A consultant configures a corporate card program in three pieces:

1. **The card program itself** — which card issuer (for example, a major bank's commercial card product) and which business units use it.
2. **A corporate card usage policy** — defined on the Manage Corporate Card Usage Policies page, this sets the allowable amount for each expense category that can still be paid in cash before the system requires the card instead. A policy might say client meals under $50 can go on a personal card or cash, but anything at or above that should go on the corporate card.
3. **Transaction feed code mapping** — the card issuer sends transactions with the merchant's category code (a standardized code indicating the type of business, like "restaurants" or "hotels"). Mapping those codes to Castellan's expense types means a restaurant charge defaults to "Business Meal" automatically instead of showing up as an unclassified amount the employee has to categorize from scratch every time.

## How transactions actually arrive

Card issuers send transaction files to Oracle Fusion Expenses on a regular schedule (daily is typical). Each transaction lands as an **unassigned card transaction** tied to the employee who holds the card. The employee sees these in a queue inside Expenses, separate from manually entered items, and for each one they:

- Confirm or correct the expense type the feed-code mapping guessed
- Add any required justification or itemization
- Attach the transaction to a new or existing expense report

Nothing about a card transaction posts to the General Ledger or gets reimbursed until an employee pulls it into a report and submits that report through the normal lifecycle from lesson 1.

## Individual-liability versus company-liability cards

This distinction matters for who Payables ultimately pays:

- **Individual-liability card** — the employee is personally responsible to the card issuer for the balance. When the expense report is approved, Payables reimburses the *employee*, who then pays their own card bill.
- **Company-liability card** — Castellan itself is responsible for the balance. When the expense report is approved, Payables pays the *card issuer* directly, and the employee is never reimbursed for that line because they never personally paid for it.

Castellan uses company-liability cards for employees who travel frequently (lower personal cash-flow risk) and does not issue cards at all to occasional travelers, who use personal cards and get reimbursed normally.

```
Card liability comparison - Castellan Supply Co.
  Individual-liability card -> Payables pays the EMPLOYEE
  Company-liability card    -> Payables pays the CARD ISSUER
```

## Unassigned transactions that never become an expense report

A card charge that sits unassigned for too long is a real operational problem: the company has a liability (especially on a company-liability card) with no accounting entry and no business justification on file. Castellan's audit rules (lesson 10) include an aging check that flags employees with unassigned transactions older than 30 days, and escalates to the manager if the employee doesn't act.

## Recap

Corporate card setup has three parts: the program itself, a usage policy capping cash alternatives, and feed-code mapping to expense types. Transactions arrive as unassigned items an employee must review and attach to a report; nothing posts until that happens. Individual-liability cards get the employee reimbursed; company-liability cards get the issuer paid directly. This closes Chapter 2. Next up, Chapter 3 begins with lesson 10: expense audit rules, the automated checks that have been referenced throughout this chapter.
