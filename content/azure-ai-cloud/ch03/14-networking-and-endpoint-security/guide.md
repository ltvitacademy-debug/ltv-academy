# Lesson 14 — Networking & Endpoint Security

**Chapter 3 · Cloud Infrastructure Basics for AI · Lesson 14 of 24**

## What you'll learn

- Why a public AI endpoint is reachable by more than just your own app
- Disabling public access — the same setting across nearly every Azure service
- What a private endpoint actually is, and why disabling public access alone isn't enough
- Why the private endpoint connection needs to be approved before it works
- What actually changes for your application's code (nothing) vs. the network (everything)

## The problem: reachable means reachable by anyone

An AI endpoint that answers requests from anywhere on the internet is also
an AI endpoint anyone on the internet can try to reach. That's true of a
Key Vault, an Azure OpenAI deployment, an AI Search service, or a storage
account holding the documents behind a RAG pipeline — any of them, left
on their default public endpoint, accepts connection attempts from
outside Azure entirely.

## Step one: turn off public access

The fix starts the same way on nearly every Azure service — the
resource's Networking tab, disabling public access:

![Creating a Key Vault with public access disabled — the same Networking tab exists on Azure OpenAI, AI Search, and Storage.](/courses/azure-ai-cloud/ch03/14-networking-and-endpoint-security/keyvault-networking-tab.png)

Once public access is off, the resource can no longer be reached by IP
address or URL from outside Azure's private network — not by an attacker,
and not by your own app either, until the next step is in place.

## Step two: create a private endpoint

Turning off public access alone would cut off legitimate traffic too, so
the second step is a private endpoint:

![The private endpoint wizard — it gets its own NIC, inside your own VNet, with a private IP address.](/courses/azure-ai-cloud/ch03/14-networking-and-endpoint-security/create-private-endpoint-basics.png)

A private endpoint gets its own network interface, inside your own
virtual network, with a private IP address. Only resources inside that
VNet — or connected to it through peering or a VPN — can reach the
service through it.

## Step three: the connection gets approved

Creating the private endpoint isn't the last step. Back on the original
resource, the connection shows up waiting for approval:

![Back on the resource's Networking blade, the Private endpoint connections tab — this is where a new connection waits for Approve before any traffic flows.](/courses/azure-ai-cloud/ch03/14-networking-and-endpoint-security/private-endpoint-connections.png)

That Approve button, grayed out here because no connection exists yet, is
where a pending connection actually gets let through. Until it's
approved, the connection doesn't pass traffic — one more checkpoint
between a request and the service actually answering it.

## What changes, and what doesn't

```
Public endpoint:   AI service reachable from the internet
Private endpoint:  AI service reachable only from inside the VNet
```

Nothing about the API changes — the SDK calls and authentication look
identical. The only real difference is there's no public IP left for
anyone outside the VNet to even find.

## Key terms

| Term | Meaning |
|---|---|
| Public access | Default setting letting a resource be reached from any network |
| Private endpoint | A NIC inside your VNet with a private IP, giving private-only access to a resource |
| VNet (virtual network) | Your own isolated network inside Azure |
| Connection approval | A private endpoint connection must be approved on the resource before traffic flows |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: if you
disable public access on a resource but never create a private endpoint,
what actually happens to your own application's requests?
