# Lesson 7 — Passwordless Authentication: FIDO2 and Passkeys

**Chapter 2 · Authentication Architecture · Lesson 7 of 32**

## What you'll learn

- What the FIDO2/WebAuthn standard actually is: public-key cryptography used for login, instead of a shared secret like a password or a code
- Why a FIDO2 credential is bound to the exact origin (domain) it was created for, and why that binding is what makes it genuinely phishing-resistant
- What a passkey is — the consumer-friendly implementation of FIDO2, synced across a user's devices through a platform provider like Apple, Google, or Microsoft
- Why FIDO2 and passkeys are considered stronger than traditional SMS- or push-based MFA, specifically against phishing and MFA-fatigue (push-bombing) attacks

## What FIDO2/WebAuthn actually is

FIDO2 (and its web-facing API, WebAuthn) replaces the password-plus-code model with **public-key cryptography**. When you register a FIDO2 credential with a site, your device generates a **key pair**: a private key that never leaves the device (often protected by a device PIN, fingerprint, or face scan), and a public key the site stores. To log in, the site sends a challenge, and your device signs it with the private key — proving possession of that private key without ever transmitting it anywhere. There's no shared secret sitting on a server for an attacker to steal in bulk, which is the single biggest structural difference from passwords.

## Why origin binding makes it phishing-resistant

The property that makes FIDO2 genuinely phishing-resistant, rather than just "another factor," is **origin binding**. The credential your device creates is cryptographically tied to the exact domain it was registered for — `login.realbank.com`, say. If you land on a convincing lookalike page at `login-realbank-secure.com` and it tries to use that credential, your device checks the origin, sees it doesn't match, and simply refuses to sign anything. A traditional password or a TOTP code typed into a fake login page works just fine for the attacker; a FIDO2 credential presented to the wrong origin does not work at all.

## Passkeys: FIDO2 for everyday users

A **passkey** is the mainstream, consumer-facing packaging of FIDO2. Instead of a separate physical hardware key, the private key lives in a platform credential manager — Apple's iCloud Keychain, Google Password Manager, or Microsoft's equivalent — and **syncs across a user's devices** tied to their platform account. Sign in on a new phone with the same Apple or Google account, and the passkey is already there, with no separate enrollment step, no code to type, and nothing to carry around.

## Why this beats SMS and push MFA

SMS codes can be intercepted through SIM swapping or SS7 attacks, and both SMS codes and push-approval MFA share a deeper weakness: a user can be **socially engineered into handing a code over or approving a push they didn't request** — the basis of real-world MFA-fatigue, or "push-bombing," attacks, where an attacker fires repeated approval requests until a tired or confused user taps "approve." FIDO2 and passkeys remove that human decision point entirely. There's no code to read aloud and no push to approve under pressure — the cryptographic check happens automatically, and it fails silently and safely against the wrong origin.

## Example: logging in with a passkey

You visit your bank's real site and tap "Sign in with a passkey." Your phone prompts for Face ID. Behind the scenes, your device checks that the page's origin matches the one your passkey was created for, signs the challenge with your private key, and you're in — no password typed, no code read off a text message, nothing for a phishing page to capture even if you'd landed on one by mistake.

## Key terms

| Term | Meaning |
|---|---|
| FIDO2 / WebAuthn | An authentication standard using public-key cryptography instead of shared secrets like passwords |
| Origin binding | A FIDO2 credential's cryptographic tie to the exact domain it was created for, which blocks phishing use |
| Passkey | The consumer-friendly implementation of FIDO2, synced across a user's devices via a platform provider |
| MFA fatigue / push-bombing | An attack that spams push-approval requests until a user taps "approve" out of confusion or fatigue |

## Check yourself

Why does a FIDO2 credential simply fail to work on a convincing phishing lookalike page, in a way that a password or a texted one-time code does not?
