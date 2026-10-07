# Stress Testing & Scenario Analysis

Lesson 23 covered VaR and Expected Shortfall — risk measures built from statistics on historical or modeled returns. Both share a weakness: they're only as good as the data and assumptions feeding them, and markets occasionally do things that fall outside any recent statistical pattern. Stress testing and scenario analysis are the tools built specifically to probe those "what if something genuinely unusual happens" questions.

## What you'll learn

- How historical scenario replay applies a real past crisis to today's portfolio
- How hypothetical scenarios and single-factor sensitivity analysis differ from historical replay
- What reverse stress testing asks, and why it flips the usual question around
- Why regulators run their own standardized stress tests, using the Fed's CCAR/DFAST as an example

## Historical scenario replay

The most direct form of stress testing takes a real historical crisis — the 2008 financial crisis, the 2020 COVID crash, the 1998 Russian default and LTCM collapse — and asks: if those exact market moves (equity indices, credit spreads, interest rates, volatility, and so on) happened again starting today, what would happen to the portfolio I currently hold? This is powerful because the scenario is historically grounded and internally consistent (the moves really happened together), but it's backward-looking by construction — it can only replay crises that have already occurred.

## Hypothetical scenarios and sensitivity analysis

- **Hypothetical (constructed) scenarios** — a risk team builds a scenario that hasn't happened historically but is judged plausible, such as a sudden central bank policy shock combined with a currency devaluation. This lets risk managers probe forward-looking risks that historical replay can't reach.
- **Sensitivity analysis** — shocks a single risk factor at a time (interest rates up 100 basis points, oil up 20%, one currency devalues 10%) holding everything else fixed. It isolates which factor the portfolio is most exposed to, though it ignores how factors might move together in a real crisis.

## Reverse stress testing

Ordinary stress testing starts with a scenario and asks what it would do to the portfolio. Reverse stress testing flips the question: starting from a specific, unacceptable loss (for example, a loss large enough to breach a firm's capital or liquidity limits), what combination of market moves would be needed to produce it? This surfaces hidden concentrations and fragile assumptions that forward-looking scenario design might never think to test.

## Regulatory stress testing

Regulators run their own standardized stress tests across the firms they supervise, both to assess individual firm resilience and to compare results consistently across the industry. In the United States, the Federal Reserve's CCAR (Comprehensive Capital Analysis and Review) and DFAST (Dodd-Frank Act Stress Test) programs are well-known examples: large banks run their balance sheets through Fed-specified adverse and severely adverse macroeconomic scenarios and must show they would stay above required capital levels. This is one concrete point of contact between risk management and regulation, which this chapter returns to directly in Lesson 27.

## Key terms

| Term | Meaning |
|---|---|
| Historical scenario | Replaying a real past crisis's market moves against today's portfolio |
| Hypothetical scenario | A constructed, forward-looking scenario judged plausible but not drawn from history |
| Sensitivity analysis | Shocking one risk factor at a time, holding all others fixed |
| Reverse stress testing | Starting from an unacceptable loss and working backward to the scenario that would cause it |
| CCAR / DFAST | The Federal Reserve's standardized US bank stress-testing programs |

## Recap

Stress testing and scenario analysis fill the gap that statistical risk measures leave open: they ask explicit "what if" questions — replaying real crises, constructing plausible new ones, shocking one factor at a time, or working backward from an unacceptable loss — rather than relying only on recent historical patterns. Next up, Lesson 25: market, credit, and liquidity risk, the three broad risk types that VaR, Expected Shortfall, and stress tests are all ultimately trying to measure and control.
