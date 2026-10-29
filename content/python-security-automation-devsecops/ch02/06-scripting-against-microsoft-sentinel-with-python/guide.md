# Lesson 2 — Scripting Against Microsoft Sentinel with Python

**Chapter 2 · Automating with Security APIs · Lesson 2 of 4**

## What you'll learn

- The two distinct Sentinel surfaces you'll script against: the Log
  Analytics **data-query API** (for running KQL) and the Sentinel
  **management REST API** (for incidents)
- How to authenticate with `azure-identity` and run a real KQL query from
  Python using the `azure-monitor-query` SDK
- How to list and update Sentinel incidents directly through
  `management.azure.com`, the same control plane the Sentinel portal itself
  calls
- Why these two surfaces have different data (log records vs. incident
  objects) and when you reach for each one

## Two different Sentinel APIs, two different jobs

It's easy to assume "the Sentinel API" is one thing. It isn't. You'll reach
for two separate surfaces, depending on what you're asking for:

- **The Log Analytics data-query API** runs **KQL** against the raw tables
  in your Sentinel workspace — `SecurityIncident`, `SecurityAlert`,
  `SigninLogs`, and so on. This is the same query language you already
  wrote by hand in the Sentinel portal's Logs blade; now you're sending it
  from Python.
- **The Sentinel management REST API** (under
  `management.azure.com/.../Microsoft.SecurityInsights/`) works with
  **incident objects** directly — list them, read one, update its status,
  severity, classification, or owner. This is the control-plane API the
  Sentinel portal itself uses when you click "Close incident."

Pick KQL when you need to analyze or aggregate raw log data. Pick the
incidents REST API when you're acting on a specific incident as an object —
closing it, reassigning it, tagging it.

## Authenticating once, using the token twice

Both surfaces authenticate the same way: an Azure AD app registration with
a client secret, exchanged for a token via `azure-identity`. The only
difference is which resource you request the token *for*.

```python
from datetime import timedelta
from azure.identity import ClientSecretCredential
from azure.monitor.query import LogsQueryClient, LogsQueryStatus

credential = ClientSecretCredential(
    tenant_id=TENANT_ID, client_id=CLIENT_ID, client_secret=CLIENT_SECRET
)
logs_client = LogsQueryClient(credential)

kql = """
SecurityIncident
| where TimeGenerated > ago(24h)
| where Severity in ("High", "Medium")
| project IncidentNumber, Title, Severity, Status, Owner
"""

response = logs_client.query_workspace(
    workspace_id=WORKSPACE_ID, query=kql, timespan=timedelta(hours=24)
)

if response.status == LogsQueryStatus.SUCCESS:
    table = response.tables[0]
    rows = [dict(zip(table.columns, row)) for row in table.rows]
    print(f"{len(rows)} incidents matched")
```

`LogsQueryClient` handles the token exchange internally — the same
`ClientSecretCredential` object works for any Azure SDK client, which is
the whole point of `azure-identity`: one credential object, reused across
every Azure service you script against.

## Working with incidents through the management REST API

Updating an incident — say, closing it with a classification — means
calling the management plane directly, since `azure-monitor-query` is
read-only against log data. You get a token scoped to
`https://management.azure.com/.default` and `PATCH` the incident resource:

```python
import requests

token = credential.get_token("https://management.azure.com/.default").token
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

incident_url = (
    f"https://management.azure.com/subscriptions/{SUBSCRIPTION_ID}"
    f"/resourceGroups/{RESOURCE_GROUP}"
    f"/providers/Microsoft.OperationalInsights/workspaces/{WORKSPACE_NAME}"
    f"/providers/Microsoft.SecurityInsights/incidents/{INCIDENT_ID}"
    f"?api-version=2024-03-01"
)

body = {
    "properties": {
        "status": "Closed",
        "classification": "TruePositive",
        "classificationComment": "Confirmed via automated enrichment pipeline",
    }
}

resp = requests.patch(incident_url, headers=headers, json=body, timeout=30)
resp.raise_for_status()
print(f"Incident {INCIDENT_ID} closed")
```

That same `credential.get_token(...)` pattern — requesting a token for a
*different* resource than the one `LogsQueryClient` used — is how one
Azure AD app registration ends up covering both surfaces, as long as it
holds the Sentinel Reader (or Contributor, for writes) role on the
workspace.

## Key terms

| Term | Meaning |
|---|---|
| Log Analytics data-query API | Runs KQL against raw workspace tables; read access to log records, not incident objects |
| Sentinel management REST API | The control-plane API under `management.azure.com` that lists and updates incident objects |
| `azure-identity` | The Azure SDK package providing one reusable credential object across every Azure service client |
| Resource scope | The target a token is requested for (`.default` on Graph vs. `management.azure.com/.default`), which determines what the token can call |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking, which of
the two Sentinel surfaces you'd reach for to answer "how many high-severity
incidents opened in the last day" versus "mark this specific incident
closed as a true positive" — and why those are different API calls.
