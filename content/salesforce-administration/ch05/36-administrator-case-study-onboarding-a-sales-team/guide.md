# Administrator Case Study: Onboarding a Sales Team

**Chapter 5 · Administration in Practice · Lesson 36 of 36**

This is the last lesson of the course, and it doesn't introduce anything new. Instead, it walks
through one realistic scenario — onboarding a new sales team — and traces exactly which settings
from Chapters 1 through 5 an admin actually reaches for, in order, to make it happen. The company
below is fictional, built only to make the walkthrough concrete.

## The scenario

**Meridian Fixtures Co.**, a fictional mid-size lighting distributor, is hiring six new Business
Development Reps to launch an outbound sales team. They start in two weeks. The admin — just one
person, no dedicated Salesforce team — has to get all six fully productive on day one, without
breaking anything for the 40 existing users already in the org.

## Step 1 — Users and access (Chapter 1)

Before anything else, the six reps need to exist in the system with the right access, and nothing
more:

- **Create the six users** with the correct license type — a Salesforce license, not a cheaper
  Chatter-only or platform license that wouldn't support full Sales Cloud access.
- **Assign the existing "BDR" profile** (already built from a previous hiring round) rather than
  building a new one from scratch — reusing a known-good profile is safer than improvising.
- **Add two permission sets**: one for the team's shared outbound-dialer tool, one for access to a
  specific "New Logo" record type most other profiles don't need.
- **Set login hours and IP restrictions** matching the rest of the sales org — no reason for this
  team's access window to differ from everyone else's.
- Skip delegated administration entirely here — six reps on one standard profile doesn't justify
  a separate delegated group; that's a tool for a different kind of scaling problem.

## Step 2 — Org configuration the reps will actually touch (Chapter 2)

- Confirm the reps' time zone and locale match **Business Hours** already configured for the sales
  org, so escalation and SLA timers behave correctly from day one.
- Add the team to the existing **Sales Console app** rather than building a new app — one more
  app to maintain is one more thing that can drift out of sync with the real Sales app over time.
- Pin the **Utility Bar**'s existing macros and dialer panel to their console — already built,
  just needs to be visible to this new profile.

## Step 3 — Objects and layouts tuned for outbound work (Chapter 3)

- Assign the **"New Logo" Record Type** created for this launch, with its own **page layout**
  showing outbound-specific fields (Lead Source Detail, Dialer Campaign) near the top instead of
  buried below fields this team won't use.
- Add a **Dynamic Related List**, filtered to open Opportunities only, so a reused Account from
  a past deal doesn't bury today's live pipeline under old closed-lost records.
- Turn on **Field History Tracking** for the Lead Status field specifically — the one field
  leadership wants visibility into for this new team's ramp-up, without tracking everything.

## Step 4 — Keeping them informed without extra admin work (Chapter 4)

- Point the team at the existing **"New BDR Outreach" email template and letterhead** — no new
  branding work required, just reuse what's already built.
- Confirm **Chatter** is on for the records they'll work, so reps can tag a sales manager on a
  live deal without leaving the record.
- Leave **Email-to-Case** untouched — this team doesn't handle support cases, so there's nothing
  here for them to configure.

## Step 5 — Testing it before day one (Chapter 5)

- Build the profile, permission set, and record type changes in a **sandbox** first, not
  production — even though this feels like a routine change, it still touches a shared Account
  page layout other teams use.
- Move the tested changes with a **Change Set**.
- Check **Release Updates** for anything scheduled to activate in the next two weeks that could
  affect Lead conversion or assignment rules this team will depend on immediately.
- On day one, spot-check **Login History** to confirm all six reps successfully logged in — the
  fastest way to catch a licensing or access mistake before a rep has to ask for help.

## Why this matters

None of these five steps required a feature this course hasn't already covered. What the case
study demonstrates is the order and judgment: access before configuration, configuration before
object-level tuning, and testing before any of it touches the shared org forty other people
already rely on. That sequencing — not any single setting — is what "ready for day one" actually
depends on.

## Key terms

| Term | Meaning |
|---|---|
| Known-good profile | Reusing an already-built, already-tested profile instead of creating a new one from scratch |
| Record Type + page layout pairing | Shaping what a specific team sees, without affecting every other user on the object |
| Day-one verification | Checking Login History (and similar tools) right after a rollout to catch access problems immediately |

## Check yourself

Why did the admin in this case study choose to reuse the existing "BDR" profile and email
template rather than building new ones for the six new reps?

---

*This closes Salesforce Administration. The next course in the Salesforce Administrator path is
**Security & Access Fundamentals**, going deeper into the sharing model, security architecture,
and access controls this course only touched on at the admin level.*
