# Lesson 1 — The Sharing Model Revisited

**Chapter 1 · Sharing Building Blocks · Lesson 1 of 24**

## What you'll learn

- How the four layers of Salesforce data security — org, object, field, and record — fit together, and why record-level sharing is the layer architects spend the most design time on
- The five "classic" record-visibility mechanisms every architect must be able to name and sequence: organization-wide defaults, role hierarchy, sharing rules, manual sharing, and teams
- Why this course treats sharing as a design problem, not a checklist of Setup pages
- The one rule that governs every mechanism in this course: nothing below org-wide defaults can ever take access away

## Four layers, one question

Every access decision in Salesforce answers one of four narrower and narrower questions. Can this user log in at all (org access — IP ranges, login hours, session settings)? Can this user's profile or permission sets even see this *object* (object-level security — the CRUD checkboxes on Accounts, Opportunities, custom objects)? Can this user see this particular *field* on a record they can otherwise see (field-level security — field permissions on a profile or permission set)? And finally — the layer this entire course is about — can this user see this particular *record*, as opposed to every other record of the same object?

![A diagram showing increasing levels of record visibility, layered from the most restrictive to the most permissive controls.](/courses/sharing-and-visibility-architecture/ch01/01-the-sharing-model-revisited/record-access-layers.png)
*Record-level access as a set of increasingly permissive layers — the mental model this entire course builds on.*

You already built the first three layers as an administrator. Object and field security are binary and relatively static: a profile either grants Read on Opportunity or it doesn't, and that answer rarely depends on which specific Opportunity you mean. Record-level security is different in kind. The same user might see three thousand Opportunity records and be blind to the three thousand and first, and the reason changes record by record. That's what makes it an architecture problem rather than an administration problem: the answer isn't configured once, it's computed, continuously, for every record, every time the sharing rules, role hierarchy, or group memberships change underneath it.

## The five mechanisms, and the one rule that governs all of them

Every record a user can see got into their field of view through exactly one or more of five classic mechanisms:

1. **Organization-wide defaults (OWD)** — the baseline. What can everyone see by default, with no other mechanism involved?
2. **Role hierarchy** — grants access upward. A manager inherits visibility into records owned by (or shared with) the people below them in the hierarchy.
3. **Sharing rules** — automated, criteria- or ownership-based grants to a group of users, running continuously as records and group membership change.
4. **Manual sharing** — one-off, user-initiated grants on a single record.
5. **Teams** — Account Teams, Opportunity Teams, and Case Teams, which attach a reusable list of people with pre-set access levels to one specific record.

Chapter 2 of this course adds a second tier of mechanisms — Apex managed sharing, sharing sets, territory management, implicit sharing, and restriction/scoping rules — but every one of those still answers to the same governing rule that applies to all five classic mechanisms above: **OWD is a ceiling only in the downward direction.** It sets the default, and every other mechanism in the platform can only widen access above that default, never narrow it further. A sharing rule cannot revoke what OWD already grants, and manual sharing cannot be used to take away access a role hierarchy already provides. If a design requirement is "narrow visibility below what OWD currently grants for specific users," the classic sharing toolkit cannot do that at all — that requirement needs Restriction Rules or Scoping Rules, which we cover in Lesson 13, because they are a fundamentally different kind of control: a visibility filter, not a grant.

## Why this distinction drives architecture decisions

This additive-only property is the single most load-bearing fact in sharing design, because it means OWD has to be set conservatively. If you're unsure whether a given user population needs to see a given object's records by default, the architecturally safe choice is **Private**, and then widen access deliberately through the other four mechanisms — because tightening OWD later is a breaking change (every sharing rule, team, and manual share built on top of a looser default has to be re-audited), while widening it later is comparatively low-risk. You will see this "start private, widen deliberately" principle again in Lesson 17 as a named design pattern, and it is the reason real-world Salesforce orgs almost never set OWD to Public Read/Write for core business objects like Opportunity or Account, even though it would eliminate a lot of sharing-rule configuration — the convenience isn't worth losing the ability to scope access precisely later.

## Key terms

| Term | Meaning |
|---|---|
| Org-level security | Controls over logging in at all — IP ranges, login hours, session policies |
| Object-level security | CRUD permissions on an entire object, from profiles and permission sets |
| Field-level security | Per-field read/edit permissions on an object a user can otherwise see |
| Record-level security | Controls over which individual records of a visible object a user can see — the subject of this entire course |
| Additive-only sharing | The rule that every sharing mechanism above OWD can only grant more access, never revoke what a broader mechanism already grants |

## Lab

Open a free Developer Edition org (or your own sandbox) and, without changing any configuration, go to **Setup > Security > Sharing Settings**. For three different objects (one standard, like Account, and two custom objects if any exist, or Opportunity and Case), write down the current organization-wide default. Then, for each one, answer in writing: if this were a greenfield design and you had no existing configuration to respect, would you set this OWD to Private, Public Read Only, or Public Read/Write — and which of the four non-OWD mechanisms would you expect to do the most work widening access back open for the teams that need it? You're practicing the "start private, widen deliberately" reasoning this course will use throughout.

## Check yourself

1. Name the four layers of Salesforce data security in order, from broadest to most granular.
2. Why can a sharing rule never be used to narrow access below what organization-wide defaults already grant?
3. If an architect is unsure whether OWD should be Private or Public Read Only for a new custom object, which choice is the architecturally safer starting point, and why?
