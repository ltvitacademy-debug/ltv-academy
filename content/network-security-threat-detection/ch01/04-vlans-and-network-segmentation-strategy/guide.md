# Lesson 4 — VLANs and Network Segmentation Strategy

**Chapter 1 · Firewall Architecture & Network Segmentation · Lesson 4 of 4**

## What you'll learn

- What a **VLAN (virtual LAN)** is, and how it logically splits one physical network into separate broadcast domains
- How **802.1Q tagging** lets a single physical switch carry traffic for multiple VLANs at once
- The real segmentation strategy behind separating servers, workstations, guest Wi-Fi, and IoT devices
- Why that separation matters: a compromise in one segment shouldn't automatically reach another

## One physical network, many logical ones

Physically, a building might have one set of switches and one set of cabling connecting every device in it — servers, employee workstations, the guest Wi-Fi access point, a handful of IoT devices like smart thermostats or security cameras. Without any further configuration, all of those devices share the same **broadcast domain**: broadcast traffic from any one of them reaches every other device on that same physical network, and in many default configurations, devices can reach each other directly too.

A **VLAN (virtual LAN)** solves this without requiring separate physical cabling for every group of devices. By configuring the switches themselves, an administrator can logically divide one physical network into multiple separate broadcast domains — devices assigned to VLAN 10 behave as if they're on an entirely different network from devices assigned to VLAN 20, even though every one of them might be plugged into the exact same physical switch.

## 802.1Q: how one switch port carries multiple VLANs

For VLANs to work across multiple switches, or across a single link carrying traffic for more than one VLAN at once, switches need a way to mark which VLAN each frame belongs to as it crosses that shared link. **802.1Q tagging** is the standard that does this: it inserts a small tag into the Ethernet frame identifying its VLAN membership before the frame crosses a trunk link between switches, and the receiving switch reads that tag to know which VLAN to deliver the frame into.

**Concrete example:** a single physical trunk cable connects two switches in a building. Devices on VLAN 10 (servers) and VLAN 20 (workstations) are both plugged into ports on each switch. As a frame from a VLAN 10 device crosses the trunk link, it's tagged as VLAN 10 under 802.1Q; the receiving switch sees that tag and only delivers it to other VLAN 10 ports, never to a VLAN 20 port — even though both VLANs' traffic physically shares that same trunk cable.

## The real segmentation strategy: separating by risk and role

VLANs are the mechanism; **network segmentation strategy** is the decision about how to actually group devices. The common real-world pattern is separating devices by role and risk level: servers in one segment, employee workstations in another, guest Wi-Fi in its own isolated segment, and IoT devices (often the least securable, least monitored devices on a network) in their own segment as well.

The reasoning is direct: a guest connecting to guest Wi-Fi has no legitimate reason to reach the internal file server, and a compromised IoT device — historically a common entry point for attackers, since many ship with weak default credentials and rarely receive security updates — shouldn't be able to reach employee workstations or servers just because it happens to share the same building's network. By keeping those groups in separate VLANs with firewall rules controlling what little traffic is allowed to cross between them, a compromise that starts in one segment doesn't automatically spread into every other segment on the network.

## Key terms

| Term | Meaning |
|---|---|
| VLAN (virtual LAN) | A logical division of one physical network into separate broadcast domains, configured on the switches |
| Broadcast domain | The set of devices that receive each other's broadcast traffic |
| 802.1Q tagging | The standard that tags Ethernet frames with VLAN membership so a shared trunk link can carry multiple VLANs |
| Network segmentation | The strategy of grouping devices (servers, workstations, guest Wi-Fi, IoT) by role and risk to limit how far a compromise can spread |

## Check yourself

A guest Wi-Fi network and the internal file servers sit on the same physical switches but different VLANs. Why doesn't a guest's laptop being infected with malware put the internal file servers at risk, and what role does 802.1Q tagging play in making that separation possible on shared cabling?
