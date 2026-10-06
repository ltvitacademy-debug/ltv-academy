# Lesson 12 — Scan Troubleshooting

**Chapter 2 · The Data Map · Lesson 12 of 35**

## What you'll learn

- Where to view a scan's status and run it, edit it, or delete it
- The first things to check when a scan won't connect to its source
- How to verify Key Vault permissions for the Microsoft Purview managed identity
- Why a scan that used to work can suddenly start failing

## Viewing and managing a scan

Every registered source's **Overview** tab has a **View Details** button that takes you straight to its scan status:

![Screenshot of Data Map with a source's View details button highlighted under a registered source tile.](/courses/microsoft-purview/ch02/12-scan-troubleshooting/register-blob-view-scan.png)
*From the collection or domain's map view, View Details is the fastest way into a specific source's scan history.*

Select the **Scan name** from either the source page or the collection's scan list to open its management screen:

![Screenshot of a source details page with the scan name link highlighted.](/courses/microsoft-purview/ch02/12-scan-troubleshooting/register-blob-manage-scan.png)
*Scan-c9H's run history — every past run, its status, and its asset counts live here.*

From there, **Run scan now**, **Edit scan**, and **Delete scan** are all one click away:

![Screenshot of a manage scan page with the Run scan now, Edit scan, and Delete scan buttons highlighted.](/courses/microsoft-purview/ch02/12-scan-troubleshooting/register-blob-manage-scan-options.png)
*Edit scan is where you'd change the schedule, scope, or scan rule set without starting over.*

## When a connection won't establish

If a scan can't connect to its source, work through this checklist, in order:

1. **Re-check the source's prerequisites** — every source type has its own documentation page with its specific requirements.
2. **Confirm the authentication method** configured in the scan's **Scan** section actually matches what's set up on the source side (Managed Identity, Service Principal, Account Key, and so on).
3. **Review Azure RBAC** — to register a single source you need at least **Reader** on the resource (or inherited from a parent scope); some roles, like Security Admin, don't grant that visibility even though they sound broad enough.
4. **Check Key Vault permissions**, if your scan authenticates through a stored secret. The Microsoft Purview managed identity needs at least **Get** and **List** on Secrets under the key vault's Access policies:

   ![Screenshot showing the dropdown selection of both Get and List permission options for a Key Vault access policy.](/courses/microsoft-purview/ch02/12-scan-troubleshooting/verify-minimum-permissions.png)
   *Missing from the Current access policies list entirely? That's usually the actual problem — add it back via Create and manage credentials for scans.*

5. **Create a support request** if everything above checks out and the connection still fails.

## When a previously working scan suddenly fails

A scan that used to succeed doesn't fail for no reason. Check these, in order:

- Have the source's **credentials been rotated or changed**? Update the scan with the new ones.
- Is an **Azure Policy** blocking updates to the storage account? Purview needs an exception tag.
- Are you on a **self-hosted integration runtime**? Confirm it's on current software and still connected to your network.
- **Test connection passes but the scan itself fails** — this usually points at a network setting: private endpoints, virtual networks, or a Network Security Group rule blocking the actual data path even though the initial handshake succeeded.

## Key terms

| Term | Meaning |
|---|---|
| View Details | The button on a registered source that opens its scan status and history |
| RBAC Reader role | The minimum Azure role needed to register and view a single data source |
| Key Vault access policy | Permissions (Get, List, etc.) that let the Purview managed identity read a stored secret |

## Lab

Walk through the troubleshooting checklist in order against a scan you set up earlier in this chapter (or a hypothetical one). For each step, write one sentence on what "passing" that check would actually look like in the portal.

## Check yourself

If Test connection succeeds but the scan itself still fails partway through, what category of problem does that combination usually point to, and why wouldn't a credentials issue explain it?
