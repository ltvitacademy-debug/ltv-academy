# Lesson 1 — Windows Server Roles and What a Domain Controller Does

**Chapter 1 · Windows Server & Active Directory Fundamentals · Lesson 1 of 4**

## What you'll learn

- What a Windows Server "role" is, and how it differs from just installing software
- The five roles you'll meet constantly in the field: AD DS, DNS, DHCP, File Server, and IIS
- What a domain controller actually does — authentication, SYSVOL, and replication
- How roles are installed, both through Server Manager and with PowerShell

## Roles vs. features: what you're actually turning on

A fresh install of Windows Server does almost nothing by itself — it's a blank operating
system until you add **roles**. A role is a major server function: Active Directory
Domain Services, DNS Server, DHCP Server, File and Storage Services, Web Server (IIS), and
others. A **feature**, by contrast, is a smaller supporting capability a role might need,
like .NET Framework or BitLocker Drive Encryption. You add both through the **Add Roles
and Features Wizard** in Server Manager, or from PowerShell:

```
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
```

That one line installs the Active Directory Domain Services role and its management
tools (like Active Directory Users and Computers) in a single step — no wizard clicking
required, which matters once you're standing up more than one server.

## The five roles you'll see constantly

**AD DS (Active Directory Domain Services)** is the identity and authentication backbone
of a Windows network — it's covered in depth for the rest of this chapter, but at its
simplest it's the role that turns a server into a domain controller.

**DNS Server** resolves names to IP addresses, and in a Windows domain it does something
more specific: it's how a workstation finds a domain controller in the first place. AD DS
literally cannot function without DNS, which is why the DNS role is almost always
installed alongside it, often on the same server.

**DHCP Server** hands out IP addresses, default gateways, and DNS server addresses to
devices automatically when they join the network, instead of an administrator typing a
static IP into every machine by hand.

**File and Storage Services (File Server)** turns a server into a shared storage
location — the role behind a mapped network drive like `\\FS01\Finance`, with
permissions controlling who can read or write what (the subject of Lesson 4).

**Web Server (IIS)** hosts websites and web applications on the server, from a simple
internal intranet page to a line-of-business application's front end.

## What a domain controller actually does

Installing the AD DS role and promoting a server to a **domain controller (DC)** gives
that server three concrete jobs, not just "runs Active Directory" as a vague label:

1. **Authentication.** When a user logs into a domain-joined computer, the DC verifies
   the username and password and issues a **Kerberos ticket** — proof of identity the
   user's computer presents to other servers on the network without re-typing a password
   each time.
2. **Hosting SYSVOL.** Every DC stores a shared folder called **SYSVOL**, which holds
   Group Policy Objects and domain logon scripts. When a DC applies a policy to a
   workstation, it's reading that policy out of SYSVOL.
3. **Storing and replicating the AD database.** The actual directory — every user,
   computer, and group object — lives in a database file called `ntds.dit`. In a domain
   with more than one DC, each DC keeps its own full copy and **replicates** changes to
   the others automatically, so creating a user on one DC propagates to the rest.

## A concrete example: logging into a domain-joined laptop

A user turns on a laptop joined to the `contoso.com` domain and types their password.
The laptop doesn't check that password itself — it sends a request to a domain
controller, which checks the credentials against its copy of the AD database and, if
they match, issues a Kerberos ticket. That ticket is what lets the user then open a file
on a file server or print to a network printer without logging in again. If every DC in
the site were offline, the user with a cached credential could still log into that one
laptop, but nothing requiring a live ticket — a new file share, a new application login —
would work until a DC answered again.

## Key terms

| Term | Meaning |
|---|---|
| Role | A major server function added through Server Manager or `Install-WindowsFeature`, e.g. AD DS, DNS, DHCP |
| Domain controller (DC) | A server running AD DS that authenticates logons and hosts a copy of the AD database |
| SYSVOL | The shared folder on every DC holding Group Policy Objects and logon scripts |
| Kerberos ticket | Proof of identity a logged-in user's computer presents to other servers, issued by a DC after authentication |
| Replication | The automatic process by which DCs keep their copies of the AD database in sync |

## Check yourself

Why does the DNS Server role almost always get installed on the same server as AD DS,
rather than being optional?
