# Lesson 9 — Creating and Sizing an Azure Virtual Machine

**Chapter 3 · Azure Compute: Virtual Machines · Lesson 9 of 32**

## What you'll learn

- What `az vm create` actually provisions behind the scenes — it's never just "a VM"
- The real VM size families you'll choose between: **B-series** (burstable), **D-series**
  (general purpose), and **F-series** (compute-optimized), and how to pick the right one
- Where the operating system image comes from — Azure Marketplace images, referenced by alias
  or full URN
- How to read and run a complete `az vm create` command with intent, not by copy-pasting

## What `az vm create` actually provisions

A single `az vm create` command doesn't just create a virtual machine — it provisions a small
bundle of resources inside the resource group you point it at: the VM itself, an OS disk, a
network interface (NIC), and, unless you tell it otherwise, a public IP address and a network
security group with a default inbound rule (port 22 for Linux, port 3389 for Windows). If you
don't specify a virtual network, Azure creates a default one for you. Understanding that one
command touches several resources matters the moment something doesn't work — you're not
troubleshooting "the VM," you're troubleshooting one specific piece of that bundle.

```
az vm create \
  --resource-group rg-web-prod \
  --name vm-web01 \
  --image Ubuntu2204 \
  --size Standard_D2s_v5 \
  --admin-username azureuser \
  --generate-ssh-keys
```

## VM size families: picking by workload, not by habit

Every Azure VM size belongs to a **family**, and the family tells you what the hardware is
optimized for:

- **B-series (Burstable)** — e.g. `Standard_B1s`, `Standard_B2s`. These get a baseline amount of
  CPU performance and accumulate credits when idle, which they can spend to burst above baseline
  for short periods. Cheap, and a good fit for dev/test boxes, small web servers, and anything
  with low, spiky traffic that doesn't need sustained full CPU.
- **D-series (General purpose)** — e.g. `Standard_D2s_v5`, `Standard_D4s_v5`. A balanced ratio of
  CPU to memory with no bursting behavior — consistent performance all the time. This is the
  default choice for most production application servers and small-to-medium databases.
- **F-series (Compute-optimized)** — e.g. `Standard_F4s_v2`. A high CPU-to-memory ratio: more
  processing power per GB of RAM than D-series. Fits batch processing, analytics jobs, and web or
  application servers under heavy CPU load where memory isn't the bottleneck.

The pattern to internalize: unpredictable light load → B-series; steady production workload →
D-series; CPU-hungry workload → F-series. (Azure also has memory-optimized E-series for workloads
like in-memory caches, but B/D/F cover the vast majority of administrator decisions.)

## Images: Marketplace aliases and URNs

`--image Ubuntu2204` in the command above is a shorthand **alias** for a published Azure
Marketplace image. Under the hood, every Marketplace image has a full **URN** —
`publisher:offer:sku:version` — such as
`Canonical:0001-com-ubuntu-server-jammy:22_04-lts-gen2:latest`. Aliases exist for the most common
images so you don't have to type the full URN every time; `az vm image list --output table`
shows you what's available when an alias doesn't exist for the image you need. Marketplace images
are Microsoft- or vendor-published and patched regularly — a **custom image** (captured from a VM
you've already configured) is a later-course topic, not something you reach for on day one.

## Key terms

| Term | Meaning |
|---|---|
| `az vm create` | The CLI command that provisions a VM plus its OS disk, NIC, and (by default) a public IP and NSG |
| VM size family | A hardware profile — e.g. B (burstable), D (general purpose), F (compute-optimized) — that determines the CPU-to-memory balance |
| Marketplace image | A published, maintained OS image referenced by a short alias (`Ubuntu2204`) or a full URN (`publisher:offer:sku:version`) |
| URN | `publisher:offer:sku:version` — the full identifier behind every Marketplace image alias |

## Check yourself

A team needs a small internal dev/test VM that sits mostly idle and only sees traffic a few times
a day. A second team needs a production application server that needs steady, predictable CPU
all day long. Which size family fits each, and why?
