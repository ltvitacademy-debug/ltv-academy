# Lesson 3 — Defense in Depth

**Chapter 1 · Designing Security · Lesson 3 of 15**

## What you'll learn

- The defense-in-depth principle, and how it differs from simply having "a lot of security features turned on"
- How to map Lesson 1's five boundaries onto concrete layers of Salesforce controls, each defending against a different failure
- Why defense in depth assumes any single layer will eventually fail, and designs around that assumption
- A worked example showing how a single incident gets stopped at a different layer than the one it broke through

## Depth means independent layers, not more features

**Defense in depth** is the practice of layering multiple, independent security controls so that if one fails, another is still in place to limit the damage. The emphasis is on *independent*: ten controls that all depend on the same single assumption (say, that no employee's password is ever compromised) aren't ten layers of defense, they're one layer with ten names. Real depth comes from controls that fail for different reasons, under different conditions, so a single root cause can't take all of them out at once.

This is a direct extension of Lesson 1's boundaries and Lesson 2's least privilege: boundaries are *where* you place a layer, least privilege is *how narrow* each layer's grants are, and defense in depth is the discipline of making sure there's more than one layer at all.

## Mapping layers onto a Salesforce org

A reasonably mature Salesforce security design stacks layers roughly like this, from outermost to innermost:

| Layer | Representative controls | What it stops |
|---|---|---|
| Network/identity perimeter | Login IP ranges, trusted IP ranges, multi-factor authentication, single sign-on | An attacker without valid, MFA-verified credentials from reaching the org at all |
| Session and authentication | Session timeout settings, session security levels, "High Assurance" session requirements for sensitive actions | A stolen or idle session being usable indefinitely, or for actions it wasn't verified for |
| Authorization (object/record) | Profiles, permission sets, Org-Wide Defaults, role hierarchy, sharing rules | An authenticated user reaching objects or records outside their job's actual scope |
| Field-level and data protection | Field-Level Security, Shield Platform Encryption | A user with legitimate record access still seeing specific fields they shouldn't |
| Application-layer code | `with sharing` Apex, explicit CRUD/FLS checks in code, input validation | Custom code silently bypassing the authorization and field-level layers above it |
| Monitoring and response | Setup Audit Trail, Field Audit Trail, Event Monitoring, Transaction Security Policies | A failure at any of the layers above going undetected rather than being caught and acted on |

Every layer in that table is covered in more depth later in this course — this lesson's job is just to show that they stack, and why the stacking matters more than any single row.

## Assume failure, then design the next layer

The mindset defense in depth asks for is specific: for every control, assume it eventually fails — a password gets phished, a sharing rule gets misconfigured, a developer ships code that skips an FLS check — and ask what the *next* layer does about it. If the honest answer is "nothing, the breach is now total," that's a one-layer design wearing a many-feature costume. If the answer is "the next layer limits it to this specific object, or this specific field, or gets flagged within minutes by monitoring," the design has actual depth.

## A worked example

A phishing email tricks a sales rep into entering their credentials on a fake login page (the network/identity layer fails — this does happen, even with awareness training). The attacker logs in successfully. From here, defense in depth is what limits the damage: the rep's profile only grants Read on Accounts they own or share (authorization layer holds — the attacker can't browse the whole customer base); a `Credit_Limit__c` field is protected by Shield Platform Encryption and FLS, so it's invisible to this profile regardless (field-level layer holds); and a Transaction Security Policy flags the unusual login location and forces a step-up authentication challenge before any data export can happen (monitoring/response layer catches it). One layer failed. The other five didn't need to be perfect — they each needed to do their own, narrower job.

## Key terms

| Term | Meaning |
|---|---|
| Defense in depth | Layering multiple, independent controls so one failure doesn't become a total breach |
| Independent layer | A control that fails for a different reason/condition than the other layers, rather than sharing a single point of failure |
| Session security level | A classification of how strongly a session's identity was verified, used to gate sensitive actions |
| With sharing (Apex) | A code-level control that enforces the running user's record-sharing rules inside custom logic |

## Lab

Using the layer table above, take the worked phishing example and change one detail: suppose the sales rep's profile also had "View All Data" (an over-permissioned profile, the Lesson 2 failure mode) instead of being scoped to owned/shared Accounts. Walk through which layers would still hold and which would now fail, and explain in your own words why removing just one layer's independence (authorization) changes how much damage the same single credential phish causes.

## Check yourself

Can you name at least four independent layers from the table above and, for each, describe a *different* way it could fail (not just "a password gets stolen" repeated)? Can you explain, using your own example, what makes two controls genuinely independent versus just two names for the same underlying assumption?
