# Lesson 8 — Login Access, Login Hours, and IP Restrictions

**Chapter 1 · Users and Access · Lesson 8 of 36**

## What you'll learn

- Where Login Access, Login Hours, and IP restriction settings live in Setup
- The difference between org-wide Network Access and profile-level Login IP Ranges
- Why being outside a profile's IP range blocks login entirely, with no fallback
- How Login Hours restricts access by day and time, per profile

## Three separate locks

Everything through Lesson 7 controlled *what* a logged-in user can do. This lesson covers *getting in* in the first place — a separate layer of control, split across three settings:

![The Salesforce Classic Security Controls menu, listing Sharing Settings, Field Accessibility, Password Policies, Session Settings, Login Flows, Network Access, Activations, Session Management, Login Access Policies, Certificate and Key Management, Single Sign-On Settings, Auth. Providers, Identity Provider, View Setup Audit Trail, Expire All Passwords, Delegated Administration, and Remote Site Settings.](/courses/salesforce-administration/ch01/08-login-access-login-hours-and-ip-restrictions/security-controls-menu.webp)
*Setup > Security Controls. Network Access and Login Access Policies both live here, org-wide; Login Hours and Login IP Ranges live one level down, inside each profile.*

| Setting | Scope | Controls |
|---|---|---|
| **Login Access Policies** | Org-wide | Whether admins can log in as other users without the user first granting access |
| **Network Access** | Org-wide | Trusted IP ranges — logging in from outside just adds an identity-verification step |
| **Login Hours** | Per profile | The days and times users with this profile can log in at all |
| **Login IP Ranges** | Per profile | A strict IP range — logging in from outside is blocked outright |

## Org-wide trust vs. profile-level enforcement

It's worth being precise about the difference between the two IP-related settings, because they behave very differently:

- **Network Access** (org-wide trusted IPs): a login from outside the trusted range isn't blocked — it just triggers Salesforce's identity-verification flow (a code sent to the user).
- **Login IP Ranges** (profile-level): a login from outside the range is **blocked entirely**. There's no verification-code fallback — the user simply cannot log in from that network.

![A Salesforce Classic Login IP Ranges form on a profile, with Start IP Address, End IP Address, and Description fields.](/courses/salesforce-administration/ch01/08-login-access-login-hours-and-ip-restrictions/login-ip-ranges.jpg)
*Profile-level Login IP Ranges: Start and End IP address. Outside this range, with this profile, login is refused — not just flagged.*

To set this: from Setup, Quick Find **Profiles**, select a profile, and open **Login IP Ranges** (or scroll to the **Login IP Ranges** related list if the Enhanced Profile interface isn't enabled). Click **New**, enter the range, and save.

## Login Hours: restricting by time

The same profile also carries **Login Hours** — the days and times during which users with this profile may log in. A call-center team that only works business hours, for example, can be locked out of Salesforce entirely outside that window:

1. From Setup, Quick Find **Profiles**, select the profile.
2. Click **Login Hours**, then **Edit**.
3. Set start and end times per day — or set a day's start and end time to the same value to block login entirely on that day.
4. Save.

A user already logged in when their window ends can still view their current page but cannot take any further action until their next allowed window.

## Both settings live inside Profile

![The Salesforce Setup navigation with Administration expanded and Profiles active, next to Permission Set Groups, Permission Sets, Public Groups, Queues, and Roles.](/courses/salesforce-administration/ch01/08-login-access-login-hours-and-ip-restrictions/profiles-nav.png)
*Login Hours and Login IP Ranges are profile settings — one more reason Profile (Lesson 5) is the single most consequential record a Salesforce admin configures.*

## Key terms

| Term | Meaning |
|---|---|
| Login Access Policies | Org-wide setting controlling whether admins can log in as other users |
| Network Access | Org-wide trusted IP ranges; outside them triggers identity verification |
| Login IP Ranges | Profile-level IP restriction; outside them blocks login entirely |
| Login Hours | Profile-level restriction on which days/times login is allowed |

## Check yourself

Without looking back: what's the practical difference in outcome between a login from outside the org's Network Access trusted range versus a login from outside a profile's Login IP Ranges?
