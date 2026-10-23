# Lesson 23 — Technical Debt on the Platform

**Chapter 7 · Platform Lifecycle & Release Management · Lesson 23 of 32**

## What you'll learn

- A precise, honest definition of technical debt — not just "old code," but accumulated shortcuts that make future changes harder and riskier
- The three most common real sources of technical debt on a ServiceNow instance
- Why proactively identifying debt is an architect-level responsibility, not something to wait on until it causes a crisis
- The real, recurring organizational tension between paying down debt and shipping new features
- How an architect actually makes and defends the case for prioritizing a specific piece of debt remediation

## What technical debt actually is

Technical debt is not simply "code that's old" or "a feature nobody uses." It's accumulated shortcuts and compromises, made for understandable reasons at the time, that make future changes harder and riskier than they should be. The debt metaphor is apt: like financial debt, it was taken on to get something done faster now, and it accrues interest — every future change to that area of the platform costs more time and more risk than it would if the shortcut had never been taken.

Three sources show up constantly on real ServiceNow instances:

- **Quick fixes under deadline pressure.** A Business Rule hard-codes a sys_id instead of a proper reference, because the proper fix needed more time than the go-live date allowed. It works, until that record's sys_id changes in a different environment and the hard-code silently breaks.
- **Reliance on deprecated APIs.** Lesson 21 covered this as an upgrade-testing risk, but it's also a standing debt: every release cycle it survives, the gap between "what the code does" and "what the platform now recommends" gets a little wider, and the eventual fix gets a little more disruptive.
- **Undocumented customizations nobody fully understands anymore.** The developer who built a complex Script Include three years ago has left the company. The customization still runs, but no one currently on the team can confidently say what it does or why it was built that way — so no one wants to touch it, even when it's actively causing problems.

## Proactive identification, not crisis response

The architect-level responsibility here is finding this debt before it causes an incident, not after. Waiting for the hard-coded sys_id to break in production, or for the deprecated API to actually get removed mid-upgrade, means the fix happens under the worst possible conditions: unplanned, urgent, and with no room to do it properly. A technical architect builds a habit of actively auditing for debt — reviewing flagged deprecated-API usage from Lesson 21's upgrade testing, reviewing Script Includes and Business Rules for hard-coded values, and keeping a running, visible list of what's been found, rather than letting it live only in individual developers' heads.

## The real tension: debt remediation versus new features

Finding the debt is the easy part. The hard, recurring part of this job is prioritizing remediation against the constant organizational pressure to ship new features. Every sprint, every quarter, there's a business stakeholder asking for the next capability, and "we spent two weeks fixing something that already works" is a genuinely difficult sentence to say out loud to someone who doesn't see the risk.

This is where an architect has to make and defend an actual case, not just assert "this is technical debt, trust me." A real case for prioritizing a specific piece of debt remediation includes:

- **What it's actually costing today** — e.g., "this hard-coded reference has caused three production incidents this quarter, each requiring an emergency fix outside the normal release process."
- **What it will cost if deferred past a known event** — e.g., "this deprecated API is scheduled for removal in next year's release; fixing it now, on our own timeline, costs a fraction of what fixing it during a forced upgrade will."
- **What it's currently blocking** — e.g., "the undocumented Script Include is why Team B can't safely build the new feature stakeholders actually want, because nobody will touch the code it depends on."

That third point is often the strongest argument, because it reframes debt remediation as the thing standing between the organization and the feature it wants, rather than as a competing priority against it.

## Key terms

| Term | Meaning |
|---|---|
| Technical debt | Accumulated shortcuts and compromises that make future platform changes harder and riskier than they should be |
| Deadline shortcut | A quick fix (e.g., a hard-coded value) taken to meet a go-live date, deferring the proper implementation |
| Deprecated API reliance | Code built on an API ServiceNow is phasing out, creating growing risk with each release cycle |
| Debt remediation case | A documented argument for why paying down a specific debt item is worth delaying new feature work |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why is "this is blocking the new feature stakeholders actually want" often a stronger argument for debt remediation than "this is old code we should clean up"?
