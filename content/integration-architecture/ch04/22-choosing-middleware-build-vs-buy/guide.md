# Lesson 22 — Choosing Middleware: Build vs. Buy

**Chapter 4 · Applying Integration Architecture · Lesson 22 of 28**

## What you'll learn

- The build-vs-buy question as it specifically applies to middleware and integration infrastructure
- A structured framework of factors — not a single "always buy" or "always build" rule
- Total cost of ownership (TCO) as the real comparison, not just sticker price
- A worked example applying the framework to a concrete scenario

## There is no universal right answer

Once Lesson 11's framework has pointed toward needing a middleware or hub-and-spoke layer at all, a second decision follows: build custom integration infrastructure in-house, or buy (subscribe to) an iPaaS platform like MuleSoft Anypoint or a comparable vendor product. Neither answer is correct by default — this is a genuine trade-off analysis, and treating it as an ideological choice ("we always build" or "we always buy") rather than a case-by-case evaluation is itself a mistake an architect should push back on.

## The factors that actually drive the decision

- **Time to value.** A buy decision typically gets a working integration running faster, since the vendor has already built the hard parts (connectors, retry logic, monitoring dashboards) that a build decision would need to construct from scratch. If the business need is urgent, this factor weighs heavily toward buy.
- **Total cost of ownership, not sticker price.** The comparison isn't "subscription cost vs. zero," because building in-house isn't free — it costs developer time to build, and crucially, ongoing developer time to maintain, patch, and extend indefinitely after the initial build. A fair build-vs-buy comparison estimates both the subscription cost over several years and the fully-loaded cost of the team that would build and maintain a custom equivalent over the same period, including the real risk of key-person dependency if the one developer who understands the custom system leaves.
- **How standard or how unique the integration need is.** A need that's common across many companies (connecting Salesforce to a major ERP, syncing with a common marketing platform) is exactly what a mature iPaaS vendor has already built pre-packaged connectors for — buying captures work the vendor has already done once and sells to everyone. A need that's genuinely unique to this specific business (a proprietary internal system with no existing connector anywhere) tilts toward build, since there's no pre-built product to buy that actually fits.
- **Control and customization requirements.** Some organizations have genuine, specific requirements (data residency rules, a highly unusual workflow, deep customization a vendor's platform can't accommodate) that only a custom build can satisfy. This is a legitimate factor, but it should be scrutinized honestly — "we want full control" is sometimes a real requirement and sometimes a stated preference masking an unwillingness to adapt a process to fit a vendor's platform.
- **Internal capability and appetite for ongoing maintenance.** Building custom infrastructure commits the organization to maintaining it indefinitely — patching, scaling, documenting, and training new team members on something that exists nowhere else. An organization without a stable, well-resourced integration team is taking on more risk with a build decision than one with deep in-house platform expertise and a specific reason to need it.

## Total cost of ownership, worked through

A company estimates building a custom middleware layer in-house would take two senior developers four months to build (roughly $160,000 in loaded cost) and then half of one developer's ongoing time to maintain going forward (roughly $60,000/year). A comparable iPaaS subscription costs $75,000/year. Over three years, the build option costs roughly $160,000 + (3 × $60,000) = $340,000; the buy option costs roughly 3 × $75,000 = $225,000 plus a smaller implementation cost to configure it (say $40,000), for roughly $265,000. On pure TCO, buy wins here — but the comparison also has to weigh the uniqueness and control factors: if this company's actual integration need is highly standard (syncing with a major ERP the vendor already has a pre-built connector for), the TCO conclusion and the standardness factor both point the same direction, toward buy. If the need were genuinely unique with no vendor connector available, the TCO numbers would look very different because the "buy" option wouldn't actually solve the problem out of the box.

## Key terms

| Term | Meaning |
|---|---|
| Build vs. buy | The decision between building custom integration infrastructure in-house or subscribing to a vendor platform |
| Total cost of ownership (TCO) | The full cost of a solution over its lifetime, including initial build/implementation and ongoing maintenance, not just sticker price |
| Key-person dependency | The risk that a custom system becomes unmaintainable if the one person who deeply understands it leaves |

## Lab

A logistics company needs to integrate Salesforce with eleven different regional shipping-carrier APIs, each with its own authentication scheme and data format, a need shared by thousands of other logistics companies worldwide. The company has a two-person integration team with no deep iPaaS platform experience. Apply this lesson's five factors to recommend build or buy, and justify your recommendation using at least three of the five factors explicitly.

## Check yourself

Can you name the five factors this lesson says actually drive a build-vs-buy decision, without looking back at the list? Can you explain, in your own words, why comparing subscription cost against zero (rather than against TCO) is a flawed way to evaluate build vs. buy?
