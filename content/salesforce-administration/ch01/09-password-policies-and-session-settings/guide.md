# Lesson 9 — Password Policies and Session Settings

**Chapter 1 · Users and Access · Lesson 9 of 36**

## What you'll learn

- What the org-wide Password Policies page controls
- The default values worth knowing: expiration, history, lockout
- How profile-level password policy settings override the org-wide defaults
- What Session Settings controls, and where it sits in Setup

## Password Policies

From Setup, Quick Find **Password Policies**:

![The Salesforce Classic Password Policies page, showing fields for User passwords expire in, Enforce password history, Minimum password length, Password complexity requirement, Password question requirement, Maximum invalid login attempts, Lockout effective period, plus Forgot Password / Locked Account Assistance and API Only User Settings sections.](/courses/salesforce-administration/ch01/09-password-policies-and-session-settings/password-policies.jpg)
*Password Policies — one org-wide page covering expiration, history, complexity, and lockout behavior for every user's password.*

| Setting | What it controls |
|---|---|
| **User passwords expire in** | How long before a password must be changed (default: 90 days) |
| **Enforce password history** | How many previous passwords can't be reused (default: 3) |
| **Minimum password length** | The shortest password Salesforce will accept |
| **Password complexity requirement** | Whether letters, numbers, and special characters are required |
| **Maximum invalid login attempts** | How many failed logins before lockout |
| **Lockout effective period** | How long a locked-out account stays locked |

## Defaults worth knowing

- Passwords **expire every 90 days** out of the box.
- The last **3 passwords** are remembered and can't be immediately reused.
- Password Policies can also be set **per profile** — and when they are, the profile-level settings override the org-wide defaults for that profile's users, exactly like Login Hours and Login IP Ranges from Lesson 8.

## Session Settings: a different question

Password Policies governs how strong a password has to be. **Session Settings** governs something separate: once someone has successfully logged in, how long does that session stay valid?

![The Salesforce Classic Security Controls menu with Session Settings highlighted, positioned between Password Policies and Login Flows.](/courses/salesforce-administration/ch01/09-password-policies-and-session-settings/security-controls-menu.webp)
*Session Settings sits right below Password Policies in the same Security Controls menu.*

Session Settings covers:

- **Timeout Value** — how long of inactivity before the system logs a user out (default: 2 hours; options range from 15 minutes for strict environments to 24 hours for permissive ones)
- **Lock sessions to the IP address from which they originated** — prevents a session from being hijacked and continued from a different network
- **Force logout on session timeout** — automatically redirects an expired session to the login page rather than leaving it idle on a stale page

Like Password Policies, Session Settings can also be overridden at the profile level.

## Getting there

Both settings are a single Quick Find search away from the same Setup Home every lesson in this chapter has used:

![Salesforce Setup Home, with the Quick Find search box at the top of the left navigation panel.](/courses/salesforce-administration/ch01/09-password-policies-and-session-settings/setup-home.png)
*From Setup Home, Quick Find "Password Policies" or "Session Settings" — same search box, same workflow, every time.*

## Key terms

| Term | Meaning |
|---|---|
| Password Policies | Org-wide (and optionally profile-level) rules for password strength, history, and lockout |
| Lockout | A temporary block on login after too many failed password attempts |
| Session Settings | Org-wide (and optionally profile-level) rules for how long a login session stays active |
| Timeout Value | The inactivity duration after which a session is automatically ended |

## Check yourself

Without looking back: what are the default password expiration and history settings, and what does the Session Settings Timeout Value actually control?
