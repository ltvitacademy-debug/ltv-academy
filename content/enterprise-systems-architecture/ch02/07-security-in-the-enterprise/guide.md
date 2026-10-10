# Lesson 7 — Security in the Enterprise

**Chapter 2 · Enterprise Concerns · Lesson 7 of 22**

## What you'll learn

- Why enterprise security is bigger than any single application's security model
- Where Salesforce's own security tooling fits as one piece of a larger enterprise security program
- The four commonly-cited Salesforce Shield components and what each one protects
- Why a System Architect has to think about security at the boundary, not just inside the org

## Security doesn't stop at the org boundary

An Application Architect worries about Salesforce's own security model: profiles, permission sets, sharing rules, field-level security. All of that is necessary, but a System Architect has to widen the lens. Every integration this course has discussed — a batch sync to an ERP, a Remote Call-In from a marketing platform, a live data virtualization feed — is a potential path for data to leave Salesforce's security model entirely and enter another system's, or for an attacker to enter Salesforce through a connection that was trusted by default. Enterprise security has to account for identity across every system (covered fully in Lesson 14), data protection at rest and in transit across every integration, and compliance obligations that apply to the whole data flow, not just to wherever the data happens to be stored today.

## Salesforce Shield as one piece of the picture

Salesforce offers a set of enterprise-grade security add-ons grouped under the name **Salesforce Shield**, commonly described as covering four areas: **Platform Encryption** (encrypting sensitive data at rest, at the field, file, and attachment level, with the organization managing its own encryption keys), **Field Audit Trail** (extended retention and tracking of field-level change history well beyond standard field history tracking), **Event Monitoring** (logging of detailed user activity across the org to detect and investigate suspicious behavior), and **Data Detect** (scanning to locate sensitive data that may not have been formally classified). These tools matter enormously for Salesforce's own security posture, but a System Architect's job is to recognize that Shield only protects what happens *inside* Salesforce — it says nothing about the security of the ERP, the middleware, or the data warehouse this data also touches on its way through the enterprise.

## The enterprise security program

A mature enterprise security program typically spans several concerns that no single application vendor's tooling fully covers on its own: identity and access management across every system (not just Salesforce's own login), network security between systems and across integration paths, data protection policies that follow the data regardless of which system currently holds it, and a compliance framework (such as SOC 2, HIPAA, or a regional data-protection law) that the whole landscape, not just Salesforce, has to satisfy. A System Architect's specific contribution to this program is making sure Salesforce's own security choices (its Shield configuration, its API access controls, its connected app policies) are consistent with — and don't create a weak link in — the enterprise's broader security posture.

## Thinking at the boundary

The practical habit this lesson is building toward: whenever you design an integration boundary (Lesson 4), ask explicitly what security travels with it. Does the data crossing this boundary need to be encrypted in transit? Does the external system's own access controls match the sensitivity of what it's receiving? Is there a single point where a compromised integration credential could expose far more than intended? These are enterprise security questions, and they're just as much a System Architect's responsibility as choosing the right integration pattern in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce Shield | A set of enterprise security add-ons commonly described as covering Platform Encryption, Field Audit Trail, Event Monitoring, and Data Detect |
| Platform Encryption | Encrypts sensitive Salesforce data at rest at the field, file, and attachment level |
| Field Audit Trail | Extends field-level change history tracking well beyond standard field history |
| Event Monitoring | Logs detailed user activity across the org to detect and investigate suspicious behavior |

## Lab

Take the ERP integration scenario from Lesson 4's lab (an opportunity closing in Salesforce and an order appearing in the ERP). List every point in that data's journey where it crosses a security boundary: leaving Salesforce, traveling across whatever integration mechanism you chose, and arriving at the ERP. For each crossing point, write one sentence on what security concern (encryption in transit, credential exposure, access control mismatch) a System Architect would need to confirm is handled.

## Check yourself

Can you name the four commonly-cited Salesforce Shield components and what each protects? Can you explain why Shield alone isn't sufficient for enterprise security, even though it's a genuinely powerful set of Salesforce-native tools?

Sources: [Salesforce Shield](https://www.salesforce.com/platform/shield/guide/)
