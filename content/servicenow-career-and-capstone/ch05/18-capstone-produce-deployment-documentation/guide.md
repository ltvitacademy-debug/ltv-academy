# Lesson 18 — Capstone: Produce Deployment Documentation

**Chapter 5 · Capstone: Build It · Lesson 18 of 26**

## What you'll learn

- Why deployment documentation is a real deliverable of this workstream, not paperwork added
  after the real work is done
- The go-live checklist for piloting at St. Catherine's first, and the honest reason it goes first
- A rollback plan that's domain-scoped by design, instead of an all-or-nothing platform rollback
- How to write an Architecture Decision Record for this chapter's own real build decisions, using
  the exact ADR format Technical Architecture taught
- How this documentation sets up Chapter 6's presentation to Meridian's board

## Documentation is part of the deliverable

Lesson 17 closed with a build that's tested and a confirmed fix. That's not the end of this
workstream's Phase 1 -- a capability that only the implementation team understands isn't actually
deployable. A real go-live needs three written artifacts: a checklist confirming the pilot system
is genuinely ready, a rollback plan naming exactly what happens if it isn't, and a record of why
the chapter's real decisions were made the way they were. Treat all three as part of the build,
not a formality bolted on afterward once the "real" work is finished.

## The go-live checklist: piloting at St. Catherine's first

Lesson 14 scoped a staged go-live -- one system first, then the other two -- without naming which
system goes first. St. Catherine's is the right choice, for a specific reason: it already runs the
most mature, most structured help-desk process of the three, which means its staff are the most
likely to catch a real configuration problem during the pilot week and describe it precisely,
rather than the confusion of "something feels off" that a less formal process would produce.
Piloting with the most capable group first turns the pilot into a genuine quality gate for
Lakeshore's and Prairie View's later go-lives, instead of using Lakeshore or Prairie View -- both
more trust-sensitive, per Lesson 13's interviews -- to absorb the first round of real-world defects.

```
St. Catherine's go-live checklist:
[ ] Category mapping signed off by St. Catherine's help-desk lead (shared top
    category + St. Catherine's own multi-tier subcategories, matching Lesson 13's
    "don't flatten what already works" requirement)
[ ] Workday worker sync running on schedule, domain-tagged to St. Catherine's
    domain, built on this chapter's Prairie View integration template
[ ] Domain-routing Script Include tested against real St. Catherine's agent
    accounts -- not just the architecture diagram's assumption
[ ] Access-request approval subflow tested against a real St. Catherine's
    manager/employee pair
[ ] St. Catherine's help-desk staff trained on the new catalog items and queue
[ ] St. Catherine's legacy ticketing system stays live and fully supported
    through the pilot window -- nothing is switched off before its replacement
    is confirmed working
```

That last line matters as much as the rest of the checklist combined: Lesson 14 made Prairie
View's "prove this isn't last time" concern a real requirement, and the honest way to honor it is
to write "legacy stays live until replacement is confirmed" into every system's own checklist, St.
Catherine's included, not just promise it informally.

## The rollback plan: domain-scoped, not all-or-nothing

Because Domain Separation keeps each hospital system's configuration and data genuinely distinct,
a problem discovered during St. Catherine's pilot doesn't require rolling back the whole platform
-- only St. Catherine's own cutover needs to reverse, and Lakeshore and Prairie View, who haven't
gone live yet, are entirely unaffected either way.

```
Rollback trigger criteria (any one is sufficient):
  - A confirmed domain-separation leak (any case like TC-06 reappearing in production)
  - Misrouted tickets above 10% of St. Catherine's pilot-week volume
  - A P1 integration failure with no workaround inside one business day

Rollback action (St. Catherine's domain only):
  - Direct new tickets and requests back to St. Catherine's legacy process
    (already live in parallel -- no data migration to undo)
  - Deactivate St. Catherine's domain's catalog-item front door and routing flow
  - Leave Lakeshore's and Prairie View's go-live dates and plans completely
    unaffected

Decision window: 5 business days of pilot data before go/no-go on wider rollout
```

This is the real answer to a question an executive will actually ask: "what happens if this
doesn't work?" The answer isn't "we'll figure it out" -- it's a named trigger, a scoped action,
and a decision window, written down before go-live, not improvised during an incident.

## An Architecture Decision Record for this chapter's own build

Technical Architecture's ADR lesson taught a format on purpose, for decisions exactly like the
ones made in this chapter. Here is the one covering the integration pattern choice from Lesson 16:

```
Context:      Prairie View's homegrown, PeopleSoft-based worker system has no
               webhook or event capability -- only a read endpoint.

Options:       A. Require Prairie View's small IT team to build new webhook
                  support under the project's timeline pressure
                B. A scheduled pull against the existing read endpoint
                C. A manual, recurring CSV export/import process

Decision:      B -- a scheduled pull, coalesced on employee ID, every 15 minutes.

Consequences:  Accepts a staleness window of up to 15 minutes for HR data
               feeding a help desk (acceptable; this isn't payroll). Avoids
               depending on Prairie View's team building new capability under
               deadline pressure (Option A's real risk). Avoids the manual-
               process fragility and audit gap of Option C. The same pattern
               is reusable for a future legacy-system integration elsewhere
               in Meridian's rollout.
```

Writing this down now, while the reasoning is still fresh, is exactly the discipline Technical
Architecture's lesson argued for: a future reader -- including a future version of the person who
wrote it -- can see not just that a scheduled pull was chosen, but why, and can judge for
themselves whether Option A's constraints still hold before anyone proposes "fixing" this decision
later.

## Key terms

| Term | Meaning |
|---|---|
| Go-live checklist | The written, specific confirmation that a pilot system is genuinely ready, not just scheduled |
| Domain-scoped rollback | A rollback action confined to one domain's cutover, leaving unaffected domains untouched |
| Rollback trigger criteria | Named, specific conditions that would activate a rollback, decided before go-live, not during an incident |
| Architecture Decision Record (ADR) | Context, options considered, the decision made, and its honest consequences, written down while the reasoning is fresh |

## Check yourself

An executive asks what happens if St. Catherine's pilot reveals a serious problem after go-live.
Using this lesson's rollback plan, explain why Domain Separation lets that answer be "roll back
St. Catherine's cutover" instead of "roll back the whole platform" -- and why that distinction
matters to Lakeshore and Prairie View specifically.
