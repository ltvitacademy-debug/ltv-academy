# Accrual vs. Cash Accounting

You've actually been learning accrual accounting all along — every "revenue is earned, not just collected" and "expense is incurred, not just paid" example since Chapter 3 was accrual accounting. This lesson finally names it directly and contrasts it with the simpler alternative: cash accounting.

## What you'll learn

- The precise difference between accrual and cash accounting
- Why most real businesses, and virtually all ERP systems, use accrual accounting
- A side-by-side example showing how the same business events produce different numbers under each method
- Why Oracle Fusion Financials is built entirely around the accrual model

## Two different bases for recording transactions

- **Cash accounting**: revenue is recorded when cash is *received*; expenses are recorded when cash is *paid*. Simple, but it can badly distort the picture of a period's actual performance.
- **Accrual accounting**: revenue is recorded when *earned* (lesson 12); expenses are recorded when *incurred* (lesson 13), regardless of when cash moves. This is the method behind the matching principle and everything in Chapter 4.

## Side-by-side example

A fictional consultancy, **Ridgeview Advisory Partners**, has one transaction in December: it completes a $10,000 project on December 28, but the client doesn't pay until January 10.

| | Cash Basis | Accrual Basis |
|---|---|---|
| December revenue | $0 (no cash received yet) | $10,000 (work was earned/completed) |
| January revenue | $10,000 (cash received) | $0 (already recorded in December) |

Under cash accounting, December looks like it generated zero revenue from a project that was, in reality, fully completed that month — a potentially misleading picture if anyone is trying to judge December's actual performance. Accrual accounting puts the revenue where the economic activity actually happened.

## Why most businesses (and nearly all ERP systems) use accrual

Accrual accounting gives a much more accurate picture of a business's performance *during* a specific period, because it matches revenue and expenses to when the underlying economic activity happened, not to the sometimes-random timing of when cash happens to move. Lenders, investors, and most accounting standards (GAAP and IFRS) require accrual-basis financial statements for any business beyond the smallest scale. Cash accounting still has a place — some very small businesses and certain tax filings use it for simplicity — but it is the exception, not the rule, in professional accounting.

## Why Oracle Fusion is accrual by design

Every concept this course has built toward — revenue recognized at the point of earning (Receivables), expenses matched to the period incurred (Payables, adjusting entries), subledgers accumulating detail that gets summarized based on when things were *earned or incurred*, not when cash moved — only makes sense under accrual accounting. Oracle Fusion Financials is architected entirely around the accrual model; cash-basis reporting, where needed at all, is typically a secondary report derived *from* the accrual-basis books, not the other way around.

## Recap

Cash accounting records transactions when cash moves; accrual accounting records them when revenue is earned or expenses are incurred, regardless of cash timing. Accrual accounting gives a far more accurate picture of a period's actual performance, which is why GAAP, most real businesses, and Oracle Fusion Financials are all built around it. Next up, lesson 20: revenue recognition basics, a deeper look at exactly when revenue counts as "earned."
