# Security: Data Loss Prevention (DLP) Policies

So far, everything you've learned about Power Automate has been from a maker's seat — building flows, connecting them to data. This lesson switches to the admin's seat: how does an organization stop a well-meaning maker from accidentally building a flow that leaks sensitive data to the public internet? The answer is a data loss prevention, or DLP, policy.

## What you'll learn

- What a DLP policy actually controls, and why it's built around connectors rather than flows
- The three connector groups every DLP policy uses: Business, Non-Business, and Blocked
- The rule that makes DLP policies work: connectors in different groups can't share data in the same flow
- How Castlebridge's IT admin would design a policy to protect its SQL Server data

## Why DLP policies exist

A flow can combine almost any connectors Power Automate offers. That's the whole appeal of the product — and also the risk. Nothing stops a maker from building a flow that reads rows out of a sensitive SQL Server table and posts them straight to a public Twitter account, unless an administrator has explicitly ruled that combination out. A **data loss prevention (DLP) policy** is how an admin does exactly that, at the connector level, enforced automatically across every environment the policy applies to.

## The three connector groups

Every DLP policy sorts every connector into exactly one of three groups:

- **Business** — connectors for sensitive data. Connectors in this group can't share data with connectors in any other group.
- **Non-Business** (the default) — connectors for non-sensitive data. Also can't share data with other groups. Any connector nobody has explicitly classified lands here automatically.
- **Blocked** — connectors that can't be used at all anywhere this policy applies.

![Assigning connectors to Business, Non-Business, and Blocked groups while building a DLP policy, with SQL Server visible in the connector list](/courses/power-automate/ch02/27-data-loss-prevention-policies/dlp-assign-connectors-new.png)
*The Assign connectors step of the DLP policy wizard — here showing the Non-business tab, with SQL Server listed as a blockable Premium connector alongside OneDrive, Dropbox, and others.*

## The rule that makes it work

The entire mechanism comes down to one rule: **a single flow can't combine connectors from two different groups.** If SQL Server is in Business and Twitter is in Non-Business, no flow — anywhere this policy applies — can read from SQL Server and post to Twitter in the same run. The maker isn't warned after the fact; the flow simply can't be saved with both connectors present, and if a policy change later makes an existing flow non-compliant, that flow is suspended until it's fixed.

![Two connectors, SharePoint and Salesforce, moved into the Business data group of a DLP policy](/courses/power-automate/ch02/27-data-loss-prevention-policies/dlp-business-data-group-new.png)
*Connectors moved into the Business group — shown here with SharePoint and Salesforce — can no longer share data in a flow with anything left in Non-Business or Blocked.*

## Designing Castlebridge's policy

Castlebridge's IT admin creates a DLP policy with SQL Server (and Dataverse) placed in the **Business** group, since that's where shipment and finance records live. Twitter, Facebook, and other consumer-social connectors go in **Blocked** outright — Castlebridge has no legitimate business reason for a flow to touch them. Everything else — Outlook, Teams, approvals — stays in the Non-Business default group. The result: a maker can still build a flow that reads SQL Server and sends an Outlook approval email, because both land in groups that are allowed to mix in this policy's design, but no flow can ever move SQL Server data into a Blocked consumer connector.

## Key terms

| Term | Meaning |
|---|---|
| Data loss prevention (DLP) policy | An admin-defined rule that classifies connectors and controls which ones can be combined in the same flow or app |
| Business data group | Connectors for sensitive data; can't share data with other groups |
| Non-Business data group | The default group for non-sensitive, unclassified connectors; can't share data with other groups |
| Blocked | Connectors that can't be used at all anywhere the policy applies |

## Recap

A DLP policy doesn't look at what a flow does — it looks at which connectors it combines, and enforces that connectors from different groups never appear together in one flow. For Castlebridge, putting SQL Server in Business and consumer connectors like Twitter in Blocked means a maker physically cannot build a flow that leaks shipment data to a public social account, no matter how well- or ill-intentioned they are. That wraps up this lesson.
