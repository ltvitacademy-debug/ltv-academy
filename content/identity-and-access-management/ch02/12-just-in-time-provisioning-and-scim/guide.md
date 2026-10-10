# Lesson 12 — Just-in-Time Provisioning and SCIM

**Chapter 2 · Enterprise Identity · Lesson 12 of 24**

## What you'll learn

- What Just-in-Time (JIT) provisioning solves: creating Salesforce users automatically on first SSO login
- How SAML JIT provisioning actually works, including the `Auth.SamlJitHandler` Apex interface
- What SCIM is, and how it differs from JIT provisioning
- How to decide between JIT, SCIM-based provisioning, and manual user creation for a given client

## The problem: new users need accounts before they can SSO in

SSO (Lessons 3, 9, 10) assumes the user already has a Salesforce user record to match against. But for a large enterprise onboarding hundreds of new hires, manually creating a Salesforce user record for every one of them, in lockstep with HR's onboarding process, doesn't scale and introduces delay. **Just-in-Time (JIT) provisioning** solves this by creating (or updating) the Salesforce user record automatically, at the moment of their very first SSO login, using the attributes carried in the SAML assertion itself.

## How SAML JIT provisioning works

When a SAML assertion arrives for SP-initiated or IdP-initiated login (Lessons 9–10), Salesforce's standard matching behavior is:

1. Look for an existing user whose **FederationIdentifier** matches the assertion's Subject.
2. If none exists, and JIT is enabled, use the attributes in the assertion (username, first name, last name, email, and any custom attributes the IdP includes) to provision a new user, including related Account/Contact records when the user is a Community/Experience Cloud user rather than an internal employee.

For anything beyond the simplest default field mapping, architects implement a class that implements the **`Auth.SamlJitHandler`** Apex interface, registered in the SAML Single Sign-On Setting's **SAML JIT Handler** field. This interface defines `createUser()` and `updateUser()` methods that receive the Federation ID, a `Map<String,String>` of assertion attributes, and the raw assertion itself — letting the architect write organization-specific logic, such as deriving a profile assignment from a department attribute, or populating a custom field from an IdP-supplied claim. The user running this logic needs the **Manage Users** permission, since provisioning a new user is itself a privileged action.

## SCIM: provisioning outside the login moment

JIT provisioning only runs when a user actually logs in — which means deactivation, role changes, or bulk pre-provisioning (setting up an account *before* day one) aren't covered by JIT at all. **SCIM (System for Cross-domain Identity Management)** is the complementary approach: an open, REST/JSON-based standard (defined in IETF RFCs 7642–7644) for provisioning and deprovisioning user accounts out-of-band, driven by an identity system like Okta or Entra ID pushing create/update/deactivate calls to a target application whenever its own user directory changes.

Salesforce's support for inbound SCIM-style provisioning is typically delivered through an identity provider's own Salesforce provisioning connector (built on Salesforce's REST/SOAP User APIs) or third-party IAM tooling, rather than a single universally-documented native SCIM 2.0 endpoint covering every user attribute — architects should verify exactly which user fields and lifecycle events (create, update, deactivate, group sync) a specific vendor's Salesforce connector actually supports before relying on it, since coverage varies by vendor and doesn't necessarily reach every custom field.

## Choosing between JIT, SCIM, and manual provisioning

| Approach | Best for | Limitation |
|---|---|---|
| **JIT provisioning** | Self-service onboarding where "first login creates the account" is acceptable | Only runs at login time; doesn't handle deactivation or pre-provisioning |
| **SCIM / IdP-driven provisioning** | Enterprises that need centralized, lifecycle-wide user management (create, update, deactivate) driven from HR/IdP systems | Coverage of custom fields and edge cases depends on the specific connector |
| **Manual provisioning** | Small orgs, or highly sensitive roles needing explicit human review before account creation | Doesn't scale; introduces onboarding delay |

A mature enterprise identity architecture often combines these: SCIM/IdP-driven provisioning to pre-create and maintain the account lifecycle, with JIT as a fallback or secondary enrichment step for attributes only available at login time.

## Key terms

| Term | Meaning |
|---|---|
| Just-in-Time (JIT) provisioning | Creating/updating a user record automatically from SAML assertion attributes at first login |
| `Auth.SamlJitHandler` | The Apex interface used to implement custom JIT provisioning logic |
| FederationIdentifier | The field JIT matching compares against the SAML assertion's Subject |
| SCIM | An open standard for provisioning/deprovisioning users outside the login moment |

## Lab

Scenario: a client's HR system marks an employee as terminated at 9:00 AM, but that employee doesn't attempt to log into Salesforce again, so JIT provisioning never runs for them. Write a short analysis (150–200 words) explaining:

1. Why JIT provisioning alone cannot deactivate this user in Salesforce.
2. What kind of provisioning approach would actually close this gap.
3. One compensating control (not full SCIM) a smaller client without budget for a SCIM connector could put in place instead.

## Check yourself

- What problem does JIT provisioning solve, and what's its biggest limitation?
- Name the Apex interface used for custom SAML JIT logic and the two methods it defines.
- Why can't JIT provisioning alone handle user deactivation, and what approach is needed to cover that gap?
