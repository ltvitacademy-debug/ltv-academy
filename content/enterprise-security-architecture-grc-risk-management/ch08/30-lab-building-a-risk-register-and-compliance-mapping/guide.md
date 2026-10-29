# Lesson 30 — Lab: Building a Risk Register and Compliance Mapping

**Chapter 8 · Capstone: Designing a Security Architecture and GRC Program · Lesson 30 of 32**

## What you'll learn

- How to build a real risk register for Meridian Specialty Lending, with
  FAIR-style quantified entries instead of a bare Likelihood × Impact color
  code
- How to turn a FAIR estimate into an Annualized Loss Expectancy range a
  finance stakeholder can actually use in a budget conversation
- How to map a single control to multiple compliance frameworks at once,
  the way Chapter 5's capstone lesson described but never built end to end
- Why a risk register that only speaks one framework's language forces a
  GRC team to re-litigate the same control evidence three separate times

## Picking up where Lesson 29 left off

Lesson 29 designed Meridian's architecture: a segmented cardholder-data
environment, tokenization at intake, hardware-key MFA on privileged access,
and SIEM correlation across the identity and CDE layers. This lab turns that
same architecture into the two artifacts a real GRC program actually runs
on — a quantified risk register, and a compliance mapping table — instead of
treating the design and the paperwork as two unrelated projects.

## Step 1 — Pick a real risk and estimate it with FAIR

Rather than scoring "Likelihood 4, Impact 3" on a 5×5 matrix, Chapter 3's FAIR
method asks for two ranges, not two point guesses:

```
Risk: Unauthorized access to the cardholder-data environment via a
      compromised privileged credential

Loss Event Frequency (LEF):      0.1 to 0.4 times per year
  (informed by industry breach-frequency data and Meridian's own
   privileged-account count)

Probable Loss Magnitude (PLM):   $180,000 to $2,100,000 per event
  (regulatory fines, forensic investigation, customer notification,
   and estimated customer churn, low to high)
```

## Step 2 — Turn the range into an Annualized Loss Expectancy a CFO can use

```
ALE (low)  = 0.1 x $180,000   =  $18,000
ALE (high) = 0.4 x $2,100,000 = $840,000
```

That range — not a single misleadingly precise number — is what gets
presented to Meridian's board. It also gives the CISO a real number to
compare against the cost of a specific control: if hardware-key MFA for all
privileged CDE access costs $40,000 a year to run, it's a clearly justified
spend against an ALE range that starts at $18,000 and climbs to $840,000, in
a way a bare "High" risk rating on a heat map never could be.

## Step 3 — Build the register entry

```
Risk ID:        R-014
Description:    Unauthorized CDE access via compromised privileged credential
LEF:            0.1 - 0.4 / year
PLM:            $180,000 - $2,100,000
ALE:            $18,000 - $840,000
Treatment:      Mitigate
Control:        Hardware-key MFA on all privileged CDE access + continuous
                access review (Lesson 29, Step 3)
Control owner:  IAM team lead
Residual risk:  Low-Medium (MFA does not eliminate social-engineering
                risk against the help desk reset process)
```

Writing down the residual risk honestly — MFA helps, but a help-desk reset
process is still a real gap — is what separates a register someone will
actually trust later from one that quietly overstates how protected Meridian
is.

## Step 4 — Map that one control to every framework it satisfies at once

This is the step Chapter 5's "Mapping One Control to Multiple Frameworks"
lesson set up and this lab finally builds:

| Framework | Requirement satisfied by this one control |
|---|---|
| SOC 2 (Security TSC) | CC6.1 — logical access is restricted through multi-factor authentication for privileged users |
| ISO 27001 Annex A | A.8.5 — secure authentication for privileged access |
| PCI DSS | Requirement 8.4 — multi-factor authentication for all access into the CDE |

One control, one piece of evidence (MFA enrollment and enforcement logs for
privileged CDE accounts), three frameworks satisfied without three separate
implementation projects. A GRC team that maps this way produces one evidence
package an auditor can review for any of the three engagements, instead of
collecting the same screenshots three different times under three different
labels.

## Step 5 — Repeat for the register, not just one row

A real risk register for Meridian would carry a dozen or more rows built the
same way: a FAIR-quantified risk, a treatment decision, the control that
addresses it, an honest residual-risk note, and every framework that same
control satisfies. That repeatable structure — not any single row — is the
actual deliverable of a mature GRC program.

## Key terms

| Term | Meaning |
|---|---|
| Loss Event Frequency (LEF) | FAIR's estimated range for how often a threat event is expected to occur per year |
| Probable Loss Magnitude (PLM) | FAIR's estimated range for the financial loss if the event occurs |
| Annualized Loss Expectancy (ALE) | LEF multiplied by PLM, expressed as a range — the figure a financial stakeholder can actually act on |
| Control mapping | Documenting how one control satisfies requirements across multiple compliance frameworks at once, so one evidence package serves all of them |
| Residual risk | The risk that remains after a control is applied, honestly stated rather than implied to be zero |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does
mapping one control to three frameworks save real audit effort, and what's
the risk of a register that states a control's benefit but never writes down
its residual risk?
