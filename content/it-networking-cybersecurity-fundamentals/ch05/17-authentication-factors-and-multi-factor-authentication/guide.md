# Lesson 17 — Authentication Factors and Multi-Factor Authentication

**Chapter 5 · Authentication, Access Control & Cryptography Basics · Lesson 17 of 32**

## What you'll learn

- The three authentication factors — something you know, something you have, something you are — and why they're grouped that way
- Why combining two or more factors from *different* categories makes multi-factor authentication meaningfully stronger than a password alone
- How real MFA methods actually work: TOTP codes from an authenticator app, SMS one-time codes, and hardware security keys like a YubiKey
- Why SMS-based MFA is considered weaker than the other two, and what specifically can go wrong with it

## Authentication answers one question

Authentication answers a single question: are you who you claim to be? Every method
ever devised for answering it falls into one of three **factor** categories, and
understanding those categories is what makes multi-factor authentication (MFA) make
sense instead of feeling like an arbitrary extra step.

## The three factors

**Something you know** — a memorized secret: a password, a PIN, the answer to a
security question. This is the oldest and most common factor, and also the weakest
alone, because knowledge can be phished, guessed, or reused from a breached site
without you ever noticing.

**Something you have** — a physical possession: your phone running an authenticator
app, a hardware token, a smart card. Proving this factor means proving you currently
hold a specific physical object, which an attacker sitting in another country
typically does not.

**Something you are** — a biometric trait inherent to your body: a fingerprint, a
face scan, an iris pattern. This factor can't be memorized or handed to someone else,
though it comes with its own trade-offs (a fingerprint can't be "reset" if a database
of them leaks).

## Why combining factors actually helps

A password by itself is a single factor — something you know — and if it's stolen,
that alone is enough to take over the account. MFA requires two or more factors from
**different** categories, which changes the economics of an attack: a thief now needs
both the stolen password *and* your phone, or your fingerprint, not just one of them.
That combination is why MFA blocks the overwhelming majority of password-based account
takeover attempts, even when the password itself has already been compromised in a
breach.

One important nuance: two factors from the *same* category don't count as real MFA. A
password plus a security-question answer is "something you know," twice — someone who
can guess or find one can often find the other, so it adds little real protection.

## Real MFA methods, compared

**TOTP authenticator apps** (Google Authenticator, Microsoft Authenticator, Authy)
generate a new six-digit code every 30 seconds from a secret established once at
enrollment. The code is computed on the device itself and never has to travel over a
network until you type it in — a strong, widely available method.

**SMS one-time codes** are sent as a text message. They're convenient and need no app,
but they carry real, documented weaknesses: **SIM swapping**, where an attacker
convinces or bribes a mobile carrier to move your phone number onto a SIM card they
control, and interception via the aging SS7 telecom signaling protocol. Because of
these weaknesses, NIST guidance flags SMS as a restricted method for sensitive
authentication.

**Hardware security keys** (YubiKey and other FIDO2/WebAuthn devices) are small
physical devices you tap or plug in. They perform a cryptographic challenge tied to
the real site's domain, which means a fake lookalike login page simply can't use
them — making hardware keys effectively phishing-resistant and currently the
strongest widely deployed MFA method.

## Example: logging into a bank

You type your password (something you know). It's correct, but the bank doesn't log
you in yet — it also asks for the six-digit code currently showing in your
authenticator app (something you have). Only when both check out does the session
open. An attacker who phished your password alone is stuck at step two.

## Key terms

| Term | Meaning |
|---|---|
| Authentication factor | A category of proof of identity: something you know, have, or are |
| MFA | Requiring two or more factors from different categories to log in |
| TOTP | Time-based One-Time Password — a code regenerated every 30 seconds from a shared secret |
| SIM swapping | Porting a victim's phone number to an attacker-controlled SIM to intercept SMS codes |

## Check yourself

Why doesn't a password plus a security-question answer count as true multi-factor
authentication, even though it's "two things" you had to provide?
