# Recording a Transaction Step by Step

You now have every piece needed to record a transaction from scratch: the accounting equation, debits and credits as left and right, and normal balances by account type. This lesson assembles those pieces into a repeatable four-step process you can apply to almost any business event.

## What you'll learn

- A reliable four-step method for turning a real-world event into a journal entry
- How to apply that method to three different transactions
- Why "which accounts are involved" is the step that actually requires judgment
- How this maps to what happens when a transaction is entered into an Oracle Fusion subledger

## The four-step method

1. **Identify the accounts involved.** Read the transaction and ask: what changed? Usually two or more accounts are affected.
2. **Classify each account.** Is it an asset, liability, equity, revenue, or expense?
3. **Determine the direction of change.** Did each account increase or decrease?
4. **Apply the normal-balance rule.** For each account, increases post to its normal-balance side; decreases post to the opposite side. Debit one, credit another (or several), for equal total amounts.

## Worked example 1: paying cash for supplies

**Transaction**: A fictional company, **Dunmore Office Partners**, pays $300 cash for office supplies.

1. Accounts involved: Cash, Supplies.
2. Classify: Cash is an asset. Supplies (while unused) is also an asset.
3. Direction: Cash decreased. Supplies increased.
4. Apply the rule: Cash (asset, debit-normal) decreased → credit $300. Supplies (asset, debit-normal) increased → debit $300.

```
Debit  Supplies         $300
Credit Cash                      $300
```

## Worked example 2: billing a customer on credit

**Transaction**: Dunmore Office Partners performs $2,500 of consulting work for a client, who will pay later (on account).

1. Accounts involved: Accounts Receivable, Service Revenue.
2. Classify: Accounts Receivable (amounts owed to the business) is an asset. Service Revenue is revenue.
3. Direction: Accounts Receivable increased (the client now owes more). Revenue increased (the business earned more).
4. Apply the rule: Accounts Receivable (asset, debit-normal) increased → debit $2,500. Service Revenue (revenue, credit-normal) increased → credit $2,500.

```
Debit  Accounts Receivable   $2,500
Credit Service Revenue                $2,500
```

Notice no cash moved here at all — the revenue was still earned, and the receivable asset captures the promise of future cash. This is the seed of accrual accounting, which gets its own full lesson in Chapter 5.

## Worked example 3: taking out a loan

**Transaction**: Dunmore Office Partners borrows $15,000 from a bank, deposited straight into its checking account.

1. Accounts involved: Cash, Notes Payable.
2. Classify: Cash is an asset. Notes Payable is a liability.
3. Direction: Cash increased. Notes Payable (the obligation to repay) increased.
4. Apply the rule: Cash (asset, debit-normal) increased → debit $15,000. Notes Payable (liability, credit-normal) increased → credit $15,000.

```
Debit  Cash                 $15,000
Credit Notes Payable                   $15,000
```

## The step that actually needs judgment

Steps 2 through 4 are nearly mechanical once you know the normal-balance table. Step 1 — correctly identifying *which* accounts are involved — is where real accounting judgment lives. Is this a loan or a sale? Is this expense incurred now, or prepaid for the future? Software like Oracle Fusion automates steps 2 through 4 completely (it already knows every account's type and normal balance); what it still needs from a correctly configured system — and from the humans or business rules feeding it — is accurate identification of which accounts a transaction touches in the first place.

## Recap

The four-step method — identify accounts, classify them, determine direction, apply the normal-balance rule — turns any business event into a correct journal entry. The hardest step is always identifying the right accounts, not the arithmetic. Next up, lesson 8: common debit and credit mistakes, where we look at exactly where this process tends to go wrong.
