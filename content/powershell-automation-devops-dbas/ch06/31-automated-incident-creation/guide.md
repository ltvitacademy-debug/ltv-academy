# Automated Incident Creation

A notification in a chat channel is easy to miss during a busy shift. A real ticket in the
system your team already tracks work through is harder to lose. This lesson covers the last
step in the alerting chain: a script that doesn't just notify, it opens an actual incident.

## What you'll learn

- The real pattern of calling a ticketing system's REST API to create an incident automatically
- Why this is described as a category (ticketing systems generally) rather than one specific
  product's exact API
- What information a good automated incident actually needs to be useful, not just present

## The real pattern: script calls ticketing API

Most modern ticketing and incident-management systems — ServiceNow and Jira are two widely used
real examples, though this lesson deliberately doesn't lock to either one's exact current API
shape — expose a REST API for creating a ticket. The PowerShell side of this looks structurally
identical to the Teams/Slack webhook from Lesson 29: build a payload, `POST` it, get back a
ticket reference.

```powershell
$incidentPayload = @{
    short_description = "Backup verification failed for Sales on SQLPRD01"
    urgency           = 2
    category          = "database"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri $ticketingApiUrl -Method Post `
    -Headers $authHeaders -Body $incidentPayload -ContentType 'application/json'

Write-Output "Created incident: $($response.result.number)"
```

The exact field names (`short_description`, `urgency`, and so on) and authentication approach
differ by product and by how your organization's instance is configured — this is genuinely a
"read your own ticketing system's API documentation" step, not something this course can specify
generically and have it be accurate for every reader. What's stable across products is the
shape: authenticate, POST a structured payload, get a ticket ID back that you can log or relay
into the chat notification from Lesson 29.

## What a good automated incident actually needs

Creating a ticket that just says "something is wrong" isn't much better than the chat
notification alone. A useful automated incident includes the specifics the responder needs
without having to log into the server first:

- Which instance and which check failed, specifically (not just "a check failed somewhere")
- The actual metric value that crossed the threshold, and what the threshold was
- A timestamp, so whoever picks it up knows if this is fresh or already stale
- Enough context to triage severity without re-running the check manually

```powershell
$incidentPayload = @{
    short_description = "Disk space critical: SQLPRD01 D: at 6% free (threshold 10%)"
    urgency           = 1
} | ConvertTo-Json
```

The second example is a genuinely more useful incident than the first — it tells the responder
exactly what's wrong and how bad it is, in the title alone.

## Key terms

| Term | Meaning |
|---|---|
| Ticketing/incident-management system | A category of tools (e.g. ServiceNow, Jira) that track incidents as tickets with a REST API for creation |
| Incident payload | The structured data (description, urgency, category) sent to create a ticket |
| Ticket reference/ID | The identifier a ticketing API returns after successfully creating an incident |

## Check yourself

Why does this lesson describe ticketing-system integration as "read your organization's own API
docs" rather than giving one universal code sample that works for every ticketing product?
