# Lesson 12 — System Architecture

**Chapter 3 · Architecture Domains · Lesson 12 of 19**

## What you'll learn

- What "system architecture" means in a Salesforce context, as distinct from data or integration architecture specifically
- The single-org vs. multi-org decision, and the real factors that should drive it
- Why org limits and licensing shape system architecture decisions, not just preference
- How to reason about a system architecture decision using this course's trade-off habits

## System architecture is about the shape of the landscape itself

Where data architecture asks how information is modeled inside an org, and integration architecture asks how that org connects to the outside world, **system architecture** asks a question that sits above both: how many Salesforce orgs should this business actually run, and how should they relate to each other and to everything else in the company's technical landscape? It's the architecture of the landscape itself, before you've even started designing what's inside any one piece of it.

## The single-org vs. multi-org decision

The most consequential system architecture decision most Salesforce architects face is whether a business should run one Salesforce org for everything, or split into multiple orgs along some boundary — by business unit, by region, by brand, or because of a merger bringing two existing orgs together.

A **single org** gives the business one unified view: one data model, one set of users, one reporting layer that can see across the whole company without any integration effort. That consistency is genuinely valuable — a sales leader can run one report across every region without stitching data together from multiple sources. The cost is flexibility: every business unit sharing one org also shares its complexity, its customizations, and its constraints. A heavily customized org serving one demanding business unit can make life harder for every other unit sharing that same org, and very large, long-lived orgs can eventually run into real platform limits around code size, object counts, or automation complexity that a smaller, more focused org wouldn't hit as quickly.

A **multi-org** approach gives each business unit its own org, tailored to its own processes, with its own pace of change and its own isolation from other units' complexity. This genuinely helps in specific situations: a recent acquisition where the acquired company's processes are too different to merge quickly, a business unit operating under different regulatory or data-residency requirements, or units whose core processes are so different that forcing them into one shared data model would distort both. The cost is real and shouldn't be understated: every cross-org reporting need, every shared process, and every attempt to get a single view of a customer who touches more than one org now requires integration work that a single org would have gotten for free.

## What should actually drive the decision

Neither option is correct by default — the right framing, per this course's running theme, is that this is a trade-off, not a technology preference. The factors that should actually drive it: how different are the business units' core processes really (not just superficially different, but structurally incompatible); are there hard separation requirements like data residency or regulatory isolation that make sharing an org legally or practically impossible; is this a merger bringing two live orgs together, where consolidation itself is a multi-year project with its own risk; and how close is an existing org to real platform limits that would force a split regardless of preference. A common and reasonable default, absent a hard separation need, is to start with one org and only split when a specific, named reason justifies the added integration and governance cost — because the cost of under-splitting (one org that's slightly inconvenient for one unit) is usually much smaller than the cost of over-splitting (permanent integration overhead for a separation nobody actually needed).

## Licensing and limits aren't just a budget detail

System architecture decisions also have to respect Salesforce's own licensing model and platform limits as real constraints, not afterthoughts. Different orgs each carry their own license costs, their own per-org limits on things like API call volume and data storage, and their own administrative overhead. A multi-org decision made purely on process-fit grounds, without checking what it actually costs in licenses and ongoing admin effort across every org, is an incomplete analysis — exactly the kind of undocumented assumption Lesson 7 warned about, just applied at landscape scale instead of a single design.

## Key terms

| Term | Meaning |
|---|---|
| System architecture | The architecture of an organization's overall technical landscape, including how many orgs it runs and how they relate |
| Single-org strategy | Running one Salesforce org for the whole business, prioritizing unified data and reporting |
| Multi-org strategy | Running separate orgs per business unit, region, or brand, prioritizing isolation and tailored process fit |
| Org limits | Platform-level ceilings (e.g., around code, objects, or automation complexity) that can force an architecture decision regardless of preference |

## Lab

A retail company just acquired a smaller competitor that runs its own, differently-configured Salesforce org, with a very different sales process. Using this lesson's trade-off framing, write a short recommendation: would you lean toward consolidating into one org or keeping both orgs separate for now, name the one or two factors that actually drove your answer, and name the real cost your recommendation accepts in exchange.

## Check yourself

Can you explain what system architecture covers, as distinct from data architecture and integration architecture specifically? Can you name the real benefit and the real cost of both a single-org and a multi-org strategy? Can you list the factors that should actually drive a single-org vs. multi-org decision, rather than treating it as a default preference either way?
