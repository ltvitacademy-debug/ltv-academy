# Lesson 2 — Security vs. Usability

**Chapter 1 · Architecture Tradeoffs · Lesson 2 of 20**

## What you'll learn

- Why tighter security almost always costs usability, and why that's not a design flaw
- Concrete Salesforce controls that sit on this tradeoff: MFA, session security policies, field-level security, permission sets vs. broad profiles
- The real criteria architects use to decide how far to push toward security for a given org
- Why "add more security" is not free, and why "make it easier" is not free either

## Every lock is also a delay

Security and usability pull in opposite directions almost by definition. A control that makes unauthorized access harder also makes *authorized* access slightly harder — that's not a side effect, it's how the control works. Multi-factor authentication stops a stolen password from being enough to log in, and it also means a legitimate user has to find their phone every time they log in from a new device. A strict session-timeout policy limits how long a hijacked session stays usable, and it also logs out a rep mid-call who stepped away for two minutes. There's no setting that closes the gap for attackers without opening some friction for legitimate users — which is exactly why this is a tradeoff and not a bug to be engineered away.

Salesforce gives architects real, specific levers on this axis. Multi-factor authentication is Salesforce's baseline security requirement for all direct logins to the platform — it's not an optional nicety the architect can skip, though *how* it's satisfied (authenticator app, security key, built-in platform MFA) is a design choice with its own usability cost. Session security policies — idle timeout, enforcing login IP ranges, requiring re-authentication for sensitive operations — trade a few seconds or a re-login prompt against a materially smaller window for session hijacking. Field-level security and record-level sharing can be locked down tightly (narrow profiles, minimal permission sets, explicit sharing rules) or left loose (broad "View All"/"Modify All" permissions, wide default sharing) — and the tight end of that spectrum means more support tickets from users who "can't see a field they need," not because the architecture is broken, but because every narrowed permission is, by definition, something somebody used to be able to do and now can't without asking.

## Where the criteria actually live

The decision isn't "security good, usability bad" — it's matching the control to what's actually at risk and who's actually affected. A few concrete criteria:

- **What's the actual sensitivity of what's being protected?** A system holding health records or payment data justifies friction that a system holding only published marketing content doesn't. Lock down in proportion to the real consequence of a breach, not out of general anxiety.
- **Who are the users, and how often do they hit the control?** A control a user experiences once a quarter (like re-verifying identity before changing a bank-deposit field) costs far less in aggregate friction than one hit every single login. Put friction where the stakes are highest and the frequency is lowest, when you can.
- **What's the cost of the breach you're preventing, versus the cost of the friction you're adding, measured in the same terms** — lost productivity, help-desk tickets, abandoned transactions, versus breach remediation, regulatory fines, and reputational damage? Neither side of this tradeoff is free; the job is pricing both sides honestly.
- **Is there a control that reduces friction without reducing security?** Permission sets layered onto a minimal base profile, rather than one bloated profile per role, let an architect grant exactly what's needed without constant profile cloning — genuinely better on both axes at once, which is why it's worth looking for these before assuming the tradeoff is unavoidable in a given spot. These aren't tradeoff-free in general, just in this specific comparison against the alternative of profile sprawl.

A junior mistake is treating every security control as pure cost, or treating every usability complaint as something to fix by loosening a control. A mature architect asks what specifically is being protected, how often the friction actually bites, and whether a smarter design (permission sets instead of profile bloat, step-up authentication only on sensitive actions instead of on every login) can shrink the cost on one side without giving up the benefit on the other.

## Key terms

| Term | Meaning |
|---|---|
| Multi-factor authentication (MFA) | Salesforce's baseline login security requirement, pairing a password with a second verification factor |
| Session security policy | Org-level controls like idle timeout and IP range restriction that limit how a logged-in session can be used or hijacked |
| Field-level security | Control over which profiles or permission sets can view or edit a specific field, independent of object-level access |
| Permission set | A layered grant of specific permissions on top of a user's base profile, used to avoid profile sprawl |
| Step-up authentication | Requiring stronger verification only for specific sensitive actions, rather than uniformly on every login |

## Lab

A mid-size nonprofit wants its field staff to log case notes from personal phones in the field, often with spotty connectivity. The CISO wants MFA enforced on every login and a 15-minute idle session timeout. Field staff are pushing back that the MFA prompt plus frequent timeouts make the app nearly unusable in the field. Using the criteria above, write a short recommendation: what would you actually propose (keep both, loosen one, add a different control instead), and what specific facts about this org's data sensitivity and user pattern justify your answer?

## Check yourself

Can you explain why tightening security and improving usability usually can't both be maximized at the same time, using a concrete Salesforce control as your example? Can you name at least two criteria an architect should use to decide how much friction a given security control is worth in a specific org?
