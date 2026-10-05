# Lesson 11 — Azure Data Lake Storage Governance

**Chapter 3 · Storage and Catalogs · Lesson 11 of 25**

## What you'll learn

- How Azure Data Lake Storage (ADLS) Gen2 layers two separate access systems on top of each other
- The difference between Azure RBAC (container/account-scoped) and POSIX-style ACLs (folder/file-scoped)
- How to view and manage ACLs for a directory or blob from the Azure portal
- Why ACLs need an unbroken chain of execute permission down the folder path to actually work

## Two access systems, not one

Azure Data Lake Storage Gen2 is Azure Blob Storage with a **hierarchical namespace** turned on — real folders and subfolders instead of Blob Storage's flat, simulated-folder model. That hierarchical namespace is what makes a second, finer-grained access system possible: alongside Azure role-based access control (RBAC, covered in Lesson 8), ADLS Gen2 supports **POSIX-style access control lists (ACLs)** — the same read/write/execute model Linux filesystems have used for decades, applied per directory and per file.

The two systems answer different questions:

- **Azure RBAC** answers *"can this identity manage or use this storage account or container at all?"* — assigned at the subscription, resource group, storage account, or container scope.
- **ACLs** answer *"can this identity read, write, or traverse this specific folder or file?"* — assigned directly on the object, and inherited by new child items only if set as a *default ACL*.

A storage account can and usually does use both at once. RBAC roles like **Storage Blob Data Reader** grant broad access; ACLs narrow that down to specific folders for specific teams — the pattern used to give the Finance team its own folder in a data lake that the broader Analytics RBAC role doesn't otherwise restrict.

## Finding a container's ACL in the portal

The Azure portal reaches a container's access control list through the storage account's **Containers** blade:

![Screenshot showing storage account containers listed in the Azure portal.](/courses/cloud-data-governance-azure-and-aws/ch03/11-azure-data-lake-storage-governance/containers-list.png)
*A storage account's Containers blade — the starting point for ACL management, under Data storage in the left nav.*

Right-clicking any container, directory, or blob surfaces **Manage ACL** directly in the context menu:

![Screenshot showing the right-click context menu with the Manage ACL option.](/courses/cloud-data-governance-azure-and-aws/ch03/11-azure-data-lake-storage-governance/manage-acl-menu.png)
*Manage ACL sits alongside Rename, Properties, Generate SAS, and Delete on the object's context menu.*

## Reading the Access permissions tab

Selecting **Manage ACL** opens a panel with two tabs. **Access permissions** shows the current ACL entries for that specific object — by default, just the owner, owning group, and "other," each with independent read/write/execute checkboxes:

![Screenshot showing the Access permissions tab of the Manage ACL page.](/courses/cloud-data-governance-azure-and-aws/ch03/11-azure-data-lake-storage-governance/access-permissions-tab.png)
*Access permissions for one directory — three built-in entries, each with Read, Write, and Execute columns.*

The portal's own inline note on this screen states the gotcha that trips up almost everyone the first time: *"Read and write permissions will only work for a security principal if the security principal also has execute permissions on all parent directories, including the container (root directory)."* An ACL entry granting Read on `/finance/reports` does nothing if that identity lacks Execute on `/finance` and on the container root — Execute is what lets a principal traverse into a directory at all, independent of what it can do once there.

## Adding a security principal

To grant a new user, group, service principal, or managed identity access, **Add principal** opens a search box:

![Screenshot showing the search box for finding and adding a security principal.](/courses/cloud-data-governance-azure-and-aws/ch03/11-azure-data-lake-storage-governance/add-security-principal.png)
*Searching Microsoft Entra ID for a principal to add to this object's ACL.*

Microsoft's own guidance here matters for anyone managing ACLs at scale: **assign ACL entries to Microsoft Entra security groups, not individual users.** A storage account's hierarchical namespace does not have a practical limit problem with ACL *entries* so much as a management problem — every individual user added directly to dozens of folder ACLs becomes an entry that has to be found and removed again when that person changes teams. A group-based ACL only needs the group membership updated once.

## Access ACLs vs. default ACLs

The **Access permissions** tab governs the object itself. A second tab, **Default permissions**, only appears on directories (blobs can't have child items, so they have no default ACL) and sets a template applied automatically to new items created under that directory going forward — it does not retroactively change anything that already exists. A directory can carry an access ACL (controlling the directory itself) and a default ACL (controlling what newly created children start with) at the same time, and the two do not have to match.

One portal limitation worth knowing: the Azure portal applies ACL changes to **one object at a time** — there's no "apply recursively" button here. Recursive ACL changes across a folder tree require Azure Storage Explorer, PowerShell, the Azure CLI, or one of the Data Lake SDKs.

## Key terms

| Term | Meaning |
|---|---|
| Hierarchical namespace | The ADLS Gen2 feature that gives Blob Storage real, traversable folders instead of flat, simulated ones |
| POSIX-style ACL | Per-object read/write/execute permissions, assignable to a specific user, group, or identity on a directory or file |
| Access ACL | The ACL entries controlling the object itself |
| Default ACL | A directory-only template ACL applied to new child items created under it going forward |
| Execute permission | The ACL bit that lets a principal traverse *into* a directory — required on every parent directory for Read/Write below it to work |

## Lab

In a test storage account with hierarchical namespace enabled, create a container with two nested folders. Grant a Microsoft Entra group Read and Execute on the outer folder only (not the inner one), then separately grant that same group Read, Write, and Execute on the inner folder. Confirm in the portal that the group's ACL entries differ between the two folders, and write down what access the group effectively has to the inner folder's contents if Execute were removed from the outer folder.

## Check yourself

- A user has Read and Write set directly on `/sales/2026/reports`, but no ACL entry at all on `/sales` or `/sales/2026`. Can they read that folder's contents? Why or why not?
- What's the practical difference between an access ACL and a default ACL on the same directory?
- Why does Microsoft recommend assigning ACL entries to Microsoft Entra groups instead of individual users?
