# Lesson 5 — Password Policy Engineering Beyond the Basics

**Chapter 2 · Authentication Architecture · Lesson 5 of 32**

## What you'll learn

- What NIST SP 800-63B actually recommends for passwords today: length over complexity, screening against known-breached passwords, and no mandatory periodic rotation unless there's evidence of compromise
- Why the older complexity-rule era (forced uppercase/digit/symbol mixes, 90-day resets) is now considered outdated guidance, not best practice
- Why complexity rules backfired in practice — they pushed users toward predictable patterns instead of stronger secrets
- How to engineer a real, modern password policy for an organization, not just flip a setting

## NIST SP 800-63B: what actually changed

NIST's Digital Identity Guidelines (SP 800-63B) reset the conversation on passwords. The current guidance prioritizes **length over complexity** — a long passphrase is harder to crack than a short, complexity-mangled string — and it tells verifiers to **screen every chosen password against lists of known-breached passwords**, rejecting matches outright. It also drops the old requirement to force periodic password changes on a fixed schedule: a password should only be forced to change when there's real **evidence it's been compromised** (a breach, a suspicious sign-in, a leaked credential dump), not just because 90 days passed.

## Why complexity rules backfired

The old rules — require an uppercase letter, a digit, and a symbol — sound reasonable, but they collided with human memory. Forced into that shape, people didn't pick stronger secrets; they picked predictable transformations of the same base word: `Password` becomes `Password1`, then `Password1!`, then `P@ssw0rd1!` at the next forced rotation. Attackers running password-cracking tools know these substitution patterns cold, so the "complexity" added very little real entropy while making passwords harder for humans to remember — often pushing people to write them down or reuse them elsewhere, which is worse for security, not better.

## What a modern policy actually enforces

A policy aligned with current NIST guidance looks different from the old checklist. It sets a **minimum length** (12+ characters, with passphrases encouraged), **drops the forced character-mix requirement**, **screens against breached-password lists** at creation time (services like Microsoft Entra ID's password protection and Have I Been Pwned's Pwned Passwords API exist for exactly this), and **does not force periodic rotation** absent a specific compromise signal. Rate-limiting login attempts (throttling) does more real work against guessing attacks than complexity rules ever did.

## When rotation still makes sense

Rotation isn't gone entirely — it's targeted. If a password shows up in a breach dump, if an endpoint it was typed on was compromised, or if a shared/service credential's exposure can't be ruled out, force a reset immediately. The shift is from "rotate everyone, always, on a calendar" to "rotate the specific accounts with real evidence of exposure."

## Example: engineering a policy for a mid-size org

A 500-person company replaces its old policy (8 characters, mixed case + digit + symbol, forced 90-day rotation) with: minimum 12 characters, no mandatory character mix, automatic rejection of any password found in a breached-password list, and rotation only triggered by a confirmed compromise alert from their identity provider. Support tickets for forgotten passwords drop, because users aren't juggling a new mangled password every quarter — and the policy is measurably harder to crack, because length beat complexity from the start.

## Key terms

| Term | Meaning |
|---|---|
| NIST SP 800-63B | NIST's Digital Identity Guidelines document covering password ("memorized secret") requirements |
| Breached-password screening | Rejecting a chosen password if it already appears in a list of passwords exposed in real-world breaches |
| Composition rules | The legacy requirement to mix uppercase, lowercase, digits, and symbols in every password |
| Password spraying | An attack that tries a few common passwords across many accounts, which complexity rules alone don't stop |

## Check yourself

Why does NIST's current guidance favor length and breached-password screening over mandatory character-mixing and forced periodic rotation — and what specifically went wrong with the old approach?
