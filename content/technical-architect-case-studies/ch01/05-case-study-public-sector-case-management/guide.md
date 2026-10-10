# Lesson 5 — Case Study: Public Sector Case Management

**Chapter 1 · Technical Architect Case Studies · Lesson 5 of 21**

## What you'll learn

- How "need-to-know" sharing in public sector case work goes further than standard role-based visibility
- Why data residency is a system-architecture decision made early, not a configuration toggle added later
- How a citizen-facing portal's identity and sharing model differ from an internal caseworker's
- How a single case-management platform supports multiple benefit programs without leaking data across them by default

## The scenario

A state Department of Health & Human Services wants one case-management system, built on Public Sector Solutions, to support three benefit programs: housing assistance, food assistance, and child welfare. A caseworker should only see the specific cases assigned to them. A supervisor should see their team's cases, not the whole department's. A citizen applying for housing assistance should never be able to see that the same household also has an open child-welfare case — cross-program visibility requires the citizen's explicit consent, and in child-welfare cases specifically, there are legal reasons a citizen may never be shown that a case exists at all. State law requires that citizen case data physically reside within the state's borders, and the system needs a complete, immutable audit log of who viewed or modified every case record, since the department is subject to regular compliance audits.

## Need-to-know is stricter than role hierarchy

Standard Salesforce sharing (org-wide defaults, role hierarchy, sharing rules) assumes visibility can reasonably be organized around a reporting structure, with supervisors seeing what their reports see. That assumption mostly holds here — a supervisor should see their team's caseload — but the caseworker-to-caseworker boundary is stricter than typical role-hierarchy sharing usually enforces by default: a caseworker should not see another caseworker's cases even if they're peers in the same role, because case data at this sensitivity level is scoped to "assigned to me," not "anyone in my role." This is enforced with a private organization-wide default on the case object combined with sharing rules that grant access only through explicit case assignment and the role hierarchy for supervisors — not a broader "everyone in this role sees everyone's records" pattern that would be acceptable for a sales team but isn't here.

## Cross-program visibility needs an explicit gate, not an absence of a rule

The hardest requirement in this scenario isn't restricting a caseworker from seeing other caseworkers' cases — it's making sure a citizen's housing caseworker can't casually discover that the same household has an open child-welfare case. Because all three programs live in one platform for efficiency and a unified citizen view, the architecture needs an explicit, additional sharing gate between programs, not just the ordinary case-assignment sharing already described: record-level restriction rules (or an equivalent mechanism scoping visibility below what role-based sharing alone would grant) that require an affirmative cross-program consent record before any user outside the specific program's caseworkers can see a case exists at all. Child welfare cases get the strictest treatment of the three, since there are real legal reasons certain parties must never be shown that a case exists — the design has to support "a case that is invisible to a specific person by law," not just "a case that's less visible than others."

## Data residency: decided at the platform layer, not configured later

The requirement that citizen data stay within the state's borders is a system-architecture decision, and it has to be made before any data is created, not retrofitted once records already exist in the wrong place. Salesforce's Hyperforce infrastructure lets an organization choose the geographic region its org runs in, and for a department bound by in-state residency law, that regional choice is effectively a one-time, foundational decision, since the state's commitment is about where the data physically lives and gets processed, not just where users are located. A design that treats residency as an afterthought — "we'll figure out hosting region once the data model is done" — is answering the easier, later question before the harder, earlier one.

## The citizen portal: a narrower identity than any internal user

A citizen using the Experience Cloud application portal to apply for housing assistance should never be modeled with anything close to a caseworker's visibility. Citizen users get access scoped to their own household's application status and nothing else, through sharing sets tied strictly to the records they submitted — never through the same role-hierarchy mechanism internal staff use, since that hierarchy was never designed to also safely bound an external citizen's access.

## Key terms

| Term | Meaning |
|---|---|
| Need-to-know sharing | Visibility scoped to explicit assignment rather than broad role membership, stricter than typical role-hierarchy sharing |
| Restriction rule | A mechanism for narrowing visibility below what role-based sharing would otherwise grant |
| Cross-program consent | An explicit, affirmative record required before visibility is allowed to cross a program boundary |
| Data residency | A legal or policy requirement that data physically reside and be processed within a specific geographic boundary |
| Hyperforce region selection | Choosing the geographic infrastructure region an org runs on, relevant to residency requirements |

## Lab

A housing caseworker opens a citizen's record and, without the cross-program consent gate described above, would be able to see that a child-welfare case also exists for the same household. Design the specific sharing mechanism that prevents this, and explain why relying only on role hierarchy and standard sharing rules would not be sufficient here.

## Check yourself

Can you explain why need-to-know sharing for caseworkers is stricter than the role-hierarchy sharing a sales team would use? Can you state why data residency has to be decided before data creation rather than configured afterward?
