# Lesson 16 — Identity for Communities and Experience Cloud

**Chapter 3 · Access at Scale · Lesson 16 of 24**

## What you'll learn

- How Experience Cloud (formerly Communities) users differ from internal users at the identity layer
- The role of the Contact/Account relationship in external user identity
- How login flows for Experience Cloud sites differ from internal Salesforce login
- Why sharing and visibility design is inseparable from Experience Cloud identity design

## External users aren't internal users with a different login page

Experience Cloud sites (the modern name for what used to be called Communities, covering customer, partner, and self-service portals) extend Salesforce access to people outside the core employee user base. The critical architectural fact: **an Experience Cloud user is still a User record**, consuming an external-identity license type, but it's almost always tied to an underlying **Contact** record, and through that Contact, to an **Account** — typically representing the customer's or partner's company. This Contact/Account linkage is what makes **sharing rules based on account ownership or role** possible for external users: a customer's visibility into "their" cases, orders, or opportunities is governed by the same sharing architecture used internally, scoped down to records associated with their Contact's Account.

## Login flows specific to Experience Cloud

Experience Cloud sites support the identity mechanisms covered throughout this course, applied in a site-specific way:

- **Self-registration** (Lesson 15) — a site can be configured with a self-registration page that creates a new Contact, Account (if needed), and User automatically, governed by a self-registration handler.
- **Social sign-on and SAML SSO** — an Experience Cloud site's login page can be branded with external Auth. Provider buttons (Lesson 6), exactly like the internal login page from Lesson 13, but configured per-site rather than org-wide.
- **Delegated administration** — as introduced in Lesson 15, a partner community can grant a partner's own "community admin" user rights to manage users within their own Account hierarchy, without granting them any internal Salesforce admin rights.

Crucially, each Experience Cloud site can have **different** branding, login options, and self-registration behavior from both the internal org and from other sites in the same org — a single org can run a customer self-service site with social sign-on and open self-registration right alongside a partner site that requires admin-approved invitation only.

## Why sharing design is inseparable from identity here

For internal users, the identity question ("who are you") and the authorization question ("what can you see") are usually handled separately — role hierarchy and sharing rules exist independent of how someone logged in. For Experience Cloud users, the two questions become tightly coupled in a way that doesn't happen internally: **the only reason an external user's identity matters at all is to determine which Account's records they're allowed to see.** A customer's Contact/Account linkage *is* their authorization boundary. Getting the Contact-to-Account relationship wrong at identity-creation time (during self-registration, JIT, or manual provisioning) doesn't just create a login problem — it creates a data-visibility problem, potentially exposing one customer's records to another's portal user, or hiding records a legitimate user should see.

This is why experienced architects treat Experience Cloud identity and Experience Cloud sharing design as one combined workstream, not two separate ones — a design review that signs off on the login mechanism without checking how the resulting user's Contact/Account gets set correctly is only half-reviewed.

## Key terms

| Term | Meaning |
|---|---|
| Experience Cloud | Salesforce's platform for customer/partner/self-service sites, formerly called Communities |
| Contact/Account linkage | The relationship that ties an external user's identity to the company record that bounds their data visibility |
| Self-registration handler | Logic that creates Contact, Account, and User records when a visitor registers on a site |
| Community admin | A delegated-admin role scoped to managing users within a partner's own Account hierarchy |

## Lab

Scenario: a customer self-service Experience Cloud site has a bug where a newly self-registered customer's User record gets created and linked to the wrong Account (a data-entry mismatch during registration). Write a short incident analysis (150–250 words) explaining:

1. Why this is a data-visibility problem, not just a login problem.
2. What records this customer might now be able to see that they shouldn't.
3. One registration-flow safeguard that could have prevented this Account-linkage error.

## Check yourself

- What record type does an Experience Cloud user's identity typically tie back to, and why does that matter for sharing?
- Name two login mechanisms Experience Cloud sites support that can be configured independently, per-site, from the internal org's login page.
- Why do experienced architects treat Experience Cloud identity and sharing design as one combined workstream?
