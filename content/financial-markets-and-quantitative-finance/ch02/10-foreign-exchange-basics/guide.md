# Foreign Exchange Basics

This lesson closes out Chapter 2 with the currency asset class previewed back in Lesson 1. Every cross-border trade, investment, or loan eventually touches the FX market — it's the largest and most liquid market in the world, and it runs on its own set of conventions worth knowing cold.

## What you'll learn

- Currency pairs and quoting conventions: base vs. quote currency
- Spot FX vs. forward FX rates
- Interest rate parity (covered and uncovered)
- The carry trade, and a worked IRP example

## Currency pairs and quoting conventions

FX prices are always quoted as **pairs** — the value of one currency in terms of another. In a pair like EUR/USD, the **base currency** (EUR) is the one unit being priced, and the **quote currency** (USD) is what it's being priced in. A quote of EUR/USD = 1.10 means 1 euro buys 1.10 US dollars. If EUR/USD rises, the euro has strengthened relative to the dollar (or, equivalently, the dollar has weakened relative to the euro) — the two statements describe the exact same move from opposite sides of the pair.

## Spot vs. forward FX

The **spot rate** is the exchange rate for a currency trade that settles almost immediately (typically two business days). The **forward rate** is the exchange rate agreed today for a currency exchange that will actually happen on a specified future date — exactly the forward contract concept from Lesson 9, applied to currencies. A company that knows it will need to convert euros to dollars in six months can lock in today's forward rate rather than wait and take whatever the spot rate happens to be then.

## Interest rate parity

**Covered interest rate parity (IRP)** is the no-arbitrage condition that links the spot rate, the forward rate, and the two currencies' interest rates:

```
Forward = Spot × (1 + r_domestic) / (1 + r_foreign)
```

The logic: if you have domestic currency, you have two routes to the same future payoff — invest it domestically at the domestic rate, or convert it to foreign currency, invest at the foreign rate, and lock in today's forward rate to convert back. If those two routes gave different payoffs, arbitrageurs would trade until they didn't — which is exactly why the forward rate is "pinned down" rather than freely floating. **Uncovered interest rate parity** is the same idea applied to expectations instead of a locked-in forward: it says the currency with the higher interest rate is expected (on average, though this doesn't always hold in practice) to depreciate by roughly the interest rate differential, so that expected returns equalize across currencies without a forward contract.

## Worked example

EUR/USD spot is 1.10 (1 euro = $1.10). The USD interest rate is 5%; the EUR interest rate is 3%; the forward is for delivery in 1 year:

```
Forward = 1.10 × (1.05 / 1.03)
        = 1.10 × 1.0194
        = 1.1214
```

The forward rate (1.1214) is higher than spot (1.10) — the euro trades at a **forward premium** against the dollar, and the dollar correspondingly trades at a **forward discount**. This matches the intuition: the dollar earns the higher interest rate (5% vs. 3%), so covered interest rate parity requires the dollar to be expected to weaken in exchange-rate terms by roughly that rate differential — otherwise, borrowing in EUR and lending in USD would be a free lunch.

## The carry trade

A **carry trade** tries to exploit the gap between uncovered and covered parity: borrow in a low-interest-rate currency, convert to a high-interest-rate currency, invest there, and pocket the interest rate differential — without using a forward contract to lock in the exchange rate (that would erase the profit, per covered IRP above). This works as long as the high-interest-rate currency doesn't depreciate enough to wipe out the interest gain, which uncovered IRP says should happen on average but frequently doesn't over shorter horizons — making the carry trade a real, if risky, strategy rather than a theoretical curiosity.

## Key terms

| Term | Meaning |
|---|---|
| Base / quote currency | In a pair like EUR/USD, EUR is base, USD is quote |
| Spot rate | The exchange rate for near-immediate settlement |
| Forward rate | The exchange rate locked in today for a future settlement date |
| Covered interest rate parity | No-arbitrage link between spot, forward, and interest rates |
| Carry trade | Borrowing low-rate currency to invest in a high-rate currency, unhedged |

## Recap

Currency pairs quote one currency against another; forward FX rates are pinned down relative to spot by covered interest rate parity, with the higher-rate currency trading at a forward discount. The carry trade bets that real-world currency moves don't fully offset that rate differential. That closes Chapter 2. Next up, Lesson 11: option basics and payoffs, opening Chapter 3 — Options & Derivatives.
