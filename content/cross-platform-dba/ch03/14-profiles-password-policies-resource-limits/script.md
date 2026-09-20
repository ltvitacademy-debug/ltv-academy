# Script — Profiles, Password Policies & Resource Limits

## Segment 1 (title)

SQL Server has no built-in per-login CPU or session-time cap. Oracle bundles password policy and resource consumption into a single object you attach to a user: the profile.

## Segment 2 (code: password policy)

A profile sets password expiration, grace time, reuse rules, lockout after failed attempts, and a complexity check function. These password parameters are enforced by default, with no extra switch needed.

## Segment 3 (code: resource limits)

Resource limits live on the same profile object, but they're silently ignored database-wide until you set RESOURCE_LIMIT to TRUE at the instance level. Only then do things like IDLE_TIME and SESSIONS_PER_USER actually take effect.

## Segment 4 (steps: two categories, one object)

Think of a profile as covering three areas: password expiration and reuse, lockout and complexity, and resource limits like CPU and idle session time. Every user gets one profile, defaulting to DEFAULT if you never assign another.

## Segment 5 (outro)

Next up: Oracle auditing and fine-grained access control — how Oracle records what happened, and how it can restrict what rows a query is even allowed to see.
