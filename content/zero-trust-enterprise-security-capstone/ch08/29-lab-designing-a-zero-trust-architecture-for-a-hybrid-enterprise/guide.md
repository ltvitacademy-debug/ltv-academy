# Lesson 29 — Lab: Designing a Zero Trust Architecture for a Hybrid Enterprise

**Chapter 8 · Capstone: Designing and Defending an Enterprise Zero Trust Architecture · Lesson 29 of 32**

## What you'll learn

- How to turn seven chapters of zero trust theory into one coherent architecture design for a
  real-feeling hybrid enterprise, instead of treating identity, segmentation, containment, and data
  controls as separate topics
- How to write a Conditional Access policy that actually encodes "never trust, always verify" —
  checking user risk, device compliance, and location together, not login credentials alone
- How to replace a flat on-prem network with named micro-segments that have their own access rules,
  without ripping out the data center overnight
- How to design for assume-breach containment and data/application controls as part of the same
  architecture, not a bolt-on afterthought

## The scenario

Meridian Health Partners is a mid-size healthcare network: three regional clinics, a central
administrative office, about 4,200 employees, and a hybrid footprint that's typical of a company
this age. Patient records live in MediCore, a legacy electronic health record system running in
Meridian's own on-prem data center because it has never been worth the risk of migrating. A newer
patient-analytics and reporting platform runs in AWS. Entra ID (Azure AD) is the primary identity
provider for everyone, synced from an on-prem Active Directory that's been in place since before
most of the current security team was hired. Clinicians and billing staff work from clinic
workstations, personal laptops, and phones. A third-party revenue-cycle management vendor,
ClaimFlow, has a standing integration into Meridian's billing systems to submit insurance claims.

This lesson designs the zero trust architecture for all of it, as one exercise across four domains:
identity, micro-segmentation, assume-breach containment, and data/application controls. Lesson 30
scores this design against a maturity model and turns it into a rollout roadmap. Lesson 31 shows
what happened when a design that looked like this one passed its audit anyway.

## Step 1-2: Make Entra ID the single policy decision point

Meridian's on-prem Active Directory still authenticates clinic workstations directly, which means
there are effectively two identity systems making access decisions. Step 1 is Entra Connect syncing
every on-prem identity into Entra ID with Kerberos armoring enabled, so every sign-in — on-prem or
cloud — ultimately gets evaluated by one policy engine instead of two. Step 2 is retiring any
resource that still trusts on-prem AD group membership alone for access decisions; from this point
forward, every access decision runs through Entra ID Conditional Access.

```json
{
  "displayName": "Require compliant device + MFA for clinical systems",
  "conditions": {
    "users": { "includeGroups": ["Clinicians", "Billing-Staff"] },
    "applications": { "includeApplications": ["MediCore-Gateway", "ClaimFlow-Portal"] },
    "signInRiskLevels": ["medium", "high"],
    "locations": { "excludeLocations": ["Meridian-Trusted-Clinic-Networks"] }
  },
  "grantControls": {
    "operator": "AND",
    "builtInControls": ["mfa", "compliantDevice"]
  },
  "sessionControls": {
    "continuousAccessEvaluation": "enabled"
  }
}
```

That single policy already encodes three chapters of this course at once: explicit verification
(MFA plus device compliance, not a password alone), continuous evaluation instead of a one-time
login check, and a risk signal driving the decision rather than a static allow-list.

## Step 3-4: Replace the flat network with named micro-segments

Today, a compromised front-desk workstation in Clinic 2 can reach the same flat network as the
billing servers and the AWS VPN gateway. Step 3 defines four segments instead of one flat network:
**Clinical Systems** (MediCore and connected medical devices), **Corporate IT** (email, file shares,
general workstations), **Partner/Vendor** (ClaimFlow's integration path and any other third-party
access), and **Guest/BYOD** (anything not managed by Meridian IT). Step 4 replaces VPN-based access
to Clinical Systems with a software-defined perimeter: clinicians reach MediCore through a broker
that checks the same Conditional Access signals above, per request, instead of a VPN tunnel that
grants broad network reachability for an entire session.

```
Segment              Reaches directly         Reaches via broker/gateway only
--------------------------------------------------------------------------------
Clinical Systems      MediCore internals        Corporate IT, AWS analytics
Corporate IT           Internal apps, email      Clinical Systems, Partner/Vendor
Partner/Vendor         ClaimFlow API endpoint    Everything else
Guest/BYOD             Internet only             Every internal segment
```

No segment can reach Clinical Systems or Partner/Vendor directly anymore — every cross-segment
request goes through a broker that evaluates identity and device signals first.

## Step 5-6: Design for assume-breach, not just prevention

Step 5 assumes one of these segments gets compromised anyway and designs the blast radius down to
that one segment. Lateral movement controls block direct workstation-to-workstation protocols
(SMB, RDP) across segment boundaries entirely — a compromised Corporate IT laptop simply has no
network path to try credential-stuffing against a MediCore database server. Step 6 is an automated
containment playbook, triggered by the SIEM signals from earlier chapters, that isolates a single
compromised identity or device without anyone deciding by hand at 2 a.m.

```
Containment playbook: "Impossible travel + high-risk sign-in"
1. Detect: Entra ID risk signal flags a sign-in as high-risk after a prior session
   from a different country within an implausible travel window.
2. Contain: automatically revoke the account's active sessions and require
   re-authentication with MFA before any further access.
3. Isolate: if the flagged session touched the Clinical Systems or Partner/Vendor
   segment, quarantine the originating device's network access pending review.
4. Notify: open a ticket to the security team with the full signal trail — this is
   the last line of defense, not the first response to every anomaly.
```

## Step 7-8: Data and application controls

Step 7 classifies what actually matters: patient health information (PHI) in MediCore and the AWS
analytics platform gets the strictest controls, while general corporate files do not. Step 8 wraps
MediCore behind an API gateway so every service-to-service call — including the AWS analytics
platform pulling records, and ClaimFlow submitting claims — authenticates with a short-lived
workload identity token instead of a long-lived static API key or shared service account.

```yaml
# MediCore API gateway policy (excerpt)
route: /patients/{id}/claims
requireWorkloadIdentity: true
allowedCallers:
  - service: analytics-platform
    maxTokenLifetime: 15m
  - service: claimflow-integration
    maxTokenLifetime: 15m
    scopes: ["claims:submit"]   # never broader than the one action it performs
denyIfNoToken: true
```

Notice that `claimflow-integration` gets a scope limited to exactly `claims:submit` — nothing else
— and a token that expires in fifteen minutes. That one line is the design decision Lesson 31 comes
back to directly.

## Key terms

| Term | Meaning |
|---|---|
| Policy decision point | The single system (here, Entra ID Conditional Access) every access request is ultimately evaluated against |
| Micro-segment | A named group of systems with its own access rules, replacing one flat network |
| Software-defined perimeter | A broker that evaluates identity/device signals per request, replacing broad VPN reachability |
| Workload identity | A short-lived, scoped credential a service uses to authenticate to another service, instead of a static shared secret |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does blocking
workstation-to-workstation SMB and RDP across Meridian's segment boundaries limit blast radius even
if a Conditional Access policy somewhere else fails — and what's the difference between a VPN
tunnel and the software-defined perimeter broker that replaced it for Clinical Systems access?
