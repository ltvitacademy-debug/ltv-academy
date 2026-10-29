# Lesson 5 — What a Real Incident Response Plan Contains

**Chapter 2 · Preparation: Building an IR Plan · Lesson 5 of 32**

## What you'll learn

- Why an incident response plan is a reference document meant to be used *during* a crisis,
  not a binder that exists to satisfy an auditor
- The core components every real IR plan needs: scope, severity classification, a
  communication plan, escalation paths, a tool/access inventory, and notification requirements
- Why severity classification criteria have to be decided in advance, not improvised at 2 a.m.
- Why a plan that can't be followed under pressure is effectively no plan at all

## A plan is a tool for a bad night, not a shelf document

Plenty of organizations have an incident response plan that exists only to check a compliance
box — it was written once, approved, and filed away. A **real** IR plan is the opposite: it's a
reference document the team actually opens *while* an incident is happening, often at 2 a.m.,
under stress, with half the normal tools unavailable. That single fact drives every design
decision in a good plan — it has to be short enough to scan, specific enough to act on
immediately, and available even if the network it describes responding to is the same network
that's compromised.

## The core components

A real IR plan contains, at minimum:

- **Scope and objectives** — what counts as an "incident" at all, and what the plan is trying to
  achieve (contain damage, preserve evidence, meet legal obligations, restore operations)
- **Severity classification criteria** — a defined scale (e.g., SEV1–SEV4, or Low/Medium/High/
  Critical) with concrete criteria for each level, decided in advance
- **A communication plan** — exactly who gets notified, in what order, and within what time
  window, for each severity level
- **Escalation paths** — the specific thresholds and contacts for moving a decision up the chain
  when the on-call responder doesn't have the authority to make it alone
- **A tool and access inventory** — what systems, credentials, and out-of-band channels the team
  needs, and where to find them if normal infrastructure (email, Active Directory, Slack) is
  itself down or compromised
- **Legal and regulatory notification requirements** — the specific laws and contracts that
  create a deadline, such as GDPR's 72-hour notification window, state breach-notification
  statutes, HIPAA, PCI DSS, or SEC disclosure rules for public companies

**Concrete example:** a ransomware note appears on a file server at 2 a.m. The on-call analyst
doesn't debate what to do — the plan's severity criteria already say "ransomware with signs of
lateral movement = SEV1." The communication plan says SEV1 wakes the Incident Commander
immediately, the CISO within 30 minutes, and legal counsel within one hour. The tool inventory
points to an offline-stored admin credential vault, because the compromised network's own
password manager might be unreachable. If the attacker accessed customer PII, the legal
notification section already flags that the GDPR 72-hour clock, if it applies, starts now — not
once someone remembers to check.

## Key terms

| Term | Meaning |
|---|---|
| Incident response plan | A reference document defining how an organization detects, classifies, communicates about, and responds to security incidents |
| Severity classification | A predefined scale (e.g., SEV1–SEV4) with concrete criteria for how serious an incident is |
| Communication plan | The defined list of who is notified, in what order, and within what time window, per severity level |
| Escalation path | The specific threshold and contact for moving a decision to someone with more authority |
| Breach notification requirement | A legal or contractual deadline (e.g., GDPR's 72 hours) that is triggered by certain types of incidents |

## Check yourself

Why does severity classification need to be decided and written down *before* an incident
happens, instead of being judged case-by-case once something actually occurs?
