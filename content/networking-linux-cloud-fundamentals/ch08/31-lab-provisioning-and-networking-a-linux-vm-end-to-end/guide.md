# Lesson 31 — Lab: Provisioning and Networking a Linux VM End to End

**Chapter 8 · Bringing It Together · Lesson 31 of 32**

## What you'll learn

- How a cloud VM request turns into real decisions about a VNet, a subnet, and a security rule — not just a few clicks
- Why you generate an SSH key pair before the VM exists, and how that replaces a password entirely
- What a locked-down inbound rule for port 22 actually looks like, compared to leaving it open to the world
- Which first-login checks a careful admin runs before calling a new Linux VM "done"

## The request

You're the newest hire on the infrastructure team at Briarcliff Systems, a small logistics
company. Your lead asks you to stand up one Linux VM — a lightweight internal tool runs on it,
nothing public-facing — inside the company's existing Azure Virtual Network. Every piece of this
request maps to something earlier in this course: the VNet and its address space from Lesson 27,
subnets and security groups from Lesson 28, and SSH key-based auth from Lesson 16. This lesson
walks through doing it for real, start to finish.

## Step 1 — Picking the subnet

Briarcliff's VNet is carved up as `10.20.0.0/16`, with an `app` subnet at `10.20.1.0/24` already
holding a couple of internal services. Your new VM belongs there, not in the `10.20.2.0/24` subnet
reserved for anything public-facing — a VM with no reason to be reachable from the internet has no
reason to sit in a subnet that's routed for it. That one placement decision is most of the
network design already made for you, because the subnet's routing and the security group attached
to it were set up with a purpose in mind.

## Step 2 — Generating the SSH key pair

Before the VM exists, you generate a key pair on your own machine:

```
ssh-keygen -t ed25519 -f ~/.ssh/briarcliff-app01 -C "you@briarcliff"
```

This produces a private key that never leaves your laptop and a public key you hand to Azure when
you create the VM. The VM is provisioned with the public key already installed for the `azureuser`
account — there's no password to set, guess, or leak, because password authentication for SSH is
disabled by default. This is the same key-based model from Lesson 16, just arriving from the
provisioning side instead of the connecting side.

## Step 3 — Creating the VM and the inbound rule

The VM itself is an Ubuntu Server 22.04 LTS instance, created into the `app` subnet with the public
key attached. The network security group (NSG) on that subnet needs exactly one inbound allow rule
for this VM: TCP port 22, and — this is the part that's easy to get sloppy on — scoped to
Briarcliff's own office IP range, `203.0.113.0/24`, not to `0.0.0.0/0` ("anywhere"). Opening port
22 to the whole internet is how a brand-new VM ends up fighting off automated login attempts
within hours. Scoping the source address to a known range is the security-group equivalent of a
locked door with a specific key, instead of a door that's just unlocked.

## Step 4 — Connecting

With the VM running and its public IP assigned, the connection itself is one line:

```
ssh -i ~/.ssh/briarcliff-app01 azureuser@20.118.44.7
```

The private key proves you hold the matching half of the key pair Azure installed at boot, the NSG
rule lets that specific traffic from Briarcliff's office range through, and the VM's `sshd`
service — started automatically by `systemd` at boot — accepts the session.

## Step 5 — First-login admin tasks

A VM that boots isn't automatically a VM that's actually ready, so before you tell your lead it's
done, you run a short checklist:

- `systemctl status sshd` — confirms the SSH service itself is active and not just "the port
  happens to be open"
- `sudo apt update` — refreshes the package index so you know what's actually current before you
  install anything
- `sudo apt upgrade` — applies any pending security patches; a fresh image is rarely fully
  up to date
- a look at `/var/log/auth.log` — confirms the only login so far is your own, with nothing
  unexpected already showing up

Only after that short pass do you hand the VM back to your lead as genuinely ready — not just
reachable.

## Key terms

| Term | Meaning |
|---|---|
| VNet / subnet | The isolated network and the address range inside it where a resource is placed |
| Network security group (NSG) | The stateful firewall attached to a subnet or NIC that allows or blocks traffic by port and source |
| SSH key pair | A private key kept locally and a public key installed on the VM, replacing password login |
| systemd | The init system that starts and supervises services like `sshd` at boot |

## Check yourself

Why does scoping the NSG's inbound rule to `203.0.113.0/24` instead of `0.0.0.0/0` matter, even
though both rules technically "let SSH in"?
