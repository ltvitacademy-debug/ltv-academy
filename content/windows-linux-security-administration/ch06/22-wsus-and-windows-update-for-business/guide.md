# Lesson 22 — WSUS and Windows Update for Business

**Chapter 6 · Patch Management & Baseline Configuration · Lesson 2 of 4**

## What you'll learn

- The problem both of these tools solve: hundreds or thousands of machines patching in an
  uncontrolled, uncoordinated way
- What WSUS (Windows Server Update Services) is and how it gives an administrator a single
  approval point for updates
- What Windows Update for Business is and how its cloud-based, ring-and-deferral model differs
  from WSUS
- When an organization would reasonably choose WSUS, WUfB, or both

## The problem: every machine fending for itself

Left to its own defaults, every Windows machine checks in with Microsoft directly, downloads
whatever updates apply, and installs them on its own schedule. At home, that's fine. Across a
company with a thousand machines, it's a problem on two fronts: it wastes internet bandwidth
as every single machine separately re-downloads the same multi-gigabyte update, and it gives
IT zero control over *which* updates go out and *when* — an administrator can't hold back a
specific update that's known to cause trouble, or stagger the rollout the way Lesson 21
described. Windows offers two real, different ways to fix this: **WSUS** and **Windows Update
for Business**.

## WSUS: a central approval point

**Windows Server Update Services (WSUS)** is a Windows Server role. A WSUS server downloads
updates from Microsoft once, and every other machine on the network checks WSUS instead of the
internet — one download instead of a thousand. But the real value of WSUS isn't bandwidth, it's
**control**: updates don't reach any client automatically. An administrator reviews each update
in the WSUS console and explicitly **approves** or **declines** it. WSUS also supports
**computer groups** — for example, "Pilot Ring," "Finance Workstations," "Domain Controllers" —
so an approved update can be targeted at one group today and the rest of the organization next
week, which is exactly the staged-rollout pattern from Lesson 21, built directly into the tool.

## Windows Update for Business: cloud-managed rings and deferrals

**Windows Update for Business (WUfB)** takes a different approach: there's no on-premises
server to install or patch yourself. Instead, update behavior is set through policy — Group
Policy, or more commonly a cloud MDM platform like Intune — using **deployment rings** and
**deferral periods**. Rather than approving or declining individual updates one at a time, an
administrator defines a ring (say, "Pilot") that receives updates immediately, and another ring
("Broad") configured with a 14-day **deferral**, so those updates simply don't install until
two weeks after release, giving the pilot ring time to surface problems first. WUfB trades
WSUS's per-update approval granularity for something simpler to operate, especially for devices
that are cloud-managed and rarely, if ever, connect to the corporate network.

## Choosing between them (or combining them)

WSUS fits a traditional environment: machines joined to an on-premises Active Directory domain,
sitting on a network where IT already runs its own servers, and where an administrator wants
fine-grained, update-by-update control. WUfB fits a cloud-managed fleet: laptops enrolled in
Intune, often remote, that may never touch the corporate network at all, where standing up and
maintaining a WSUS server would be extra infrastructure for little benefit. Many real
organizations run both at once, deliberately, during a multi-year transition from on-premises
AD to cloud-managed Entra ID and Intune — WSUS for what's still on-prem, WUfB for what's already
been migrated — rather than treating the choice as permanent or all-or-nothing.

## Key terms

| Term | Meaning |
|---|---|
| WSUS (Windows Server Update Services) | A Windows Server role that centralizes update approval and distribution instead of every machine hitting Microsoft directly |
| Computer group (WSUS) | A named set of machines (e.g. "Pilot Ring") that an approved update can be targeted to |
| Windows Update for Business (WUfB) | Cloud-based, policy-driven update management with no on-premises server, configured via Group Policy or Intune |
| Deployment ring | A group of devices in WUfB that shares the same deferral policy, e.g. Pilot vs. Broad |
| Deferral period | The number of days WUfB waits after release before installing an update on a given ring |

## Check yourself

An organization has 3,000 laptops, all enrolled in Intune, and most employees work remotely
with no VPN connection into the corporate network. Would WSUS or Windows Update for Business
fit this environment better, and why?
