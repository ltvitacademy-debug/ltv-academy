# Lesson 3 — Managing Users and Groups in Active Directory

**Chapter 1 · Windows Server & Active Directory Fundamentals · Lesson 3 of 4**

## What you'll learn

- How to create and manage users and groups with Active Directory Users and Computers (`dsa.msc`)
- The difference between a security group and a distribution group, and why it matters
- The three group scopes — domain local, global, and universal — at a basic level
- The PowerShell cmdlets that do the same work faster: `New-ADUser` and `Add-ADGroupMember`

## Active Directory Users and Computers (ADUC)

The classic tool for managing AD objects by hand is **Active Directory Users and
Computers**, opened by running `dsa.msc` on a domain controller or any machine with the
Remote Server Administration Tools installed. It shows your domain's OU structure in a
tree on the left — the same OUs from Lesson 2 — and lets you right-click to create a new
user, group, or computer object inside whichever OU you've selected. For a handful of
accounts, ADUC is perfectly fine. For dozens or hundreds, it gets slow fast, which is
where PowerShell comes in later in this lesson.

## Security groups vs. distribution groups

AD lets you create two fundamentally different kinds of groups, and mixing them up is a
common early mistake:

- A **security group** can be granted permissions — to a file share, a printer, an
  application. It's a security principal: you can put it in an NTFS permission list or a
  GPO security filter, and anything in that group inherits the access.
- A **distribution group** exists purely for email distribution lists (most commonly
  through Exchange or Microsoft 365) and **cannot** be granted permissions to anything. It
  has no security identifier that NTFS or a GPO can act on.

In practice, most organizations create security groups by default, even for groups that
are mainly used for email, because a security group can also receive mail — a
distribution group can't also grant access. The reverse mistake, trying to grant file
access to a distribution group, simply fails silently: the group shows up in the
permissions list, but nobody in it actually gets access.

## Group scope: domain local, global, universal

Beyond the security/distribution split, every group also has a **scope**, which
controls where it can be used and who can be a member:

- **Domain local** groups can contain members from any domain in the forest, but can
  only be granted permissions to resources *within their own domain*. They're typically
  used to actually assign permissions — e.g., a "Finance-Share-RW" domain local group
  applied directly to a file share's permissions.
- **Global** groups can only contain members from their own domain, but can be used to
  grant permissions anywhere in the forest. They're typically used to represent a
  real-world collection of people — e.g., "Finance-Employees" — and are then nested
  *inside* a domain local group that holds the actual permission.
- **Universal** groups can contain members from any domain and be used anywhere in the
  forest, but require a multi-domain forest with Global Catalog visibility to matter —
  in a single-domain environment, they behave almost identically to global groups.

The common pattern worth remembering is **A-G-DL-P**: Accounts go into Global groups,
Global groups go into Domain Local groups, and the Domain Local group gets the
Permission. A "Finance-Employees" global group (the people) nested inside a
"Finance-Share-RW" domain local group (the permission) is exactly that pattern in
miniature.

## Doing it with PowerShell

The same work ADUC does with clicks, PowerShell does with cmdlets — faster, and
scriptable for bulk changes:

```
New-ADUser -Name "Jordan Lee" -SamAccountName "jlee" -UserPrincipalName "jlee@contoso.com" -Path "OU=Users,OU=Finance,DC=contoso,DC=com" -Enabled $true -AccountPassword (Read-Host -AsSecureString "Enter password")

Add-ADGroupMember -Identity "Finance-Employees" -Members "jlee"
```

The first line creates a user named Jordan Lee inside the Finance OU's Users container.
The second adds that new user to the "Finance-Employees" global group — the same
A-G-DL-P pattern, done in two lines instead of a dozen clicks, and easy to repeat for
twenty new hires in a loop instead of twenty separate trips through a wizard.

## Key terms

| Term | Meaning |
|---|---|
| ADUC (`dsa.msc`) | The graphical tool for managing AD users, groups, and computers by OU |
| Security group | A group that can be granted permissions to resources; has a security identifier |
| Distribution group | A group used only for email distribution; cannot be granted permissions |
| Group scope | Domain local, global, or universal — controls where a group can be used and who can join it |
| A-G-DL-P | The standard nesting pattern: Accounts into Global groups, Global into Domain Local, Domain Local gets the Permission |

## Check yourself

A manager asks you to give the "Finance-Employees" distribution group access to a new
file share. What will actually happen when you try, and why?
