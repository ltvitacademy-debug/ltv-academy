# Lesson 14 — Integration Architecture Lab

**Chapter 4 · Integration Architecture · Lesson 14 of 32**

## What you'll learn

- How to apply lessons 12 and 13 together against one real, messy enterprise scenario
- How to build an integration inventory from scratch, for integrations that already exist
- How to design a consolidation plan onto a single, consistent OAuth-based authentication pattern
- How to evaluate whether an existing request-response integration should move to event-driven as volume grows
- What a finished written recommendation for this kind of scenario actually looks like

## The scenario

A mid-size enterprise has grown, over roughly six years, to have **12
separate point-to-point integrations** between its ServiceNow instance
and its HR system. Each one was built by a different team, at a
different time, to solve a specific need: one syncs new-hire records
into ServiceNow so onboarding tasks can be assigned, another pulls
termination dates to automatically revoke access, another pushes
organizational-chart changes so approval workflows route correctly,
and so on.

No central inventory exists. Authentication is inconsistent — five of
the twelve integrations use OAuth, four use Basic Auth, and three use
an API key that was issued when the HR system was first connected and
has never been rotated. Nobody currently employed built all twelve;
institutional knowledge is scattered across whoever happens to still
be around from each original project. All twelve currently use
request-response: each one makes a synchronous REST call and waits
for the HR system to answer.

You're the technical architect asked to bring order to this. Walk
through the three real steps below the way you'd actually do the
work.

## Step 1 — Build the integration inventory

Before changing anything, the first real task is finding out what
actually exists. That means interviewing each team that touches an
HR-system integration, inspecting REST Message and IntegrationHub
configurations on the instance, and checking credential records for
what authentication each one actually uses — not what anyone assumes
it uses.

A finished inventory entry, for just the first few integrations,
looks like this:

```
# | Purpose                          | Direction  | Auth        | Owner
1 | New-hire record sync             | Inbound    | OAuth       | HR Systems team
2 | Termination -> access revoke     | Inbound    | Basic Auth  | Security team
3 | Org-chart change -> approvals    | Inbound    | API key     | Platform team
4 | Payroll eligibility check        | Outbound   | OAuth       | Payroll team
...(continues through all 12)
```

Building this list, even before anything else changes, already
delivers real value from Lesson 12: for the first time, one document
answers "what's actually integrated with HR, and who owns each
piece?" It's common, at this step, to discover that two of the twelve
integrations are quietly doing overlapping work — in this scenario,
integrations #3 and #9 both turn out to pull organizational-chart data
independently, built two years apart by teams that never knew about
each other. That's exactly the duplicate-integration problem Lesson
12 described, now visible because the inventory exists.

## Step 2 — Consolidate onto a single authentication standard

With the inventory built, the architect sets one enterprise policy:
every integration to the HR system authenticates via OAuth, matching
course 7's Chapter 3 guidance, with no exceptions unless the HR
vendor's API genuinely can't support it. That means:

- The five integrations already on OAuth stay as they are.
- The four on Basic Auth get migrated to OAuth, which is realistically
  a project of its own — new credential records, updated REST Message
  or IntegrationHub configurations, and coordinated testing so nothing
  breaks during the cutover.
- The three on the old, never-rotated API key are the highest
  priority: an unrotated long-lived key is a real, standing security
  exposure, so these move to OAuth first, not last.
- The duplicate org-chart integrations (#3 and #9) get resolved by
  retiring one and redirecting its consumers to the other — reducing
  twelve integrations to eleven, and removing one authentication
  migration from the remaining workload.

## Step 3 — Evaluate request-response vs. event-driven for the highest-volume integration

Not every one of the twelve needs to change its integration pattern —
most are low-volume (a termination happens occasionally; an org-chart
change is infrequent) and request-response continues to suit them
fine, per Lesson 13's guidance. But the new-hire record sync has grown
with the company: it now fires on every HR record change across a
workforce that's roughly tripled since the integration was first
built, and the business has confirmed ServiceNow doesn't need an
immediate answer back from HR — onboarding tasks can be created a few
minutes after a new-hire record lands.

That combination — rising volume, and no genuine need to wait for a
response — is exactly the case Lesson 13 described as the real
argument for event-driven integration. The recommendation: migrate
the new-hire sync to a pub/sub pattern where HR events publish to a
channel and ServiceNow subscribes, instead of ServiceNow polling or
being called synchronously. The honest cost called out in the plan:
the team now has to decide what happens if an event is delivered
twice (is creating onboarding tasks safe to run twice for the same
new hire?) and build monitoring so a missed or delayed event is
noticed rather than silently lost.

## The finished recommendation, in brief

1. **Inventory**: all 12 (now 11, after consolidating the duplicate)
   HR integrations documented with purpose, direction, authentication,
   and owner.
2. **Authentication**: a single OAuth standard, with the unrotated
   API-key integrations migrated first as the highest security
   priority.
3. **Pattern**: 10 of 11 integrations stay request-response, correctly
   matched to their low volume; the new-hire sync moves to event-driven
   to match its real volume and its tolerance for delay.

This is what turning Lessons 12 and 13 into an actual architectural
decision looks like — not a tooling choice, but a documented,
reasoned plan an enterprise can execute and defend.

## Key terms

| Term | Meaning |
|---|---|
| Point-to-point integration | A direct, one-off connection between two specific systems, built without reference to any broader standard |
| Integration consolidation | Reducing duplicate or redundant integrations and aligning the remaining ones to a common standard |
| Authentication migration | The project of moving an existing integration from one authentication method (e.g., Basic Auth, API key) to another (e.g., OAuth) |
| Unrotated credential | A long-lived credential (often an API key) that has never been replaced since issuance — a standing security risk |
| Volume-driven pattern decision | Choosing event-driven over request-response based on actual growth in call volume and tolerance for delay, not preference |

## Check yourself

Of the 12 original HR integrations, which gets migrated off its
current authentication method *first*, and why — and separately,
which one gets re-architected to a different integration *pattern*
entirely, and why is that a different kind of decision than the
authentication migration?
