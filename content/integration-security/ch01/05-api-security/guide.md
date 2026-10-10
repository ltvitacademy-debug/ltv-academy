# Lesson 5 — API Security

**Chapter 1 · Securing Integrations · Lesson 5 of 13**

## What you'll learn

- Why "API Enabled" is a permission like any other, not a separate security perimeter
- How Salesforce's API enforces the same object- and field-level access a user would have in the UI, and why that makes scoping the calling user's access the real control
- The baseline transport requirements every API call has to meet
- How OAuth scopes narrow what a specific connected app's token can do, on top of the user's own permissions

## The API doesn't bypass permissions -- it inherits them

A common misconception is that going through the API is somehow a different, looser security context than clicking through the UI. It isn't. Salesforce's API documentation is explicit that a client application can query or update only the objects and fields the logged-in user already has access to — the same profile and permission-set-based access that governs the UI governs every API call made on that user's behalf. The API layer adds one more permission on top: a user must have **API Enabled**, granted via a profile or permission set, before they can make any API call at all. Without it, API calls fail regardless of what object and field access the user otherwise has. With it, the user's existing object, field, and record-level access becomes the real ceiling on what any integration using that identity can do through the API.

This is exactly why Lessons 1 and 4 keep returning to the identity behind an integration: the API itself has no separate, looser rulebook. An integration's real access is the union of API Enabled plus whatever that integration's identity (an integration user, a Run As user, a principal) has been granted everywhere else.

## Transport and connection baseline

Every API connection has a non-negotiable floor: Salesforce requires TLS for API connections (plus `frontdoor.jsp` for the one legacy exception to that rule), and the ciphers used have to meet a minimum key-length bar. An integration that can't or won't negotiate a current TLS version simply can't connect — there's no fallback to an unencrypted or weakly-encrypted channel. This baseline is enforced by the platform itself, not something an admin configures per-integration, which makes it one of the few controls in this course you don't have to remember to turn on.

## Scoping access for an API-only identity

Because the API inherits the calling user's access rather than defining its own, the actual security work for an API integration is the same work covered in Lesson 6: build a dedicated integration user (or Run As user, or per-user principal) with a custom profile or permission set scoped to only the objects, fields, and record access the specific integration needs — and nothing left over "in case it's needed later." The one API-specific addition on top of normal least-privilege scoping is the **API Only User** setting, available on a profile, which blocks that user from logging in through the standard UI at all while still allowing API access. Combining a narrowly-scoped permission set with API Only means a compromised integration credential can't be used to simply log into the Salesforce UI and browse around — it's still limited to whatever the API allows that identity to do, but it closes off one additional avenue of misuse.

## OAuth scopes as a second, narrower gate

When an integration authenticates via OAuth (Lesson 2), the connected app's requested scopes add a second filter on top of the user's own permissions. A connected app can request a scope that limits what the resulting access token is good for — for example, a scope that only allows API data access without also permitting the ability to perform actions like "act as the user" more broadly. Scopes narrow what a given token can be used for; they never widen it past what the underlying identity's profile and permission sets already allow. A token issued with an overly broad scope on top of an already over-privileged user doesn't help — scoping the connected app's OAuth request and scoping the underlying user's permission set are both necessary, and neither substitutes for the other.

## Putting it together

API security for an integration is less "a separate set of API-specific switches" and more "making sure the ordinary access-control decisions — API Enabled, the user's object/field/record access, API Only, OAuth scope — are all set deliberately for this specific integration," rather than inherited by accident from whatever profile was easiest to clone when the integration was first built. The platform enforces TLS and the API Enabled gate automatically; everything past that is a design decision an architect has to make explicitly.

## Key terms

| Term | Meaning |
|---|---|
| API Enabled | The permission (via profile or permission set) required before a user can make any API call at all |
| API Only User | A profile setting that blocks standard UI login for a user while still permitting API access |
| OAuth scope | A declared limit on what an issued access token is permitted to be used for, narrower than or equal to the underlying user's actual permissions |
| TLS enforcement | Salesforce's platform-level requirement that API connections use TLS (with a minimum cipher strength), with no unencrypted fallback |

## Lab

A client's existing integration user has the System Administrator profile "because it was the easiest way to make sure the integration never broke when new fields were added." Redesign this: specify what custom profile or permission set changes you'd make, whether you'd enable API Only, and what OAuth scope (if the integration uses OAuth) you'd request, so that the integration keeps working but is no longer riding on a System Administrator-level identity. Justify each change against this lesson's "the API inherits the user's access" principle.

## Check yourself

Can you explain why going through the API doesn't bypass a user's object- and field-level permissions? Can you name the two separate gates (user permissions and OAuth scope) that together determine what an OAuth-authenticated API call is actually allowed to do?
