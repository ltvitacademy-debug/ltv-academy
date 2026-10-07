# Hedging Strategies

Lesson 25 named the risk types. This lesson covers the practical side: once you've identified a risk, what do you actually do to reduce it? Hedging is the general name for taking an offsetting position so that losses in one place are cushioned by gains in another. The mechanics differ depending on what you're hedging and what you're hedging with.

## What you'll learn

- Delta-hedging an option position with its underlying stock
- Hedging linear exposures with futures or forwards
- Static hedging versus dynamic hedging, and why dynamic hedges need rebalancing
- Basis risk and cross-hedging — what happens when the hedge doesn't move in perfect lockstep with the exposure

## Delta-hedging an option position

Recall from Chapter 3 that an option's delta measures how much its price moves for a $1 move in the underlying. A trader holding a long call with a delta of 0.60 is, in a small-move sense, exposed like someone holding 60 shares of the underlying. To offset that exposure, the trader can sell short an amount of the underlying equal to the position's delta — holding **−delta shares** against the option position. If the delta is +0.60 for one contract (on 100 shares, so 60 delta-shares), selling 60 shares short brings the combined position's delta close to zero: a small move in the stock now produces roughly no net change in the combined position's value.

## Hedging linear exposures with futures and forwards

Options aren't the only thing that gets hedged. A position with a roughly linear payoff — a bond portfolio exposed to rising rates, a commodity producer exposed to falling prices, an importer exposed to a currency move — can be hedged directly with a futures or forward contract that moves (approximately) one-for-one against the exposure. An airline worried about rising fuel costs can buy oil futures; the futures gain offsets the higher fuel bill if oil rises, in roughly the same amount the futures lose if oil falls and fuel gets cheaper.

## Static vs. dynamic hedging

- **Static hedging** — put the hedge on once and leave it in place, appropriate when the exposure itself doesn't change shape over time (a linear futures hedge on a fixed exposure is often close to static).
- **Dynamic hedging** — the hedge has to be rebalanced periodically because the thing being hedged changes shape as markets move. Delta-hedging an option is the classic example: delta itself changes as the underlying price moves (that's gamma, from Lesson 15), so a delta-hedge that was perfect yesterday is no longer exactly right today, and the hedge ratio has to be recalculated and adjusted.

## Basis risk and cross-hedging

A hedge is rarely perfect. **Basis risk** is the risk that the hedging instrument doesn't move exactly in lockstep with the exposure being hedged — a jet-fuel buyer hedging with crude oil futures (because there's no liquid jet-fuel futures market) is exposed to the gap between jet fuel and crude oil prices, even with the futures position perfectly sized. This is an example of **cross-hedging**: using a related but not identical instrument because the exact instrument either doesn't exist or isn't liquid enough to trade efficiently. Cross-hedges reduce risk substantially but don't eliminate it the way a hedge in the exact same instrument would.

## Key terms

| Term | Meaning |
|---|---|
| Delta-hedging | Offsetting an option's delta by holding an opposing position in the underlying |
| Static hedge | A hedge put on once and left in place without rebalancing |
| Dynamic hedge | A hedge that must be periodically rebalanced as the exposure's risk profile changes |
| Basis risk | The risk that a hedging instrument doesn't move exactly with the exposure it's hedging |
| Cross-hedge | A hedge using a related but not identical instrument |

## Recap

Hedging takes many forms — offsetting an option's delta with stock, offsetting a linear exposure with futures, rebalancing dynamically as gamma shifts the hedge ratio, and accepting basis risk when a perfect hedge instrument doesn't exist. Next up, Lesson 27: regulation and risk governance, which sets the rules and oversight structures that shape how firms are expected to measure and manage all of this.
