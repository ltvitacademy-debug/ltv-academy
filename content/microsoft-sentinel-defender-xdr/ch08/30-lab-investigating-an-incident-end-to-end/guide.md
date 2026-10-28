# Lesson 30 — Lab: Investigating an Incident End to End

**Chapter 8 · Capstone: End-to-End Detection and Response in Sentinel · Lesson 30 of 32**

## What you'll learn

- How to pick up the exact incident Lesson 29's impossible-travel rule created, starting from the
  incident queue (Lesson 21)
- How to read the investigation graph and an entity timeline to see what an account actually did
  (Lesson 22)
- How to run a hunting query to check whether the compromise reaches further than one account
  (Lesson 23)
- How to add a bookmark so the evidence survives past this session (Lesson 24)

## Starting point: the incident queue

Lesson 29's rule just fired for real. It shows up in Sentinel's **incident queue** as a **Medium**
severity incident titled something like "Impossible travel detected for user account," carrying
the two entities the rule mapped: an **Account** (`UserPrincipalName`) and two **IP address**
entities. Lesson 21 covered triage by severity — this one isn't a High, but an account logging in
from two countries forty minutes apart is exactly the kind of Medium that earns a full look rather
than a quick dismissal. Opening the incident is step one of every investigation in this course.

## Reading the investigation graph

Inside the incident, the **investigation graph** (Lesson 22) renders the Account and both IP
address entities as connected nodes, with the alert itself in the middle. Clicking the Account
node expands it to show every other alert and entity touching that same user — which is the whole
point of Lesson 29's entity mapping work paying off here. If this same account also triggered an
unrelated alert last week (an unfamiliar sign-in property, say), the graph surfaces that
connection automatically instead of requiring the analyst to go searching for it by hand. From the
graph, opening the **entity timeline** for the Account node lays out every sign-in, every alert,
and every related event for that user in chronological order — exactly where the two impossible
sign-ins sit relative to everything else that account has done recently.

## Checking for broader compromise with a hunting query

One compromised account is bad; a hunting query (Lesson 23) checks whether it's the only one. A
quick hunt against the same window, scoped to the IP addresses this incident flagged, answers the
real follow-up question — did either address touch any other account?

```
SigninLogs
| where TimeGenerated > ago(24h)
| where IPAddress in ("<ip_from_incident_1>", "<ip_from_incident_2>")
| summarize SignInCount = count() by UserPrincipalName, IPAddress
| order by SignInCount desc
```

If that query returns only the one user already in the incident, the scope stays contained. If it
returns three more accounts from the same IP, the investigation just grew — and this is exactly
the proactive check Lesson 23 built hunting queries for: looking for a pattern the scheduled rule
itself wasn't written to catch.

## Adding a bookmark

Whatever the hunting query returns, it's evidence worth keeping past this session. A **bookmark**
(Lesson 24) saves a query and its result set, tagged to this incident, so the next analyst — or
the analyst themselves, a week from now — doesn't have to re-run the hunt from memory. Bookmarking
the hunting query result here is what turns "I checked, it was fine" into a documented part of the
case file.

## Key terms

| Term | Meaning |
|---|---|
| Incident queue | Where every triggered alert lands, sorted by severity, from Lesson 21 |
| Investigation graph | A visual map of an incident's entities and their connections, from Lesson 22 |
| Entity timeline | A chronological view of everything one entity (e.g. an Account) has done, from Lesson 22 |
| Hunting query | A proactive KQL query run to check for a pattern a scheduled rule didn't catch, from Lesson 23 |
| Bookmark | A saved query and result set, tagged to an incident, from Lesson 24 |

## Check yourself

Why does the hunting query in this lesson scope to the two IP addresses from the incident, rather
than re-running Lesson 29's original impossible-travel query again?
