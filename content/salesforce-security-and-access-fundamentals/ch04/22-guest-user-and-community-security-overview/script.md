# Script — Guest User and Community Security Overview

## Segment 1 (title)

Every user so far logs in. A guest user never does — anyone who visits a public site is automatically the guest user, sharing one profile with every other anonymous visitor at once. That makes this a genuinely different problem.

## Segment 2 (code: what a guest user is)

Every Experience Cloud site has exactly one Guest User profile, and every unauthenticated visitor — all of them, simultaneously, worldwide — operates as that one profile. There's no individual session to scope to or audit back to. An internal misconfiguration exposes data to employees; a guest-user misconfiguration can expose it to the entire internet.

## Segment 3 (steps: secure guest user record access)

Since Summer '20, Secure guest user record access is mandatory — guest users no longer get implicit access from a permissive OWD the way internal users historically could. Record access has to come from an explicit grant, a sharing rule or sharing set built specifically for guest users. This setting can't be disabled — it's a platform floor, not a preference.

## Segment 4 (steps: configuring it safely)

Start from nothing and add deliberately — review every object permission and remove what the site doesn't actively need. Disable API access unless required. Grant Create where a form needs it, not Read just because it's convenient to test with. And use sharing sets, which scope to a visitor's own session context, rather than broad sharing rules applied to the whole guest profile.

## Segment 5 (code: what's gone wrong in practice)

The pattern behind real public guest-user exposures is consistent: a profile accumulates more access than the site actually needs — often granted broadly during testing and never narrowed before launch — and it's reachable by anyone on the internet, no login required to find it. The fix is the same discipline as step one, just applied before launch instead of after an incident.

## Segment 6 (outro)

One shared profile, mandatory explicit record access, and a start-from-nothing discipline that matters more here than anywhere else in the platform. Next lesson covers session and login security — protecting the sessions authenticated users actually have.
