# Lesson 20 — Sharing Architecture Case Study: Global Sales

**Chapter 3 · Sharing Architecture · Lesson 20 of 24**

## What you'll learn

- How to design sharing for a sales org where territory, not org-chart role, is the primary access boundary
- How to extend a sharing design to external channel partners without exposing direct competitors' data to each other
- How to reason about large-data-volume and recalculation costs as part of the design itself, not an afterthought
- How a global design balances consistent global rules against legitimate regional exceptions

## The scenario

**Orbis Industrial** sells manufacturing equipment through a mix of a direct sales force and channel partners, across three regions: **AMER**, **EMEA**, and **APAC**. The Opportunity object carries roughly 4.5 million records globally and grows by about 300,000 a year. Internal structure: 600 Account Executives organized into 40 territories (not a traditional manager-chain role hierarchy — territories are geographic/vertical combinations, e.g., "AMER — Midwest — Heavy Equipment"), 60 Territory Managers (each over several territories), 9 Regional VPs, and a global Sales Operations team of 12 who need visibility everywhere for forecasting and reporting. In addition, Orbis runs an Experience Cloud **Partner Community** with 180 external channel-partner users across all three regions, each partner organization reselling into specific, assigned territories.

Business requirements:

- An Account Executive sees only the Opportunities in their own territory.
- A Territory Manager sees every Opportunity across the territories they manage; a Regional VP sees everything in their region; Sales Operations sees everything globally, read-only, for reporting.
- Named Account Managers exist for roughly 200 strategic global accounts that span multiple territories (e.g., a single multinational customer buying from both AMER and EMEA); each Named Account Manager needs full access to their named accounts' Opportunities regardless of which territory they'd normally fall under.
- Channel partner users must see Opportunities for their own deals only — never another partner's deals, even within the same territory, and never Orbis's direct-sales Opportunities.
- EMEA has a regional-only requirement — not shared by AMER or APAC — that each country's data protection office must be able to produce a list of exactly who has access to that country's Opportunity records on demand; the design needs to make that answerable without a custom report-building exercise.
- Leadership is explicit that recalculation cost matters: the sales org restructures territories roughly twice a year, and a redesign that makes each restructuring a multi-hour recalculation event is not acceptable.

## Designing the model

**OWD:** Private for Opportunity internally, and Private for the external OWD as well, since Partner Community users must never default into seeing each other's deals.

**Territory hierarchy, not role hierarchy, as the backbone:** Because access genuinely follows territory assignment rather than a management reporting line, Orbis uses **Enterprise Territory Management** as the primary structural mechanism: territories are modeled directly, Account Executives and Territory Managers are assigned to territory nodes, and Opportunity visibility flows from territory assignment (via the account's territory) rather than from a parallel role hierarchy trying to approximate the same thing. This is a direct application of "pick the mechanism that matches the real shape of the business" — a role hierarchy would require constant manual upkeep to fake what territory management gives natively, and territory model changes are exactly the kind of bulk, predictable event that benefits from planned Defer Sharing Calculations windows during the twice-yearly restructuring (Lesson 16).

**Named Account Managers — sharing rule, not hierarchy:** Because a named account's Opportunities span territories, this can't be solved by moving the account into one territory node. Instead, a criteria-based sharing rule grants each Named Account Manager (via a public group per account, or an owner-based rule on an `Opportunity.Named_Account_Manager__c` lookup) Read/Write access to Opportunities tagged with their named accounts, layered on top of the territory baseline. This is a deliberate, narrow exception — not a reason to abandon territory management for the other 599 Account Executives.

**Sales Operations — one firm-wide rule:** A single Read Only sharing rule granting the Sales Operations public group visibility to every Opportunity, exactly mirroring the Compliance pattern from the previous case study.

**Partner Community — Sharing Sets:** Channel partner users get their deal visibility through **Sharing Sets**, mapping each partner's Experience Cloud user to only the Opportunities their own partner organization owns or is associated with, rather than through a declarative sharing rule (which can't address external users the way Sharing Sets can) or Apex (unnecessary complexity for a pattern Sharing Sets already covers natively).

**EMEA data-protection answerability — Row Cause discipline, not a new mechanism:** Rather than building a special EMEA-only feature, the design standard is that every grant on Opportunity (territory assignment, the Named Account Manager rule, Sales Operations' rule) has a distinct, nameable Row Cause, so a query against `OpportunityShare` filtered to EMEA accounts, grouped by `RowCause`, answers the data-protection office's question directly — this is why Lesson 15's point about Row Cause being queryable matters operationally, not just for debugging.

## Why this design balances global consistency with regional need

The territory-management backbone, the Named Account Manager exception, and the Sales Operations rule are global and apply identically in all three regions — deliberately, so the design stays explainable and auditable everywhere. EMEA's data-protection requirement doesn't get a bespoke mechanism; it's answered by a discipline (clean, distinct Row Causes) that was already the right practice globally. That's the general pattern for handling a regional requirement inside a global design: satisfy it through rigor applied consistently, not through a one-off mechanism that only EMEA has and only EMEA's admins understand.

## Key terms

| Term | Meaning |
|---|---|
| Enterprise Territory Management | The structural mechanism used here as the sharing backbone, matching access to territory assignment rather than a management hierarchy |
| Named Account Manager exception | A criteria-based sharing rule layered on top of the territory baseline for accounts spanning multiple territories |
| Sharing Set | The mechanism used to scope each Partner Community user to only their own partner organization's Opportunities |
| Row Cause discipline | Keeping every sharing grant's Row Cause distinct and nameable so access can be audited by query, not by manual report-building |

## Lab

Design the complete sharing model for Orbis Industrial as specified: state the OWD (internal and external) and justification, explain why territory management was chosen over role hierarchy as the backbone, write the Named Account Manager sharing rule in plain English, describe how the Partner Community's Sharing Set is scoped, and explain how the EMEA data-protection requirement gets answered without a dedicated mechanism. Then address leadership's recalculation concern directly: what in this design, and what operational practice from Lesson 16, keeps the twice-yearly territory restructuring from becoming a multi-hour event?

## Check yourself

Why does this design use territory management rather than role hierarchy as the structural backbone for Opportunity sharing? Why is the Named Account Manager requirement handled as a sharing-rule exception rather than by restructuring the territory model itself? How does the design answer EMEA's data-protection requirement without adding a region-specific mechanism?
