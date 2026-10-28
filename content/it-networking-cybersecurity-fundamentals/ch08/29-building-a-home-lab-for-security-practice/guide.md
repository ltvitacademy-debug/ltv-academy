# Lesson 29 — Building a Home Lab for Security Practice

**Chapter 8 · Putting It Together: Lab & Capstone · Lesson 29 of 32**

## What you'll learn

- Why a home lab is the single highest-leverage thing you can build before applying for SOC roles
- The free tools a basic lab needs: a hypervisor, an attacker VM, a vulnerable target VM, and a virtual firewall
- How to network those VMs so your practice attacks never touch your real home network or the internet
- The one safety rule that keeps this practice both legal and useful

## Why read about attacks when you can run them

Every chapter so far has explained how networks work and how attacks happen, on paper. A SOC
analyst's job, though, is almost entirely hands-on: staring at real traffic, recognizing a real
pattern, and reacting under real time pressure. There's no substitute for having actually run a
port scan, actually watched a reverse shell connect back, and actually seen what that traffic
looks like in a packet capture. A **home lab** — a small, isolated collection of virtual machines
(VMs) running entirely on one computer — is how you get that experience for free, without needing
a job, a corporate network, or anyone's permission but your own. This is also exactly why this
path's own guidance pointed you toward a structured lab platform like TryHackMe earlier: that
subscription gives you guided, pre-built targets, while the lab in this lesson gives you a sandbox
you fully own and can break in any way you want.

## The pieces of a basic lab

A useful first lab needs only four things, all free:

**A hypervisor.** This is the software that lets one physical computer run several virtual
computers at once. **VirtualBox** (Oracle, fully free) and **VMware Workstation Player** (free for
personal, non-commercial use) are the two realistic choices for a Windows or Linux host; both let
you create a VM, assign it some RAM and disk space, and boot it like a real machine.

**An attacker VM — Kali Linux.** Kali is a Linux distribution that ships pre-loaded with the
security tools this course has referenced: Nmap for scanning, Wireshark for packet capture, and
Metasploit for exploitation. It's free, officially distributed by Offensive Security, and the
standard attacker platform in almost every lab environment you'll encounter afterward, including
on TryHackMe.

**A vulnerable target VM — Metasploitable2.** This is a Linux VM published by Rapid7 built on
purpose to be exploitable — it ships with outdated services and known, well-documented
vulnerabilities. It exists entirely so you have something legal to attack with Kali: scanning it,
exploiting it, and watching what each step looks like from both sides.

**A virtual firewall — pfSense.** pfSense is a free, open-source firewall/router operating system
you can also install as a VM. Adding it isn't required for your first lab, but it lets you place a
real firewall between your attacker and target VMs and start writing rules — the same kind of
device this course's networking chapters already described routers and switches handling, except
now you're configuring the rules yourself.

## Isolating the network: the step that actually matters

The single most important setup step is **network isolation**. Every hypervisor lets you choose
how a VM's virtual network adapter connects: "Bridged" exposes the VM directly on your real home
network and the internet, which you do **not** want for a lab with live exploit traffic. Instead,
set every lab VM's network adapter to a **Host-Only** (VirtualBox) or **Internal Network**
(VMware) connection. That creates a private virtual network that only your lab VMs can see —
nothing you do inside it can reach your router, your other home devices, or the wider internet,
and nothing out there can reach in either. Your Kali VM scanning your Metasploitable2 VM stays
entirely inside your laptop.

## The one rule

Everything you practice in this lab is legal because you own every machine involved and you have
your own permission to attack them. The moment you point any of these same tools at a system you
don't own and don't have explicit written authorization to test, the exact same actions become a
crime under laws like the U.S. Computer Fraud and Abuse Act. The skill is identical either way —
only the authorization changes what it's called.

## Key terms

| Term | Meaning |
|---|---|
| Hypervisor | Software (VirtualBox, VMware) that runs one or more virtual machines on a single physical computer |
| Host-only / internal network | A virtual network reachable only by VMs on the same host — isolated from the real LAN and internet |
| Kali Linux | A free Linux distribution pre-loaded with security tools, used as the standard attacker VM |
| Metasploitable2 | An intentionally vulnerable Linux VM published by Rapid7, built for legal practice targets |
| Snapshot | A saved state of a VM you can instantly roll back to after an experiment goes wrong |

## Check yourself

Why does setting a lab VM's network adapter to "Bridged" defeat the entire purpose of building an
isolated home lab, even if you only ever intend to attack your other lab VMs?
