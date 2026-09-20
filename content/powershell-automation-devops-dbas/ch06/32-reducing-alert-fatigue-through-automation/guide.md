# Reducing Alert Fatigue Through Automation

Everything this chapter has built so far can make alert fatigue worse if it's not tuned
carefully. A script that fires a notification on every single blip trains the on-call team to
ignore notifications entirely, which defeats the entire point of building automated alerting in
the first place. This closing lesson is about the discipline that keeps automation from
becoming noise.

## What you'll learn

- Why thresholds should come from real baseline data, not a guessed round number
- The real practice of suppressing duplicate alerts for a condition that's already known
- Why escalation should wait for an actual pattern, not the first single occurrence

## Thresholds should come from real baselines, not guesses

The SQL Server Performance Tuning course covers establishing a real performance baseline —
recording what "normal" actually looks like for a specific server under its specific real
workload, rather than assuming a generic number applies everywhere. Alerting thresholds should
be built the same way:

```powershell
# Guessed, generic, and probably wrong for this specific server:
if ($cpuPercent -gt 80) { Send-AlertNotification -Message "High CPU" }

# Grounded in this server's own actual baseline data:
$baselineCpu = Get-Content '\\fileshare\baselines\sqlprd01-cpu-baseline.json' |
    ConvertFrom-Json
if ($cpuPercent -gt ($baselineCpu.P95 * 1.25)) {
    Send-AlertNotification -Message "CPU 25% above this server's own P95 baseline"
}
```

A server that normally runs at 85% CPU during its nightly batch window doesn't need an alert at
80% — that's just Tuesday. A threshold set from that server's own real historical data catches
genuine anomalies instead of firing constantly on expected behavior.

## Suppressing duplicate alerts

A condition that's still true five minutes after it first fired doesn't need five more separate
notifications in that same window — it needs the team to already know about the one that fired.
A simple, real suppression pattern tracks whether an alert for this specific condition already
fired recently before sending another:

```powershell
$alertKey = "SQLPRD01-LowDiskSpace-D"
$recentAlert = Get-Content $stateFilePath -ErrorAction SilentlyContinue |
    ConvertFrom-Json | Where-Object { $_.Key -eq $alertKey -and $_.FiredAt -gt (Get-Date).AddHours(-1) }

if (-not $recentAlert) {
    Send-AlertNotification -Message "Low disk space on SQLPRD01 D:"
    # ...record this alert firing, keyed by $alertKey, with the current timestamp
}
```

This is genuinely simple state-tracking, not a specialized product — a file, a table, or even
an in-memory cache the script checks before firing, keyed by the specific condition so the same
problem doesn't spam the channel every time the script runs.

## Escalate on a pattern, not the first blip

A single slow query or one momentary CPU spike is often just noise — transient, self-resolving,
not worth waking anyone up over. The honest practice is to require a real pattern before
escalating: the same condition recurring across several consecutive checks, or persisting past
a meaningful duration, rather than treating every single sample above a line as equally urgent.

## Key terms

| Term | Meaning |
|---|---|
| Alert fatigue | The point at which a team starts ignoring alerts because too many have been low-value or false |
| Baseline-derived threshold | An alerting threshold set from a specific server's own real historical data, not a generic guess |
| Alert suppression | Tracking whether an alert for a specific condition already fired recently before sending it again |

## Check yourself

Why does a threshold set from a specific server's own real baseline data catch genuine anomalies
better than a generic, guessed number like "alert if CPU is over 80%"?
