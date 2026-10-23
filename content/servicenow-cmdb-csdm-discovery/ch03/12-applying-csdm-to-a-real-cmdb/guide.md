# Lesson 12 — Applying CSDM to a Real CMDB

**Chapter 3 · The Common Service Data Model (CSDM) · Lesson 12 of 26**

## What you'll learn

- Why CSDM adoption is normally phased, not attempted all at once
- The real, practical top-down order: critical Business Services first, then their Technical Services, then the CIs that deliver them
- Why starting with a full CI inventory before any service context exists is a common and costly mistake
- How to judge which Business Services are "most critical" when deciding where to start
- What a realistic first phase of a CSDM rollout actually looks like

## Why you can't do it all at once

A real organization running ServiceNow for any length of time already has thousands of CIs, dozens of applications, and some number of services nobody has ever formally written down. Trying to apply CSDM everywhere at once — mapping every CI, every application, and every service into the layered model from Lesson 10 in a single pass — is rarely how real implementations succeed. CSDM adoption is commonly phased, with each phase delivering something usable rather than waiting for a "big bang" cutover that covers the whole estate.

## Start with the Business Services that matter most

A sensible phase one starts by identifying and documenting the organization's most critical Business Services first — the handful of services where an outage is expensive, visible, or both: Order Processing, Payroll, the Customer Portal, whatever actually keeps the business running. "Most critical" is usually judged by a mix of revenue impact, customer visibility, and regulatory exposure, not by which service happens to be easiest to model. This step can often be done almost entirely through conversations with business stakeholders, before touching the CMDB at all.

## Work down to the Technical Services that deliver them

Once the priority Business Services are named and agreed on, the next phase works down one level: identifying the Technical Services that actually deliver each one. This is where IT and the business start to connect — someone has to say "Order Processing depends on the order management application stack and the payment gateway integration," turning a business-level name into a technical-level one that can be traced further.

## Finish with the CIs — now in service context

Only in the final phase do you drill down to the individual CIs that make up each Technical Service — the specific servers, databases, and application instances. By this point, every CI you document already has a reason to exist in the model: it's known to support a named Technical Service, which in turn supports a named, prioritized Business Service. The CI isn't just "a server someone found" — it's a server that matters, for a documented reason.

## Why top-down beats bottom-up

The alternative — starting with a full CI inventory and hoping service context gets added later — is a common and costly mistake. Months can go into cataloging infrastructure with no clear service tie yet, and a lot of that work ends up being reorganized or discarded once service priorities finally get decided. Going top-down, by priority, ties CMDB work directly to business value from day one: the first service modeled correctly is also, by construction, one of the most important ones, so the payoff shows up early instead of only after the entire estate is cataloged.

## Key terms

| Term | Meaning |
|---|---|
| Phased implementation | Rolling out CSDM in stages, each delivering usable value, instead of a single all-at-once pass |
| Top-down modeling | Starting from priority Business Services and working down to Technical Services, then CIs |
| Bottom-up inventory | Starting by cataloging every CI first, with service context added later — the approach this lesson argues against |
| Service context | The reason a given CI matters: which Technical Service it supports, and which Business Service that in turn supports |

## Check yourself

A new CSDM rollout has budget for one phase before the next budget cycle. Explain, using this lesson's reasoning, why spending that phase cataloging every server in the data center would likely be the wrong call — and what you'd do instead.
