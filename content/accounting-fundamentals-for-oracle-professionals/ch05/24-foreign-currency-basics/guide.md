# Foreign Currency Basics

This lesson closes out Chapter 5 by introducing one more layer of complexity that appears the moment a business operates across borders: foreign currency. It directly connects back to the "ledger" concept from lesson 3.

## What you'll learn

- The difference between functional currency and transaction currency
- Why exchange rate movements create gains and losses that don't come from normal business operations
- A worked example of a foreign currency transaction
- Why Oracle Fusion ledgers are built around this exact distinction

## Functional currency vs. transaction currency

- **Functional currency**: the primary currency a business uses for its own books and reporting — usually the currency of the country it's based in.
- **Transaction currency**: the currency a specific transaction actually happens in, which might be different from the functional currency when dealing with foreign customers or suppliers.

Recall from lesson 3 that an Oracle Fusion ledger is defined partly by its currency — that currency is the ledger's functional currency. A US company with a US-dollar functional currency might still issue invoices in euros to a German customer; that invoice's transaction currency is euros, even though it ultimately gets recorded in the US-dollar ledger.

## Why exchange rates create gains and losses

When a transaction happens in a foreign currency, it has to be converted to the functional currency to be recorded — using the exchange rate at that moment. If the exchange rate moves *between* the date the transaction was recorded and the date it's actually settled (cash collected or paid), the dollar value of that same foreign-currency amount changes, purely because of the exchange rate movement — not because of anything the business did operationally. This difference is recorded as a **foreign currency gain or loss**.

## Worked example

A fictional US exporter, **Harrowgate Industrial Supply**, sells €10,000 of goods to a German customer on June 1, when the exchange rate is $1.10 per euro. The customer pays on July 1, when the rate has moved to $1.08 per euro.

```
June 1 (sale recorded at the June 1 rate):
  €10,000 × $1.10 = $11,000
  Debit  Accounts Receivable   $11,000
  Credit Sales Revenue                  $11,000

July 1 (cash received, converted at the July 1 rate):
  €10,000 × $1.08 = $10,800
  Debit  Cash                  $10,800
  Debit  Foreign Currency Loss    $200
  Credit Accounts Receivable             $11,000
```

The euro amount (€10,000) never changed — only the dollar value of that same amount changed, because the exchange rate moved against Harrowgate between June 1 and July 1. That $200 difference is a **foreign currency loss**, purely from exchange rate movement, with nothing to do with how well the actual sale performed.

## Why this matters for Oracle Fusion

This is precisely why an Oracle Fusion ledger's currency matters so much, and why multi-currency businesses often need multiple ledgers (as introduced in lesson 3) or specific multi-currency configuration within a single ledger. Oracle Fusion automatically handles currency conversion using configured exchange rate types and calculates realized and unrealized gains/losses as transactions are recorded and settled — automating exactly the calculation you just did by hand.

## Recap

Functional currency is a business's own reporting currency; transaction currency is whatever currency a specific deal happens in. When exchange rates move between recording and settlement, the resulting difference becomes a foreign currency gain or loss. That completes Chapter 5. Next up, Chapter 6 and lesson 25: the income statement, the first of the three core financial statements we'll study.
