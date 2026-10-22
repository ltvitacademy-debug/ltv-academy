# Lesson 8 — System Settings & Personal Preferences

**Chapter 2 · Navigation & Workspaces · Lesson 8 of 34**

## What you'll learn

- The real distinction between system-wide settings and personal preferences, and why mixing
  them up causes real admin mistakes
- Where each one actually lives: the gear icon / System Properties application versus the user's
  profile picture menu
- Concrete examples of what each category controls
- Why one of these two is role-gated and the other generally isn't

## Two different scopes, two different places

ServiceNow separates configuration into two scopes that are easy to confuse if you've only ever
clicked around casually: **system settings**, which apply instance-wide — to everyone, or to
everyone with a given role — and **personal preferences**, which apply only to the individual
user who set them. System settings live behind the gear/settings icon in the header, or more
fully inside the **System Properties** application, which is typically restricted to users with
administrative roles. Personal preferences live behind the user's own profile picture or user
menu, and any logged-in user can open and change their own, regardless of role.

## What system settings actually control

System Properties (and the related settings reachable from the gear icon) govern instance-wide
behavior: things like default list page sizes, whether certain modules or UI features are turned
on for the whole instance, security and session configuration, and countless other
`sys_properties` records that change how the platform behaves for every user who hits them.
Changing a system property is a decision that affects the whole instance (or everyone with a
given role), which is exactly why it's gated behind an administrative role — a careless change
here doesn't just affect the person making it.

## What personal preferences actually control

Personal preferences cover the individual user's own experience of the instance: date and time
format, display **time zone**, **language**, notification preferences (what you get emailed or
alerted about), theme, and list or form display preferences such as how many rows show per page
in lists you personally view. None of this affects any other user. Two agents sitting next to
each other can have completely different time zones, languages, and notification settings
without either one's choice touching the other's session at all.

## Why the distinction matters in practice

Mixing these up causes two common real mistakes. The first is a new admin hunting through System
Properties to fix something that was actually just their own personal time zone or date format —
wasted effort, because the fix was in their own profile menu the whole time. The second, more
serious mistake is assuming a "preference" is personal when it's actually a system-wide setting,
and changing it thinking it only affects your own view when it actually changes behavior for
every user on the instance. Knowing which scope you're in before you change anything is a basic
but genuinely load-bearing admin skill.

## Key terms

| Term | Meaning |
|---|---|
| System Properties | The admin-gated application (and `sys_properties` table) controlling instance-wide configuration |
| Personal preferences | Per-user settings (time zone, language, notifications, theme) reachable from the profile menu |
| Time zone (personal) | A personal preference controlling how dates/times display to that user only, not instance-wide |
| Role-gated | Restricted to users holding a specific role, such as most of System Properties |

## Check yourself

Without looking back: a new agent complains that incident timestamps "look wrong" on their
screen. Is that most likely a system setting or a personal preference, where would they go to fix
it, and why does that distinction matter before anyone touches System Properties?
