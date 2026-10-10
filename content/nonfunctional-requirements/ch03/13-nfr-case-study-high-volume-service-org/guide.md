# Lesson 13 — NFR Case Study: High-Volume Service Org

**Chapter 3 · Practice · Lesson 13 of 18**

## What you'll learn

- How to apply this course's full NFR framework to a single, realistic scenario end to end
- Why a high-volume service org's dominant NFR pressures are performance, scalability, and reliability, not compliance
- How to spot the specific design choices a volume-driven NFR set should produce
- A worked model for the kind of case-based reasoning this course's remaining lessons will keep asking for

## The scenario

A national appliance retailer runs its customer support operation on Service Cloud. Call volume and case volume are highly seasonal: a normal week sees roughly 8,000 new cases; the week after a major product recall or a holiday shopping surge can see 10x that volume in a matter of days, almost entirely through the self-service community portal and an integration from the company's e-commerce platform. Support agents are measured on first-response time, and the executive team has stated, in plain language, "the system cannot be the reason an angry customer waits longer during our worst week of the year."

## Applying the elicitation lens (Lesson 8)

The executive statement is exactly the kind of vague input Lesson 8 describes — "the system cannot be the reason" is not yet an NFR. A scenario walkthrough targeting the worst-week spike directly, plus a review of the existing first-response-time commitment (an informal SLA the support team already lives by, even if it was never written into a vendor contract), surfaces the real requirements: case-creation and assignment must stay fast at 10x normal volume, and whatever automation assigns cases to agents must not fall over or silently misassign work under that load.

## The dominant NFR categories here

For this specific org, **performance, scalability, and reliability** carry the most weight, while compliance is comparatively light (no regulated data category drives this scenario) and security is standard rather than elevated. That weighting is itself a finding worth stating explicitly — not every org needs the same NFR emphasis, and a case study's first job is identifying which categories actually matter most for this specific business.

- **Performance**: case creation and initial routing must complete within a tight response-time target, specifically during the spike condition — not just under normal Tuesday-afternoon load, which is the condition a pre-launch demo would naturally test and pass without ever revealing the real risk.
- **Scalability**: the Case object's transaction-volume growth during a spike is the relevant dimension (Lesson 4) — not data-volume growth over years, which matters less here than the short, violent spike pattern.
- **Reliability**: the e-commerce integration that creates cases automatically has to tolerate retries without creating duplicate cases (the idempotency pattern from Lesson 5), especially because a recall event is exactly when the integration is under the most stress and most likely to retry.

## The design decisions this NFR set should produce

Following Lesson 9's trace pattern: the performance and scalability pressure during a spike implies that case-assignment logic doing meaningful synchronous work (routing-rule evaluation against agent workload, skill matching) is a risk if it all runs inline on insert — the decision is to move assignment scoring to an asynchronous path so the synchronous save stays fast even as volume climbs. The reliability pressure on the e-commerce integration implies the Apex endpoint processing inbound case-creation requests needs to upsert against an external order/case reference ID rather than blindly insert, so a retried request from the e-commerce platform during exactly the chaotic recall week doesn't create a duplicate case for the same customer complaint.

## What the testing and conflict lenses add

Lesson 10's testing lens says these NFRs need to be verified under a simulated 10x spike in a sandbox that can actually hold enough data and transaction volume to represent it — not assumed correct because the code looks right. Lesson 11's conflict lens flags a real tension here: moving assignment fully asynchronous slightly delays the moment an agent is actually notified compared to purely synchronous assignment, trading a small amount of per-case latency for overall system stability during the exact spike the business cares most about — a trade-off worth naming explicitly and getting signed off, not leaving implicit.

## Key terms

| Term | Meaning |
|---|---|
| Spike condition | A short, high-intensity period of load far above normal baseline volume, which performance and scalability NFRs for a service org must explicitly account for |
| NFR weighting | The judgment that some NFR categories matter more than others for a specific organization's specific risk profile |
| Case study method | Applying the full elicitation-through-conflict-resolution framework to one realistic scenario, as a model for applying it to new scenarios |

## Lab

The same retailer adds a new requirement: during a recall, legal counsel must be able to pull every case related to the recalled product within one hour of a request, across the full case history, not just recent cases. Identify which NFR category this new requirement belongs to, write it as a specific, testable NFR in this course's format, and explain whether it changes your answer about which NFR categories dominate this org's overall risk profile.

## Check yourself

Can you explain why performance, scalability, and reliability were identified as the dominant NFR categories for this specific scenario, rather than security or compliance? Can you trace at least one design decision in this lesson back to the specific NFR that caused it, using Lesson 9's three-part pattern?
