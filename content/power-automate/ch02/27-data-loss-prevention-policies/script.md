# Script — Security: Data Loss Prevention (DLP) Policies

## Segment 1 (title)

So far you've learned Power Automate from a maker's seat. This lesson switches to the admin's seat: how does an organization stop a well-meaning maker from accidentally building a flow that leaks sensitive data to the public internet? The answer is a data loss prevention, or DLP, policy.

## Segment 2 (steps)

Every DLP policy sorts every connector into exactly one of three groups. Business is for sensitive-data connectors, and they can't share data with any other group. Non-Business is the default group for connectors nobody's classified yet. And Blocked connectors can't be used at all, anywhere the policy applies.

## Segment 3 (screenshot)

Here's that classification happening in the policy wizard. SQL Server shows up right here as a blockable, premium connector sitting in the Non-business tab by default — exactly the kind of connector an admin would deliberately move somewhere else to protect it.

## Segment 4 (screenshot)

Once a connector is moved into Business — here, SharePoint and Salesforce — the rule kicks in immediately. Those connectors can no longer share data with anything left in Non-Business or Blocked, in any flow, anywhere this policy applies.

## Segment 5 (code)

For Castlebridge, that means SQL Server and Dataverse go into Business, since that's where shipment and finance data live. Twitter and Facebook go straight into Blocked. A flow can still combine SQL Server with an Outlook approval email — but no flow, by anyone, can ever combine SQL Server with Twitter.

## Segment 6 (outro)

A DLP policy doesn't look at what a flow does — only which connectors it combines. That one rule is enough to make leaking shipment data to a public account physically impossible for any maker to build. Next up in this chapter: governance from the admin center.
