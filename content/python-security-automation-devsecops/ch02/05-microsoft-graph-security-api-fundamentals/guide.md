# Lesson 1 — Microsoft Graph Security API Fundamentals

**Chapter 2 · Automating with Security APIs · Lesson 1 of 4**

## What you'll learn

- What the Microsoft Graph Security API actually is, and why it exists as a
  *unified* layer on top of Defender XDR, Sentinel, and other Microsoft
  security products
- The shape of the unified alert (`alerts_v2`) and incident schemas, and the
  evidence types attached to each alert
- How to authenticate to Graph with an Azure AD app registration and the
  client-credentials flow, using MSAL
- How to query alerts with `requests`, filter them with OData `$filter`, and
  page through results with `@odata.nextLink`

## Why a unified Security API

You've already pulled alerts and incidents out of Defender XDR and Sentinel
through their own portals. The Microsoft Graph Security API gives you one
programmatic surface — `graph.microsoft.com/v1.0/security/...` — that returns
alerts and incidents from Defender for Endpoint, Defender for Identity,
Defender for Office 365, Defender for Cloud Apps, and Microsoft Sentinel in a
**single, normalized schema**. Instead of writing separate parsers for five
products' five different alert shapes, you write one parser against one
schema, and the API backfills product-specific detail into a common set of
fields.

Two resources matter most for automation:

- **`/security/alerts_v2`** — individual alerts, each with a `severity`,
  `status`, `classification`, `serviceSource`, `detectionSource`, and an
  `evidence` array describing what was observed: `deviceEvidence`,
  `userEvidence`, `ipEvidence`, `fileEvidence`, `processEvidence`, and more.
- **`/security/incidents`** — a grouping of one or more correlated alerts
  into a single incident, with its own `severity`, `status`,
  `classification`, `determination`, `assignedTo`, and a nested `alerts`
  collection.

## Authenticating with MSAL and client credentials

Script-driven access uses an **app-only** token, not a signed-in user. You
register an app in Azure AD, grant it the application permissions
`SecurityAlert.Read.All` and `SecurityIncident.Read.All` (with admin
consent), and generate a client secret. MSAL then exchanges that secret for
an access token on the app's behalf — no user, no interactive login:

```python
import msal

TENANT_ID = "11111111-2222-3333-4444-555555555555"
CLIENT_ID = "66666666-7777-8888-9999-aaaaaaaaaaaa"
CLIENT_SECRET = "<client-secret-value>"
AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
SCOPE = ["https://graph.microsoft.com/.default"]

app = msal.ConfidentialClientApplication(
    CLIENT_ID, authority=AUTHORITY, client_credential=CLIENT_SECRET
)
result = app.acquire_token_for_client(scopes=SCOPE)
access_token = result["access_token"]
```

Note the scope: for app-only auth you always request `.default`, which tells
Azure AD to issue a token for whatever application permissions were already
granted and consented — you don't list individual Graph scopes here.

## Querying alerts with filtering and pagination

With a bearer token in hand, alerts and incidents are plain REST calls.
Graph applies OData query options, so `$filter` narrows results server-side
instead of pulling everything and filtering in Python:

```python
import requests

headers = {"Authorization": f"Bearer {access_token}"}
url = (
    "https://graph.microsoft.com/v1.0/security/alerts_v2"
    "?$filter=severity eq 'high' and status eq 'new'"
)

alerts = []
while url:
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    page = resp.json()
    alerts.extend(page.get("value", []))
    url = page.get("@odata.nextLink")  # None once you've paged through everything

print(f"Pulled {len(alerts)} new high-severity alerts")
```

The `while url:` loop is the pattern from the REST API lesson in Chapter 1
applied to a real Microsoft endpoint: Graph never returns more than a page
at a time, and `@odata.nextLink` is the cursor telling you whether there's
more to fetch. When it's missing from the response body, you're done.

## Reading the evidence array

The real payoff of the unified schema is `evidence`. Each entry has an
`@odata.type` discriminator telling you which kind of evidence it is, so a
script can pull out, say, every IP address an alert touched without caring
which underlying product generated the alert:

```python
def extract_ips(alert: dict) -> list[str]:
    ips = []
    for ev in alert.get("evidence", []):
        if ev.get("@odata.type", "").endswith("ipEvidence"):
            ips.append(ev.get("ipAddress"))
    return ips
```

That same shape — loop evidence, branch on `@odata.type`, collect the field
you need — is what you'll reuse constantly once you start correlating
Microsoft alerts against findings from other systems later in this chapter.

## Key terms

| Term | Meaning |
|---|---|
| `alerts_v2` | The Graph Security API's unified alert resource, normalized across Defender and Sentinel |
| `evidence` | An alert's array of observed artifacts (device, user, IP, file, process), each tagged with an `@odata.type` |
| Client-credentials flow | App-only OAuth 2.0 flow where MSAL exchanges a client secret for a token with no signed-in user |
| `@odata.nextLink` | The cursor URL Graph returns when a result set has more pages to fetch |

## Check yourself

You're ready for Lesson 2 when you can explain why the Graph Security API's
unified schema saves you work compared to querying Defender XDR and
Sentinel separately, and you can write, from memory, the pagination loop
that follows `@odata.nextLink` until it's `None`.
