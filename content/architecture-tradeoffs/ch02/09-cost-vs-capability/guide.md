# Lesson 9 — Cost vs. Capability

**Chapter 2 · Tradeoffs in Depth · Lesson 9 of 20**

## What you'll learn

- Why every additional capability on the Salesforce platform has a recurring, not just upfront, cost
- Concrete examples: Salesforce Shield, additional sandboxes, API call limits tied to edition and add-ons, Platform licenses vs. full CRM licenses
- How to evaluate a capability against what the org will actually use, not what sounds impressive
- Why under-provisioning is also a real cost, not just the safe default

## Capability is a subscription, not a purchase

On most platforms, more capability is a one-time decision: you buy the bigger tool, you own the bigger tool. Salesforce's licensing model makes nearly every capability upgrade a recurring cost that compounds with user count and that keeps billing whether or not the capability gets fully used. Salesforce Shield — the platform encryption, event monitoring, and field audit trail bundle — is a real, often necessary capability for orgs with strict compliance requirements, and it's also a per-user add-on cost layered on top of the base license, every year, for every user it's assigned to. A full Sales Cloud or Service Cloud license costs more than a Platform license, and that extra cost buys real CRM capability — but if half the users assigned a full CRM license only ever touch three custom objects and never open an Opportunity, the org is paying full price for capability nobody is using.

The same pattern shows up in infrastructure-adjacent capability choices. Additional full or partial sandboxes cost money and come with their own refresh and storage limits — genuinely useful for a team doing serious parallel development and testing, and genuinely wasted spend for a small admin team that could get by on fewer environments with disciplined scheduling. API call limits scale with edition and specific add-ons, and an integration-heavy org that needs a higher daily API call allocation pays for that scale whether or not every day actually needs it. None of these are bad purchases in isolation — they're each a real capability bought at a real, ongoing price, and the tradeoff is whether the org's actual, measured usage justifies that ongoing cost.

## The two-sided failure mode

This tradeoff fails in both directions, and it's worth being explicit about both:

- **Over-provisioning.** Buying the more capable license, the Shield bundle, the extra sandboxes "to be safe" or "because we might need it," without a concrete, current plan to use it. This isn't actually the safe choice — it's locking in a recurring cost for a capability that may sit unused indefinitely, money that could otherwise fund a different investment the org actually needs now.
- **Under-provisioning.** Buying the cheaper, lower-capability option to save money now, and then hitting a wall six months later — API limits throttling a live integration, a sandbox refresh cycle too slow for the team's actual release cadence, a compliance requirement that Shield would have satisfied, now needing an emergency, more expensive fix under time pressure. The savings were real, and so was the cost of discovering the gap at the worst possible moment.

Both failure modes come from the same root cause: picking a capability level based on what sounds appropriately cautious or appropriately lean, rather than based on measured, current usage and a specific, near-term forecast.

## The actual decision criteria

- **What does the org measurably use today, and what's the realistic forecast for the next 12-24 months?** Not "we might need it eventually" — a specific, near-term, named use case. A compliance requirement that's already been flagged by legal is a real forecast. A vague sense that "enterprise orgs usually get Shield" is not.
- **What's the cost of discovering the gap too late, versus the cost of paying for headroom now?** A capability that would be catastrophically expensive or risky to add after the fact (encryption retrofitted onto years of existing data, for instance) justifies buying ahead of strict present need. A capability that's cheap and fast to add later (one more sandbox, a license tier bump for a handful of users) doesn't need to be bought on spec.
- **Can the capability be purchased incrementally, or is it an all-or-nothing commitment?** Many Salesforce add-ons can scale up by adding licenses or seats as actual usage grows, which weakens the case for buying the larger commitment upfront "to be safe" — incremental growth is often available as an option precisely so the org doesn't have to guess right the first time.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce Shield | A per-user add-on bundle providing platform encryption, event monitoring, and field audit trail, priced on top of base licenses |
| Platform license | A lower-cost Salesforce license tier with capability limited mostly to custom objects and apps, versus a full CRM license |
| Over-provisioning | Buying more capability than current, measured usage justifies, locking in recurring cost for unused capacity |
| Under-provisioning | Buying less capability than will actually be needed, risking a costly or risky gap discovered under time pressure later |

## Lab

A 300-user Salesforce org is deciding whether to add Salesforce Shield for all users ($$ per user per year) versus adding it only for the 40 users in regulated roles who actually handle data subject to a specific compliance requirement, with a plan to extend it later if the requirement's scope grows. Using the criteria above, write a short recommendation: which approach fits better here, and what specific piece of information would change your answer?

## Check yourself

Can you explain why Salesforce capability upgrades are usually a recurring cost rather than a one-time purchase, using at least one concrete example? Can you describe both failure modes of this tradeoff (over- and under-provisioning) and the root cause they share?
