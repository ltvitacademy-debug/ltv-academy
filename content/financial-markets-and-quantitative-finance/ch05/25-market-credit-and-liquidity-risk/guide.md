# Market, Credit & Liquidity Risk

VaR, Expected Shortfall, and stress testing are all tools for measuring risk — but risk itself comes in several distinct flavors, and the right tool and the right mitigation depend on which flavor you're facing. This lesson names the three broad risk types that show up across almost every desk and portfolio: market risk, credit risk, and liquidity risk.

## What you'll learn

- What market risk is, and how it differs from the other two risk types
- The three components of credit risk: probability of default, loss given default, and exposure at default
- The difference between funding liquidity risk and market liquidity risk
- Concentration risk as a theme that cuts across all three risk types

## Market risk

Market risk is the risk of loss from movements in market prices or rates — equity prices, interest rates, FX rates, commodity prices, credit spreads, implied volatility. It's the risk type VaR and Expected Shortfall were originally built to measure, and it's present in almost any position that's marked to a market price. A long equity position has market risk because the stock price can fall; a bond position has market risk because interest rates can rise and push its price down.

## Credit risk

Credit risk is the risk of loss from a counterparty failing to meet its obligations — a borrower defaulting on a loan, a bond issuer defaulting on its coupon or principal, a derivatives counterparty failing to pay what it owes. Credit risk is typically broken into three components that multiply together to estimate expected loss:

- **Probability of Default (PD)** — the likelihood the counterparty defaults within a given time horizon.
- **Loss Given Default (LGD)** — the fraction of the exposure actually lost if default happens (the rest might be recovered through collateral, seniority, or bankruptcy proceedings).
- **Exposure at Default (EAD)** — the amount owed at the moment of default.

Expected credit loss is roughly PD × LGD × EAD. Each piece is estimated separately because they respond to different drivers — PD largely reflects the counterparty's own creditworthiness, while LGD depends heavily on collateral and seniority structure.

## Liquidity risk

Liquidity risk splits into two related but distinct ideas:

- **Funding liquidity risk** — the risk that a firm cannot meet its own cash obligations as they come due, even if it is solvent on paper. A firm can be fundamentally healthy and still fail if it runs out of cash at the wrong moment.
- **Market liquidity risk** — the risk that a position cannot be exited (or can only be exited at a much worse price) because the market for that asset is thin. Trying to sell a large position quickly in an illiquid market can move the price against the seller — the trade itself creates part of the loss.

These two interact in crises: a firm facing funding pressure may be forced to sell assets into a market that has itself become illiquid, compounding both problems at once.

## Concentration risk: the thread that connects all three

Concentration risk isn't a fourth separate category so much as a theme that makes each of the three worse: a market-risk exposure concentrated in one sector, a credit exposure concentrated in one counterparty or industry, or a liquidity need concentrated in one funding source or one hard-to-sell asset, all magnify the underlying risk type they sit inside. Diversifying away from concentration is one of the most consistent tools across all of risk management.

## Key terms

| Term | Meaning |
|---|---|
| Market risk | Loss from movements in market prices or rates |
| Credit risk | Loss from a counterparty failing to meet its obligations |
| Probability of Default (PD) | Likelihood a counterparty defaults within a given horizon |
| Loss Given Default (LGD) | Fraction of exposure actually lost if default occurs |
| Exposure at Default (EAD) | Amount owed at the moment of default |
| Funding liquidity risk | Risk of being unable to meet cash obligations as they come due |
| Market liquidity risk | Risk of being unable to exit a position without moving its price |

## Recap

Market risk, credit risk, and liquidity risk are the three broad categories almost every risk measure in this chapter is ultimately trying to capture, and concentration risk makes any one of them worse when exposure piles up in one place. Next up, Lesson 26: hedging strategies — the practical tools used to actually reduce these risks once they're identified.
