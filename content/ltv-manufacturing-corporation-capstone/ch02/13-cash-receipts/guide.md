# Cash Receipts

**Chapter 2 · Running the Business · Lesson 13 of 25**

Harborview pays. This lesson records the cash receipt — and plants the second of Chapter 3's six problems: a receipt applied to the wrong invoice.

## What you'll learn

- How Mateo Rios records Harborview's incoming payment
- What "applying" a receipt actually means, and why it matters which invoice it's applied to
- The specific misapplication that happens here, and why the total cash received is still correct
- Why this kind of error is invisible in the bank balance and visible only in AR aging

## The payment arrives

Harborview's accounts payable team wires payment for the large control panel order on **January 28**:

- **Receipt:** RCPT-50231, Harborview Industrial Supply, **$55,100.00**
- **Deposited to:** Regions Bank account ...7734
- **Intended for:** INV-HV-30144 (lesson 12's $55,100.00 invoice) — the amount matches it exactly

Depositing the receipt is correct and uneventful: cash increases by $55,100.00, and the amount is unmistakably tied to the big control panel order by its size alone.

## The misapplication

Applying a cash receipt means telling Receivables which specific open invoice (or invoices) the money pays off. Mateo Rios, working through a backlog of receipts that afternoon, opens Harborview's account, sees **two** open items — INV-HV-30144 ($55,100.00) and the older INV-HV-29890 ($6,100.00) from lesson 12 — and applies the **$55,100.00 receipt to INV-HV-29890** by mistake, selecting the wrong line in a list sorted by invoice date rather than amount.

Oracle Fusion lets this happen because it's a valid instruction: nothing requires a receipt's amount to match the invoice it's applied to. The result:

- **INV-HV-29890** ($6,100.00 invoice) now shows a **$49,000.00 credit balance** — overpaid by far more than it was ever worth
- **INV-HV-30144** ($55,100.00 invoice) still shows **fully open and now overdue**, even though the customer already paid for it

## Why the cash is still right, but the detail is wrong

The General Ledger impact is completely correct: $55,100.00 debited to Cash, $55,100.00 credited out of Accounts Receivable — Trade in total. The **total** AR control account balance for Harborview doesn't change because of the misapplication — Receivables simply moved the open-item detail to the wrong place. This is exactly why a misapplied receipt is invisible in a bank reconciliation or a GL trial balance, and only visible in **AR aging detail**, invoice by invoice — which is one of the deliverables Elena Marsh is going to ask for in Chapter 3.

## Key terms

| Term | Meaning |
|---|---|
| Applying a receipt | Assigning a received payment to specific open invoice(s) in Receivables |
| Misapplication | A receipt validly applied, but to the wrong invoice or customer |
| AR aging | A report showing open receivable balances by invoice and by how overdue they are |

## Recap

Harborview's $55,100.00 payment, RCPT-50231, deposits correctly but gets applied to the wrong invoice — INV-HV-29890 instead of INV-HV-30144 — leaving one invoice falsely overpaid and the other falsely still open. The total AR balance and cash balance are unaffected; only the invoice-level detail is wrong. Next up, lesson 14: asset capitalization, where a new CNC lathe gets set up — in the wrong category.
