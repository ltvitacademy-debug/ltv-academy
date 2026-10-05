# Lesson 11 — Azure Data Lake Storage Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE CARD

Azure Data Lake Storage Governance — how ADLS Gen2 layers a second, finer-grained
access system on top of Azure RBAC.

## S2 · SCREENSHOT (containers list)

ADLS Gen2 is Blob Storage with a hierarchical namespace turned on — real, traversable
folders. ACL management starts here, on the storage account's Containers blade.

## S3 · SCREENSHOT (manage ACL menu)

Right-click any container, directory, or blob, and Manage ACL sits right on the
context menu, next to Rename and Delete.

## S4 · SCREENSHOT (access permissions tab)

This is the POSIX-style model Linux filesystems have used for decades — read, write,
and execute, checked independently for the owner, the owning group, and everyone else.

## S5 · SCREENSHOT (add security principal)

Add principal searches Microsoft Entra ID directly. Microsoft's own guidance: assign
these to groups, not individual users — a group only needs its membership updated once.

## S6 · STEPS (RBAC vs ACL vs execute chain)

Azure RBAC answers whether an identity can use storage at all. ACLs narrow that down
per folder. And every parent folder in the path needs Execute, or Read and Write below
it silently do nothing.

## S7 · OUTRO CARD

Next up: Amazon S3's governance model — bucket policies, Block Public Access, and
Object Ownership.
