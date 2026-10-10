# Lesson 1 — Case Study: Redesigning a Sales Organization

**Chapter 1 · Application Case Studies · Lesson 1 of 16**

## What you'll learn

- How to turn a vague "the sales org doesn't fit the business anymore" complaint into a concrete architecture problem
- Why segment-specific sales processes usually resolve to record types and page layouts, not separate objects
- How role hierarchy, organization-wide defaults, and sharing rules combine to answer "who should see this deal"
- Why forecasting and reporting requirements have to be checked against a design before it ships, not after

## The scenario: Harrow Industrial Supply

Harrow Industrial Supply sells to three very different kinds of customers out of one Salesforce Sales Cloud org: large enterprise accounts with named reps and multi-month sales cycles, a mid-market segment sold by a regional team, and a high-volume small-business segment handled almost entirely through inbound inquiries and a small inside-sales team. The org was built years ago around the enterprise segment alone. As Harrow grew into the other two segments, teams bolted on custom fields and workarounds rather than redesigning anything, and now the VP of Sales says the system "doesn't match how we actually sell." That sentence is a starting point, not a requirement — an architect's first job is to find out what specifically doesn't match.

## Pulling the real requirements out of a vague complaint

Interviews with each segment's team surface three concrete, different problems hiding inside one complaint:

- **Enterprise reps** need a multi-stage opportunity process with executive-approval steps and account-team visibility across a named list of accounts — visibility that today depends on each rep manually sharing records, which gets forgotten.
- **Mid-market reps** are stuck using the enterprise segment's heavyweight opportunity stages and required fields for deals that close in weeks, not months, which slows down data entry on every single deal.
- **Inside sales** doesn't need opportunity stages at all in the same sense — their volume is high and their cycle is short, and leadership actually wants simpler stage names and different required fields so the inside-sales metrics aren't polluted by fields that only make sense for enterprise deals.

Three segments, three different sales processes, one object (Opportunity) and one org. That combination — different processes, same object, same org — is exactly the signal that points toward **record types** rather than three new custom objects or three new orgs.

## Record types carry the process; sharing carries the visibility

A record type on Opportunity lets Harrow give each segment its own picklist values for Stage, its own required fields, and its own page layout, while all three segments' deals still live in the same Opportunity object — which matters because sales leadership's top request was a single pipeline report across all three segments, something three separate objects or three separate orgs would make much harder, not easier.

Visibility is a separate decision from process, and conflating the two is a common mistake. Harrow's organization-wide default for Opportunity is Private, which is the safer starting point (loosening it later is low-risk; tightening it later forces re-auditing every sharing mechanism built on top of the old default). On top of that Private default:

- **Role hierarchy** gives each segment's manager visibility into their own reps' deals, without any extra configuration, because role hierarchy grants access upward automatically.
- **Sharing rules** solve the enterprise team's specific complaint — a criteria-based sharing rule that shares any Opportunity tagged with an enterprise account-team flag to the named account team, replacing the ad hoc manual sharing reps were doing (and forgetting to do) today.

Record types answer "what does this segment's process look like"; sharing rules and role hierarchy answer "who can see this specific record." Treating those as the same question is why Harrow's original design conflated a process problem with a visibility problem and ended up with a system nobody segment actually fit.

## Checking the design against reporting before it ships

A design that satisfies three segment leads individually can still fail at the VP's original request — one pipeline view across all three. Before Harrow's design is final, it has to be checked against that reporting requirement directly: can a single report type roll up Opportunities across all three record types with a consistent amount and close-date field (yes, since all three record types share the base Opportunity object), and can forecasting categories still roll up sensibly when each record type's stage picklist uses different stage names mapped to the same underlying forecast categories (this has to be explicitly verified, not assumed, because a stage name that isn't mapped to the right forecast category silently drops or miscounts revenue in the rollup). Skipping this check is how a technically clean record-type design still ships broken for the one person who asked for the redesign in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Record type | A way to give one object different picklist values, required fields, and page layouts per business process, without creating separate objects |
| Organization-wide default (OWD) | The baseline record-level access level for an object, before any sharing mechanism adds to it |
| Role hierarchy | A structure that automatically grants a manager visibility into the records owned by the people below them |
| Sharing rule | An automated, criteria- or group-based grant of additional record access on top of OWD |
| Forecast category | The underlying rollup bucket (e.g., Pipeline, Best Case, Commit, Closed) that an opportunity stage maps to, regardless of the stage's display name |

## Lab

Harrow adds a fourth segment six months later: a government-contracts team with a sales process that requires tracking a separate approval workflow (procurement officer sign-off) that none of the other three segments need. Decide, with written justification: (1) whether this segment should get its own record type or reuse an existing one, (2) what page-layout or required-field change the new process specifically needs that the other three don't, and (3) whether the existing OWD/role-hierarchy/sharing-rule combination already covers who should see government-contract deals, or whether it needs a new sharing rule.

## Check yourself

Can you explain why "the sales org doesn't fit the business" is not itself an actionable requirement, and what three follow-up questions would turn it into one? Can you state, in your own words, why record types and sharing rules solve two different problems even though both get configured on the same object?
