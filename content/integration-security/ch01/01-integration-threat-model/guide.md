# Lesson 1 — Integration Threat Model

**Chapter 1 · Securing Integrations · Lesson 1 of 13**

## What you'll learn

- Why an integration is a fundamentally different security problem than a human user clicking through Setup
- The four places an integration's attack surface actually lives: credentials at rest, the network path, the identity making the call, and the endpoint itself
- Why "it's just a background job" is exactly what makes a compromised integration more dangerous than a compromised human login, not less
- The vocabulary this course uses for the rest of the chapter: integration user, connected app, callout, inbound call

## A human login and a machine login fail differently

Every control you've studied for securing a human user — multi-factor authentication, a login screen that asks a real person to notice something looks wrong, a session that times out when nobody's at the keyboard — depends on a human being present to notice something and react. An integration has no one at the keyboard. A nightly batch job that pulls orders from an ERP into Salesforce, or a middleware platform pushing case updates out to a shipping partner, runs on a schedule whether anything is wrong or not. If the credential it uses is compromised, there's no person to notice a strange login prompt or an unfamiliar device — the job just keeps running, now on someone else's behalf, often for a long time before anyone looks.

That's the core premise of this course: integration security isn't "the same controls, applied to a robot instead of a person." It's a genuinely different threat model, because the thing being protected is a standing, unattended, often broadly-privileged relationship between two systems rather than a single person's session.

## Where the risk actually sits

Four places carry most of an integration's real risk, and this chapter is organized around exactly these four:

**Credentials at rest.** Somewhere, a password, API key, OAuth client secret, or private key has to exist so the integration can authenticate without a human typing it in each time. Where that credential is stored — hardcoded in Apex, pasted into a middleware tool's config screen, or held inside a platform feature purpose-built to keep it out of code — is one of the biggest swings in risk this course covers. Lesson 4 (Named Credentials) and Lesson 7 (Secrets Management) both come back to this.

**The network path.** Every callout, in either direction, travels across a network. Without transport encryption and some way for each side to confirm who it's really talking to, that path is interceptable or spoofable. Lessons 2 and 3 cover the identity and encryption layer for this.

**The identity making the call.** Whatever's authenticating — a dedicated integration user, a connected app running as a specific user, a certificate — carries whatever permissions that identity has been granted. An integration identity with more access than the integration actually needs doesn't make the integration more capable; it just makes a future compromise worse. Lessons 5 and 6 cover this directly.

**The endpoint itself.** An inbound REST endpoint or a webhook listener is code that runs the moment a request arrives, often before Salesforce can apply most of its usual UI-layer protections. If that endpoint doesn't independently verify who's calling it, anyone who finds the URL can call it. This comes back in the Operating Securely chapter.

## Why "it's low-privilege, it's fine" is the wrong instinct

A common, understandable reaction to a new integration request is to scope it generously "to avoid support tickets later" — give the integration user broad object access up front so nobody has to revisit the permission set when the integration eventually needs one more field. This inverts the actual risk. A human user who's over-permissioned is still bounded by what that one person chooses to do, and a security team can usually interview them. An over-permissioned integration credential is available to be used by anyone who ever gets hold of it — an attacker, a careless contractor who found an old API key in a shared document, or a second internal team that discovers the existing credential and quietly starts reusing it for an unrelated purpose. The "blast radius" of a compromised credential is exactly the set of permissions attached to it, nothing less and nothing more.

## A realistic integration attack chain

Put the four risk areas together and a believable incident looks like this: a developer hardcodes an integration username and password directly in an Apex class years ago, because at the time it was the fastest way to ship the integration. The class gets copied into a sandbox for a demo, then that sandbox's code gets pushed to a public repository by someone cleaning up old projects, credentials still inside. The integration user behind that password was set up with full access to the Account and Opportunity objects "just in case," because scoping it narrowly felt like unnecessary extra work at the time. Months later, someone finds the exposed credential in the public repository, logs in as that integration user over the API, and exports every account record the org has — using an API, not a UI, so there's no familiar login screen for anyone to notice. Each of the four risk areas contributed a failure: the credential sat in code instead of a managed secret store, nothing validated that the caller was really the expected system, the identity had far more access than the integration needed, and nothing was watching for an unusual pattern of API activity until it was too late.

## Key terms

| Term | Meaning |
|---|---|
| Integration | An automated, machine-to-machine data exchange between Salesforce and another system, running without a human present at the time of each transaction |
| Integration user | A Salesforce user account that exists specifically to authenticate an integration, rather than a human being |
| Connected app | The Salesforce metadata object that represents an external application and governs how it authenticates and what OAuth policies apply to it |
| Attack surface | Every point at which an attacker could attempt to compromise or abuse a system — for an integration, its credentials, network path, identity, and endpoint |
| Blast radius | The scope of damage possible if a given credential or identity is compromised, determined entirely by what that credential is permitted to do |
| Callout | An outbound HTTP request Salesforce makes to an external system, or (loosely, in this course) an inbound request an external system makes into Salesforce |

## Lab

You're reviewing an existing integration for a client: a scheduled Apex job calls a shipping partner's REST API every hour using a username and password stored as plain custom-setting field values, authenticating as a System Administrator user that was never changed when the integration went live two years ago. Write a short risk assessment that maps this integration's design onto the four risk areas from this lesson (credentials at rest, network path, identity, endpoint), naming the specific problem in each area, and rank the four problems from most to least urgent to fix. You don't need to design the fix yet — later lessons in this chapter cover each one.

## Check yourself

Can you explain, in your own words, why an unattended integration credential is a different (not just smaller) risk than a human user's login? Can you name the four risk areas this lesson introduces and give one concrete failure example for each?
