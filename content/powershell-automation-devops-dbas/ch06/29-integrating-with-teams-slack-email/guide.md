# Integrating With Teams, Slack & Email

A threshold check that never notifies anyone isn't alerting, it's just logging. This lesson
covers the delivery side — actually getting the message from a PowerShell script to a human,
through the channels most teams already use: an incoming webhook for Teams or Slack, or email
where that's still the right fit.

## What you'll learn

- The real webhook pattern for posting a message to Teams or Slack from PowerShell
- Why `Send-MailMessage` is genuinely obsolete in modern PowerShell, and what to reach for
  instead
- Why webhook delivery is usually the more reliable default for automated alerts today

## The webhook pattern

Both Microsoft Teams and Slack support incoming webhooks — a unique URL that, when you `POST` a
JSON payload to it, posts a message into a specific channel. No SMTP server, no mailbox
credentials to manage, just an HTTP call:

```powershell
$webhookUrl = 'https://your-org.webhook.office.com/webhookb2/...'

$payload = @{
    text = "Backup verification failed for Sales on SQLPRD01"
} | ConvertTo-Json

Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $payload -ContentType 'application/json'
```

`Invoke-RestMethod` is a genuinely standard PowerShell cmdlet for this — it's the same tool
you'd use to call any REST API, and a chat webhook is just a REST API with one endpoint. The
exact JSON shape Teams or Slack expects varies by platform and by how richly you want the
message formatted (Teams supports "adaptive cards" for richer layouts; Slack has its own
block-based format), but the pattern — build a JSON payload, POST it to the webhook URL — is
the same either way.

## `Send-MailMessage` is genuinely obsolete

If you've seen older DBA scripts send email alerts, they very likely used `Send-MailMessage`.
It's worth being honest about where that command stands now: Microsoft has marked
`Send-MailMessage` as obsolete in modern PowerShell because it doesn't support current secure
authentication methods that most mail providers now require, and it isn't being actively
developed further. It isn't necessarily removed from PowerShell entirely, but new scripts
shouldn't be built around it.

The realistic modern replacements are calling a transactional email API directly (many mail
providers, including ones already used elsewhere in this catalog for the platform itself, expose
a REST API you can call the same way as a chat webhook), or using a dedicated .NET mail library
like MailKit from PowerShell for full SMTP control. Which one fits depends on what your
organization already has in place — the honest takeaway is simply: don't build new
`Send-MailMessage` scripts, and know that a modern alternative exists.

## Why webhooks are usually the better default now

For DBA alerting specifically, a chat webhook tends to be the more reliable choice day to day:
it doesn't depend on SMTP relay configuration or mailbox credentials that can expire, it lands in
a channel the whole on-call team already watches instead of one person's inbox, and it's a
single `Invoke-RestMethod` call — genuinely less to maintain than an email pipeline. Email still
has its place for lower-urgency, non-actionable summaries, but for "something just broke," a
webhook into the channel the team is already watching gets seen faster.

## Key terms

| Term | Meaning |
|---|---|
| Incoming webhook | A unique URL that posts a message into a Teams/Slack channel when a JSON payload is POSTed to it |
| `Invoke-RestMethod` | Standard PowerShell cmdlet for calling REST APIs, including chat webhooks |
| `Send-MailMessage` | Obsolete PowerShell cmdlet for sending email; lacks support for current secure auth methods |

## Check yourself

Why is `Invoke-RestMethod` posting to a Teams or Slack webhook considered the same category of
operation as calling any other REST API, rather than something special-purpose?
