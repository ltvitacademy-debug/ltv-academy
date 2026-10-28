# Lesson 10 — VM Availability Sets and Availability Zones

**Chapter 3 · Azure Compute: Virtual Machines · Lesson 10 of 32**

## What you'll learn

- What an **Availability Set** actually is: fault domains and update domains *inside one
  datacenter* — the older of Azure's two VM-placement protections
- How that's different from an **Availability Zone**, which you already met as a region-level
  concept in the prior course — now applied specifically to where a VM lands
- Why Availability Zones are the stronger, modern choice, and when an Availability Set is still
  what you'd reach for
- How to deploy a VM into each using the Azure CLI

## Availability Sets: protection inside one datacenter

An **Availability Set** is a logical grouping that spreads your VMs across two layers of
isolation *within a single datacenter*: **fault domains** (groups of VMs that share a common
power source and network switch — typically up to 3 per set) and **update domains** (groups that
Azure reboots together during planned host maintenance — typically up to 20 per set). Put two
VMs in an Availability Set, and Azure places them in different fault domains and different update
domains automatically. That protects you against a rack losing power or a maintenance reboot
taking out every instance at once — but all the VMs in an Availability Set still live in the
*same* datacenter. If that entire datacenter goes down, every VM in the set goes down with it.

```
az vm availability-set create \
  --resource-group rg-web-prod \
  --name avset-web \
  --platform-fault-domain-count 2 \
  --platform-update-domain-count 5

az vm create \
  --resource-group rg-web-prod \
  --name vm-web02 \
  --image Ubuntu2204 \
  --size Standard_D2s_v5 \
  --availability-set avset-web \
  --admin-username azureuser \
  --generate-ssh-keys
```

## Availability Zones: protection across datacenters

You already learned, in the networking/cloud fundamentals course, that an **Availability Zone**
is a physically separate datacenter — with its own power, cooling, and network connectivity —
inside the same Azure region. Applied to a VM, that means you can pin an instance to a specific
zone (1, 2, or 3) with `--zone`, and spreading VMs across zones protects you from an *entire
datacenter* failing, not just a rack or a maintenance window inside one. This is the stronger
protection, and it's what AZ-104 and most current Azure architecture guidance point you toward
for production workloads in a region that supports zones.

```
az vm create \
  --resource-group rg-web-prod \
  --name vm-web03 \
  --image Ubuntu2204 \
  --size Standard_D2s_v5 \
  --zone 1 \
  --admin-username azureuser \
  --generate-ssh-keys
```

## Choosing between them

A VM can use an Availability Set *or* a zone assignment — never both; they're mutually exclusive
placement mechanisms. Availability Zones are the modern default whenever the region supports
them: they protect against a bigger failure (a whole datacenter) at the same basic cost model.
Availability Sets still matter in two cases: regions that don't yet offer Availability Zones, and
legacy deployments built before zones existed in that region. If you're designing something new
in a zone-enabled region, reach for zones first.

## Key terms

| Term | Meaning |
|---|---|
| Fault domain | A group of VMs in an Availability Set sharing a power source and network switch |
| Update domain | A group of VMs in an Availability Set rebooted together during planned maintenance |
| Availability Set | Spreads VMs across fault and update domains *within one datacenter* — protects against rack/host failure, not a datacenter outage |
| Availability Zone | A physically separate datacenter within a region — protects against a whole datacenter failing, the stronger option |

## Check yourself

Two VMs are placed in the same Availability Set, in different fault domains, inside
`eastus`. A fire takes out the entire datacenter they're both running in. Does the
Availability Set protect them from this? Why or why not, and what would have?
