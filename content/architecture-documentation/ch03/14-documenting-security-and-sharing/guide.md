# Lesson 14 — Documenting Security and Sharing

**Chapter 3 · Practice · Lesson 14 of 17**

## What you'll learn

- The layers of the Salesforce sharing model and how to document each one clearly
- The access-matrix format: the single most useful artifact for communicating "who can see what"
- Why documenting the *reasoning* behind a sharing decision matters as much as documenting the setting itself
- A full worked example for a realistic multi-profile security model

## Why security documentation is its own discipline

Salesforce's sharing model is powerful specifically because it layers several independent mechanisms — org-wide defaults, role hierarchy, sharing rules, permission sets, and field-level security — that combine to produce a final access outcome. That same power makes it one of the hardest parts of an org to hold in your head, and one of the most consequential to get wrong: an access model that's too open leaks data that shouldn't be visible; one that's too restrictive blocks legitimate work and generates support tickets. Documenting the security model clearly isn't optional polish — it's often the first thing a security reviewer or a CTA Review Board panel will ask to see, because it's where a design's real risk tends to live.

## The layers, in the order they apply

A complete security and sharing document walks through each layer Salesforce actually evaluates, in order, since a reader needs to understand the layering to understand why the final access outcome is what it is:

1. **Organization-wide defaults (OWD)**: the baseline — Private, Public Read Only, or Public Read/Write — for each object, before any other mechanism opens access back up.
2. **Role hierarchy**: who sees records owned by people below them in the hierarchy, by default.
3. **Sharing rules**: criteria-based or ownership-based rules that open access beyond OWD and role hierarchy for specific groups.
4. **Manual sharing and Apex-managed sharing**: one-off or programmatic sharing for cases the rule-based mechanisms above don't cleanly cover.
5. **Permission sets and profiles**: object- and field-level CRUD permissions, independent of record-level sharing — a user can have "no access" at the object-permission layer even if record-level sharing would otherwise show them a record.
6. **Field-level security**: visibility and editability of specific fields, which can restrict further even when a user has full object and record access.

Documenting only the OWD setting and calling it done is the most common shortcut — and it's exactly the shortcut that leaves a reviewer unable to answer "can this specific user actually see this specific record's sensitive field," because that answer depends on all six layers together, not just the first one.

## The access matrix: the artifact that actually answers the question

The most useful single artifact for communicating a sharing model isn't prose describing each layer in isolation — it's an **access matrix**: a table with roles or profiles as rows, key objects (or sensitive fields) as columns, and the resulting access level as each cell, after all layers are accounted for.

| Role / Profile | Account | Opportunity | Opportunity.Discount_Pct__c |
|---|---|---|---|
| Sales Rep | Read/Write (own + shared via role hierarchy) | Read/Write (own) | Read only |
| Sales Manager | Read/Write (own team, via role hierarchy) | Read/Write (own team) | Read/Write |
| Finance | Read only (all, via sharing rule) | Read only (all, via sharing rule) | Read/Write |
| Support Agent | Read only (related to their Cases) | No access | No access |

A matrix like this answers the practical question — "can this role see this data?" — in one glance, where six paragraphs of layer-by-layer prose would force a reader to mentally combine all six layers themselves to get the same answer.

## Document the reasoning, not just the setting

A setting without reasoning invites exactly the kind of accidental, risky change Lesson 6's ADR lesson warned about for architecture decisions generally: a future admin sees "Opportunity OWD is Private" and, without knowing why, might "fix" what looks like an overly restrictive setting without realizing a sharing rule downstream depends on that baseline being Private to work correctly. A security document should state the reasoning alongside the setting: "Opportunity OWD is Private, not Public Read Only, specifically so the Finance sharing rule below is the only path to org-wide Opportunity visibility — this makes the Finance rule auditable as the single source of broad access, rather than broad access being ambient and ungoverned."

## Key terms

| Term | Meaning |
|---|---|
| Access matrix | A table showing, for each role/profile and each object or sensitive field, the resulting access level after all sharing layers are combined |
| Organization-wide default (OWD) | The baseline record-level access (Private, Public Read Only, Public Read/Write) before other sharing mechanisms apply |
| Field-level security | Per-field visibility and editability, which can restrict access even when object and record access are otherwise granted |

## Lab

A healthcare-adjacent org has three roles: Case Manager (owns and manages individual Client__c records), Program Director (oversees multiple Case Managers' clients via role hierarchy), and Billing Clerk (needs read-only access to billing-relevant fields on all clients, but should not see clinical notes). `Client__c` OWD is Private. Design and document the access matrix for these three roles across `Client__c` and a sensitive field `Clinical_Notes__c`, then write the reasoning paragraph explaining why Private OWD plus a targeted sharing rule for Billing Clerk (rather than Public Read Only) is the right choice here.

## Check yourself

Can you name the six sharing-model layers in the order Salesforce evaluates them? Can you explain why an access matrix communicates "who can see what" more effectively than six paragraphs describing each layer separately? Can you explain, using the Opportunity OWD example, why documenting the reasoning behind a sharing setting matters as much as documenting the setting itself?
