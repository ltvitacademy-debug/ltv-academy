# Lesson 11 — Automated Enrichment: Adding Context Before a Human Looks

**Chapter 3 · Building SOAR Playbooks · Lesson 3 of 4**

## What you'll learn

- Why enrichment — not containment — is where most SOAR value actually
  shows up, day to day
- Three concrete, high-value enrichment data points: user risk score,
  asset criticality, and geo-IP on an entity's IP address
- How to pull each one with real KQL and a real Microsoft Graph call, and
  write the result back onto the incident as a comment
- How to extend the playbook from Lesson 10 so enrichment runs
  automatically, before anyone opens the incident

## Why enrichment is the highest-leverage automation

Containment gets the attention, but enrichment is where automation pays
for itself every single day. A typical analyst opening a fresh incident
spends the first several minutes just answering: *who is this user, how
risky are they historically, what does this asset actually run, and where
is this IP really coming from?* None of that requires judgment — it's
retrieval. Automating retrieval means the analyst's first look at the
incident already has the answer, and their judgment goes toward the
actual decision instead of the lookup.

## Enrichment point 1: user risk score

Microsoft Entra ID Protection maintains a **user risk score** — a
classification (low/medium/high) built from sign-in patterns, leaked
credential matches, and anomaly detections. You can query it with KQL
against the `AADUserRiskEvents` table if it's ingested into your
workspace's Log Analytics:

```kql
AADUserRiskEvents
| where TimeGenerated > ago(30d)
| where UserPrincipalName == "{incident_user_upn}"
| summarize LatestRiskLevel = arg_max(TimeGenerated, RiskLevel, RiskDetail)
```

This pulls the account's most recent risk classification and the specific
detail behind it (impossible travel, leaked credentials, anonymous IP
address). A user already flagged high risk for an unrelated reason changes
how urgently this incident deserves attention.

## Enrichment point 2: asset criticality

Not every host is equally important. If your organization maintains an
asset inventory — even something as simple as a Log Analytics watchlist
mapping hostnames to a criticality tier — a playbook step can look it up:

```python
# Called from the playbook's Python-based enrichment step
# (an Azure Function invoked over HTTP from the Logic App)
import requests

def get_asset_criticality(hostname: str, api_base: str, token: str) -> str:
    resp = requests.get(
        f"{api_base}/assets/{hostname}",
        headers={"Authorization": f"Bearer {token}"},
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    return data.get("criticality", "unknown")  # e.g. "tier-1-domain-controller"
```

An incident touching a workstation and an incident touching a domain
controller are not the same incident, even if every other signal looks
identical. Surfacing criticality automatically means that difference is
visible in the first ten seconds, not discovered twenty minutes in.

## Enrichment point 3: geo-IP on entity IP addresses

For any IP entity on the incident, a quick geolocation lookup flags
whether the source is plausible for that user or wildly out of pattern:

```python
import requests

def geo_lookup(ip: str, api_base: str, api_key: str) -> dict:
    resp = requests.get(
        f"{api_base}/ip/{ip}",
        params={"key": api_key},
        timeout=10,
    )
    resp.raise_for_status()
    j = resp.json()
    return {"country": j.get("country"), "city": j.get("city"), "isp": j.get("isp")}
```

Combine this with the user's typical sign-in geography (available from
`SigninLogs` in the same workspace) and you get a real "is this consistent
with how this person normally signs in" signal, computed automatically
instead of by an analyst mentally comparing two screens.

## Writing enrichment back onto the incident

All three enrichment calls land in the same place: a comment on the
incident, added the same way Lesson 10's `Add_comment_to_incident` action
did, but now with real content instead of a placeholder string:

```json
{
  "message": "Automated enrichment:\n- User risk: High (impossible travel, 2026-10-26)\n- Asset criticality: tier-1 (domain controller)\n- Source IP: 185.xx.xx.xx -- Country: RO (user's typical sign-in country: US)"
}
```

That's the entire point of this lesson: nothing here decided anything.
It assembled facts and wrote them where a human will see them first.

## Key terms

| Term | Meaning |
|---|---|
| User risk score | Entra ID Protection's low/medium/high classification of an account, built from sign-in anomalies and credential-leak signals |
| Asset criticality | A tier describing how important a given host or system is, pulled from an asset inventory or watchlist |
| Geo-IP enrichment | Resolving an IP entity to a country/city/ISP and comparing it against the user's normal sign-in geography |
| Enrichment comment | The automation's output written back onto the incident as a visible, timestamped note for the analyst |

## Check yourself

You're ready for Lesson 12 when you can explain why pulling a user risk
score and writing it onto an incident counts as automation, while deciding
to disable that user's account based on the score does not — and why that
distinction matters for what you build next.
