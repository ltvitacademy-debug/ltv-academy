# Lesson 7 — Choosing Clouds and Features

**Chapter 1 · Designing Applications · Lesson 7 of 25**

## What you'll learn

- Why choosing which Salesforce cloud or product a solution should be built on is itself an architecture decision
- The difference between building on top of a purpose-built cloud (Sales, Service, Experience) and building on the core Salesforce Platform
- Why licensing is an architectural constraint, not just a procurement afterthought
- A practical approach to deciding "build this feature custom" vs. "turn on and configure a feature that already exists"

## The cloud choice happens before the object choice

Before an Application Architect gets to domain modeling or data modeling in detail, there's a decision that shapes everything downstream: which Salesforce product or "cloud" should this application actually be built on? **Sales Cloud** ships with a data model and processes oriented around selling (Leads, Opportunities, pipeline). **Service Cloud** ships oriented around support (Cases, Entitlements, Knowledge, omni-channel routing). **Experience Cloud** is built for exposing a branded, permission-scoped site to external users — customers or partners — rather than internal employees. The core **Salesforce Platform** (sometimes licensed as Platform licenses rather than full Sales/Service Cloud licenses) is the unopinionated base: objects, Flow, Apex, Lightning, with none of the vertical-specific data model or process baked in.

Choosing wrong here doesn't just mean a slightly awkward fit — it can mean paying for and fighting against a data model the business doesn't actually need, or building a custom app from scratch on bare Platform when a purpose-built cloud's standard objects would have covered 80% of the requirement for free.

## Build vs. configure vs. buy

For any given requirement, there's a spectrum, roughly in order of preference when the fit is genuinely good: **configure a standard feature** that already exists (a standard object, a built-in process like Case Escalation Rules, native omni-channel routing) is cheapest to build and cheapest to maintain, because Salesforce owns upgrading and supporting it. **Adapt a standard feature declaratively** (customize fields, page layouts, Flow automation around a standard object) is still relatively cheap and keeps you aligned with how the platform expects that object to behave. **Build fully custom** (a new custom object and bespoke automation) is appropriate once a requirement genuinely doesn't map onto anything standard — but it's the most expensive option to build and to maintain over time, because every bit of behavior that a standard feature would have given for free now has to be designed, built, and kept working by this project's own team. **Buy from AppExchange** is a fourth option worth weighing honestly against building custom in-house, when a mature third-party solution already solves the same problem well — covered more as a trade-off in later architecture-review lessons.

The mistake this lesson warns against is skipping straight to "build fully custom" because it feels like more control, without first honestly checking whether a standard object or feature already does most of the job.

## Licensing is an architectural constraint

A feature that looks technically perfect on paper can be architecturally wrong if it requires a license type the business hasn't bought or won't buy. Platform licenses, for example, come with restrictions compared to full Sales or Service Cloud licenses — an architect who designs a solution assuming every user has full CRM functionality, when half the intended users actually hold a more limited license type, has designed something that won't actually work for the audience it was meant for. Checking license types and their real capabilities against the actual user base belongs in the requirements and design phase, not as a surprise discovered during user acceptance testing.

## Key terms

| Term | Meaning |
|---|---|
| Sales Cloud | Salesforce's product oriented around selling: Leads, Opportunities, pipeline |
| Service Cloud | Salesforce's product oriented around customer support: Cases, Entitlements, Knowledge, omni-channel |
| Experience Cloud | Salesforce's product for branded, permission-scoped external-facing sites for customers or partners |
| Salesforce Platform | The unopinionated core platform (objects, Flow, Apex, Lightning) without a vertical-specific data model baked in |
| Build vs. configure vs. buy | The spectrum of options for meeting a requirement, roughly ordered from cheapest/most standard to most custom |

## Lab

A business wants to let its external retail partners log and track product-defect reports themselves, see the status of reports they've submitted, and attach photos. Walk through: which Salesforce product (Sales Cloud, Service Cloud, Experience Cloud, bare Platform, some combination) best fits this requirement and why; which parts of this requirement might already be covered by a standard object or feature; and one license-type question you would ask before finalizing the design.

## Check yourself

Can you explain, with an original example, the difference between building on a purpose-built cloud like Service Cloud versus building on the bare Salesforce Platform? Can you name the build/configure/buy spectrum in order and explain why skipping straight to "build custom" is a common architecture mistake?
