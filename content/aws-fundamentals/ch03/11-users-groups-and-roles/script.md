# Script — Users, Groups & Roles

## Segment 1 (title)

IAM gives you three kinds of identity, and picking the right one matters — users, groups, and roles behave very differently, especially once you're building pipelines instead of just logging into the console.

## Segment 2 (steps: three identities)

A user is a person with long-term credentials — a password, access keys, or both. A group isn't an identity at all — it's just a container that lets you attach a policy to many users at once. A role has no long-term credentials — it's assumed, and whoever assumes it gets short-lived, auto-expiring access.

## Segment 3 (code: why roles win in pipelines)

Here's why that matters for data engineering specifically: a Glue job that assumes a role gets temporary credentials scoped to exactly what it needs, expiring automatically. A Glue job running on a hardcoded IAM user access key is a long-lived secret sitting in a script, waiting to leak.

## Segment 4 (outro)

Roles have a second policy users and groups don't — a trust policy, defining who's even allowed to assume them. Next up: policies and permissions, the JSON that actually decides what any of these identities can do.
