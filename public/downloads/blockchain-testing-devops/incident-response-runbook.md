# On-Chain Incident Response Runbook (Template)

Built from Chapter 5 (Monitoring & Incident Response). Fill in the
bracketed sections for your own protocol before you need this for real —
the whole point of Lesson 24 is that a pause mechanism should be rehearsed,
not improvised during an actual incident.

## 1. Severity routing (Lesson 23)

| Severity | Example trigger | Destination |
|---|---|---|
| Info | Routine threshold check, within normal range | Email digest |
| Warning | Unusual but not clearly malicious activity | Slack/Discord channel |
| Critical | Suspicious withdrawal pattern, failed-transaction spike on a core function | PagerDuty / on-call rotation |

Route by severity, not uniformly — a Critical alert buried in an email
inbox defeats the point of having severity levels at all.

## 2. First action: confirm, don't assume (Lesson 24)

When an alert fires:

1. Open the alert's detail view. Confirm exactly what fired, on which
   contract, on which network.
2. Decide: real incident, or false positive/noisy rule? If noisy, disable
   the rule *after* this incident is resolved, not mid-response.
3. If real: pull the full alert history for this contract, not just the
   latest firing. This becomes the raw timeline for the postmortem
   (Section 4).

## 3. Decide whether to pause (Lesson 24)

- [ ] Confirm who holds pause authority — per the pre-launch checklist,
      this should be a multisig, never a single engineer's key.
- [ ] Trigger the pause if active damage is ongoing. Remember what a
      pause does **not** do: funds already moved stay moved. A pause
      stops new damage; it does not undo old damage.
- [ ] Communicate the pause publicly within a committed timeframe (see
      the sample message below) — do not claim the issue is "already
      fixed" before it's confirmed.

**Sample first public message:**

> "We've identified unusual activity on [contract] and have paused
> [affected function(s)] as a precaution while we investigate. No user
> action is needed right now. We'll post an update within [commit to a
> real timeframe, e.g. 1 hour]."

## 4. Postmortem (Lesson 25 — fill in after resolution)

- **Timeline** (from the alert history pulled in Step 2):
- **Root cause**:
- **Impact** (funds/users affected, quantified):
- **What the pre-launch checklist or CI gates did or didn't catch**:
- **Action items** (each with an owner and a date, not "we'll look into it"):

## Checklist before you ever need this for real

- [ ] Pause mechanism has been triggered once in a rehearsal, by the
      people who'd actually need to pull it.
- [ ] Every severity tier's alert destination has been test-triggered and
      confirmed to actually notify someone.
- [ ] This runbook itself has been reviewed by everyone on pause-authority
      multisig, not just the person who wrote it.
