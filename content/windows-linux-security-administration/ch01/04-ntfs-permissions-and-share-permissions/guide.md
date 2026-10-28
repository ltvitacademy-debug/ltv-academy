# Lesson 4 — NTFS Permissions and Share Permissions

**Chapter 1 · Windows Server & Active Directory Fundamentals · Lesson 4 of 4**

## What you'll learn

- The five standard NTFS permission levels and what each one actually allows
- The three share permission levels, and how they're different from NTFS permissions
- How NTFS and share permissions combine when accessed over the network — the "most restrictive wins" rule
- A worked example showing exactly what a user ends up able to do

## NTFS permissions: five levels

**NTFS permissions** live on the file system itself — they apply whether someone
accesses a folder locally, sitting at the server, or over the network. The five standard
levels, from most to least access:

| Level | What it allows |
|---|---|
| Full Control | Everything below, plus change permissions and take ownership |
| Modify | Read, write, execute, and delete files/folders |
| Read & Execute | View file contents and run executables, no changes |
| Read | View file contents and folder listings only |
| Write | Add files and write to existing ones, without necessarily being able to read others' files |

These are set in the **Security** tab of a folder's Properties dialog (or via
`icacls`/`Set-Acl` in PowerShell), and they apply to whoever is in the Access Control
List — typically a security group, following the group patterns from Lesson 3.

## Share permissions: a separate, older layer

**Share permissions** are a different, simpler layer that only matters when a folder is
accessed **over the network** through its share (`\\Server\ShareName`) — they're
irrelevant to someone logged in locally at the server. Share permissions have only
three levels:

| Level | What it allows |
|---|---|
| Full Control | Everything below, plus change share-level permissions |
| Change | Read, write, and delete through the share |
| Read | View and open files through the share only |

Share permissions are set on the **Sharing** tab, not the Security tab, and in modern
practice most administrators leave share permissions wide open (Everyone: Full Control)
and do all the real access control with NTFS permissions instead — but you'll still see
environments, especially older ones, where both are locked down independently.

## How the two combine: most restrictive wins

When a user accesses a folder **over the network**, both layers apply, and Windows
applies the **most restrictive effective permission between the two**. The process has
two steps:

1. Within each layer (NTFS and Share), combine all the Allow permissions a user has
   from every group they belong to — the result is that layer's **effective
   permission**.
2. Compare the two layers' effective permissions, and the user's actual access is
   **whichever one is more restrictive**.

Accessing the same folder **locally** (sitting at the server itself, not through the
share) only NTFS permissions apply — share permissions are skipped entirely, since
there's no share involved.

## A worked example

A file share `\\FS01\Finance` has these permissions:

- **Share permission:** Finance-Employees group → **Change**
- **NTFS permission:** Finance-Employees group → **Read & Execute**

Jordan Lee, a member of Finance-Employees, connects to `\\FS01\Finance` from their
laptop. Share permission says Change (read/write/delete). NTFS permission says Read &
Execute (read and run only, no writing). The **more restrictive of the two wins**, so
Jordan's actual effective access is **Read & Execute** — Jordan can open and run files
in that share, but cannot save changes or delete anything, regardless of the Change
permission on the share, because NTFS is the tighter constraint here. If Jordan instead
logged directly into the file server and opened the same folder locally, share
permissions wouldn't apply at all — only the NTFS Read & Execute permission would, with
the same practical result in this particular case.

## Key terms

| Term | Meaning |
|---|---|
| NTFS permission | A file-system-level permission that applies whether a resource is accessed locally or over the network |
| Share permission | A network-only permission layer that applies only when accessing a resource through its share |
| Effective permission | The actual resulting access after combining all Allow permissions within one layer |
| Most restrictive wins | When NTFS and share permissions differ, the more restrictive of the two determines network access |

## Check yourself

A share permission grants Full Control, but the underlying NTFS permission grants only
Read. What is the user's effective access when connecting over the network, and why?
