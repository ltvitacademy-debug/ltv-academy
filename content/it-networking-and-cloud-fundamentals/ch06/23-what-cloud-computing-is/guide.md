# What Cloud Computing Is

The last chapter was about fixing networks that already exist — this one is about where those networks, and the servers behind them, increasingly live. Everything from Chapter 1 onward assumed hardware you could point at: a server in a rack, a hypervisor carving it into VMs. Cloud computing takes that same hardware and rents it to you, by the hour, from a data center you'll never see.

## What you'll learn

- The actual definition of cloud computing, beyond the marketing term
- The five characteristics that distinguish "cloud" from just "someone else's server"
- Why renting capacity changes the economics of running IT, not just the location
- How this chapter connects what you already know about servers and VMs to the cloud providers that host them at scale

## Renting instead of owning

Until now, "a server" has meant physical hardware someone owns — bought, racked, powered, and patched by whoever needs it. Cloud computing is the delivery of computing resources — servers, storage, databases, networking — over the internet, on demand, from a provider who owns and maintains the physical hardware. Northbridge Retail used to run its checkout database on a physical server in a back room at headquarters. Today that same database runs on a cloud provider's hardware, accessed over the internet, billed by usage — same logical database, completely different ownership model underneath it.

## The five characteristics that make it "cloud"

Not every rented server qualifies as cloud computing. The widely used NIST definition lists five traits that, together, separate genuine cloud computing from traditional hosting:

- **On-demand self-service** — a user provisions resources themselves, through a console or API, without calling anyone
- **Broad network access** — resources are reachable over the internet from any standard device
- **Resource pooling** — the provider's physical hardware serves many customers at once, invisibly to each of them (this is the multi-tenancy that Chapter 1's hypervisor lesson made possible in the first place)
- **Rapid elasticity** — capacity scales up or down in minutes, not weeks
- **Measured service** — usage is metered, and billing reflects exactly what was consumed

Traditional hosting providers might offer some of these. A true cloud platform offers all five together.

## Why this changes the economics

Owning hardware means buying for peak demand that might only happen a few days a year, and paying for that capacity every other day too. Northbridge Retail's Black Friday traffic is twenty times a normal Tuesday — under the old model, their servers sat mostly idle 358 days a year to be ready for the other 7. Cloud elasticity turns that fixed cost into a variable one: provision extra capacity for the surge, then release it the moment traffic drops back down, paying only for what was actually used.

## Key terms

| Term | Meaning |
|---|---|
| Cloud computing | On-demand delivery of computing resources over the internet, billed by usage |
| Elasticity | The ability to scale capacity up or down quickly to match actual demand |
| Resource pooling | A provider's physical hardware serving many customers at once, invisibly |
| Measured service | Billing based on metered, actual consumption rather than a flat fee |
