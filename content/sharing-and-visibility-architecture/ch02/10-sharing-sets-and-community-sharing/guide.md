# Lesson 10 — Sharing Sets and Community Sharing

**Chapter 2 · Advanced Sharing · Lesson 10 of 24**

## What you'll learn

- Why sharing rules and role hierarchy don't apply cleanly to external (Experience Cloud) users
- What a Sharing Set is, and how its access mapping differs from a sharing rule
- How Sharing Sets compare to Share Groups for role-based external users
- The profile prerequisite that trips up most first-time Sharing Set configurations
- When an architect should reach for a Sharing Set versus Apex managed sharing for external users

## Why external users need a different mechanism

Everything in Chapter 1 — OWD, role hierarchy, sharing rules, manual sharing — assumes the person receiving access has a role in your internal hierarchy. External users (customers and partners logging in through an Experience Cloud site with High Volume Customer Portal-style licenses, including Customer Community and Customer Community Plus) often don't sit in that hierarchy at all, or sit in a flattened, high-volume structure where giving each one an individual role would be an administrative and performance problem. Salesforce's answer for these license types is the **Sharing Set**: a mechanism that grants record access to external users based on their **profile**, mapped through a relationship on the record, rather than through role or public-group membership.

## What a Sharing Set actually configures

A Sharing Set is built from Setup under **Digital Experiences > Settings**, in the Sharing Sets related list. Configuring one has three parts:

1. **Profiles** — which external-user profile(s) this set applies to (e.g., Customer Community User).
2. **Objects** — which objects the set grants access to. Not every object is eligible: objects whose org-wide default is already Public Read/Write are excluded (there's nothing to add), and custom objects need an Account or Contact lookup to anchor the access mapping.
3. **Access mapping** — the actual rule: "grant [Read / Read-Write] on this object where [a lookup field on the record] matches [the user's own Account / Contact / a related record]." The common case is Case: grant access where the Case's Account equals the logged-in user's Account, so everyone from the same customer account can see each other's support cases.

This is a fundamentally different grant logic than a sharing rule. A sharing rule shares based on a static criterion or the owner's group membership. A Sharing Set shares based on a **relationship between the external user and the record** that's evaluated per-user, per-record — effectively "share with me what's connected to my own account," which is exactly the shape of access an external customer portal needs and a role-hierarchy-based rule can't express cleanly for a flat population of unrelated external accounts.

## The profile prerequisite people miss

A Sharing Set only ever *grants additional* access on top of what the profile already allows — it cannot be used to work around object-level permissions. If the external profile doesn't have at least Read on the object's field-level and object-level security, the Sharing Set's access mapping is irrelevant; the user still can't see the object. This is the single most common first-time misconfiguration: an admin builds a correct access mapping, and nothing shows up, because the Customer Community User profile itself was never given object permissions on the target object.

## Sharing Sets versus Share Groups

Sharing Sets work by profile. For role-based external licenses (Partner Community, or Customer Community Plus when organized by role), Salesforce instead uses **Share Groups**, configured on the role-based sharing side of the same Digital Experiences settings, which can target public groups, roles, roles-and-subordinates, roles-and-internal-and-portal-subordinates, or individual users — profile is not a valid member type there. An architect choosing between license types for an external population is implicitly choosing between these two sharing mechanisms: high-volume, profile-based, flat external populations fit Sharing Sets; smaller, role-structured partner populations that need hierarchy-aware sharing fit the role-based model and Share Groups instead.

## When to reach for Apex managed sharing instead

Sharing Sets cover the common "share what's connected to my account" shape well, but their access-mapping language is still declarative and limited to lookup-field relationships. If an external user's access depends on a condition a lookup-based mapping can't express — a calculated eligibility flag, a cross-object traversal, a time-based rule — the same logic from Lesson 8 applies: Apex managed sharing, inserting rows against the record's share object under a custom reason, still works for external users exactly as it does for internal ones, and is the fallback when the declarative Sharing Set model runs out of expressiveness.

## Key terms

| Term | Meaning |
|---|---|
| Sharing Set | A profile-based access grant for external (high-volume) users, mapped via a lookup relationship on the record |
| Access mapping | The rule inside a Sharing Set connecting a record's lookup field to the logged-in user's own Account/Contact |
| Share Group | The role-based equivalent of a Sharing Set, used for partner/role-structured external licenses |
| High-volume external user | A license type (e.g., Customer Community) with a flattened, non-hierarchical access model |

## Lab

In an Experience Cloud-enabled sandbox, create a Sharing Set named "Share Customer Cases" scoped to the Customer Community User profile. Add Case as the shared object and configure the access mapping to grant Read access where the Case's Account matches the user's own Account. Confirm the Customer Community User profile already has Read on Case (if not, add it) before testing. Log in as two different portal users from the same account and verify each can see the other's cases; then log in as a user from a different account and confirm they cannot.

## Check yourself

Why can't a role-hierarchy-based sharing rule do the job a Sharing Set does for a Customer Community license? What's the first thing you check when a correctly configured Sharing Set access mapping still isn't producing visible records for a user, and why does Apex managed sharing remain a fallback even after a Sharing Set is in place?
