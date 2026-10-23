# Lesson 11 — Authentication Lab

**Chapter 3 · Authentication & Single Sign-On · Lesson 11 of 24**

## What you'll learn

- How to justify a local-to-SSO migration in terms a decision-maker actually cares about
- What real-world information you need before configuring a Multi-Provider SSO record
- How to walk the SAML trust setup end to end for a named, real IdP
- Where to confirm MFA enforcement lives — and why you don't need to touch ServiceNow for it
- How to recognize when a request is actually out of scope for the authentication layer

## The scenario

A company currently runs 2,000 users on local ServiceNow
authentication — every one of those `sys_user` records has its own
password, checked directly against ServiceNow, exactly as described
in Lesson 8. The company already uses Okta as its enterprise identity
platform for other applications, and leadership wants two things done
at once: move ServiceNow onto SSO against that existing Okta tenant,
and have MFA enforced for every login. You're asked to plan this
change and explain it to a non-technical stakeholder who will ask
"why are we doing this" before approving anything.

## Step 1 — Make the business case, not the technical case

Leadership doesn't need a protocol lesson; they need the three real
reasons from Lesson 8, applied to this company specifically:

- **Centralized password policy.** Right now, ServiceNow's password
  rules exist only inside ServiceNow, separate from whatever Okta
  already enforces for every other application. Moving to SSO means
  one policy, enforced once, at Okta — which the company already
  manages today for its other systems.
- **One login experience.** 2,000 employees currently have a
  ServiceNow-specific login on top of their Okta login for everything
  else. SSO collapses that into the same single sign-on they already
  use daily.
- **Offboarding — the deciding argument.** Today, removing a departing
  employee's ServiceNow access requires a separate, deliberate step in
  ServiceNow on top of disabling them at Okta. At 2,000 users, that's
  2,000 opportunities for someone to forget the ServiceNow-specific
  step. Moving ServiceNow under Okta's umbrella means disabling one
  Okta account is immediately sufficient — no separate ServiceNow
  action required, no window where a departed employee still has a
  working login.

This is the pitch that actually lands with a non-technical
stakeholder: less administrative overhead, and a real reduction in
offboarding risk, not an abstract protocol upgrade.

## Step 2 — Gather what the Multi-Provider SSO record actually needs

Before any configuration happens, you need the real pieces Lesson 9
described, and all three come from Okta, not from ServiceNow:

- The **entity ID** for this company's Okta tenant.
- The **SSO endpoint URL** Okta exposes for this ServiceNow
  integration.
- Okta's current **signing certificate**, so ServiceNow can validate
  assertions it receives.

This is a cross-team dependency worth calling out explicitly: you
cannot finish this configuration alone. Someone with admin access to
the company's Okta tenant has to retrieve these three values and hand
them to whoever configures the Multi-Provider SSO record in
ServiceNow. Planning this migration means scheduling that handoff,
not just opening ServiceNow and clicking around.

## Step 3 — Configure the trust relationship

With Okta's metadata in hand, the Multi-Provider SSO configuration
record gets built using exactly those three values, establishing the
same trust relationship Lesson 9 walked through conceptually. Once
saved, the same seven-step flow applies: a user hits the ServiceNow
instance, gets redirected to Okta, authenticates there, and Okta
sends back a signed assertion that ServiceNow validates against the
certificate in that record before logging the user in. At that point,
all 2,000 `sys_user` records keep every existing role and group
assignment exactly as-is — this migration changes nothing about
*authorization*, only about who verifies identity on the way in.

## Step 4 — Confirm MFA, don't configure it in ServiceNow

This is the step most likely to get over-engineered if you don't
remember Lesson 10's core point: MFA enforcement for this migration
belongs at Okta, not inside ServiceNow. Since Okta is already this
company's enterprise identity chokepoint, the request to "enforce
MFA" is answered by confirming Okta's own MFA policy is turned on and
applies to the Okta application tied to this ServiceNow integration
— not by searching for a native ServiceNow MFA setting to turn on.
Mapped onto the SAML flow, this means the authentication step at Okta
now requires the password and the second factor before Okta will
issue the signed assertion ServiceNow is waiting for. ServiceNow's own
configuration doesn't change at all to support this requirement.

## Step 5 — Recognize what's genuinely out of scope here

If leadership also asks "can we require different MFA rules for
different departments," that's a real, legitimate question — but it's
an Okta policy question, not something this lab's scope (or
ServiceNow) can answer. The correct response is naming that
boundary clearly, not guessing at a ServiceNow-side workaround that
doesn't actually exist for an authentication-layer concern.

## Key terms

| Term | Meaning |
|---|---|
| Migration pitch | Centralized policy, one login, and offboarding — the three real business reasons for this move |
| Cross-team dependency | Okta admin access is required to retrieve the entity ID, endpoint URL, and certificate |
| Authorization unchanged | Roles and groups in sys_user stay exactly as they were; only identity verification changes |
| MFA confirmation, not configuration | Verify Okta's MFA policy covers this app; there is no equivalent ServiceNow-native setting to build |

## Check yourself

Leadership asks: "Once we're on SSO, do we need to redo any of our
role and ACL work from earlier in this course?" Answer that directly,
and explain why the answer is no.
