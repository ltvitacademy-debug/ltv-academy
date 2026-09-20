# Capstone: Add Monitoring & Alerting

The automation suite (Lesson 38) and the pipeline (Lesson 39) both reduce manual work,
but neither one tells Priya something is *wrong* the moment it happens. That's Chapter
6's job, and this lesson applies it to one real, specific alert scenario at Meridian
Outfitters: transaction log growth on `MeridianCommerce` during the nightly catalog
import.

## What you'll learn

- The real alert scenario: a nightly batch job that used to page Priya's phone for no
  good reason
- How `Send-MeridianAlert` — the helper Lesson 38's scripts already call — actually
  routes a message by severity
- How the thresholds are tuned so the alert is trustworthy instead of just loud

## The 2 AM page that meant nothing

Every night, a catalog import batch job loads new product data into `MeridianCommerce`,
and for a few minutes the transaction log fills up faster than normal — a completely
expected side effect of a large batch insert. Priya's first version of this alert
checked log usage every five minutes and paged her phone the instant it crossed 70%.
The batch job routinely pushed past that threshold for two or three checks before
clearing on its own. She was getting paged most nights for a condition that resolved
itself before she even opened her laptop.

## Detecting log space, for real

`DBCC SQLPERF(LOGSPACE)` is the real, built-in SQL Server command for checking
transaction log space usage per database. `Invoke-DbaQuery` (Lesson 1's dbatools
foundation, put to direct use) runs it and hands back a normal PowerShell object:

```powershell
function Test-MeridianLogSpace {
    param(
        [string]$SqlInstance     = "MERSQLPRD01",
        [int]$WarnPercent        = 70,
        [int]$CriticalPercent    = 90
    )

    $logSpace = Invoke-DbaQuery -SqlInstance $SqlInstance -Query "DBCC SQLPERF(LOGSPACE)" |
        Where-Object DatabaseName -eq 'MeridianCommerce'

    $pctUsed = $logSpace.'Log Space In Use (%)'

    if ($pctUsed -ge $CriticalPercent) {
        Send-MeridianAlert -Severity Critical -Channel Phone `
            -Message "MeridianCommerce log space at $pctUsed% on $SqlInstance"
    }
    elseif ($pctUsed -ge $WarnPercent) {
        Send-MeridianAlert -Severity Warning -Channel Teams `
            -Message "MeridianCommerce log space at $pctUsed% on $SqlInstance"
    }
}
```

## Send-MeridianAlert: routed by severity

The helper every script in this capstone already calls (Lesson 38) is where the routing
actually happens — `Info` and `Warning` post to a Teams channel via a webhook; only
`Critical` goes to the on-call paging service that actually rings Priya's phone:

```powershell
function Send-MeridianAlert {
    param(
        [ValidateSet('Info','Warning','Critical')][string]$Severity,
        [ValidateSet('Teams','Phone')][string]$Channel = 'Teams',
        [string]$Message
    )

    if ($Channel -eq 'Teams') {
        $body = @{ text = "[$Severity] $Message" } | ConvertTo-Json
        Invoke-RestMethod -Uri $env:MERIDIAN_TEAMS_WEBHOOK -Method Post `
            -Body $body -ContentType 'application/json'
    }
    else {
        Invoke-RestMethod -Uri $env:MERIDIAN_PAGER_WEBHOOK -Method Post `
            -Body (@{ message = $Message } | ConvertTo-Json)
    }
}
```

## Tuning it to stop paging for nothing

Two changes fixed the 2 AM false pages, and both matter more than the threshold numbers
themselves:

- **Sustained, not instant.** The check now requires log usage to stay at or above
  `WarnPercent` across several consecutive five-minute checks before firing at all — a
  brief spike during the batch job's peak insert no longer counts.
- **Severity-based routing.** Even a real, sustained `Warning` only posts to Teams, where
  Priya reviews it the next morning. Only `Critical` — sustained *and* over 90% — pages
  her phone directly. The nightly batch job almost never reaches that.

The result: nightly phone pages dropped from an almost-nightly occurrence to roughly one
real page every couple of weeks, and Teams warnings Priya can act on during business
hours instead of at 2 AM. That's the actual goal of reducing alert fatigue — not fewer
alerts for their own sake, but alerts Priya can trust enough to act on.

## Key terms

| Term | Meaning |
|---|---|
| `DBCC SQLPERF(LOGSPACE)` | Built-in SQL Server command reporting transaction log space usage per database |
| `Send-MeridianAlert` | The capstone's shared alerting helper — routes by severity to Teams or an on-call phone page |
| Sustained threshold | Requiring a condition to persist across multiple checks before alerting, instead of firing on one sample |
| Alert fatigue | The point at which too many low-value alerts cause real ones to get ignored or missed |

## Check yourself

Meridian's original alert paged on any single check above 70%. The tuned version
requires several consecutive checks above threshold, and separates `Warning` (Teams)
from `Critical` (phone). Which of those two changes did more to actually reduce alert
fatigue, and why might a team need both rather than just one?
