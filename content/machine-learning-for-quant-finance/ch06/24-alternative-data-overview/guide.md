# Alternative Data Overview

Everything modeled so far in this course has come from traditional sources — prices, volumes, fundamentals, filings, news. Alternative data steps outside that set entirely: satellite photos of parking lots, anonymized credit-card transaction panels, shipping manifests, social media chatter. It's one of the most talked-about edges in modern quantitative finance, and also one of the hardest to use responsibly and well.

## What you'll learn

- The main categories of alternative data used in quant finance
- Why alt data can offer a genuine information edge, and why that edge erodes
- Practical challenges: short history, data quality, and survivorship bias
- Compliance boundaries around material non-public information (MNPI)

## The main categories

Alternative data covers a wide range of non-traditional sources, grouped loosely by what they observe:

- **Satellite imagery** — counting cars in retail parking lots, tracking oil tanker drafts or storage-tank shadows, monitoring crop health, to estimate retail foot traffic, oil inventories, or agricultural yields before official reports confirm them.
- **Credit-card transaction panels** — anonymized, aggregated consumer spending data that can estimate a retailer's same-store sales growth weeks before its earnings release.
- **Web-scraped pricing** — tracking e-commerce prices and product availability across thousands of SKUs to infer demand, discounting behavior, or inventory stress.
- **Social media and web sentiment** — aggregate chatter volume and tone around a brand, product launch, or ticker, distinct from the structured news-and-filings sentiment covered in Lesson 23.
- **Supply-chain and shipping data** — container-ship tracking (AIS data), customs and bill-of-lading records, and freight-rate indices used to infer trade volumes and demand shifts.
- **Geolocation and foot-traffic data** — anonymized mobile location data aggregated to estimate store visits, event attendance, or regional economic activity.

## Why alt data can offer a genuine edge — and why it fades

The appeal is straightforward: if a data source reveals something about a company's real-world performance before that information shows up in a quarterly filing or a price move, a model trained on it has a head start other market participants don't have.

That edge is also inherently temporary. As more funds discover and license the same alternative dataset, more capital trades on the same signal, and the resulting price impact erodes the edge — the same arbitrage dynamic that erases any discovered inefficiency, just applied to a newer category of information. Alt data isn't a permanent advantage; it's a race to find and properly exploit a source before it becomes widely used.

## Practical challenge: short history

Most alternative datasets are commercially new — a vendor may only have two or three years of clean history for a given satellite feed or transaction panel. Chapter 4's entire validation toolkit (purged walk-forward CV, the deflated Sharpe ratio) assumes you have enough independent time periods to validate across. With only a couple of years of data, you simply can't build the kind of robust, multi-regime validation this course has emphasized — which means confidence in an alt-data-driven signal should start out lower than confidence in a signal built on decades of price history, by construction.

## Practical challenge: vendor data quality and survivorship

Alternative data vendors vary enormously in rigor. Common issues include:

- **Coverage gaps** — a satellite feed might miss certain store locations or geographies inconsistently.
- **Panel composition changes** — a credit-card panel's set of contributing banks or cardholders can shift over time without a clean audit trail, which can look like a market trend but is actually a change in the underlying sample.
- **Survivorship bias** — vendors sometimes backfill coverage for companies that still exist today while silently dropping or never including those that went bankrupt or were delisted, making historical backtests look better than live performance would have been.

Any alt-data vendor relationship should include a real effort to understand how their panel has changed over time, not just what it covers now.

## Compliance boundary: material non-public information (MNPI)

Not every alternative dataset is legally usable. **Material non-public information (MNPI)** is information that would move a security's price if disclosed and that isn't available to the public — trading on it is illegal, full stop, regardless of how the information was obtained. The compliance question for any new alt-data source is whether it's built from genuinely public or appropriately licensed/anonymized data (satellite imagery of a public parking lot, aggregated and anonymized transaction data) versus something that crosses into non-public insider knowledge about a specific company (an employee leaking internal sales figures directly, for instance). This is a legal and compliance review, not a judgment call for an individual researcher to make alone — any serious quant shop vets new data sources through compliance before they ever reach a model.

## Key terms

| Term | Meaning |
|---|---|
| Alternative data | Non-traditional data sources (satellite, transactions, web, social, shipping, geolocation) used to model markets |
| Survivorship bias | A dataset silently excluding companies that failed or were delisted, flattering historical backtests |
| MNPI | Material non-public information; trading on it is illegal regardless of how it was obtained |

## Recap

Alternative data spans satellite imagery, transaction panels, web-scraped pricing, social sentiment, shipping data, and geolocation data, and it can offer a genuine information edge — one that erodes as more capital discovers it. Short history, vendor data-quality issues, and survivorship bias all limit how much validation confidence you can place in an alt-data signal, and every new source needs a compliance review for MNPI boundaries before it's used. Next up, Lesson 25: reinforcement learning for trading, a conceptual look at a still-emerging research area.
