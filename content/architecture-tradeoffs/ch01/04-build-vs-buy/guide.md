# Lesson 4 — Build vs. Buy

**Chapter 1 · Architecture Tradeoffs · Lesson 4 of 20**

## What you'll learn

- The real cost structure on each side of build vs. buy, not just sticker price
- How AppExchange managed packages change the calculus compared to building custom
- The functional-fit test architects actually use to decide
- Why this decision isn't permanent, and what to track so it can be revisited

## Two different cost curves, not two prices

Build vs. buy looks, on the surface, like comparing two price tags. It isn't. Buying an AppExchange managed package usually means a lower upfront cost and a recurring subscription that scales with usage or seat count — the vendor has already built, tested, and (for anything AppExchange-listed) passed Salesforce's security review on the thing you need, so you get it running in days or weeks rather than months. Building custom means a higher upfront investment in developer time, but — if done well — a flatter long-run cost curve, because you're not paying a per-user subscription forever and you own the roadmap outright instead of waiting on a vendor's release schedule.

Neither curve is free, and neither is simply "cheaper." A managed package's subscription cost compounds every year and grows with headcount, which can make a five-year total cost far higher than it first looked. A managed package also means you don't own the Apex inside it — most managed packages hide their source and namespace their components, so you customize only through whatever configuration points and APIs the vendor chose to expose, and you're constrained to their data model and their release cadence. A custom build avoids all of that, but now your org owns every bug fix, every security patch, and every future enhancement forever, with no vendor to escalate to when something breaks. "Buy" trades money and flexibility for speed and reduced ongoing engineering burden. "Build" trades money and speed for control and a potentially better long-run cost curve, at the price of now being your own permanent engineering team for that feature.

## The functional-fit test

The practical way architects resolve this isn't abstract philosophy — it's a concrete fit check. List the specific business requirements this feature needs to satisfy. Then honestly score how much of that list an available AppExchange package (or several, compared against each other) actually covers out of the box or through its supported configuration points, versus how much would require workarounds, duplicate data entry, or features the package simply doesn't have. When the honest coverage number is high, buying and configuring around the gap is almost always faster and cheaper than building the whole thing from scratch. When the coverage number is low — the requirement is unusual, deeply tied to a proprietary process, or central to the org's actual competitive differentiation — custom development is usually the better investment, because you'd otherwise be forcing a unique business process to bend around someone else's generic data model.

A few more concrete criteria that belong in this decision alongside raw functional fit:

- **How core is this to what makes the org different?** Commodity functionality (standard approval routing, basic case management) is a strong buy candidate — there's little competitive advantage in reinventing it. A proprietary process that's actually part of the org's differentiation is a stronger build candidate, because a generic package was never going to fit it well anyway.
- **What's the exit cost on each side?** Migrating off a managed package later (its data model, its automation, its reports) can be as expensive as the original build you were trying to avoid. Migrating off custom code you own is comparatively just a rewrite. Exit cost belongs in the decision up front, not discovered at renewal time.
- **Who maintains the result, and for how long?** A package comes with a vendor's support SLA (worth checking before relying on it) and regular updates. Custom code's maintenance is entirely on your team, indefinitely, including security patches as the platform changes underneath it.

This is also not a one-time, permanent decision. An org that buys a package today because it's a 90% fit might outgrow that fit in three years as its needs diverge from the vendor's roadmap — at which point rebuilding becomes the right call. Track what specifically made "buy" correct the first time, so you can tell when those conditions have changed.

## Key terms

| Term | Meaning |
|---|---|
| Managed package | An AppExchange-distributed, namespaced, vendor-owned package whose Apex source is typically hidden from subscribers and customized only through exposed configuration points |
| AppExchange security review | Salesforce's required review process for any package listed on AppExchange, which affects a vendor's release timing |
| Functional-fit test | Scoring how much of a specific requirements list an available package covers out of the box versus how much needs a workaround |
| Exit cost | The cost of migrating away from a chosen solution later, which belongs in the original build-vs-buy decision |

## Lab

A mid-size insurance company needs a claims-intake process. An AppExchange package exists that covers about 65% of their documented requirements out of the box, with the rest achievable through its configuration API; a competing internal proposal would build the whole thing as custom Apex and Lightning Web Components in roughly four months. Using the criteria above, write a short recommendation: what additional information would you want before deciding, and which way does the decision lean given only the facts stated, and why?

## Check yourself

Can you explain why build vs. buy is a comparison of two different cost *curves* over time, not two single price tags? Can you describe the functional-fit test an architect uses, and name at least one additional factor (beyond raw cost) that belongs in a real build-vs-buy decision?
