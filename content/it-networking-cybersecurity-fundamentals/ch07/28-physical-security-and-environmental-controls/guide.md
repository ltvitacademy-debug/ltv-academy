# Lesson 28 — Physical Security and Environmental Controls

**Chapter 7 · Security Policy, Governance & Defense in Depth · Lesson 28 of 32**

## What you'll learn

- Why physical security is still cybersecurity — someone walking out with a server is a confidentiality AND an availability failure
- Real physical access controls: badge access, mantraps, security cameras, and visitor logs
- Real environmental controls that protect the hardware itself: HVAC/cooling, fire suppression, and UPS/backup power
- Why a data center can have perfect firewalls and still fail completely from a physical or environmental gap

## Physical security is part of the CIA triad, not separate from it

It's easy to think of "cybersecurity" as purely digital — firewalls, encryption, malware. But the CIA triad (Confidentiality, Integrity, Availability) doesn't care whether a threat is digital or physical. If someone walks into a server room and physically removes a drive, that's a **confidentiality** failure — the data on it is now exposed to whoever took it. It's simultaneously an **availability** failure — the system that depended on that drive is now down. No firewall rule, no password policy, no amount of network segmentation matters if an attacker can simply walk up to the hardware and take it, unplug it, or destroy it. Physical security is the layer underneath every other layer in the defense-in-depth model from Lesson 25.

## Physical access controls

**Badge access** restricts entry to a building or specific room to people holding an authorized card, and logs every entry attempt — who went in, where, and when. **Mantraps** are a pair of interlocking doors where the second door won't open until the first one closes and the person is verified, preventing "tailgating" where an unauthorized person slips in right behind someone authorized. **Security cameras** record activity around entrances, server rooms, and sensitive areas, both as a deterrent and as evidence after the fact. **Visitor logs** record every non-employee who enters a facility — name, time in, time out, who they're visiting — so there's always a record of who was physically present, even people without their own badge. A data center's server room typically layers several of these together: a badge gets you into the building, a different badge (and often a mantrap) gets you into the server room itself, and cameras cover both.

## Environmental controls

Getting into the room physically isn't the only risk — the environment inside the room can threaten hardware just as much as an intruder. **HVAC/cooling** keeps server rooms and data centers within a safe temperature and humidity range; servers generate enormous heat, and without proper cooling, hardware overheats and fails, which is an availability problem at scale. **Fire suppression systems** in server rooms use specialized agents (not sprinklers, which would destroy electronics with water) designed to put out a fire while minimizing damage to the equipment itself. **UPS (Uninterruptible Power Supply) and backup power** keep systems running through a power outage — a UPS bridges the gap for minutes so a graceful shutdown or a generator can take over, and a full backup generator can keep a data center running for hours or days during an extended outage.

## Why this still matters in a cloud-first world

Even organizations that run everything in the cloud still depend on physical security — it's just managed by the cloud provider instead of the company itself. Major cloud providers publish extensive documentation about their own badge access, mantraps, cameras, and environmental controls precisely because customers need to trust that layer is handled, even though they'll never see the data center in person. Physical and environmental security doesn't go away when a company moves to the cloud; responsibility for it just shifts to someone else.

## Key terms

| Term | Meaning |
|---|---|
| Mantrap | A pair of interlocking doors that verifies one person at a time, preventing tailgating into a secure area |
| Visitor log | A record of every non-employee entering a facility, including time in/out and who they're visiting |
| HVAC | Heating, ventilation, and air conditioning — environmental control that keeps hardware within a safe temperature/humidity range |
| Fire suppression | A fire-fighting system designed for server rooms that avoids water-based damage to electronics |
| UPS | Uninterruptible Power Supply — battery backup bridging a power outage until shutdown or generator power takes over |

## Check yourself

A company has excellent firewalls, strong passwords, and full disk encryption, but its server room door is propped open and unlocked during business hours. Which part(s) of the CIA triad does that physical gap actually put at risk, and why does the encryption not fully solve the problem?
