# Lesson 22 — Guest User and Community Security Overview

**Chapter 4 · Beyond the Basics · Lesson 22 of 24**

## What you'll learn

- What a guest user actually is, and why it's unlike every other user
  type covered so far
- Why "Secure guest user record access" exists and why it can't be
  disabled
- How to configure the guest user profile safely, step by step
- The specific mistakes that have caused real, public guest-user data
  exposures

Every user discussed so far — reps, agents, managers — logs in with
credentials. A **guest user** never logs in at all. Anyone who visits
a public Experience Cloud site or a Salesforce Site is automatically
the guest user, sharing one single profile with every other anonymous
visitor at the same time. That makes guest user security a genuinely
different problem from everything else in this course.

## What a guest user is

Every Experience Cloud site has exactly **one** Guest User profile.
Every unauthenticated visitor to that site — all of them, simultaneously,
worldwide — operates as that one profile. There's no "this specific
visitor" to scope access to; whatever the Guest User profile can see,
every anonymous visitor can see, right now, with nothing to log in to
and nothing to audit back to an individual.

```
Authenticated user  → one person, one session, individually auditable
Guest user          → EVERY anonymous visitor, same profile, same access
```

That's why a guest-user misconfiguration is categorically more
dangerous than a misconfigured internal profile: an internal mistake
exposes data to employees; a guest-user mistake can expose data to
the entire internet.

## Secure guest user record access

Since Summer '20, Salesforce enforces **Secure guest user record
access**, found on the Sharing Settings page: guest users no longer
get implicit record access from a permissive OWD the way internal
users historically could. Record access for guest users must now come
from an **explicit** grant — a sharing rule or a sharing set built
specifically for guest users. This setting **cannot be disabled** — it's
a platform-level floor, not an admin preference, because the exposure
risk of implicit guest access was serious enough that Salesforce made
it mandatory going forward.

## Configuring the guest user profile safely

1. **Start from nothing, add deliberately.** Review every object
   permission on the Guest User profile and remove anything not
   actively required by the site's functionality — the Lesson 19
   principle of starting restrictive applies here more than anywhere
   else in the platform.
2. **Disable API access unless required.** "API Enabled" on a guest
   profile lets anonymous traffic hit your org's APIs directly;
   leave it off unless the site specifically needs it.
3. **Grant only Create where forms require it.** A public lead-capture
   form needs Create on Lead, not Read — don't grant Read access just
   because it's convenient to test with.
4. **Use sharing sets, not broad sharing rules, for record access.**
   A sharing set grants guest users access to records related to their
   own session context (for example, a case they just submitted) far
   more narrowly than a sharing rule applied to the Guest User
   profile broadly would.
5. **Review on a schedule.** Guest profile permissions are an obvious
   candidate for the Lesson 18 access review — site functionality
   changes over time, and unused guest permissions are exactly the
   kind of access that silently accumulates (Lesson 19's Mistake 5).

## What's gone wrong in practice

The pattern behind real, publicized guest-user exposures is
consistent: a guest profile accumulates more object and field access
than the site's actual functionality needs — often because a developer
granted broad access during testing and nobody narrowed it before
launch — and that access is then reachable by anyone on the internet,
with no login required to discover it. The fix is never clever; it's
the same discipline as Step 1 above, applied before launch rather than
after an incident.

## Key terms

| Term | Meaning |
|---|---|
| Guest user | The single, shared, unauthenticated profile every anonymous site visitor operates as |
| Secure guest user record access | A mandatory platform setting requiring explicit (not OWD-implied) record access for guest users |
| Sharing set | A narrow, session-context-based way to grant guest users access to specific related records |

## Check yourself

Why is "start from nothing and add deliberately" a stronger principle
for a guest user profile than for an internal employee's profile, even
though both are covered by the same general advice from Lesson 19?
