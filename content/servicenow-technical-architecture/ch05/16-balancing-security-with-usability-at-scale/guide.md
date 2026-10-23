# Lesson 16 — Balancing Security With Usability at Scale

**Chapter 5 · Security Architecture · Lesson 16 of 32**

## What you'll learn

- Why a security architecture that looks maximally secure on paper can
  produce *worse* real-world security outcomes
- The specific workarounds overly restrictive security actually drives
  users toward — and why each one is less secure than what it replaced
- The real judgment call: strict where risk justifies it, frictionless
  everywhere else — not uniform maximum restriction
- How to recognize, on your own instance, that this tradeoff is already
  happening

## The counterintuitive failure mode

It's tempting to think of security and usability as a dial you can
simply turn toward "more secure" and get a safer instance. At
enterprise scale, that's not reliably true. When legitimate access to
data a user needs for their actual job is too slow, too restricted,
or too cumbersome to get through proper channels, people don't stop
doing their jobs — they find another way to do them. And the
"another way" is almost always less secure than the control it was
built to enforce, because it happens outside the system the
architecture was designed to govern.

## The three workarounds, concretely

**Shared credentials.** If getting individual, properly-scoped
access to a system takes a multi-week approval chain, a team under
deadline pressure will share one login among several people rather
than wait. That one login now has no individual accountability at
all — you've lost the audit trail entirely, which is a strictly worse
outcome than the "over-broad role" you were trying to avoid.

**Shadow exports.** If an analyst's field-level ACLs are so
restrictive that they can't assemble the view of the data they
actually need inside the platform, they export what they *can* see
to a personal spreadsheet and keep building their own copy outside
ServiceNow entirely. That spreadsheet has no ACLs, no audit log, no
encryption, and probably lives in a personal OneDrive folder nobody
on the security team has ever looked at.

**Shadow IT.** If an entire workflow is too locked down to be usable
at the team level, the team doesn't request an exception — they stand
up their own tool outside the governed environment: a free SaaS app,
a shared spreadsheet-based tracker, a Slack channel that becomes the
real system of record. Now the organization has sensitive data living
in a system with zero of the controls, encryption, or audit logging
the Technical Architect spent Lesson 15 designing.

## The real architectural judgment

None of these outcomes is caused by malice — they're caused by
friction. The architect's job is not to apply the strictest possible
control uniformly across the instance; it's to identify *where* the
risk genuinely justifies friction (approval-chain overrides, access
to regulated financial or health data, anything with real
irreversible-harm potential) and make access to everything else
**as close to frictionless as the risk tolerates**. A security
architecture that is uniformly strict looks impressive in an audit
checklist and performs badly in practice, because it manufactures
exactly the workarounds that defeat it. A security architecture that
is selectively strict — tight where it matters, fast everywhere else
— is the one that actually holds up, because it removes the user's
reason to go around it.

## How to spot this happening on a real instance

Look for the symptoms before the root cause: unusual numbers of
scheduled or on-demand reports being exported from sensitive tables,
helpdesk tickets asking "can someone just give me X's login," or a
department running an unofficial tracker that duplicates data already
in ServiceNow. Each of these is a signal that the existing security
architecture has a friction problem somewhere upstream — and the fix
is redesigning the access, not issuing a reminder about policy
compliance.

## Key terms

| Term | Meaning |
|---|---|
| Security-usability tradeoff | The tension between restricting access and keeping legitimate work practical; mismanaging it produces worse security, not better |
| Shadow export | Users exporting data to an ungoverned personal file because in-platform access is too restricted for their actual job |
| Shadow IT | An unofficial tool or workflow a team stands up outside the governed system because the official one is too locked down to use |
| Risk-proportionate friction | Applying restriction in proportion to actual risk, rather than uniformly at maximum strength across the whole instance |

## Check yourself

A department's helpdesk tickets show a spike in requests for "someone
else's login so I can just get this done." What does that pattern
actually tell a Technical Architect about the instance's security
architecture — and why is tightening restrictions further almost
certainly the wrong response to it?
