# Lesson 20 — Auditing and Logging in the Cloud

**Chapter 4 · Security and Compliance · Lesson 20 of 25**

## What you'll learn

- Why control-plane auditing is the baseline governance log in both clouds
- How Azure Monitor's Activity Log tracks who changed what, and its Change history feature
- How AWS CloudTrail's Event history answers the same question, with its own filters
- Why both logs are frequently exported out of their default short retention window

## The one log every governance program depends on

Every lesson in this chapter has assumed something can be checked after the fact: did disk encryption actually get turned on, did someone try to disable a Block Public Access setting, did an SCP actually block an action. That assumption rests entirely on one thing existing and being trustworthy: a **control-plane audit log** — a record of every management operation performed against the cloud account, who performed it, and when. Azure calls this the **Activity Log**; AWS calls it **CloudTrail**. Both record the same category of event: *control plane* operations (creating, updating, deleting resources) rather than *data plane* operations (reading a row, getting an object) — though both platforms offer separate, opt-in logging for data plane activity too.

## Azure Monitor's Activity Log

The **Activity Log** is collected automatically, with no configuration required, and surfaces from almost any resource's menu in the Azure portal:

![Screenshot of the Azure Monitor Activity log page, listing recent operations with status, timestamp, subscription, and who initiated each event.](/courses/cloud-data-governance-azure-and-aws/ch04/20-auditing-and-logging-in-the-cloud/azure-activity-log.png)
*A subscription's Activity log — Operation name, Status, and who (or what) initiated each entry.*

Notice the **Event initiated by** column: several rows show "Microsoft Azure Policy Insights" rather than a person — a direct, visible trace of Azure Policy's `DeployIfNotExists` effect (Lesson 18) actually firing, not a human making a manual change. For a subset of operations, Azure goes one step further with **Change history**, which captures the actual before/after property values around an event:

![Screenshot of a Change history panel for a Create or Update Virtual Machine event, listing old and new values for several properties.](/courses/cloud-data-governance-azure-and-aws/ch04/20-auditing-and-logging-in-the-cloud/azure-change-history.png)
*Change history for one VM update — PowerState going from stopped to starting to running, with exact timestamps.*

The Activity Log retains entries for **90 days** by default, at no charge regardless of volume — long enough for routine troubleshooting, but short of what most compliance programs require, which is why exporting it to a Log Analytics workspace (for years-long retention and KQL queries) or an event hub is a near-universal production practice, not an edge case.

## AWS CloudTrail's Event history

**CloudTrail**'s equivalent is **Event history**, showing the last 90 days of management events for the account in the current Region — the same retention window as Azure's default, a convergence that isn't a coincidence so much as both platforms settling on "long enough to troubleshoot, short enough to keep free":

![Screenshot of the CloudTrail Event history page, with a Read-only filter set to false and a list of recent events.](/courses/cloud-data-governance-azure-and-aws/ch04/20-auditing-and-logging-in-the-cloud/cloudtrail-event-history.png)
*Event history — 145+ events, filtered to Read-only: false, showing writes and state changes only.*

CloudTrail's filter model works on a single attribute at a time — **Event name**, **Event source**, **User name**, and others — rather than Azure's multi-filter bar. Filtering specifically for `ConsoleLogin` events is one of the single most common first queries in an incident investigation, for exactly the reason it sounds like: confirming who actually signed in, and when:

![Screenshot of CloudTrail Event history filtered to Event name: ConsoleLogin, showing four console sign-in events.](/courses/cloud-data-governance-azure-and-aws/ch04/20-auditing-and-logging-in-the-cloud/cloudtrail-event-history-filtered.png)
*Filtered to ConsoleLogin — four sign-in events, each with a timestamp and (redacted here) user name.*

Like the Activity Log, Event history is a 90-day rolling window; production CloudTrail setups almost always add a **trail** that continuously exports every event to S3 (and optionally CloudWatch Logs) for indefinite retention — the direct AWS parallel to exporting Azure's Activity Log to a Log Analytics workspace.

## Key terms

| Term | Meaning |
|---|---|
| Control plane | Management operations on resources (create, update, delete) — as opposed to data plane (reading/writing actual data) |
| Activity Log | Azure Monitor's automatically-collected record of control-plane operations, retained 90 days by default |
| CloudTrail Event history | AWS's equivalent 90-day rolling record of management events |
| Change history | Azure Activity Log feature showing before/after property values around a specific event |
| Trail (CloudTrail) | A configured, continuous export of CloudTrail events to S3 for retention beyond 90 days |

## Lab

In an Azure subscription, open the Activity Log and find one event whose "Event initiated by" column shows an automated identity rather than a person (Policy Insights is a common one). Separately, in a CloudTrail Event history view (or the documentation if no live account is available), filter for `ConsoleLogin` events and note what fields are available for each one.

## Check yourself

- What's the difference between a control-plane event and a data-plane event, and which one does the Activity Log / CloudTrail Event history track by default?
- Why would an entry in the Activity Log show "Microsoft Azure Policy Insights" as the identity that initiated it, instead of a person?
- Why do most production environments export Activity Log / CloudTrail data somewhere else, rather than relying on the default 90-day view?
