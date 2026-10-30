# Lesson 5 — Building the Network Segmentation Plan

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 5 of 26**

## What you'll learn

- How Riverbend's flat network becomes three explicit zones instead of one
- The real VLAN, NSG, and firewall-zone design that carves out the OT/SCADA
  segment
- Why a dedicated jump/DMZ zone sits between corporate IT and OT/SCADA,
  instead of a direct allow rule between the two
- How this plan turns pillar one of the target architecture into something
  with actual rule numbers and subnet ranges

## From "segmented" to a real design

Lesson 4 stated the destination for pillar one in one sentence: no traffic
reaches the OT/SCADA segment unless a specific rule says it can. This
lesson is where that sentence becomes an actual network design — VLANs,
subnets, NSG rules, and a firewall zone diagram Mara can hand to
Hartwell's network team to implement.

## Three zones, not two

The instinct is to think of this as "corporate network" versus "OT/SCADA
network" — two zones, one boundary between them. Mara designs three zones
instead, because a direct boundary between corporate IT and OT/SCADA means
every legitimate access path (an engineer who needs to reach a SCADA
historian, a vendor doing remote maintenance) still has to cross that one
boundary directly, which is exactly the kind of broad "it's needed
sometimes, so allow it generally" rule that caused the Intermediate
project's incident in the first place.

- **Zone 1 — Corporate IT.** Riverbend's existing general-purpose network:
  workstations, printers, office applications. Unchanged in this pilot.
- **Zone 2 — DMZ/Jump Zone.** A new, narrow zone containing only hardened
  jump boxes. This is the *only* path allowed to initiate a connection into
  Zone 3. Nothing in Zone 1 talks to Zone 3 directly, ever.
- **Zone 3 — OT/SCADA.** The isolated segment carrying the substation
  control network and the water-treatment SCADA system, carved onto its
  own VLAN (**VLAN 440**) and its own subnet (`10.40.0.0/24`).

## The Azure side: NSGs on the SCADA gateway subnet

Hartwell's SCADA telemetry flows partly through an Azure-hosted gateway
subnet, `snet-scada-gateway`, which bridges Riverbend's on-prem OT network
to the cloud analytics pipeline. Today its Network Security Group allows
broad inbound access from the whole corporate address space. The target
rule set replaces that with an explicit allow-list, deny-by-default:

```json
{
  "securityRules": [
    {
      "name": "Allow-JumpZone-HTTPS",
      "properties": {
        "priority": 100,
        "direction": "Inbound",
        "access": "Allow",
        "protocol": "Tcp",
        "sourceAddressPrefix": "10.30.0.0/24",
        "destinationPortRange": "443",
        "destinationAddressPrefix": "10.40.0.0/24"
      }
    },
    {
      "name": "Deny-All-Inbound",
      "properties": {
        "priority": 4096,
        "direction": "Inbound",
        "access": "Deny",
        "protocol": "*",
        "sourceAddressPrefix": "*",
        "destinationPortRange": "*",
        "destinationAddressPrefix": "*"
      }
    }
  ]
}
```

Only the DMZ/jump zone's address range (`10.30.0.0/24`) is allowed in, on
port 443, and only that. The low-priority, explicit `Deny-All-Inbound` rule
is what makes this genuinely deny-by-default rather than relying on NSGs'
implicit final deny — it's a visible, auditable statement of intent that
shows up in every rule review, instead of depending on a reviewer
remembering that an unlisted rule means "denied."

## The AWS side: a dedicated VPC with Network Firewall

The OT telemetry that lands in `Hartwell-OT-Analytics` lives in its own VPC,
`vpc-hartwell-scada`, rather than sharing a VPC with other corporate AWS
workloads. AWS Network Firewall sits at that VPC's boundary with a rule
group that mirrors the Azure design's logic: allow inbound only from the
jump zone's IP range on the required port, deny everything else, and log
every denied attempt so the pattern of what's actually being blocked is
visible before it's ever needed for an investigation.

## Why the plan ships in monitor-only mode first

This lesson produces the *plan* — rule sets, zone boundaries, subnet
ranges, written down and reviewed. It does not flip anything into
enforcement yet. Lesson 7, "Rolling Out the Segmentation Pilot," is where
these exact rules get deployed first in a logging/monitor-only mode, so
Mara can see what traffic the new rules *would* have blocked before
anything actually gets blocked — catching a legitimate, previously-unnoticed
dependency before it becomes an outage instead of after.

## Key terms

| Term | Meaning |
|---|---|
| DMZ/jump zone | A narrow intermediary zone containing only hardened jump hosts, through which all access to a protected zone must pass |
| VLAN | A virtual LAN that logically separates traffic on shared physical network hardware |
| Deny-by-default | A rule design where nothing is permitted unless an explicit rule allows it, as opposed to relying on an implicit final deny |
| Network Firewall (AWS) | A managed firewall service enforcing stateful rule groups at a VPC's boundary |

## Lab

1. Sketch the three-zone diagram (Corporate IT, DMZ/Jump Zone, OT/SCADA)
   and label each zone's address range from this lesson.
2. Write the NSG rule, in your own words, that allows the jump zone into
   the SCADA gateway subnet on 443, and explain why an explicit
   `Deny-All-Inbound` rule is still added even though NSGs deny by default.
3. Explain why a direct rule between Zone 1 and Zone 3 was rejected in
   favor of routing everything through Zone 2.

## Check yourself

You're ready for Lesson 6 when you can describe all three zones and their
address ranges from memory, explain why the plan routes every access path
through a jump zone instead of a direct rule, and explain why this plan
ships in monitor-only mode before enforcement.
