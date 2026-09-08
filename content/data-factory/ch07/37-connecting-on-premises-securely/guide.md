# Lesson 37 — Connecting to On-Premises Data Securely

**Chapter 7 · Integration Runtimes · Lesson 4 of 4**

## What you'll learn

- Exactly which outbound ports and domains a self-hosted IR needs
- Why nothing needs to be opened *inbound*
- How to route the self-hosted IR through a corporate proxy
- What a security review actually needs to see

## The question every network admin asks first

"What do I need to open in the firewall for this?" It's the single
most common blocker to standing up a self-hosted IR in a real
enterprise — and the honest answer is genuinely reassuring: **outbound
only, on port 443.** No inbound rule. No new hole punched in the
firewall for the outside world to reach in.

## The exact traffic pattern

![Diagram showing the self-hosted integration runtime machine reaching outbound through the corporate firewall on port 443 to Azure Data Factory, Azure Relay, the Download Center, and Azure Key Vault.](/courses/data-factory/ch07/37-connecting-on-premises-securely/firewall.png)
*Four outbound HTTPS destinations, all on port 443: Azure Data Factory itself, Azure Relay (for the control channel), the Microsoft Download Center (for updates), and Azure Key Vault (if you're using it for credentials).*

Every one of these connections is **initiated by the self-hosted IR
machine**, not by Azure. That single fact is what makes this
genuinely easy to get approved: standard corporate firewalls already
allow outbound HTTPS by default, so in many environments there's
nothing new to configure at all.

## Routing through a corporate proxy

Plenty of real networks don't allow direct outbound internet access —
everything has to go through an internal proxy first. The
Configuration Manager has a dedicated screen for exactly this:

![Set HTTP Proxy dialog with three options: direct access, system proxy, or a custom proxy with address, port, username, and password fields.](/courses/data-factory/ch07/37-connecting-on-premises-securely/set-http-proxy.png)
*Direct access skips a proxy entirely. System proxy reuses whatever the Windows machine is already configured to use. Custom proxy lets you point at a specific proxy server with its own credentials.*

Once configured, all of the self-hosted IR's outbound traffic —
control channel, data movement, everything — routes through that
proxy, and the same firewall rule (outbound 443, to the same four
destination types) still applies from the proxy's own perspective.

## What a security review actually needs to see

Walking into a real infrastructure security review with this lesson's
diagram covers nearly every question that comes up:

- **No inbound ports.** The self-hosted IR machine accepts nothing
  from the internet — it only ever calls out.
- **A small, well-known destination set.** Not "the whole internet" —
  four specific service domains, documented and stable.
- **Standard HTTPS on 443.** Not a custom port that stands out in
  traffic logs.
- **Credentials never touch the wire in the clear.** Linked service
  credentials are encrypted, and Key Vault integration (Lesson 48)
  keeps secrets out of the pipeline definitions entirely.

## Key terms

| Term | Meaning |
|---|---|
| Outbound-only | The self-hosted IR always initiates its own connections; nothing connects in |
| Azure Relay | The service carrying the self-hosted IR's control-channel traffic to Data Factory |
| HTTP proxy | An internal relay point the self-hosted IR can be configured to route through |

## Lab

1. In the Configuration Manager, open the HTTP proxy settings screen
   and note the three connection options.
2. List the four destination types the self-hosted IR needs outbound
   access to.
3. Write one sentence a network admin could use to justify approving
   this in a security review.

## Check yourself

You're ready for Chapter 8 when you can explain, in one sentence, why
a self-hosted IR needs no inbound firewall rule at all — and why that
matters to whoever approves the security review.
