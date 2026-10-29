# Lesson 27 — A Cloud Brokerage Layer, and What It Actually Adds

**Chapter 7 · Multi-Cloud Cost and Governance · Lesson 3 of 4**

## What you'll learn

- What a cloud management platform / brokerage layer actually is, as a
  category of tool, and the real products that occupy it
- The three things a brokerage layer genuinely adds on top of native
  Azure and AWS tooling
- The one thing it fundamentally cannot do, no matter how good the
  dashboard looks
- Why adopting one is itself a cost-and-complexity decision, not a
  free win

## The category, and what sits in it

A cloud management platform — sometimes called a cloud brokerage layer
— sits above Azure, AWS, and on-prem, pulling data from each one's
native APIs into a single product. This is a real, established tool
category: CloudHealth (now part of VMware/Broadcom's Aria portfolio),
Flexera One, and Morpheus Data are examples of products that occupy it,
each aggregating cost and governance data across providers rather than
replacing any one provider's own control plane. None of them talk to
Azure or AWS resources directly the way Azure Resource Manager or an
AWS API call does — they consume the same billing and policy APIs you
could query yourself, and present the result in one interface.

## What it genuinely adds

Three things, done well, are real and valuable:

**A single pane of glass for cost.** Instead of pulling Azure Cost
Management exports and AWS CUR data into your own normalization
pipeline by hand — the work from Lesson 25 — a brokerage layer does
that ingestion and FOCUS-style normalization for you, and keeps it
current without a person re-running an export every month.

**Unified chargeback and showback reporting.** Once cost is normalized
across providers, allocating it back to the cost centers and workload
owners defined by your tagging taxonomy becomes one report instead of
two separate exports stitched together manually.

**A consolidated governance view.** Rather than checking Azure Policy
compliance in one console and AWS Config/SCP violations in another,
a brokerage layer can surface both sets of violations side by side,
mapped back to the same control catalog from Lesson 26.

## What it does not solve

Here's the limit that matters most: a brokerage layer cannot make the
underlying services equivalent. Azure Blob Storage, AWS S3, and an
on-prem file share still have different APIs, different consistency
guarantees, different IAM models, and different operational quirks —
and no dashboard changes that. A brokerage tool can put "storage cost"
for both platforms side by side in one chart, but it cannot make
migrating an actual workload between them free, fast, or
risk-free, and it cannot substitute for an engineer who genuinely
knows how each service behaves under load. Buying the tool does not
buy you the underlying cross-cloud expertise it displays data about.

## It's a cost decision too

A brokerage platform is itself a line item: license cost, an
integration to keep synchronized with two separate cloud APIs as both
evolve, and someone on staff who owns keeping it accurate. For a
smaller multi-cloud footprint, that overhead can exceed what you'd
spend building a lighter normalization pipeline yourself from the
FOCUS schema and native exports. Adopting one is a build-vs-buy
decision like any other — worth making deliberately, not because
"single pane of glass" sounds like it should obviously be worth it.

## Key terms

| Term | Meaning |
|---|---|
| Cloud management platform / brokerage layer | A tool category that aggregates cost, governance, and provisioning data across multiple providers into one interface |
| Single pane of glass | A unified view assembled from multiple providers' native APIs, not a replacement for those providers' own control planes |
| Chargeback / showback | Allocating normalized cost back to the cost centers or workload owners defined by an org's tagging taxonomy |
| Build-vs-buy | The decision between adopting a commercial brokerage platform versus building a lighter normalization pipeline in-house |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: what
three things does a cloud brokerage layer genuinely add, and why can't
it make Azure Blob Storage and AWS S3 operationally equivalent no
matter how unified its dashboard looks?
