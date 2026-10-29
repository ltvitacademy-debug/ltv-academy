# Lesson 24 — Reporting Zero Trust Progress to People Who Aren't Engineers

**Chapter 6 · Measuring Zero Trust Maturity · Lesson 24 of 4**

## What you'll learn

- Why a maturity score or a metric table, by itself, doesn't move an
  executive audience — and what has to wrap around it
- The three-part translation pattern: risk reduction, business
  impact, trend over time — instead of acronyms and tool names
- A worked example translating a technical finding into an
  executive-ready sentence, line by line
- A simple one-slide structure for a recurring zero trust progress
  update that survives a five-minute board or steering-committee slot

## Why the metrics alone don't land

Everything you built in Lessons 21–23 — pillar scores, documented
gaps, before/after outcome metrics — is necessary, and still not
sufficient, for an executive audience. A CFO or a board member does
not care, in the moment, what "phishing-resistant MFA" is or why
Advanced is better than Initial. They care about two things: is the
organization's exposure to a costly incident going down, and is the
money being spent on this program producing that result.

That means every number you report has to answer "so what" before
anyone asks it. "We improved from Initial to Advanced on the
Identity pillar" is a true, well-earned fact — and it is also, to a
non-engineer, close to meaningless on its own.

## The three-part translation pattern

Translate every technical finding through the same three questions:

1. **What risk went down, in plain terms?** Not "we deployed PAM" —
   "the number of accounts that could do catastrophic damage if
   compromised dropped by 98%."
2. **What's the business impact if this had *not* happened?** Frame
   the counterfactual concretely: "a single compromised account
   used to be able to reach nearly every system in the company;
   now it can reach almost none of them without triggering an
   alert within minutes."
3. **Is the trend moving the right direction, and how fast?** A
   single snapshot invites the question "is that good?" A trend
   line across quarters answers it without anyone having to ask.

## Worked translations

| Technical finding | Executive translation |
|---|---|
| "Standing domain admin accounts dropped from 200 to 3 via PAM/JIT" | "If an attacker steals one employee's credentials today, the number of systems they could immediately control dropped by over 98% — most access now has to be requested and expires in 30 minutes." |
| "MTTD for simulated lateral movement dropped from 4 days to 22 minutes" | "If an intruder gets a foothold, we now expect to detect them before they can move to a second system in almost all cases — previously, they had days to operate before anyone noticed." |
| "We're Advanced, not yet Optimal, on the Identity pillar" | "Our strongest identity controls now cover essentially all employees; the remaining gap is a known set of legacy systems and automated accounts, and closing it is the next funded milestone." |
| "15% of traffic verified vs. implicit trust, now 85%" | "Five out of six network connections used to be trusted automatically just because of where they came from. Now, five out of six are actively checked before access is granted." |

Notice the pattern: every translation keeps a real number, drops the
acronym, and states the risk or the counterfactual in a sentence a
non-technical reader can repeat back accurately five minutes later.

## A one-slide structure that survives a five-minute slot

For a recurring progress update, resist the urge to show the full
pillar-by-pillar scorecard — that belongs in an appendix for whoever
wants to dig in, not on the slide you're presenting live. Use one
slide with four fixed elements:

1. **Headline risk-reduction statement** — one sentence, the biggest
   number, translated. ("The blast radius of a single stolen
   credential has dropped by over 98% this year.")
2. **Trend line, not a snapshot** — the same one or two outcome
   metrics, tracked over the last 3–4 reporting periods, so the
   direction and pace are visible at a glance.
3. **What's funded next, and why** — tie the next milestone to the
   specific gap that's driving remaining risk, not to a generic
   "continue the zero trust journey."
4. **One sentence naming the biggest remaining exposure, honestly**
   — a program that only ever reports good news loses credibility
   the first time something goes wrong; naming the real gap
   yourself, before an auditor or incident does it for you, builds
   the trust that keeps the budget funded.

## Key terms

| Term | Meaning |
|---|---|
| Translation pattern | Risk reduction → business impact → trend, applied to every technical finding before it reaches a non-technical audience |
| Counterfactual framing | Describing what *would* be true without the control, to make an abstract risk reduction concrete |
| Headline risk statement | The single, plain-language sentence that leads an executive update, built from the strongest outcome metric |

## Check yourself

This closes Chapter 6. You're ready for Chapter 7 when you can take
any one finding from Lesson 23's metric table and translate it,
unprompted, into a sentence that states the risk reduction, the
business impact, and the trend — without using a single acronym.
