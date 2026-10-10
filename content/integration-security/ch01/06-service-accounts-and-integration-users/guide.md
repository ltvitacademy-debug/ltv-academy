# Lesson 6 — Service Accounts and Integration Users

**Chapter 1 · Securing Integrations · Lesson 6 of 13**

## What you'll learn

- Why a dedicated integration user, rather than borrowing a real employee's account, is the standard pattern for machine-to-machine access
- How to scope an integration user's profile and permission sets to least privilege instead of convenience
- Why the "API Only" setting and a disabled/unknown password matter together, not separately
- How ownership and lifecycle (who's accountable for this account, what happens when the integration retires) prevent an integration user from quietly outliving its purpose

## Why not just reuse a real person's login

It's tempting to point a new integration at whatever user account is already sitting around with convenient access — often a developer's own login, or a generic admin account everyone already knows the password to. This creates problems that compound over time. If the employee behind that login leaves, changes roles, or has their password reset for an unrelated reason, the integration breaks with no warning, often found only when something downstream silently stops updating. If the employee's access changes for reasons that have nothing to do with the integration — a role change, a permission set removed during a cleanup — the integration's access changes too, invisibly. And when an incident happens, "who or what did this?" becomes genuinely ambiguous: was it the person, or the integration running under their identity? A dedicated **integration user** (sometimes called a service account) exists specifically so an integration's identity, access, and lifecycle are independent of any one human's employment status or day-to-day access changes.

## Scoping the integration user deliberately

The standard pattern is a custom profile built for API users specifically, not a clone of an existing human user's profile. That custom profile — or more precisely, a combination of a minimal base profile plus a purpose-built permission set — should grant exactly the object, field, and record-level access the integration actually needs, determined by walking through what the integration does end to end, not by copying whatever access looked "close enough." The same discipline from Lesson 5 applies here: a System Administrator profile on an integration user is the single most common way an integration ends up with far more blast radius than it needs, and it's almost always chosen for convenience ("so it never breaks when something new is added") rather than because the integration genuinely needs administrative access.

## API Only: closing the UI login path

A profile-level setting called **API Only User** blocks that user from logging in through the standard Salesforce UI at all, while still allowing it to authenticate for API calls. Pairing this with API Enabled (Lesson 5) means the integration user can do exactly one thing: make API calls within whatever access its profile and permission sets grant. Even if the integration user's credential is somehow exposed, API Only removes the option of simply logging into the UI and browsing around — the exposed credential is still limited to the API surface, which is a meaningfully smaller set of actions than a full UI session.

## Ownership: who's accountable for this account

An integration user needs a named owner — a specific person or team accountable for knowing what the integration does, reviewing its access periodically, and being the first call when something about it looks wrong. Without a named owner, an integration user tends to become organizational driftwood: nobody remembers exactly what it's for, nobody notices when its access has become stale, and nobody feels empowered to deactivate it even when the integration it was built for has been retired. This is the same "data owner/steward" discipline that governs any other standing organizational asset, applied to a credential instead of a dataset.

## Lifecycle: integration users retire too

An integration user's lifecycle doesn't end when the integration is "done" being built — it continues for as long as the integration runs, and it should end deliberately when the integration is decommissioned. A credible offboarding step for any integration project includes deactivating or deleting its dedicated integration user, not leaving it active "just in case," which is precisely the kind of unused-but-still-active access this course's earlier material on over-retention and least privilege warns against. A periodic review (quarterly or similar, matched to how sensitive the integration's access is) should ask, for every integration user in the org: is the integration this was built for still running, does its granted access still match what it currently does, and who is the current accountable owner.

## Key terms

| Term | Meaning |
|---|---|
| Integration user / service account | A dedicated Salesforce user account created specifically to authenticate a machine-to-machine integration, independent of any human employee |
| API Only User | A profile setting that blocks UI login for a user while still permitting API access |
| Least privilege (for integration users) | Scoping an integration user's profile and permission sets to exactly what the specific integration needs, determined by its actual behavior, not convenience |
| Ownership | A named, accountable person or team responsible for knowing what an integration user is for and reviewing its access over time |

## Lab

A legacy integration at a client authenticates as "jsmith@client.com" -- a real former employee's account that IT never deactivated because "the integration still uses it." Write a migration plan: how you'd identify exactly what access the integration actually needs (without just copying jsmith's current access), what the new dedicated integration user's profile/permission-set setup should look like, whether you'd enable API Only, who should own the new account, and what you'd do with the old jsmith account once the migration is verified working.

## Check yourself

Can you name three concrete problems with pointing an integration at a real employee's login, beyond "it's against policy"? Can you explain why API Only and least-privilege scoping are both needed together, rather than either one alone being sufficient?
