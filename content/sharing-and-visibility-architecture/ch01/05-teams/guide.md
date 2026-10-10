# Lesson 5 — Teams

**Chapter 1 · Sharing Building Blocks · Lesson 5 of 24**

## What you'll learn

- The three standard team mechanisms — Account Teams, Opportunity Teams, and Case Teams — and what each one actually attaches to
- Why teams grant access at the level of a single record, not a population of records like a sharing rule does
- How default teams work, and why they exist alongside per-record team membership
- When an architect should recommend a team instead of a sharing rule, and when teams become the wrong tool at scale

## Teams share one record at a time, by design

Every mechanism covered so far in this chapter — OWD, role hierarchy, sharing rules — operates on a *population* of records: everyone owned by a role, everyone matching a criteria. Teams are structurally different. An Account Team, Opportunity Team, or Case Team is a list of people attached to one specific record, each with their own role on that deal or account and their own access level. Account Teams and Opportunity Teams grant access to the Account or Opportunity itself; Case Teams work the same way for Cases. This makes teams the right tool exactly when the real-world shape of the requirement is "this specific record needs a specific, named group of collaborators," rather than "this whole category of records needs to be visible to this whole category of users."

A sales engineer who is only looped in on three specific deals this quarter is a textbook Opportunity Team case: a sharing rule can't express "give this one person access to these three specific records and no others" without criteria that would also sweep in records the engineer has no reason to see. Adding them to the Opportunity Team on exactly those three records, each with an appropriate access level and team role (like "Sales Engineer" or "Solution Architect"), gives precisely the access the deal needs without touching OWD, sharing rules, or anyone else's visibility.

## Default teams vs. per-record teams

Both Account Teams and Opportunity Teams support a **default team** concept at the user level: a sales rep can define a standard list of people (their usual sales engineer, their usual manager, their usual deal-desk contact) who get added automatically to every new Account or Opportunity that rep creates, each with pre-set access levels and team roles. This default team is a convenience layer on top of the same underlying mechanism — when a new record is created, Salesforce copies the rep's default team onto it as that record's actual team, and from that point forward the team on that specific record can be edited independently of the rep's default. Changing your default team going forward doesn't retroactively change the team membership already baked into existing records; it only affects new records created after the change.

Case Teams work slightly differently: rather than every individual user holding their own default, orgs typically define one or more **predefined case teams** centrally — a standard combination of roles like Tier 2 Support, Product Specialist, and Escalation Manager — that an admin or support agent can add to a case in one action, rather than searching for and adding each person by hand every time.

## When teams become the wrong tool

Teams don't recalculate the way sharing rules do, because there's no rule to recalculate — membership is just data sitting on (or associated with) the record itself, so changing it is instantaneous and doesn't trigger the kind of background recalculation job covered in Lesson 16. That makes teams cheap at small scale, but it also means teams don't scale as a *population*-level mechanism: if an architect finds themselves recommending "add this same five-person team to every Opportunity this rep owns," that's really a sharing-rule or role-hierarchy requirement wearing a team-shaped disguise, and should be redesigned as one of those instead, both for consistency and so the access doesn't silently depend on someone remembering to populate a team correctly on every single record. Teams work best for genuinely record-specific collaboration, not as a workaround for population-level sharing that a declarative rule should be handling.

## Key terms

| Term | Meaning |
|---|---|
| Account Team / Opportunity Team / Case Team | A list of users attached to one specific record, each with an individual role and access level on that record |
| Default team | A user-level template of team members automatically copied onto every new Account or Opportunity that user creates |
| Predefined case team | An admin-defined, reusable combination of team roles that can be added to a case in one action |
| Record-specific collaboration | The use case teams are designed for — specific people on one specific record, as opposed to a population-wide grant |

## Lab

In a Developer Edition org, enable Account Teams and Opportunity Teams (Setup > Account Teams / Opportunity Team Settings), add the related list to the relevant page layouts, and set up a personal default Opportunity Team for a test user with two other test users at different access levels and team roles. Create a new Opportunity as that user and confirm the default team was copied onto the new record. Then remove one person from that specific Opportunity's team and confirm your default team (for future Opportunities) is unaffected. Write two sentences on a realistic scenario where you'd recommend a sharing rule instead of a team for a requirement that looks, at first glance, like a team use case.

## Check yourself

1. What's the structural difference between how a sharing rule grants access and how an Opportunity Team grants access?
2. If a rep changes their default Opportunity Team membership today, what happens to the team already sitting on an Opportunity they created last month?
3. Give an example of a requirement that looks like a "team" use case but is actually better solved with a sharing rule.
