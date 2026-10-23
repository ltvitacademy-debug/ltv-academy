# Lesson 23 — Capstone: Design Roles & ACLs for a Real Org

**Chapter 7 · Capstone: Securing a Real Instance · Lesson 23 of 24**

## What you'll learn

- How to redesign a sprawling role structure into a real least-privilege hierarchy using `contains_roles`
- How to write a correct, consistent field-level ACL script for a specific sensitive field — real code, not a sketch
- How to plan a local-to-SSO migration for an instance that was never pointed at an existing enterprise identity provider
- Why each of these fixes maps directly back to one of Lesson 22's named findings — remediation, not a fresh audit

## Fixing Finding 1: consolidating role sprawl with contains_roles

Lesson 22 found three near-duplicate roles — `itil_l2_temp`, `itil_l2_temp_v2`, and `incident_approver_backup` — each built from scratch by a different admin solving the same request. The least-privilege fix isn't deleting them and hoping nothing breaks; it's building a real hierarchy that makes the next request reuse a role instead of inventing one.

The redesign introduces one base role and lets everything else inherit from it through `contains_roles`, the same mechanism Chapter 1 covered in depth:

```javascript
// Role: meridian_itil_base
// contains_roles: itil
// Baseline access every IT support tier needs — nothing more.

// Role: meridian_incident_approver
// contains_roles: meridian_itil_base
// Adds incident-approval rights on top of the baseline — replaces
// itil_l2_temp, itil_l2_temp_v2, and incident_approver_backup,
// which are deactivated (not deleted, to preserve sys_audit history)
// once every assigned user is migrated to this role.

// Role: meridian_itil_l3
// contains_roles: meridian_itil_base
// Adds L3-specific rights (e.g. problem_manager access) on top
// of the same baseline — a sibling of the approver role, not a
// copy of it.
```

Three users who each held two or three of the old overlapping roles now hold exactly one role apiece, and that role's name tells a reviewer precisely what it grants. The next time someone needs "incident approval plus baseline support access," they assign `meridian_incident_approver` — they don't create a fourth near-duplicate role, because one already exists and its name says what it does. That single change is what makes next quarter's access review legible again.

## Fixing Finding 2: a real, consistent field-level ACL for annual_income

Lesson 22 found `customer.annual_income` protected only by the generic `itil` role, held by over a thousand employees, while the comparably sensitive `customer.ssn` field used a scripted condition against a purpose-built role. The fix brings `annual_income` up to the same pattern — and goes one step further, matching the real way underwriting data is actually used at Meridian: the viewer must hold the dedicated role **and** either be assigned to that customer's case or hold the senior override role.

```javascript
// ACL: table = customer, field = annual_income, operation = read
// Replaces the old role-only ACL. Consistent with the ssn field's
// pattern: a dedicated role is required, not the generic itil role.
// "answer" is the variable the ACL engine reads for the result.

answer = (function() {
	// Senior underwriters can view any customer's income data.
	if (gs.hasRole('customer_financial_senior')) {
		return true;
	}

	// Standard underwriters may view income data only for customers
	// on a case explicitly assigned to them — least privilege, not
	// a blanket grant to everyone holding the base financial role.
	if (gs.hasRole('customer_financial_view')) {
		var gr = new GlideRecord('x_meridian_underwriting_case');
		gr.addQuery('customer', current.sys_id);
		gr.addQuery('assigned_to', gs.getUserID());
		gr.query();
		return gr.hasNext();
	}

	return false;
})();
```

This is a materially stronger control than simply swapping one role name for another: a standard underwriter can no longer browse every customer's income data, only the cases actually assigned to them, while a senior underwriter retains the broader view their job genuinely requires. The dictionary entry's `Audit` flag is also enabled on this field at the same time, closing Finding 4 for this field specifically — the ACL now answers who *could* read it, and `sys_audit` will answer who *did*.

## Fixing Finding 3: planning the move from local accounts to Okta SSO

Finding 3 was that Meridian's broader organization standardized on Okta three years ago, but ServiceNow was never migrated and still authenticates 1,800 users locally with no MFA. The fix is a planned cutover, not a flag flipped in production on a Friday afternoon:

1. **Exchange SAML metadata with Okta first, in a sub-production instance.** Configure the SAML 2.0 identity provider record using Meridian's existing Okta metadata URL — the same IdP every other line-of-business app already trusts — and confirm the assertion maps correctly to existing `sys_user` records by email, not by creating new accounts.
2. **Enforce MFA at the Okta policy level, not ServiceNow's.** Because authentication now happens through Okta, Meridian's existing Okta MFA policy — already mandatory for every other application — applies automatically. No separate MFA configuration is needed inside ServiceNow itself.
3. **Keep exactly one local break-glass admin account, documented and monitored.** SSO outages happen. A single local administrator account, with a long randomly generated password stored in the bank's secrets vault and every login against it alerted, is the only account still allowed to bypass Okta — everyone else authenticates through SSO only, once the cutover completes.
4. **Migrate in a monitored window, with local authentication disabled for all other users immediately after.** A phased "SSO available, local still works" state is where migrations stall for months. Meridian sets a single cutover date, communicates it, and disables local authentication for every non-break-glass account the same day SSO goes live.

## Key terms

| Term | Meaning |
|---|---|
| `contains_roles` hierarchy | A base role holds baseline access; other roles extend it instead of duplicating its grants from scratch |
| Scripted ACL condition | An `answer` expression evaluated at runtime, able to check role, assignment, and relationship — not just a static role requirement |
| Break-glass account | One tightly monitored local account retained to bypass SSO only during an identity-provider outage |
| Cutover window | A single planned date when an old authentication path is disabled, rather than leaving two paths active indefinitely |

## Check yourself

Explain, in your own words, why the new `annual_income` ACL is stronger than simply changing its required role from `itil` to a single dedicated role with no script — and why keeping exactly one local break-glass account is safer than keeping local authentication fully enabled "just in case" for everyone.
