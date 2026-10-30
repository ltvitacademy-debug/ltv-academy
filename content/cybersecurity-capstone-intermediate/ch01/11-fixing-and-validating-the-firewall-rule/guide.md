# Lesson 11 — Fixing and Validating the Firewall Rule

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 11 of 16**

## What you'll learn

- How to narrow an in-production firewall rule's scope without breaking the legitimate traffic it serves
- Why a change like this goes through a change ticket, even when the fix itself is small
- Why you test two things, not one: that real traffic still works, and that traffic that shouldn't match now doesn't
- What a validated fix looks like in the logs, not just in the rule editor

## Scoping the change

With Owen's sign-off on a short change ticket, Mara edits `ALLOW-VENDOR-RDP-SUPPORT` (`FW-0231`)
and replaces its configured source — `198.51.0.0/16` — with the vendor's actual documented range:
**`198.51.100.16/28`**. That's the entire fix. No new rule, no new port, no change to what the
rule is *for* — only a correction to how wide it was ever supposed to reach.

## Why a change ticket, for a one-line edit

It's tempting to treat a scope correction like this as too small to formalize. It isn't. This
exact rule is the one that caused the incident, which means any edit to it deserves a second set
of eyes and a recorded justification before it goes live — the same discipline the new control in
Lesson 12 will make standard for every future rule change, not just this one.

## Test 1: the vendor's real connection still works

Mara coordinates a scheduled test connection from the vendor's actual address inside the new
range, `198.51.100.22`, and confirms in `CommonSecurityLog`:

```kql
CommonSecurityLog
| where TimeGenerated > ago(1h)
| where DestinationPort == 3389
| where SourceIP == "198.51.100.22"
| project TimeGenerated, SourceIP, DestinationIP, DestinationPort, DeviceAction
```

`DeviceAction == "Allow"`. The vendor's legitimate support path is untouched by the fix — exactly
what should happen, since `198.51.100.22` still falls inside the corrected `/28`.

## Test 2: traffic from the old, too-broad range no longer matches

The first test alone isn't proof the fix worked — it only proves the fix didn't break anything.
Mara runs a second, controlled test connection attempt from an address that was inside the old
`198.51.0.0/16` but is **not** inside the vendor's real `198.51.100.16/28` — the same kind of
address that matched at 3 AM:

```kql
CommonSecurityLog
| where TimeGenerated > ago(1h)
| where DestinationPort == 3389
| where SourceIP == "198.51.212.77"
| project TimeGenerated, SourceIP, DestinationIP, DestinationPort, DeviceAction
```

`DeviceAction == "Deny"`. That's the result that actually confirms the fix. If this second test
had also come back `Allow`, the rule edit wouldn't have taken effect, or Mara would have scoped it
wrong, and the real exposure would still exist.

## Why both tests matter

A fix that only gets tested one way is half-validated. Confirming the vendor still connects proves
you didn't break production. Confirming the old broad range is now denied proves you actually
closed the gap. Either test alone would have let a bad fix look successful.

## Key terms

| Term | Meaning |
|---|---|
| Change ticket | A recorded, approved request documenting a production change before it's made |
| Scope correction | Narrowing a rule's configured address range without changing its purpose |
| Positive test | Confirming legitimate traffic still succeeds after a change |
| Negative test | Confirming traffic that should now be blocked actually is |

## Lab

Write both KQL checks you'd run immediately after a firewall rule's scope is narrowed: one
confirming the legitimate source still gets `Allow`, and one confirming a source outside the new,
narrower range gets `Deny`. State what each result would mean if it came back the opposite way.

## Check yourself

You're ready for Lesson 12 when you can name the two distinct tests this fix required and explain
why confirming the fix needs both — not just one.
