# Lesson 6 — Incident Response Playbooks for Common Scenarios

**Chapter 2 · Preparation: Building an IR Plan · Lesson 6 of 32**

## What you'll learn

- How a playbook differs from the overall IR plan: a specific, pre-thought-out response
  sequence for one known scenario type, not the general process for any incident
- What a real ransomware playbook covers, including the isolation and backup-verification
  steps that get skipped under pressure if they aren't written down
- What a business email compromise (BEC) playbook covers, and why it includes financial
  controls, not just technical ones
- What data exfiltration and insider threat playbooks each need that the others don't

## A playbook is the plan, made specific

The IR plan from Lesson 5 covers the general process: classify, communicate, escalate, notify.
A **playbook** goes a level deeper — it's a specific, pre-thought-out sequence of steps for one
*known* scenario type, written before that scenario ever happens. The reasoning gets done in
advance, calmly, by people who have time to think it through, instead of live, under pressure,
by whoever happens to be on call. Most mature SOCs maintain a small library of playbooks for
their most common and most damaging scenario types.

## Ransomware

A ransomware playbook typically covers: isolating affected hosts from the network **without**
powering them off (powering off can destroy memory-resident evidence and, in some cases, trigger
further encryption); identifying the ransomware family, often via the ransom note or file
extension, to check if a decryptor exists; verifying backup integrity and isolation *before*
assuming backups are usable; and explicitly routing any ransom-payment decision through legal,
executives, and the cyber insurance carrier — never a unilateral technical call.

**Concrete example:** a ransom note appears on a file server at 9 a.m. The playbook's first line
is "isolate the host from the network; do not power it off." Step two is "check the note's
ransomware family against the IR retainer firm's known-decryptor list." Step three is "pull the
last three backup jobs and verify they completed and are not themselves encrypted" — a step that
gets skipped constantly when it isn't written down, because under pressure people assume
backups are fine.

## Business email compromise (BEC)

A BEC playbook covers resetting the compromised mailbox's credentials and MFA, auditing for
mailbox rules the attacker added (forwarding rules that silently copy mail to an outside
address are the classic sign), reviewing OAuth app grants on the account, and — critically —
notifying finance immediately to flag or claw back any fraudulent wire transfer the attacker
may have initiated by impersonating the compromised employee.

## Data exfiltration and insider threat

A data exfiltration playbook focuses on identifying *what* data left and *how* — cloud upload,
email, removable media — and preserving DLP and proxy logs before they roll off, since legal's
notification decision depends entirely on what was actually taken. An insider threat playbook
adds a step the others don't need: looping in HR and Legal **before** any technical action, since
tipping off the employee prematurely, or acting without proper authorization, can destroy both
the evidence and the organization's legal position.

## Key terms

| Term | Meaning |
|---|---|
| Playbook | A specific, pre-thought-out response sequence for one known incident scenario type |
| Business email compromise (BEC) | An incident where an attacker gains control of a legitimate email account, often to commit financial fraud |
| Data exfiltration | The unauthorized transfer of data out of an organization's systems |
| Insider threat | A security threat originating from someone with legitimate authorized access, such as an employee |
| Chain of custody | The documented handling of evidence so its integrity can be proven later, especially critical in insider cases |

## Check yourself

Why does an insider threat playbook require looping in HR and Legal *before* any technical
action, in a way that a ransomware playbook doesn't require for an external attacker?
