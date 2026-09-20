# FCI Setup, Overview

You now understand the pieces: an FCI is one instance active on one node at a time, backed
by shared storage, protected from split-brain by quorum. This lesson connects those pieces
into the actual order of operations — the real, high-level flow an administrator follows to
stand up a Failover Cluster Instance, without any of the pieces being invented or reordered.

## What you'll learn

- The real prerequisite order: cluster before storage before SQL Server
- What the SQL Server installer specifically expects to already exist
- Why skipping steps in this order simply fails, rather than degrading gracefully

## Step 1: build the Windows Server Failover Cluster first

An FCI cannot exist without a working WSFC underneath it — this is a hard prerequisite,
not a suggestion. Before SQL Server is even considered, the servers that will become
cluster nodes need Windows Server installed, joined to the same Active Directory domain,
and the **Failover Clustering** feature enabled. From there, the **Create Cluster** wizard
(or `New-Cluster` in PowerShell) validates the nodes, forms the cluster, and establishes a
quorum configuration appropriate to the node count — exactly the node majority, node and
disk majority, or cloud witness models from the previous lesson.

## Step 2: configure shared storage before touching SQL Server

With the cluster formed, the shared storage — a SAN LUN over iSCSI/Fibre Channel, or
Storage Spaces Direct — is presented to the cluster and added as **cluster shared storage**,
visible to every node but, as covered earlier, mountable by only one at a time. This has to
be in place and validated (Failover Cluster Manager includes cluster validation reports
specifically for storage) before the SQL Server installer is run, because the installer
will look for exactly this shared storage during setup.

## Step 3: run SQL Server Setup and choose "New SQL Server Failover Cluster Installation"

Only once WSFC exists and shared storage is configured does the SQL Server installer come
in. Running setup and choosing the failover cluster installation path (rather than a
standalone instance) walks through: naming the instance and its virtual network name,
selecting which cluster nodes will be able to host it, pointing the data/log file
locations at the shared storage already configured, and specifying the service accounts.
Additional nodes are added afterward by running setup again on each one and choosing "Add
node to a SQL Server failover cluster" — this is what actually makes a node capable of
hosting the instance during a later failover.

## Why the order matters

Each step depends structurally on the one before it. SQL Server's failover cluster setup
mode explicitly checks for an existing, validated WSFC cluster and expects shared storage
to already be presented — it isn't something the installer configures on your behalf. Try
to run it before the cluster exists, and setup simply won't offer the failover cluster
installation path at all. This is why the ordering isn't just best practice; it's the only
sequence that actually functions.

## Key terms

| Term | Meaning |
|---|---|
| Failover Clustering feature | The Windows Server role that must be enabled before a WSFC cluster can be created |
| Create Cluster wizard / `New-Cluster` | The tool that validates nodes and forms a WSFC cluster |
| Cluster shared storage | Shared disks added to and managed by the cluster, mountable by one node at a time |
| New SQL Server Failover Cluster Installation | The SQL Server Setup path used to install the first node of an FCI |
| Add node to a SQL Server failover cluster | The Setup path used on additional nodes so they can host the instance on failover |

## Check yourself

An administrator tries to install SQL Server using the "New SQL Server Failover Cluster
Installation" option, but the server isn't part of any Windows Server Failover Cluster yet.
What happens, and what has to be done first?
