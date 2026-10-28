# Lesson 26 — Security Policies, Standards, and Acceptable Use

**Chapter 7 · Security Policy, Governance & Defense in Depth · Lesson 26 of 32**

## What you'll learn

- Why written policy is a real security control, not just paperwork, and how it drives the technical controls you've learned about so far
- The four policy documents almost every security program has: Acceptable Use Policy, password policy, incident response policy, and data classification policy
- What each one actually says and who it's written for
- How a password policy turns from a sentence on paper into an actual technical setting enforced by a system

## Policy is "just paper" — but it's the paper that tells the machines what to do

It's tempting to think of security policy as the boring part of security — a document nobody reads, sitting in a shared drive. But policy is where an organization decides, in writing, what "secure" actually means for *this* company, and every technical control in the previous lesson's layered model exists to enforce some policy decision. A firewall rule blocking a port exists because a policy decided that traffic shouldn't be allowed. A password complexity requirement exists because a password policy specified it. Without the written policy, a technical team has no consistent standard to configure controls against — different admins would each make their own guess about what's acceptable, and those guesses would drift apart over time. Policy is the single source of truth that technical enforcement traces back to.

## Four policies nearly every program has

**Acceptable Use Policy (AUP).** Defines what employees are and aren't allowed to do with company systems and data — for example, no installing unauthorized software, no using company email for personal business ventures, no connecting personal USB drives to work machines. Every new hire typically signs one before getting system access, and it's the document an organization points to when disciplining an employee for misuse.

**Password policy.** Specifies the actual requirements for passwords: minimum length, complexity (uppercase, numbers, symbols), how often they must be changed, and whether multi-factor authentication is required. This is the clearest example of policy becoming a technical control — see below.

**Incident response policy.** Lays out what happens when a breach or suspected breach occurs: who gets notified first, who has authority to take a system offline, what the escalation chain looks like, and what evidence must be preserved. Without this written ahead of time, the first hours of a real incident are spent arguing about process instead of containing the problem.

**Data classification policy.** Defines categories of data — public, internal, confidential, restricted — and the handling rules for each, like whether a document can be emailed externally or must be encrypted at rest. It's what tells an employee that a customer list is "confidential" and a marketing flyer is "public," and the different protection each one requires.

## From policy sentence to enforced technical setting

Take the password policy's line: "passwords must be at least 12 characters, include a number and a symbol, and expire every 90 days." That sentence on paper does nothing by itself. The IT team then configures Active Directory's or the identity provider's password settings to actually require 12 characters, reject passwords without a number or symbol, and force a reset at 90 days. The technical system now enforces, automatically and for every single user, exactly what the policy specified in words. This is the pattern behind nearly every security control: a written policy decision, translated into a configured, enforced technical setting — which is exactly why the "paper" part isn't optional. Skip it, and the technical team is configuring controls with no agreed standard behind them.

## Key terms

| Term | Meaning |
|---|---|
| Security policy | A written document stating what an organization requires or prohibits for security; the basis technical controls are configured against |
| Acceptable Use Policy (AUP) | Defines what employees may and may not do with company systems and data |
| Password policy | Specifies password requirements such as length, complexity, expiration, and MFA |
| Incident response policy | Defines roles, escalation steps, and evidence handling for a security incident |
| Data classification | Categorizing data (e.g., public, confidential, restricted) with handling rules for each category |

## Check yourself

A company has strong Active Directory password settings configured, but no written password policy document exists anywhere. Is that company's password security as solid as one with both? What could go wrong over time without the written policy?
