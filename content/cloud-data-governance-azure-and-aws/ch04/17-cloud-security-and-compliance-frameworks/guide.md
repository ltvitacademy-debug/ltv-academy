# Lesson 17 — Cloud Security and Compliance Frameworks

**Chapter 4 · Security and Compliance · Lesson 17 of 25**

## What you'll learn

- Why this lesson stays at orientation level — compliance obligations depend on facts specific to your organization
- The general shape of a compliance framework: controls, assessments, and compliance state
- How Microsoft Defender for Cloud tracks compliance against a chosen standard, as one real example
- Where to go next if an actual regulatory obligation applies to your organization

## An important hedge before anything else

This lesson is an orientation to how cloud platforms *represent and track* compliance frameworks — not legal or compliance advice, and not a substitute for an actual compliance professional or legal counsel. Which frameworks apply to a given organization, what counts as meeting a given control, and what the real consequences of a gap are, all depend on facts specific to that organization (industry, jurisdiction, contracts, data types) that no course can know in advance. Treat everything below as "here's the shape of the tooling," not "here's what your organization must do."

## What a framework actually is, mechanically

Names like **SOC 2**, **ISO 27001**, **HIPAA**, **PCI DSS**, and **NIST SP 800-53** get used loosely, but mechanically they share a common shape: a framework defines a set of **controls** (specific, checkable requirements — "disk encryption must be enabled on VMs," "privileged account activity must be monitored"), and an organization's actual cloud resources are periodically **assessed** against each control to produce a **compliance state** — compliant, non-compliant, or not applicable.

Cloud platforms increasingly automate the assessment half of that equation (checking whether disk encryption is actually on) while leaving the *harder* parts — manual attestations, documentation, legal interpretation of a control's intent — as explicitly separate, human work.

## Reading a real compliance dashboard

**Microsoft Defender for Cloud's Regulatory compliance dashboard** is a concrete example of this pattern, letting an organization track multiple standards against the same Azure, AWS, or GCP resources at once:

![Screenshot showing the Defender for Cloud Regulatory compliance dashboard with a standard selected (NIST SP 800-53 R4), its controls, and a Your Actions panel listing automated and manual items.](/courses/cloud-data-governance-azure-and-aws/ch04/17-cloud-security-and-compliance-frameworks/compliance-drilldown.png)
*Selecting a standard shows its controls; selecting a control shows the automated and manual actions behind it.*

Drilling into a single control reveals the mechanical distinction directly: some items are labeled **Automated** (Defender for Cloud itself checks the resource state), others **Manual** (someone has to attest to them and attach evidence) — and both kinds roll up into the same control's overall compliance state:

![Screenshot showing a compliance control detail panel with the Control details view expanded.](/courses/cloud-data-governance-azure-and-aws/ch04/17-cloud-security-and-compliance-frameworks/control-detail.png)
*Control details — Overview, Your Actions, and Microsoft Actions tabs for a single control.*

## From a control to a concrete, actionable finding

The entire point of surfacing this in a dashboard rather than a static PDF is that a failed control links straight down to the actual non-compliant resources and a remediation path:

![Screenshot of a specific recommendation, 'Disk encryption should be applied on virtual machines,' showing severity and a list of unhealthy resources.](/courses/cloud-data-governance-azure-and-aws/ch04/17-cloud-security-and-compliance-frameworks/sample-recommendation.png)
*One automated check behind a control — severity, and the exact VMs currently failing it.*

This is the general pattern worth taking away, independent of which specific cloud or dashboard: **a framework → its controls → automated and manual assessments against real resources → a compliance score that changes as those resources change.** AWS has its own parallel tooling (AWS Audit Manager, AWS Config conformance packs, AWS Artifact for the underlying audit reports) built on the same shape.

## Key terms

| Term | Meaning |
|---|---|
| Control | A specific, checkable requirement within a compliance framework |
| Assessment | The process of checking a resource against a control — automated or manual |
| Compliance state | The result of an assessment: compliant, non-compliant, or not applicable |
| Attestation | A manual control marked as met by a person, with supporting evidence attached |

## Lab

In Microsoft Defender for Cloud's Regulatory compliance dashboard (or by reading through its documentation if no live environment is available), pick one standard and one control within it. Identify which of its assessments are automated versus manual, and write one sentence describing what evidence a manual assessment under that control would plausibly require.

## Check yourself

- Why does this lesson avoid making specific claims about which frameworks apply to which organizations?
- What's the mechanical difference between an automated assessment and a manual assessment under the same control?
- Name one thing a compliance dashboard's "compliant" state does NOT guarantee, given that it mostly reflects automated checks.
