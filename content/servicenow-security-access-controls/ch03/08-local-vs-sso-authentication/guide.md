# Lesson 8 — Local vs. SSO Authentication

**Chapter 3 · Authentication & Single Sign-On · Lesson 8 of 24**

## What you'll learn

- What "local authentication" actually means on the Now Platform, and how it relates to the `sys_user` table you worked with in User Administration
- What SSO changes: who checks the password, and where
- The three real enterprise reasons large organizations move to SSO instead of staying local
- Why offboarding is the argument that usually settles the decision
- How authentication is a separate layer from everything you've learned about roles and ACLs so far

## Local authentication: ServiceNow checks the password itself

Everything you built in User Administration assumed local authentication
without naming it. A user record lives in `sys_user`, it has a username
and a password hash, and when that user logs in, ServiceNow itself
compares what they typed against what it stored. The instance is both
the place the user works and the place that proves who they are. That's
local authentication: one system, doing two jobs — hosting the
application, and verifying identity.

It's simple, and for a single small instance it's perfectly workable.
But it has a structural limit: the password ServiceNow is checking is a
password that only exists *in ServiceNow*. Every other system the
employee uses — email, an HR platform, a dozen other SaaS tools — has
its own separate password, checked separately, by that system alone.

## SSO: ServiceNow stops checking passwords at all

Single Sign-On flips who does the checking. Instead of ServiceNow
validating credentials against `sys_user`, it delegates that entire
job to an external Identity Provider (IdP) — a system built
specifically to be the enterprise's one authentication chokepoint.
When a user tries to log in, ServiceNow doesn't ask "what's your
password" — it asks the IdP "is this really them?" and trusts the
IdP's answer. ServiceNow becomes a system that *consumes* a
confirmed identity rather than one that *produces* one. The user
record in `sys_user` still exists — ServiceNow still needs to know
who the person is for roles, groups, and ACLs — but the password
field stops being the thing standing between a login attempt and
access.

```
Local authentication:              SSO:
User types password -->            User types password -->
ServiceNow checks it               IdP checks it, tells ServiceNow
against sys_user                   "confirmed, this is them"

One system, two jobs:              Two systems, one job each:
host the app + verify identity     ServiceNow hosts; IdP verifies
```

## Why enterprises move to SSO: three real reasons

**Centralized password policy.** An organization with 50 applications
doesn't want 50 separate password-complexity rules, 50 separate
lockout thresholds, and 50 places a password can go stale. With SSO,
the IdP enforces one password policy, once, and every connected
application — ServiceNow included — inherits it automatically.

**One login for the whole portfolio.** Employees authenticate against
the IdP once and move between every connected application without
logging in again to each one separately. That's a real productivity
and support-ticket reduction, not just a convenience detail — fewer
forgotten passwords means fewer help-desk tickets.

**Offboarding — the argument that actually matters most.** This is
the one worth remembering above the other two. With local
authentication, disabling a departing employee means someone has to
remember to go disable their account in *every single application*
they had access to — ServiceNow, email, the HR system, everything —
separately. Miss one, and that person still has a working login
somewhere after they've left. With SSO, disabling one account at the
IdP immediately cuts off access to every connected system at once,
including ServiceNow. One action, one place, complete coverage. For
any organization managing access across dozens of applications, that
single point of control is the reason SSO almost always wins the
conversation.

## Authentication is a separate layer from everything else in this course

It matters to keep this cleanly separated from Chapters 1 and 2.
Roles, ACLs, and field-level security all answer "now that we know
who this is, what are they allowed to do?" Authentication only
answers "how do we know who this is in the first place?" Switching
from local authentication to SSO changes nothing about role design,
ACL evaluation order, or `security_admin` elevation — a user
authenticated through Okta still gets exactly the roles their
`sys_user` record and group memberships say they get. The two layers
stack; they don't replace each other.

## Key terms

| Term | Meaning |
|---|---|
| Local authentication | ServiceNow itself validates the username/password against `sys_user` |
| SSO (Single Sign-On) | Authentication is delegated to an external Identity Provider; ServiceNow trusts its confirmation |
| Identity Provider (IdP) | The external system that becomes the enterprise's one authentication chokepoint |
| Offboarding | Disabling a departing user's access; one IdP action under SSO vs. many separate actions under local auth |

## Check yourself

A user authenticated through SSO still has roles, group memberships,
and ACLs evaluated exactly as before. Explain, in one sentence, why
that's true — what changed with SSO, and what didn't?
