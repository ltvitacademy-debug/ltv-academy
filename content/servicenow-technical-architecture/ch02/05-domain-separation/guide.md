# Lesson 5 — Domain Separation

**Chapter 2 · Platform Architecture · Lesson 5 of 32**

## What you'll learn

- What Domain Separation actually is, and the real problem it solves inside one shared instance
- The two legitimate use cases this capability genuinely exists for
- How domain-separated and domain-extendable data behave differently, concretely
- The honest cost Domain Separation adds to every customization going forward — and why that cost means it should never be a default

## The problem Domain Separation solves

Lesson 4 ended on a default: favor one production instance, and use Domain Separation for
multi-tenancy needs *within* it. Domain Separation is that real capability — a way to logically
wall off data and configuration for genuinely distinct organizational units, all inside a single
shared instance, without the cost of standing up a second production instance for each one.
Every record in a domain-separated instance carries a hidden `sys_domain` field that says which
domain it belongs to, and the platform uses that field to decide who can see what.

## The two real use cases this exists for

Domain Separation isn't a general-purpose "give every department its own folder" feature — it's
built for situations where the separation is genuinely structural:

- **Separate subsidiaries under one parent company.** A parent company wants one shared instance
  for licensing and platform-operations efficiency, but Subsidiary A's incident data, catalog
  items, and reports must never be visible to Subsidiary B, and vice versa — only the parent-level
  domain should see across both.
- **A Managed Service Provider (MSP) serving multiple distinct clients.** One MSP instance hosts
  Client X's and Client Y's ITSM processes side by side. Each client's data must be completely
  invisible to the other, even though both run on the exact same instance, the exact same tables,
  and often the exact same scoped applications.

Both cases share the same shape: the organizations involved are genuinely separate entities with a
real, non-negotiable requirement that their data never cross — not just departments that happen to
report to different VPs.

## Domain-separated vs. domain-extendable, concretely

Not every table behaves the same way under Domain Separation. A table (or record) can be:

```
Domain-separated:                      Domain-extendable:
- visible only within its own          - the top/primary domain can see
  domain, and to domains above it         AND edit records in any
  in the hierarchy                        subordinate domain
- Client X cannot see Client Y's       - the MSP admin can still manage
  incidents, ever                         shared configuration centrally
```

A Business Rule, a report, or a Script Include can itself be domain-extendable or
domain-separated, and getting that choice wrong is exactly how data leaks between domains that were
supposed to be airtight — or how a client ends up unable to see configuration the MSP intended to
manage centrally on their behalf.

## The real cost: every customization now has to think about domains

This is the honest tradeoff, and it's a significant one. Once Domain Separation is turned on,
*every* future script, report, and integration built on that instance has to be written with domain
awareness in mind. A GlideRecord query that an admin instance would run without a second thought
can behave completely differently depending on which domain the running user or the executing
script is scoped to. A developer who forgets this can write a Business Rule that looks correct in
testing — because it was tested from the top domain, which sees everything — and then silently
misbehaves for a user working inside a subordinate domain.

```
Without Domain Separation:            With Domain Separation:
- a query behaves the same way        - the same query can return
  for every user                         different results depending on
- one mental model for every              the running user's domain
  script and report                   - every script author must reason
                                          about "whose domain is this
                                          code running in?"
```

That ongoing cognitive and testing overhead is real, permanent, and paid by every developer who
ever touches the instance again — which is exactly why Domain Separation should only be adopted
when a genuine data-separation requirement demands it, never as a default multi-tenancy pattern
just because an organization happens to have multiple departments. Chapter 8's Platform Governance
Models lesson covers the real alternative for that far more common situation: governing a
multi-department implementation through roles, process, and catalog organization — without paying
Domain Separation's complexity tax at all.

## Key terms

| Term | Meaning |
|---|---|
| Domain Separation | A ServiceNow capability for logically separating data and configuration within one shared instance |
| `sys_domain` | The hidden field on every record that determines which domain it belongs to |
| Domain-extendable | Data visible and editable from a domain and all of its subordinate domains |
| Domain-separated | Data visible only within its own domain, never from a sibling domain |

## Check yourself

An organization has five departments that all report to the same VP and regularly need to see each
other's incidents. Is Domain Separation the right tool here — and what should you ask before
reaching for it anyway?
