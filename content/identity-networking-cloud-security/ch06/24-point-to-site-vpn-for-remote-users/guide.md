# Lesson 24 — Point-to-Site VPN for Remote Users

**Chapter 6 · Private Connectivity: VPN & Dedicated Circuits · Lesson 24 of 32**

## What you'll learn

- What point-to-site (P2S) VPN is, and how it differs from site-to-site VPN at the most basic
  level — a single device, not a whole network
- The real client-side pieces: Azure VPN Client, AWS Client VPN, certificate- and Azure AD-based
  authentication
- The specific use case this solves that neither site-to-site VPN nor ExpressRoute solves
- How this closes out the private-connectivity picture before the course turns to compliance

## One device, not one network

Everything in this chapter so far connected **whole networks**: a site-to-site VPN links an entire
on-prem office to a VNet or VPC; ExpressRoute and Direct Connect do the same over a dedicated
circuit. **Point-to-site (P2S) VPN** connects a **single device** — one laptop, directly — into a
VNet or VPC, without that laptop needing to be on the office network at all. The "point" is the
individual machine; the "site" is the cloud network it's reaching. Where site-to-site VPN needs a
VPN device configured at a physical location, point-to-site needs nothing at the user's location
except a VPN client application and valid credentials.

## The client-side pieces

In Azure, a user installs the **Azure VPN Client** (or configures a built-in OS VPN client using a
protocol Azure supports, such as OpenVPN or IKEv2), and authenticates either with a certificate
issued to their device or through **Microsoft Entra ID** sign-in, depending on how the VPN gateway
is configured:

```
Remote laptop (anywhere with internet)
       |
       |  Azure VPN Client -- authenticates via certificate or Entra ID
       v
Azure VPN Gateway (point-to-site configuration)
       |
       v
Private resources inside the VNet
```

AWS's equivalent is **AWS Client VPN**, an endpoint the user's OpenVPN-based client connects to,
authenticated via certificates, Active Directory, or federated SSO. In both cases, once connected,
the laptop behaves — for the duration of that session — as if it had a private IP address inside
the cloud network, able to reach private resources that aren't exposed to the public internet at
all.

## The problem this actually solves

The specific scenario point-to-site solves: a remote employee who needs direct access to private
cloud resources — an internal database, an admin console with no public endpoint — **without**
first connecting through a full office VPN or physically being on a corporate network. Before P2S
existed as a clean option, the common workaround was routing everything through a site-to-site VPN
back to the office first, then from the office network out to the cloud — extra latency, extra
infrastructure, and a dependency on the office network being up at all. P2S skips that chain
entirely: the laptop talks to the cloud gateway directly, nothing else has to be reachable in
between.

## Key terms

| Term | Meaning |
|---|---|
| Point-to-site (P2S) VPN | A VPN connecting one individual device directly into a VNet/VPC, not a whole network |
| Azure VPN Client | The client application a remote device uses to establish a P2S connection to Azure |
| AWS Client VPN | AWS's equivalent client-based VPN endpoint for individual remote devices |
| Certificate/Entra ID authentication | The two common ways a P2S client authenticates to the Azure VPN Gateway |

## Check yourself

Why can't site-to-site VPN by itself solve the "remote employee needs direct cloud access" problem
the way point-to-site VPN does, even though both ultimately rely on the same IPsec/VPN technology
family?
