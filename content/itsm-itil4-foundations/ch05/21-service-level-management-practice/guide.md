# Lesson 21 — Service Level Management Practice

**Chapter 5 · Core ITIL 4 Practices: Request, Knowledge & Service Level · Lesson 21 of 28**

## What you'll learn

- The ITIL 4 purpose statement for service level management
- The difference between an SLA, an OLA, and an underpinning contract
- Why ITIL 4 pushes toward output-based SLAs instead of pure component metrics
- How ongoing monitoring and review, not just the signed agreement, is the actual work
- A concrete example of a technical metric vs. a business-outcome target

## The purpose: set targets, then actually manage against them

ITIL 4 defines the purpose of service level management as setting
clear, business-based targets for service levels, and ensuring that
delivery of services is properly assessed, monitored, and managed
against these targets. Two things are happening in that sentence, and
both matter: targets have to be set in terms the business cares about,
and someone has to keep watching performance against them after the
agreement is signed. A target nobody tracks is decoration, not
management.

## SLA, OLA, and underpinning contract

Three related agreements show up constantly in this practice, and
mixing them up is a common mistake. An **SLA (Service Level
Agreement)** is the agreement between the service provider and the
customer — the business-facing commitment: "the order system will be
available 99.5% of the time during business hours." An **OLA
(Operational Level Agreement)** is internal — an agreement between
teams inside the same provider organization that have to cooperate to
hit the SLA, such as the network team promising the applications team
a certain response time for infrastructure changes. An **underpinning
contract** is external — a formal contract with a third-party
supplier (an internet provider, a SaaS vendor) whose performance
feeds into the provider's ability to meet the SLA at all. The SLA is
the promise to the customer; the OLA and underpinning contract are
what has to hold up internally and externally for that promise to be
kept.

## Output-based, not just component-based

A purely technical SLA might promise "the database server will have
99.9% uptime." That number can be true while the business still has a
terrible experience — the server is up, but a slow network link or a
broken integration still makes the order system unusable. ITIL 4
pushes toward **output-based SLAs**: targets written in terms of the
outcome the business actually experiences, such as "orders can be
placed and confirmed within 5 seconds, 99% of the time." Component
metrics (server uptime, network latency, disk I/O) still get
monitored — they're useful for diagnosing where a problem lives — but
they support the output-based target rather than replacing it as what
gets reported to the business.

## The agreement is the start, not the finish

Signing an SLA is day one, not the deliverable. Service level
management includes continuous monitoring of actual performance
against the agreed targets, regular service review meetings with the
customer to discuss how things are actually going, and renegotiation
when targets turn out to be unrealistic or business needs change.
Chapter 4's incident and problem management feed directly into this:
a pattern of major incidents breaching the SLA is exactly the kind of
signal a service level review should surface and act on.

## Key terms

| Term | Meaning |
|---|---|
| SLA (Service Level Agreement) | The agreement between provider and customer defining target service levels |
| OLA (Operational Level Agreement) | An internal agreement between teams that must cooperate to meet the SLA |
| Underpinning contract | An external contract with a third-party supplier that the SLA depends on |
| Output-based SLA | A target defined by the business outcome experienced, not just a technical component metric |

## Check yourself

A company's SLA promises 99.9% server uptime, but the sales team still
complains the order system "feels broken" most weeks. What's the most
likely issue with how this SLA was written, and what would an
output-based alternative target look like instead?
