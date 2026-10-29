# Lesson 30 — Capstone Part 2: Compute, Storage, and Monitoring

**Chapter 8 · Job-Ready Capstone: Full Deployment Project · Lesson 30 of 32**

## What you'll learn

- How to deploy compute and storage into the network Lesson 29 already built and verified,
  instead of standing them up first and hoping the network catches up
- How to wire an app VM to a storage account and a database with a **managed identity**, so no
  connection string or access key ever sits in a config file
- What an honest smoke test looks like once compute and storage actually exist — not "it's
  running," but a real round trip through the data path
- How to stand up monitoring with a small, high-confidence set of alerts instead of alerting on
  everything and burning out the one person who has to respond

## Deploying into a network that's already proven

Lesson 29 left Harrow Peak Outfitters with a verified VNet, subnets, and NSGs — the network layer
confirmed working before anything depended on it. Chapter 3 now has somewhere real to land: the
app VM, `harrowpeak-app-vm`, goes into `app-subnet`; the storage account, `harrowpeakstorage`,
gets a service endpoint restricted to `app-subnet`; and `harrowpeak-orders-db`, an Azure SQL
Database, gets a private endpoint inside `data-subnet`, reachable only from `app-subnet` on 1433
— exactly the path Lesson 29's NSG rule already opened and nothing more.

## Wiring compute to storage without a single secret

The app needs to write invoices and product images to blob storage and read and write order rows
in the database. The wrong way is a storage account key or a SQL login and password sitting in
the app's config file — something that can leak, expire, or get copied into a repo by accident.
Instead, `harrowpeak-app-vm` gets a **system-assigned managed identity**, and that identity is
granted the `Storage Blob Data Contributor` role scoped to `harrowpeakstorage` and an Azure AD
database user mapped to the same identity in `harrowpeak-orders-db`. The VM authenticates as
itself — no credential to rotate, leak, or forget about, because there's no credential at all.

## The smoke test: a real round trip, not a status light

"It's running" doesn't mean it works. The smoke test places one real test order through the app
and confirms the row actually lands in `harrowpeak-orders-db`, uploads one test invoice and
confirms the blob appears in the storage container, and checks that the app's configuration holds
zero stored keys or secrets. It also re-checks the NSGs one more time: still only port 443
reachable from the internet, nothing opened for convenience during testing and left that way.
Only once all three pass does this environment count as deployed, not just running.

## Monitoring that won't be ignored by week two

Chapter 4's warning about alert fatigue is the whole design principle here: a small number of
alerts someone will actually read beats a large number someone learns to dismiss. An Azure
Monitor Log Analytics workspace watches four things, and only four — app VM CPU sustained above
90% for 15 minutes, app VM disk free space below 10%, `harrowpeak-orders-db` resource utilization
running high, and `harrowpeakstorage` availability dropping. Every one of those has a specific,
actionable response; nothing alerts just because a metric moved. All four route to one action
group, reaching the one person who's actually on call.

## Key terms

| Term | Meaning |
|---|---|
| Managed identity | An Azure AD identity assigned to a resource like a VM, used to authenticate to other Azure services with no stored credential |
| Smoke test | A real end-to-end check that data actually moves through the whole path, not just a status check that something is "running" |
| Alert fatigue | What happens when too many low-value alerts train the on-call person to start ignoring all of them, including the real ones |
| Action group | The Azure Monitor object that defines who actually gets notified when an alert fires |

## Check yourself

Before Lesson 31: why does granting `harrowpeak-app-vm`'s managed identity the
`Storage Blob Data Contributor` role eliminate an entire category of risk that a stored access key
never fully removes, even if that key is rotated regularly?
