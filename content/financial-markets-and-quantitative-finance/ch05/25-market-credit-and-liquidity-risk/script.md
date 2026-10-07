# Script — Market, Credit & Liquidity Risk

## Segment 1 (title)

VaR, Expected Shortfall, and stress testing are all tools for measuring risk — but risk itself comes in several distinct flavors, and the right mitigation depends on which one you're facing. This lesson names the three broad types that show up across almost every desk and portfolio: market risk, credit risk, and liquidity risk.

## Segment 2 (steps)

Market risk is the risk of loss from movements in prices or rates — equities, interest rates, FX, commodities, credit spreads, volatility. It's the risk type VaR was originally built to measure. Credit risk is the risk that a counterparty fails to meet its obligations — a borrower defaulting on a loan, an issuer missing a coupon payment. And liquidity risk is the risk of being unable to act in time, which splits into two related ideas we'll get to in a moment.

## Segment 3 (code)

Credit risk is usually broken into three multiplying pieces. Probability of Default is how likely the counterparty is to default within a given horizon. Loss Given Default is the fraction of the exposure you'd actually lose if that default happens, since some of it might be recovered through collateral or seniority. And Exposure at Default is simply how much is owed at the moment of default. Multiply all three together and you get an estimate of expected credit loss — and each piece is estimated separately because each one responds to a different driver.

## Segment 4 (steps)

Liquidity risk splits into two ideas. Funding liquidity risk is the risk that a firm can't meet its own cash obligations as they come due, even if it's fundamentally solvent on paper. Market liquidity risk is the risk that a position can't be exited without moving the price against you, because the market for that asset is thin. In a real crisis these two feed each other: funding pressure forces asset sales into a market that's itself become illiquid. And running through all three risk types is concentration risk — exposure piled up in one sector, one counterparty, or one funding source makes whichever risk type it sits inside worse.

## Segment 5 (outro)

Market, credit, and liquidity — three categories, and almost every risk measure in this chapter is ultimately pointed at one of them. Up next, Lesson 26: hedging strategies, the practical tools used to actually reduce these risks once they're identified.
