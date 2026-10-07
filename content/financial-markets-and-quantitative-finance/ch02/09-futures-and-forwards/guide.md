# Futures & Forwards

Lessons 6 through 8 covered equities and bonds — two of the three asset classes from Lesson 1 that are direct claims on something real. This lesson opens the derivatives world (previewed in Lesson 1) with its simplest member: a contract that fixes today the price of a trade that will happen later.

## What you'll learn

- Forwards vs. futures: the key mechanical differences
- Daily mark-to-market and margin accounts
- The cost-of-carry pricing formula for a futures/forward price
- Contango vs. backwardation, with a worked example

## Forwards vs. futures

Both a **forward** and a **future** are agreements to buy or sell an asset at a specified price on a specified future date. The difference is entirely about *how* that agreement is structured and enforced:

- **Forwards** are over-the-counter (OTC) contracts: negotiated privately and bilaterally between two parties, customized to their exact needs (any quantity, any delivery date), with no exchange or clearinghouse involved. This flexibility comes with counterparty risk — if the other side defaults, you may not get paid.
- **Futures** are exchange-traded: standardized in size and delivery date, traded on a regulated exchange, and cleared through a central counterparty (recall novation from Lesson 2) — which largely eliminates counterparty risk.

## Daily mark-to-market and margin

The other major difference is how gains and losses are handled day to day. A forward contract settles only once, at expiration — all the profit or loss accumulates silently until that one date. A futures contract is **marked to market daily**: at the end of every trading day, the exchange calculates each side's gain or loss based on that day's price move and settles it in cash immediately, crediting or debiting each party's **margin account** (a deposit held with the broker as collateral). If a margin account's balance falls below a required maintenance level, the holder gets a **margin call** and must add more cash or the position gets closed out. This daily cash settlement is what makes futures so much safer for the clearinghouse to guarantee — nobody's loss is ever allowed to build up unchecked for months.

## Cost-of-carry pricing

The fair price of a futures or forward contract isn't a guess — it's pinned down by **arbitrage**: the cost of "carrying" the underlying asset from today until delivery.

```
Continuous compounding:  F = S × e^((r + c − y) × T)
Simple compounding:      F = S × (1 + r)^T
```

Where *S* is today's spot price, *r* is the risk-free rate, *c* is the cost of carrying the asset (storage, insurance — relevant for commodities), *y* is any yield the asset pays out while you hold it (dividends on a stock index, for instance), and *T* is time to delivery in years. Intuitively: the futures price equals what it would cost to buy the asset today and carry it to the delivery date, financed at the risk-free rate, adjusted for any storage cost or income earned along the way.

## Worked example

Take a stock index trading at $4,000 (spot), a risk-free rate of 4% (continuous compounding), no storage cost, no dividend yield, and 6 months (T = 0.5) to delivery:

```
F = 4,000 × e^(0.04 × 0.5)
  = 4,000 × e^0.02
  = 4,000 × 1.0202
  = $4,080.80
```

The futures price ($4,080.80) sits *above* the spot price ($4,000) — this is **contango**, where the futures price exceeds the spot price, typically the normal state for an asset with no storage benefit when the risk-free rate dominates. If the asset instead paid a large enough dividend yield or had a convenience yield (common in some commodities, where holding the physical good itself has value), the futures price could sit *below* spot — called **backwardation**.

## Key terms

| Term | Meaning |
|---|---|
| Forward | OTC, bespoke, bilateral contract with counterparty risk, settles once at expiration |
| Future | Exchange-traded, standardized contract, cleared via a CCP, marked to market daily |
| Mark-to-market | Daily settlement of gains/losses into a margin account |
| Margin call | A demand for additional collateral when a margin account falls too low |
| Cost of carry | The financing, storage, and yield costs priced into a futures/forward price |
| Contango / backwardation | Futures price above / below the spot price |

## Recap

Forwards are private, bespoke, and settle once; futures are standardized, exchange-cleared, and mark to market daily through margin accounts. Both are priced by cost of carry — financing the spot price forward, net of any yield or storage cost — producing contango when the futures price sits above spot, or backwardation when it sits below. Next up, Lesson 10: foreign exchange basics, which closes out Chapter 2.
