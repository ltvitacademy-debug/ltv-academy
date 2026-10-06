# Script — Networking & Endpoint Security

## Segment 1 (title)

An AI endpoint that answers requests from anywhere on the internet is also an AI endpoint anyone on the internet can try to reach — locking that down is what this lesson is about.

## Segment 2 (screenshot: disable public access)

The first move is the same on a Key Vault, Azure OpenAI, AI Search, or a storage account — disable public access on the resource's Networking tab, so it can no longer be reached by IP address or URL from outside Azure's private network. This is the same checkbox across nearly every Azure service, which makes it one of the highest-leverage habits in this whole course.

## Segment 3 (screenshot: create private endpoint)

Turning off public access alone would cut off legitimate traffic too, so the second step is creating a private endpoint. It gets its own network interface, inside your own virtual network, with a private IP address that only resources in that VNet, or connected to it through peering or a VPN, can reach.

## Segment 4 (screenshot: connection approved)

Back on the original resource, the private endpoint connection shows up waiting for approval. Until it's approved, the connection doesn't actually pass traffic — one more checkpoint between a request and the service actually answering it, and one more place an accidental connection gets caught before it matters.

## Segment 5 (code: what actually changes)

Nothing about the API changes. The SDK calls look identical, the authentication is the same — the only difference is that there's no public IP left for anyone outside the VNet to even find.

## Segment 6 (outro)

Public access off, private endpoint in, connection approved. Next up: once requests are reaching the service safely, how do you make sure it can actually handle a surge of them?
