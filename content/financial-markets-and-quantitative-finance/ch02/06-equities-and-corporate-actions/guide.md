# Equities & Corporate Actions

Chapter 1 covered how any security trades, mechanically. Chapter 2 turns to the securities themselves, starting with equities — the asset class most people think of first when they hear "the market." This lesson covers what a share of stock actually represents, and the events, called corporate actions, that change a stock's price or share count outside of normal trading.

## What you'll learn

- Common stock vs. preferred stock, and the rights each carries
- Dividends: cash and stock
- Stock splits and share buybacks
- Mergers and spin-offs
- Why historical prices need to be "adjusted" for these events

## Common vs. preferred stock

**Common stock** is the standard form of equity ownership: common shareholders typically get one vote per share at shareholder meetings (electing the board, approving major decisions) and a claim on whatever profit remains after all other obligations are paid. **Preferred stock** sits between common stock and bonds: preferred shareholders are usually paid a fixed dividend before any common dividend is paid, and have a priority claim over common stockholders if the company is liquidated — but typically carry no voting rights. In exchange for that safety, preferred shareholders generally don't share in the company's upside the way common shareholders do.

## Dividends

A **dividend** is a distribution of a company's profit to its shareholders. A **cash dividend** pays shareholders cash per share they own, directly reducing the company's cash. A **stock dividend** instead issues additional shares to existing shareholders proportionally — no cash leaves the company, but each shareholder now owns more shares representing the same overall ownership stake (so, all else equal, each individual share is worth proportionally less).

## Stock splits and buybacks

A **stock split** (e.g., 2-for-1) multiplies the number of shares outstanding while dividing the price per share by the same factor, leaving total market value unchanged — it's typically done to bring a high per-share price back into a more "normal" trading range. A **share buyback (repurchase)** is the opposite kind of action in spirit: the company uses cash to buy back its own shares from the market and retires them, reducing share count. With fewer shares outstanding dividing up the same total profit, each remaining share represents a claim on more earnings — buybacks are therefore an alternative to dividends as a way of returning capital to shareholders.

## Mergers and spin-offs

A **merger** combines two companies into one; shareholders of the acquired company typically receive cash, shares of the acquiring company, or some combination, in exchange for their old shares. A **spin-off** goes the other direction: a company separates off part of its business into a new, independently-traded company, distributing shares of the new entity to existing shareholders of the parent. Shareholders end up holding shares in two separate companies where they used to hold one.

## Why historical prices get adjusted

Every action above changes either share count or per-share value without reflecting any real change in the underlying business that day. If you looked at raw, unadjusted historical prices around a 2-for-1 stock split, you'd see the price cut in half overnight and wrongly conclude the stock crashed. To keep historical price series meaningful for analysis (something you'll do constantly in a quant role), data providers compute **adjusted prices**: historical prices are rescaled backward through time so that splits, dividends, and other corporate actions don't create artificial jumps or gaps. This is why "adjusted close" is a standard column in almost every historical price dataset you will ever work with.

## Key terms

| Term | Meaning |
|---|---|
| Common stock | Ownership with voting rights and a residual profit claim |
| Preferred stock | Ownership with a fixed, priority dividend but usually no vote |
| Dividend | A distribution of profit to shareholders, in cash or additional shares |
| Stock split | Increases share count and proportionally lowers price per share |
| Buyback | Company repurchases and retires its own shares, reducing share count |
| Merger / spin-off | Two companies combining / one company separating into two |
| Adjusted price | Historical price rescaled to remove artificial jumps from corporate actions |

## Recap

A share of common stock carries votes and a residual profit claim; preferred stock trades voting rights for a safer, fixed payout. Dividends, splits, buybacks, mergers, and spin-offs all change a stock's price or share count without reflecting a change in the underlying business — which is exactly why historical price data gets adjusted. Next up, Lesson 7: fixed income and yield curves.
