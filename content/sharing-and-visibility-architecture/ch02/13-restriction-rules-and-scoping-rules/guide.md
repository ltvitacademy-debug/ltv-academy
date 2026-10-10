# Lesson 13 — Restriction Rules and Scoping Rules

**Chapter 2 · Advanced Sharing · Lesson 13 of 24**

## What you'll learn

- Why Restriction Rules are fundamentally different from every other mechanism in this chapter — they narrow access, not grant it
- How a Restriction Rule is built, and the per-edition limits on how many you can define per object
- What a Scoping Rule actually controls, and why it's not a security mechanism at all
- The practical distinction: "what can this user see" versus "what shows up by default"
- When an architect reaches for a Restriction Rule instead of simply tightening OWD

## Everything so far has been additive — this isn't

Every mechanism in Chapters 1 and 2 up to this point *grants* access on top of a baseline: OWD sets the floor, and role hierarchy, sharing rules, teams, manual sharing, Apex managed sharing, Sharing Sets, and territories all add to it. **Restriction Rules** invert that logic entirely. A Restriction Rule starts from whatever access a user would otherwise have — through any combination of the mechanisms above — and **removes** visibility to a subset of records that match the rule's criteria. It is the one declarative tool in the sharing model that takes access away rather than extends it, and that makes it conceptually closer to field-level security or a validation rule than to a sharing rule.

The canonical use case is a broad, generous OWD or role hierarchy that works fine for 95% of records, with a narrow slice that needs tighter visibility than the baseline — for example, every Account Manager can see all accounts in their region (a broad grant that's otherwise correct), except accounts flagged as containing legally restricted information, which only a specific compliance-cleared subset of users should see at all. Rebuilding the entire sharing model around that one exception — dropping OWD to Private and rebuilding everyone else's access with rules — would be a disproportionate amount of rework for a narrow carve-out. A Restriction Rule lets the broad grant stay broad and carves out the exception surgically.

## Building one

Restriction Rules are created per object from **Object Manager**: select the object, then use its **New Rule** button. (As of this writing, Restriction Rules are configured only once Salesforce Classic is disabled for the org — they're a Lightning-only feature.) A rule has two parts: the **user criteria** (who the rule applies to — for instance, users with a specific profile who are *not* in a particular permission-set-defined "cleared" group) and the **record criteria** (which records get hidden from those users — for instance, records where a Legally Restricted checkbox is true). Where the rule's conditions match a user and a record simultaneously, that record disappears from that user's visibility, regardless of what sharing rule, team, or role-hierarchy path would otherwise have shown it to them.

![The Salesforce Setup screen for creating a new Restriction Rule on an object, showing the rule-builder UI.](/courses/sharing-and-visibility-architecture/ch02/13-restriction-rules-and-scoping-rules/restriction-rule-new.jpg)
*Object Manager > [Object] > Restriction Rules > New Rule — the entry point for building a rule.*

![The Restriction Rule configuration screen with user criteria and record criteria sections filled in.](/courses/sharing-and-visibility-architecture/ch02/13-restriction-rules-and-scoping-rules/restriction-rule-configure.jpg)
*Configuring a Restriction Rule's user criteria and record criteria — both must match before a record is hidden.*

Restriction Rules are capped per object by edition: two per object in Enterprise and Developer Edition, five per object in Performance and Unlimited Edition. That ceiling is a real architectural constraint — a design that wants a dozen different exception categories on one object needs to consolidate them into a handful of rules with combined criteria, not create one rule per exception.

## Scoping Rules are not a security feature at all

**Scoping Rules** sound related but solve a completely different problem, and conflating the two is a common mistake. A Scoping Rule does not restrict what a user is *allowed* to see — the user's underlying access, through sharing, is completely unchanged. What a Scoping Rule controls is which subset of records a user is shown **by default** in list views, reports (when "Filter by scope" is selected), and SOQL queries that don't explicitly override scope. The standard example: a global sales rep technically has sharing access to every Lead in the system through a broad sharing rule, but a Scoping Rule limits their default Lead list view to only the Leads assigned to their own territory, so they aren't scrolling past thousands of irrelevant records every day. If that same rep runs a report with scope filtering turned off, or writes a SOQL query without a scope filter, they can still retrieve the records a Restriction Rule would have blocked them from — because nothing about their actual access changed.

Scoping Rules are available on a defined set of standard objects (Account, Case, Contact, Event, Lead, Opportunity, Task) plus custom objects, require the **Manage Sharing** permission to create, and only support the EQUALS operator in their criteria outside of SOQL-based scope overrides. They're a usability and performance tool for narrowing default views at scale, not an access-control mechanism — which is exactly why an architect should never reach for a Scoping Rule when the actual requirement is "this user must never be able to see this record."

## Key terms

| Term | Meaning |
|---|---|
| Restriction Rule | A declarative rule that removes visibility to matching records for matching users, on top of whatever access they'd otherwise have |
| User criteria / record criteria | The two halves of a Restriction Rule — who it applies to, and which records it hides from them |
| Scoping Rule | A rule that narrows the default record set shown in list views/reports/SOQL, without changing actual sharing access |
| Filter by scope | The report option that applies a Scoping Rule's default filtering to that report |

## Lab

In Object Manager for a custom object with a broad sharing model (e.g., OWD of Public Read/Write, or role-hierarchy-based access that currently lets everyone in a region see every record), create a Restriction Rule whose record criteria matches a checkbox field (e.g., `Legally_Restricted__c = true`) and whose user criteria excludes members of a specific permission-set group. Confirm that a test user outside that group can no longer open a flagged record they could previously see, while a record with the checkbox unchecked remains fully visible to them. Then, separately, create a Scoping Rule on Lead that defaults a test user's Lead list view to their own territory, and confirm that same user can still retrieve a Lead outside that scope through a report with "Filter by scope" turned off — demonstrating that the Scoping Rule changed nothing about their actual access.

## Check yourself

Why is a Restriction Rule described as the one mechanism in this chapter that removes access rather than grants it? Explain, with a concrete example, why a Scoping Rule would be the wrong tool if the actual requirement were "this user must never see this record" — and why it's exactly the right tool if the requirement is "this user's default list view is cluttered with records outside their territory."
