# Script — Foreign Currency Journals

## Segment 1 (title)

Welcome to Chapter 6: Multi-Currency and Multi-Entity. Every ledger has one functional currency, but real transactions don't always happen in it. This lesson is about how a foreign currency journal gets a non-functional amount into that ledger at all.

## Segment 2 (steps)

Every line on a foreign currency journal carries two amounts. The entered amount, in the real-world currency the transaction actually happened in. And the accounted amount, that same figure converted to the ledger's functional currency. The accounted amount is what actually updates the ledger's balances.

## Segment 3 (steps)

At entry, a user picks a conversion rate type, commonly Corporate, a company-defined standard rate, or Spot, the actual market rate that day. Oracle Fusion looks up the rate and converts automatically. Nobody does the currency math by hand.

## Segment 4 (code)

Here's LTV Manufacturing Corporation receiving a GBP services invoice: 8,500 pounds, Corporate rate 1.27 on March 12th, converting to 10,795 dollars. That's the number that lands in every trial balance and report from here on.

## Segment 5 (steps)

But that 10,795 reflects the rate on March 12th only. If the invoice is still outstanding at period end and the rate has moved, the true USD value of that liability has technically changed too, even though nothing was re-entered.

## Segment 6 (outro)

That gap is exactly the problem the next lesson solves. Up next, lesson 29: Period-End Revaluation, correcting balances for exchange-rate movement.
