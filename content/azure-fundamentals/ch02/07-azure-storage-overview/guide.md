# Lesson 7 — Azure Storage Overview

**Chapter 2 · Core Azure Services · Lesson 7 of 18**

## What you'll learn

- What a **Storage Account** is — the container everything else lives in
- **Blob Storage** — for unstructured files
- **Azure Files** — for managed, shareable file shares
- How to tell which one fits a given need, at the awareness level this course covers

## Everything starts with a Storage Account

Every Azure storage service lives inside a **Storage Account** — the
top-level container you create first, which then holds whichever
storage services you actually need (Blob Storage, Azure Files, and
others beyond this course's scope). Like a resource group, it's a
place things live, not a service in itself.

This lesson is deliberately an overview, not a deep dive — this
course's job is making sure you know these services exist and what
each is roughly for. A full hands-on Storage Account course, going
much deeper into access tiers, redundancy options, and security
configuration, already exists elsewhere in this catalog if you
continue down an Azure-flavored path afterward.

## Blob Storage — unstructured files at scale

**Blob Storage** stores unstructured data: images, video, documents,
log files, backups — anything that isn't structured, relational data.
"Blob" literally stands for "Binary Large Object." It's built to
scale to enormous amounts of data cheaply, and it's the service
behind things like a website's image hosting, application log
storage, or backup archives.

## Azure Files — a file share you don't have to host

**Azure Files** provides fully managed file shares in the cloud,
accessible the same way a traditional on-premises file share is —
over the standard SMB protocol. Multiple machines or applications can
mount the same share and read and write to it, which is exactly the
kind of thing Blob Storage isn't built for. If you've ever mapped a
network drive at an office, Azure Files does the cloud equivalent of
that, without you hosting the file server yourself.

```
Blob Storage                          Azure Files
Unstructured files                    Managed file shares
(images, video, logs, backups)        (SMB protocol, like a network drive)

Built for: scale, cheap storage       Built for: shared access across
                                       multiple machines/apps
```

## Picking between them

The question is usually simple: do multiple systems need to mount
this as a shared drive, the way a traditional file server works? If
yes, Azure Files fits. If you're just storing and retrieving files —
images a website serves, logs an application writes, backups nobody
needs to "browse" like a folder — Blob Storage is the simpler, cheaper
fit. Neither is "better"; they solve different shapes of the same
underlying problem: where does a file actually live in the cloud.

## Key terms

| Term | Meaning |
|---|---|
| Storage Account | The top-level container that holds Azure storage services like Blob and Files |
| Blob Storage | Storage for unstructured files (images, video, logs, backups) at scale |
| Azure Files | Fully managed, SMB-accessible file shares, mountable by multiple machines |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: a
team needs a shared folder that three different application servers
can all read and write to simultaneously, the way a traditional
network drive works — which storage service fits, and why wouldn't
Blob Storage work for this instead?
