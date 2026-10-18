# Build vs. Buy: A Real Framework for AI Components

Every ADR in Lesson 6's example implicitly answered a build-vs-buy question: use a managed vector database, or run one yourself. This lesson makes that decision explicit and gives it a real framework — because "buy" isn't automatically cheaper, "build" isn't automatically more flexible, and a decision made on vibes instead of real numbers is exactly the kind of thing a written ADR (and a good architecture review) will catch.

## What you'll learn

- Why "buy is always cheaper" and "build is always more flexible" are both unreliable defaults
- A worked cost comparison: building vs. buying a re-ranking component for Northbeam
- The non-cost factors that belong in this decision alongside the raw numbers
- A simple framework for making this decision explicitly, instead of by default

## The decision: build a re-ranker, or buy one

Northbeam's RAG pipeline needs a re-ranking step — re-ordering initially retrieved documents by relevance before they reach the LLM. The team can build this in-house (a moderate-complexity ML component) or buy it as a managed API from a third-party provider.

**Build cost**, assuming a fully-loaded engineer cost of $15,000/month:

```python
engineer_monthly_cost = 15_000
build_months = 3                      # initial build + testing
maintenance_months_per_quarter = 0.5  # ongoing upkeep, bug fixes, retraining

build_cost = build_months * engineer_monthly_cost
maintenance_cost_2yr = maintenance_months_per_quarter * 8 * engineer_monthly_cost
total_build_cost_2yr = build_cost + maintenance_cost_2yr

print(f"Build cost: ${build_cost:,}")
print(f"2-year maintenance: ${maintenance_cost_2yr:,}")
print(f"Total build cost (2 years): ${total_build_cost_2yr:,}")
```

```
Build cost: $45,000
2-year maintenance: $60,000
Total build cost (2 years): $105,000
```

**Buy cost**, assuming re-ranking applies to 30% of Northbeam's 2,000,000 daily requests (simple queries skip re-ranking) at an illustrative $0.0003 per API call:

```python
requests_per_day = 2_000_000
rerank_fraction = 0.3
cost_per_call = 0.0003

daily_buy_cost = requests_per_day * rerank_fraction * cost_per_call
total_buy_cost_2yr = daily_buy_cost * 365 * 2

print(f"Daily buy cost: ${daily_buy_cost:,.2f}")
print(f"Total buy cost (2 years): ${total_buy_cost_2yr:,.2f}")
```

```
Daily buy cost: $180.00
Total buy cost (2 years): $131,400.00
```

**In this specific scenario, building is actually about $26,400 cheaper over two years than buying** — the opposite of the common assumption that buying a managed service is always the cheaper, faster-to-market default. This is the entire point of running the numbers rather than assuming: at Northbeam's specific volume and the specific vendor pricing available, the "obvious" choice isn't actually the cheaper one.

## What the raw cost comparison leaves out

Cost alone is not the whole decision. **Speed to market** favors buying: three months of build time is three months the feature isn't shipped, which has its own real cost (delayed value, competitive exposure) that doesn't show up in the dollar comparison above. **Team expertise** matters: if Northbeam's team has never built a re-ranking model before, the real build timeline likely exceeds the three-month estimate, and the output quality is a genuine risk until proven otherwise. **Vendor risk** cuts the other way: buying introduces a new dependency (Lesson 4's "AI-specific failure modes") and a provider that could raise prices, change their API, or shut down the product entirely. **Differentiation** matters too: if re-ranking quality is a genuine competitive advantage for Northbeam's specific use case, owning and iterating on it in-house may be worth paying more for; if it's a commodity capability no customer will ever notice, buying the adequate, off-the-shelf option is the pragmatic choice.

## A simple framework for making this decision explicitly

1. **Run the real cost numbers for the actual relevant time horizon** — not just initial cost, but total cost including maintenance, at the relevant time horizon (2-3 years is typical).
2. **Name the non-cost factors explicitly**: speed to market, team expertise and risk, vendor dependency risk, and whether this component is a genuine differentiator or a commodity capability.
3. **Write the decision down as an ADR** (Lesson 6) — including which of these factors actually tipped the decision, since "we decided to build it" without that reasoning is exactly the kind of underspecified decision this chapter is teaching you to avoid.

## Key terms

| Term | Meaning |
|---|---|
| Build vs. buy | The decision between building a capability in-house vs. purchasing it as a managed service or product |
| Total cost of ownership | The full cost of a choice over a relevant time horizon, including ongoing maintenance, not just initial cost |
| Differentiator vs. commodity capability | Whether a component is a genuine competitive advantage worth owning, or a standard capability better left to a vendor |

## Check yourself

In the worked example, building the re-ranker came out cheaper than buying it over two years. Why would it still sometimes be the WRONG decision, even with that cost advantage?
