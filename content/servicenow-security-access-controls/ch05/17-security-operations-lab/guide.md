# Lesson 17 — Security Operations Lab

**Chapter 5 · Security Operations on the Platform · Lesson 17 of 24**

## What you'll learn

- How to apply Lesson 15's SIR phases and Lesson 16's VR correlation to one real, connected scenario
- How to reason through CMDB/CSDM-driven prioritization between two servers with the identical finding
- How to sketch what a related Security Incident record should look like once evidence suggests active exploitation
- Why Vulnerability Response and Security Incident Response are two stages of the same security story, not two unrelated tools

## The scenario

A quarterly vulnerability scan comes back and flags a Critical-severity CVE on exactly two
servers in the environment: one hosting an internal test environment used only by the QA team,
and one that's a production database server for the **Patient Scheduling** application — the
same business-critical system this path's Course 9 capstone modeled in the CMDB, mapped up to a
real Business Service that clinicians and patients depend on every day. Same CVE, same severity
score, two very different servers. Work through how Vulnerability Response should prioritize
this, and then — because evidence turns up during triage that one of these two servers shows
signs the vulnerability wasn't just present but already actively exploited — sketch what a
related Security Incident Response record should look like.

## Step 1 — what the scan alone tells you (and what it doesn't)

The scanner's output, on its own, is two lines that look nearly identical: the same CVE
identifier, the same Critical severity score, two different hostnames. If you prioritized by
scanner output alone, you'd have no principled reason to work one before the other — they're
tied. That's exactly the gap Lesson 16 covered: a raw scan result carries no business context,
only a technical fact. Before you can make a real prioritization decision, Vulnerability
Response needs to correlate each finding against the CMDB.

## Step 2 — CMDB correlation separates the two findings

Once `sn_vul` correlates each hostname to its real Configuration Item, the picture changes
completely. The first CI is tagged as supporting the QA team's internal test environment — no
production traffic, no real users, no Business Service relationship of consequence. The second
CI is tagged, through the CSDM relationships this path's CMDB & CSDM course built out, as the
primary database server underneath the Patient Scheduling Business Service — a system real
clinicians rely on to pull up real patient appointments every day. The CVE and the severity score
are identical. The business risk is not remotely close.

```
Finding A                          Finding B
CVE-2026-XXXX, Critical            CVE-2026-XXXX, Critical
CI: QA test server                 CI: Patient Scheduling prod DB
Business Service: none of weight   Business Service: Patient Scheduling
  -> remediate on normal cycle       -> remediate NOW, top of the queue
```

## Step 3 — the prioritization decision, and why it's the correct one

Vulnerability Response should — and would, if the CMDB and CSDM data behind it is populated and
current — surface Finding B as the one to fix first, ahead of Finding A, despite both carrying the
identical technical severity score. This is Lesson 16's whole point made concrete: the scanner
alone can't make this call, because the scanner never sees the Business Service relationship.
Only the CMDB correlation, backed by real CSDM modeling, can tell a security team "this one
supports something patients depend on; that one doesn't" — and that's the information that
actually should drive remediation order, not the raw CVE severity number taken in isolation.

## Step 4 — evidence of active exploitation changes the picture again

Partway through triage, the security team finds log evidence that the Patient Scheduling
database server's vulnerability wasn't just present — it looks like it was already exploited: an
unexpected outbound connection, a process that shouldn't be running, a login from an unfamiliar
location around the time the CVE would have become exploitable. At that point this stops being
purely a Vulnerability Response problem. A real exploitation event, confirmed or strongly
suspected, is exactly the trigger for opening a **Security Incident Response** record, because
Lesson 15's distinction now applies directly: this is no longer just "a weakness we should patch,"
it's "we may have already been compromised."

## Step 5 — sketching the Security Incident record

The new SIR record would reference the same CI and the same CVE the VR finding already
identified — the two applications sharing that context is exactly why VR and SIR live on the same
platform rather than in two disconnected tools. Its state starts in Analysis while the team
confirms what actually happened, then moves to **Containment** immediately given the evidence:
isolating the affected server from the network, rotating any credentials the server had access
to, blocking any suspicious outbound connection at the firewall — all before eradication even
starts. Only once eradication (removing whatever let the attacker in, confirming no backdoor
remains) and recovery (restoring the server from a verified-clean state, monitored closely) are
both complete does the SIR record move toward Review — the structured post-incident lesson about
how this CVE sat unpatched long enough to be exploited on a system this critical in the first
place, feeding directly back into tightening the remediation timelines Vulnerability Response
enforces for Business-Service-critical CIs going forward.

## Key terms

| Term | Meaning |
|---|---|
| CMDB correlation | Matching a scan finding to its real Configuration Item, turning a bare CVE-and-hostname pair into something with business context |
| Business-Service-driven prioritization | Using CSDM's service relationships, not raw severity scores alone, to decide real remediation order |
| Exploitation evidence | Signs a vulnerability wasn't just present but actually used by an attacker — the trigger for opening a Security Incident |
| VR-to-SIR handoff | The same CI and CVE context carrying over when a vulnerability finding escalates into a confirmed security incident |

## Check yourself

Before moving to Chapter 6, make sure you can answer all of it without notes: why do two
identical-CVE, identical-severity findings get different remediation priority in this scenario;
what specific CMDB/CSDM relationship is doing that work; what evidence turns this from a VR
problem into a SIR problem; and what should the newly opened Security Incident record's first
real action be, and why that action and not recovery first.
