# Lesson 22 — Scoring Your Own Environment Against a Maturity Model

**Chapter 6 · Measuring Zero Trust Maturity · Lesson 22 of 4**

## What you'll learn

- A practical, repeatable process for scoring your own environment
  against the CISA ZTMM's five pillars and four stages
- Why you score each pillar on *evidence of behavior*, not on which
  tools you've purchased
- A worked example scoring the Identity and Devices pillars, stage by
  stage, against concrete criteria
- The most common self-scoring mistakes — and why they consistently
  make an organization look more mature than it actually is

## The scoring process

Scoring maturity isn't a survey you fill out from memory. It's an
evidence-gathering exercise, pillar by pillar, that forces you to
answer one question honestly for each stage definition: *can I prove
this is true in production right now, today, for essentially all of
the relevant population — not for the pilot group, not for the new
hires, not for the systems we got around to last quarter?*

A workable process looks like this:

1. **Pick one pillar at a time.** Don't try to score all five
   simultaneously — you'll blur the evidence together and end up
   with a vague overall impression instead of five defensible scores.
2. **Start from the Optimal stage definition and work backward.**
   Ask "do we do this, everywhere, continuously?" If the honest
   answer is no, drop to Advanced and ask the same question. Keep
   dropping until you hit a stage where the answer is genuinely yes.
3. **Score to the evidence you can point to, not the plan.** A
   signed project charter to roll out phishing-resistant MFA next
   quarter is not evidence you're at Advanced on Identity today —
   it's evidence you're planning to leave Initial.
4. **Score coverage, not capability.** If you have a tool capable of
   enforcing device compliance but it's only enforcing on 40% of
   endpoints, you are not "Advanced capable" — you are wherever that
   40% honestly puts you, because the other 60% is where an attacker
   will land.
5. **Record the gap, not just the score.** The number alone doesn't
   tell the next person what to fix. "Advanced on Identity, except
   service accounts still authenticate with static secrets" is a
   useful finding; "Advanced" by itself is not.

## Worked example: scoring Identity

Suppose you're scoring Identity for a mid-size org. Walk the stage
definitions:

- **Optimal?** Continuous, real-time risk analytics evaluating every
  access request, with just-enough and just-in-time access
  everywhere. You check: no, risk-based Conditional Access policies
  exist for interactive human sign-in, but service accounts and a
  handful of legacy on-prem apps bypass them entirely. **Not Optimal.**
- **Advanced?** Phishing-resistant MFA, automated identity risk
  scoring feeding access decisions, centralized identity management.
  You check: phishing-resistant MFA (FIDO2/passkeys) is enforced for
  all admin accounts and about 70% of standard users; automated risk
  scoring is live. **Mostly Advanced, with a documented gap** — call
  it "Advanced, trending toward Optimal, blocked by legacy app
  coverage and non-human identity."
- You do **not** average this to "Advanced-ish" and move on. You
  write down exactly which 30% and which service accounts are the
  gap, because that's the actual work item.

## Worked example: scoring Devices

- **Optimal?** Real-time risk analytics driving automated, tailored
  response per device. You check: no automated response exists;
  flagged devices generate a ticket a human reviews. **Not Optimal.**
- **Advanced?** Automated inventory, vulnerability and patch
  management, continuous compliance validation feeding access
  decisions. You check: inventory and patch management are
  automated and reliable; compliance status *is* checked at sign-in
  for managed devices, but unmanaged BYOD laptops have no compliance
  signal at all and are allowed limited access anyway. **Advanced
  for managed devices, Initial for unmanaged devices** — and the
  honest overall score for the Devices pillar is whichever one
  actually governs your real risk, which in this case is the weaker
  one, because that's the door that's actually open.

## Common self-scoring mistakes

- **Scoring the tool, not the behavior.** Owning a PAM platform
  doesn't mean you're Advanced on Identity if half your admin
  accounts still have standing access because nobody finished the
  rollout.
- **Scoring the best system instead of the typical one.** One
  showcase application with full zero-trust controls does not
  represent the fleet of forty legacy apps behind it.
- **Averaging instead of reporting the floor.** Your real exposure
  tracks your weakest material gap, not your strongest control.
- **Scoring intent as if it were fact.** "We're migrating to this
  next year" belongs in the roadmap conversation (Chapter 7), not in
  this quarter's maturity score.

## Key terms

| Term | Meaning |
|---|---|
| Evidence-based scoring | Scoring a stage only when you can point to proof it holds in production, not a plan or a purchased capability |
| Coverage gap | The documented portion of the environment that doesn't yet meet the stage you'd otherwise claim |
| Scoring to the floor | Reporting maturity based on your weakest material gap, not an average across strong and weak areas |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking:
why is "we own a tool that can do this" never sufficient evidence
for a maturity stage, and why should a scoring exercise record the
specific coverage gap rather than just a single stage label?
