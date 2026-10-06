# Lesson 23 — Session and Login Security

**Chapter 4 · Beyond the Basics · Lesson 23 of 24**

## What you'll learn

- What the **Session Settings** page controls, and how it differs from
  everything covered so far
- Key session-security settings worth understanding: timeout, IP
  locking, High Assurance
- How multi-factor authentication fits into login security
- How **Health Check** scores an org against Salesforce's baseline
  security recommendations

Every lesson so far has been about **what a logged-in user can see and
do**. This lesson is about the layer underneath that: whether the
session itself — the authenticated connection between a browser and
Salesforce — is actually secure, independent of what permissions the
user holds.

## The Session Settings page

Setup → **Session Settings** is where session-level security lives,
separate from Sharing Settings (Lesson 21) and from any individual
profile. Settings here apply org-wide, though several can be
overridden per profile. Key ones:

```
Session Timeout        how long an idle session stays valid before
                        forcing re-authentication
Force logout on
  session timeout       whether timing out also ends the session
                        server-side, not just the browser tab
Lock sessions to the
  IP address from
  which they originated prevents a stolen session token from being
                        reused from a different IP
Require HTTPS           enforced by default on current orgs
Clickjack protection    controls whether Salesforce pages can be
                        framed by another site
```

### Session timeout

A shorter timeout is more secure but more disruptive — the honest
tradeoff Lesson 19's mistake patterns would call out if an org set this
without thinking it through. A reasonable default for most orgs is in
the hours range, shorter for anything handling especially sensitive
data, and longer timeouts should be a deliberate choice with a reason,
not an unexamined default.

### IP locking

Locking a session to its originating IP means a session token stolen
and replayed from a different network simply won't work — a real
defense against certain session-hijacking scenarios, at the cost of
breaking sessions for legitimately mobile users (switching from office
WiFi to a hotspot mid-session, for instance).

## High Assurance sessions

Not every action deserves the same bar. Salesforce lets you require a
**High Assurance** session — one authenticated via a stronger method
(like MFA) — for specific sensitive actions, such as viewing certain
reports or managing connected apps, even if the user's normal session
only reached **Standard** assurance. This is the same "narrow access
further, situationally" idea restriction rules apply to records
(Lesson 16), applied instead to the strength of the authentication
itself.

## Multi-factor authentication

MFA requires a second verification factor beyond a password — an
authenticator app, a security key — before a session starts. Salesforce
has required MFA for direct UI logins org-wide since 2022; it's not an
optional best practice anymore, it's a baseline. MFA addresses a
different risk than anything else in this course: everything in
Chapters 1-3 assumes the person logging in is who their credentials
say they are. MFA is what makes that assumption actually safe to make.

## Health Check: scoring the whole picture

**Health Check** (Setup → Health Check) is a single dashboard that
compares an org's actual security settings — including session
settings, password policies, and more — against Salesforce's
recommended baseline, and returns a score from 0-100. It groups
findings by risk level and, for many settings, lets you fix them
directly from the dashboard in one click, rather than hunting through
Setup page by page. It's a reasonable first stop when picking up an
unfamiliar org — similar in spirit to the Lesson 20 audit, but
automated and focused specifically on security configuration rather
than data-access design.

## Key terms

| Term | Meaning |
|---|---|
| Session Settings | The Setup page controlling session timeout, IP locking, HTTPS, and related connection-level security |
| High Assurance | A stronger authentication level required for specific sensitive actions, independent of normal login |
| MFA | A required second verification factor beyond password, enforced org-wide on direct UI logins since 2022 |
| Health Check | A dashboard scoring an org's settings against Salesforce's security baseline, with one-click fixes |

## Check yourself

An org requires MFA for login but has a 24-hour session timeout and no
IP locking. Based on this lesson, is the org's login security and its
session security the same thing? Where's the gap?
