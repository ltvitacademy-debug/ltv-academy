# Lesson 1 — The Ask Becomes a Mandate: A Board-Level Security Review

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 1 of 26**

## What you'll learn

- The company and protagonist this capstone follows start to finish: Hartwell
  Regional Utilities, and Security Engineer Mara Voss
- Why a single real incident from your last project turned into a board-level
  security review, instead of staying a closed ticket
- The four things the board actually mandated, with budget and a named
  executive sponsor behind them
- Why "the board is now involved" changes the shape of the work, not just
  its size

## The company and where you left off

Hartwell Regional Utilities is a mid-size regional electric and water
utility. In the Intermediate-tier project, you worked as a Security Analyst
on Hartwell's SOC team: you connected firewall and Linux logs into Microsoft
Sentinel, built a cross-source correlation rule, and when that rule fired at
3 a.m., you traced a real alert back to a firewall rule that was far more
permissive than anyone had intended — a rule nobody had flagged until an
actual alert forced the question. You fixed it, validated the fix, and
briefed the IT Director and the Compliance Officer on what changed.

That work didn't stay contained to a single firewall rule. It got noticed.

## From a closed ticket to a board agenda item

A fixed misconfiguration should, in most organizations, end with an updated
runbook and a quiet sense of relief. At Hartwell, it did something else: it
became Exhibit A in a board-level security review. The reasoning, once it
reached the board, was blunt — if one overly broad rule, in one corner of
the network, sat undetected long enough to need a 3 a.m. alert to surface
it, what else looks like that? And more pointedly: Hartwell is a utility.
Its most consequential systems aren't email servers or file shares — they're
the operational-technology (OT) and SCADA systems that actually run
substations and water treatment. Nobody on the board wanted to find out the
hard way that similar gaps existed there.

You've also been promoted. The work from the Intermediate project is why:
you're no longer a SOC analyst doing detection and response. You're now a
**Security Engineer** — the person who designs and builds the controls, not
just the person who operates and triages them. That's a real shift, and
this capstone is built around what changes when it happens.

## Meet the sponsor: CISO Howard Okonjo

The review was commissioned by Hartwell's Chief Information Security
Officer, **Howard Okonjo**. Okonjo has been CISO for three years, reports
directly to the board's Audit and Risk Committee, and — critically for how
this capstone runs — he's the one who put his name behind the budget request
that came out of the review. Every lesson in this capstone that touches
scope, budget, or a board update runs through Okonjo. He is not a background
character; he is the executive sponsor whose credibility is attached to
whether this program delivers.

## What the board actually mandated

The review didn't conclude with a vague "do better." It produced four
specific, funded workstreams, and Okonjo asked for all four:

1. **A zero-trust network segmentation pilot.** Not a full enterprise
   rollout — a scoped pilot, targeting the network boundary where a gap
   would matter most. (Lesson 2 scopes exactly which boundary that is.)
2. **A consolidated identity view across both clouds.** Hartwell runs
   identity in Azure AD (Entra ID) and separately in AWS IAM, with no single
   place to answer "who can get to what." The board wants one view.
3. **Python-based security automation.** Manual access reviews don't scale
   and don't run on a schedule a human reliably remembers. The board wants
   an automated, repeatable inventory process — not another spreadsheet.
4. **A formal GRC risk register.** Findings from the pilot, the identity
   consolidation, and the automation all need to land somewhere durable,
   with an owner and a status, instead of living in Slack threads and
   closed tickets.

The board approved a **Phase 1 budget of $340,000** and gave the program
**90 days** to deliver a working pilot and report back — which is why
Lesson 20, much later in this capstone, is literally "Presenting to the
Board." Everything between here and there has to be built with that
deadline and that audience in mind.

## Why "the board is involved" changes the job

As a SOC analyst, your audience was mostly technical: other analysts, the IT
Director, a Compliance Officer who wanted a specific follow-up answered. A
board-level mandate adds a different kind of pressure. The board doesn't
want to see a firewall rule — it wants evidence that the *process* which
missed the first gap has actually changed. That's a higher bar than fixing
one thing. It means every deliverable in this capstone — the segmentation
design, the identity consolidation, the automation script, the risk
register — has to be built so it can be explained to Okonjo, and through
him, to people who have never configured an NSG or read an IAM policy
document in their life.

## Key terms

| Term | Meaning |
|---|---|
| OT/SCADA | Operational technology and the Supervisory Control and Data Acquisition systems that run physical infrastructure like substations and water treatment |
| CISO | Chief Information Security Officer — Hartwell's is Howard Okonjo, the executive sponsor of this program |
| Zero-trust segmentation pilot | A scoped first rollout of zero-trust network controls on one high-stakes boundary, rather than the whole enterprise at once |
| GRC risk register | A formal, owned record of identified risks, their status, and remediation — Governance, Risk, and Compliance's core artifact |

## Lab

1. Write one sentence summarizing the incident from the Intermediate project
   that triggered this review — the overly broad firewall rule found after
   a 3 a.m. alert — in language a board member with no technical background
   could follow.
2. List the four funded workstreams the board mandated, in order, and next
   to each one write who at Hartwell is accountable for it reaching the
   board in 90 days.
3. Note the budget and the deadline. You'll need both again when this
   capstone reaches the board presentation in Lesson 20.

## Check yourself

You're ready for Lesson 2 when you can name all four of the board's
mandated workstreams without looking, explain why a fixed firewall rule
escalated all the way to the board, and say who Howard Okonjo is and why his
name is attached to this program's budget.
