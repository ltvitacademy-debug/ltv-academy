# Equity

Equity is the third and final piece of the accounting equation, and the one that tends to confuse new students most — partly because it looks different depending on whether a business is a sole proprietorship, a partnership, or a corporation. This lesson gives you one consistent way to think about it regardless of structure.

## What you'll learn

- The core idea behind equity: a residual claim, not a pile of cash
- How equity is labeled differently across business structures
- The two main pieces of corporate equity: contributed capital and retained earnings
- Why equity is the account type most directly affected by revenue and expenses

## Equity is a residual claim, not an asset

The single biggest misconception about equity: it is **not** a pot of cash sitting somewhere. Go back to the accounting equation: Assets = Liabilities + Equity, which rearranges to Equity = Assets − Liabilities. Equity is simply whatever is left over for the owners after every liability is subtracted from every asset. If a business's assets are entirely financed by liabilities, equity is zero — there's nothing left over for the owners, even though the business clearly "has" plenty of assets.

## How equity is labeled, by structure

- **Sole proprietorship**: usually a single "Owner's Capital" account, sometimes with an "Owner's Drawing" account tracking cash the owner withdraws personally.
- **Partnership**: a separate capital account for each partner, reflecting their individual share.
- **Corporation**: split into **Common Stock** (or "Contributed Capital," what shareholders paid in exchange for ownership shares) and **Retained Earnings** (accumulated profits the corporation has kept rather than distributed to shareholders).

Regardless of the label, the underlying idea is identical: equity is the owners' residual claim.

## Retained earnings: where revenue and expenses end up

This is the single most important connection in this lesson. Recall from lesson 5 that revenue and expenses are really "equity in disguise." Here's precisely how: at the end of each accounting period, a corporation's **net income** (revenue minus expenses) gets added into Retained Earnings. If the company pays dividends to shareholders, that reduces Retained Earnings too.

**Simplified Retained Earnings roll-forward:**

```
Beginning Retained Earnings
+ Net Income (Revenue - Expenses)
- Dividends Paid
= Ending Retained Earnings
```

This is why a profitable year directly increases equity, and a loss-making year (or a year with heavy dividends) directly decreases it — even though no "equity" transaction was ever directly recorded. Equity absorbs the net effect of everything the business earned, spent, and distributed.

## Worked example

A fictional corporation, **Thornbury Analytics Inc.**, starts the year with $200,000 in Retained Earnings. During the year, it earns $450,000 in revenue and incurs $380,000 in expenses, giving net income of $70,000. It pays $20,000 in dividends.

```
Beginning Retained Earnings:  $200,000
+ Net Income:                  $70,000
- Dividends Paid:              $20,000
= Ending Retained Earnings:   $250,000
```

## Why this matters for Oracle Fusion

Oracle Fusion General Ledger automatically closes revenue and expense accounts into Retained Earnings at year-end as part of the year-end close process (previewed in lesson 29). Understanding equity as a residual, fed continuously by net income, is exactly what makes that automated close process make sense rather than feeling like a mysterious system step.

## Recap

Equity is a residual claim — Assets minus Liabilities — not a pile of cash. It's labeled differently across sole proprietorships, partnerships, and corporations, but a corporation's equity splits cleanly into Common Stock and Retained Earnings, with Retained Earnings absorbing net income and dividends every period. Next up, lesson 12: revenue.
