# Lesson 21 — API Security Basics

**Chapter 4 · Choosing an API · Lesson 21 of 22**

## What you'll learn

- Least privilege applied to OAuth scopes, not just user permissions
- Named Credentials as a security control, not just a convenience
- Network-level controls: Trusted IP Ranges and TLS
- Why the 2026 shift to External Client Apps is itself a security improvement

## Least privilege, applied to tokens

Lesson 12 introduced OAuth scopes as a way to limit what a connected app can do. From a security standpoint, that's the same **least privilege** principle this course has mentioned before: an integration's access token should be able to do exactly what that integration needs, and nothing more. A reporting tool that only ever reads Account data has no legitimate reason to hold a scope that also lets it delete records — if that token is ever leaked or the app is compromised, the blast radius is limited to whatever the scope actually allows, which is the entire point of granting it narrowly in the first place.

## Named Credentials keep secrets out of code

Lesson 12 also introduced Named Credentials for outbound Apex/Flow callouts. The security angle: hardcoding an external endpoint's secret or API key directly inside Apex code means that secret is now wherever that code is — in version control history, in sandboxes, in every developer's local copy. A Named Credential stores the secret once, declaratively, in Setup, referenced by name from code that never sees the actual value. Rotating a compromised secret becomes a configuration change, not a code deployment.

## Network-level controls

Beyond the application layer, Salesforce offers controls at the network level:

- **Trusted IP Ranges / login IP restrictions** limit which network locations a login or API call can originate from, so a stolen credential or token is far less useful to an attacker outside those ranges.
- **TLS (HTTPS)** is non-negotiable and automatic — every Salesforce API endpoint only accepts encrypted connections, so credentials and data in transit aren't exposed on the wire.

## Don't trust inbound data blindly

An integration that exposes an endpoint for an external system to call into (or subscribes to a Platform Event another system publishes) should still validate what it receives — don't assume a payload is well-formed or safe just because it arrived through an authenticated channel. Authentication proves *who* is calling; it doesn't guarantee *what* they're sending is valid.

## The 2026 shift: External Client Apps as a security upgrade

Lessons 7 and 12 covered the move from Connected Apps to **External Client Apps (ECAs)** as Salesforce's current recommendation for registering a new OAuth client. This isn't just a naming change — ECAs give administrators a cleaner separation between an app's identity and the policies governing it (scopes, IP ranges, session behavior), which makes it easier to audit and tighten an integration's access without touching the app's core registration. Combined with Salesforce now blocking uninstalled Connected Apps by default, the overall direction of these 2026 changes is toward tighter, more deliberate control over what's allowed to connect to an org at all.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege (for tokens) | Granting an access token only the OAuth scopes it actually needs, nothing more |
| Named Credential (security angle) | Keeping secrets out of code, stored and rotated declaratively instead |
| Trusted IP Range | A network-level restriction on where logins/API calls may originate from |
| Validating inbound data | Checking that received data is well-formed and safe, regardless of whether the channel was authenticated |

## Lab

An integration currently requests the broadest available OAuth scope "just in case it needs it later," hardcodes an external API key directly in an Apex class, and accepts any inbound Platform Event payload without validation. Write a short remediation plan: for each of these three practices, name the specific concept from this lesson that fixes it, and explain what risk each fix actually reduces.

## Check yourself

Can you explain why requesting the broadest OAuth scope "just in case" violates least privilege, even if the integration never actually uses the extra access? Can you explain why validating inbound data matters even on an authenticated channel?