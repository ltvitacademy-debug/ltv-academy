# Asset Classes Overview

Welcome to Financial Markets & Quantitative Finance, the fourth course on the Quantitative Developer / Researcher path. Everything before this course assumed you already knew what a "bond" or a "future" was. This course doesn't — it starts from zero market knowledge and builds the vocabulary and mechanics that quant research and trading roles expect on day one. This first lesson maps the territory: the major asset classes, and how they sit on the risk-return spectrum relative to each other.

## What you'll learn

- What an "asset class" is and why the distinction matters for how markets are organized
- The seven major asset classes: equities, fixed income, cash/money market instruments, commodities, currencies, derivatives, and alternatives
- How these asset classes line up on a risk-return spectrum
- Why derivatives are different in kind from the other six — they derive their value from something else

## What an asset class is

An asset class is a group of financial instruments that share similar characteristics, behave similarly in the market, and are often subject to the same regulations. Grouping instruments this way lets investors, risk managers, and researchers reason about an entire category at once — "equities fell 2% today" is a meaningful sentence precisely because stocks as a group tend to move together more than they move with, say, commodities.

## The major asset classes

- **Equities (stocks)** — ownership shares in a company. A shareholder owns a slice of the business, has a claim on its future profits and (usually) a vote in corporate decisions. Covered in depth in Lesson 6.
- **Fixed income (bonds)** — loans. A bondholder lends money to a government or company in exchange for scheduled interest payments and the return of principal at maturity. Covered in Lessons 7 and 8.
- **Cash and money market instruments** — short-term, highly liquid, low-risk instruments such as Treasury bills, commercial paper, and bank deposits. This is where capital sits when it isn't deployed elsewhere.
- **Commodities** — physical goods such as crude oil, gold, wheat, and copper. Prices are driven by supply, demand, storage costs, and (for agricultural goods) weather and seasonality.
- **Currencies (FX)** — one currency's value measured against another. Every cross-border trade, investment, or loan eventually touches the FX market. Covered in Lesson 10.
- **Derivatives** — options, futures, forwards, and swaps. A derivative's value is *derived* from an underlying asset rather than being an ownership stake or a loan in its own right. Futures and forwards are introduced in Lesson 9; options get a full chapter starting in Lesson 11.
- **Alternatives** — real estate, private equity, hedge funds, and more recently crypto assets. Grouped together mainly because they sit outside the traditional public-market categories above, not because they behave alike.

## The risk-return spectrum

As a rough ordering, from lowest to highest expected risk (and, over the long run, typically lowest to highest expected return): cash and money market instruments sit at the low end: a Treasury bill is about as close to risk-free as a dollar-denominated asset gets. Investment-grade fixed income sits above that, then equities, then commodities and alternatives, with derivatives occupying a special position — a derivative's own risk depends entirely on how it's used. A call option bought outright can lose 100% of its premium; the same option used to hedge an existing stock position can *reduce* overall risk. This is why "derivatives are risky" is too simple a statement — it depends on the position they're added to.

## Why derivatives are different in kind

The first six asset classes above are all claims on something real: a share of a business, a loan, a stockpile of grain, a unit of currency. A derivative contract, by contrast, has no independent existence — an options contract or a futures contract is a side agreement whose payoff is calculated from the price of something else (the "underlying"). That's why this course treats derivatives as their own chapter (Chapter 3) rather than folding them into equities or fixed income: the *mechanics* of pricing a derivative are a genuinely different skill from understanding the underlying asset itself.

## Key terms

| Term | Meaning |
|---|---|
| Asset class | A group of instruments that share risk/return characteristics and tend to be regulated similarly |
| Equities | Ownership shares in a company |
| Fixed income | Debt instruments (bonds) paying scheduled interest and principal |
| Derivative | A contract whose value is derived from an underlying asset, rather than being a direct claim itself |
| Alternatives | Real estate, private equity, hedge funds, and crypto — grouped by exclusion from the traditional categories |

## Recap

Markets organize instruments into asset classes — equities, fixed income, cash, commodities, currencies, derivatives, and alternatives — because instruments within a class tend to move together and face similar risks. Derivatives stand apart: they derive value from something else rather than being a direct claim. Next up, Lesson 2: the exchanges, brokers, and other participants that make trading in these asset classes possible.
