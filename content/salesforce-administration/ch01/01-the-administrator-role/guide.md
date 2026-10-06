# Lesson 1 — The Administrator Role

**Chapter 1 · Users and Access · Lesson 1 of 36**

## What you'll learn

- What a Salesforce administrator actually does day to day
- Where the admin works: Setup, in both Lightning Experience and Classic
- The four areas every admin controls: who, what, how, and safely
- Why this chapter — Users and Access — is the foundation for everything else in the course

## Setup: the administrator's workspace

Every Salesforce admin's day starts in the same place: **Setup**. Click the gear icon in the top right corner of any Salesforce org, choose **Setup**, and you land on Setup Home — a Quick Find search box at the top and a full tree of configuration areas down the left side.

![Salesforce Setup Home, with the gear-icon menu open showing Setup, Your Account, and Developer Console.](/courses/salesforce-administration/ch01/01-the-administrator-role/setup-home.png)
*Setup Home — reached from the gear icon in the top right of any org. This is where an administrator's work actually happens.*

If you remember nothing else from this lesson: almost every task described in this course starts with "From Setup, in the Quick Find box, search for..." That one sentence is the admin's entire job, repeated hundreds of times across hundreds of different settings.

## The access-control toolkit

Scroll the Setup tree down to **Administration > Users**, and you find the cluster of tools this entire chapter is built around:

![The Administration section of Setup expanded to show Permission Set Groups, Permission Sets, Profiles, Public Groups, Queues, Roles, User Management Settings, and Users.](/courses/salesforce-administration/ch01/01-the-administrator-role/setup-admin-nav.png)
*Users, Profiles, Permission Sets, Permission Set Groups, Roles — the access-control toolkit, all grouped under Administration.*

Everything in Chapter 1 — creating users, assigning licenses, building profiles, granting permission sets, restricting login hours, setting password policies — lives inside this one section of Setup.

## The same tools, the Classic way

Not every org has fully moved to Lightning Experience, and even in Lightning orgs, some admin screens still render in the older Salesforce Classic style. You'll recognize the same toolkit there under **Administer > Manage Users**:

![The Salesforce Classic Setup sidebar, showing Administer expanded to Manage Users, with Users, Adoption Manager, Mass Email Users, Roles, Permission Sets, Profiles, and Public Groups listed.](/courses/salesforce-administration/ch01/01-the-administrator-role/classic-administer-menu.png)
*Salesforce Classic's equivalent menu. Different skin, identical structure — this is why admin skills transfer cleanly across UI generations.*

## What an admin actually controls

Boiled down, a Salesforce administrator's job covers four areas:

| Area | Examples | Covered in |
|---|---|---|
| **Who** | Users, licenses, profiles, permission sets | This chapter |
| **What** | Objects, fields, page layouts, record types | Chapter 3 |
| **How** | Automation, process, apps | Chapter 2 |
| **Safely** | Security settings, sandboxes, change management | Chapter 5 |

This course follows that same order. Chapter 1 is entirely about the first column: deciding who gets into the org, and what they're allowed to do once they're there.

## Key terms

| Term | Meaning |
|---|---|
| Setup | The configuration console every Salesforce admin works in |
| Quick Find | The search box at the top of Setup that jumps straight to any setting |
| Lightning Experience | Salesforce's modern UI, the default for new orgs |
| Salesforce Classic | The older UI, still used by some orgs and some setup pages |
| Administration | The Setup section containing Users, Profiles, Permission Sets, and Roles |

## Check yourself

Without looking back: what are the four areas an admin controls, and which one does this chapter focus on?
