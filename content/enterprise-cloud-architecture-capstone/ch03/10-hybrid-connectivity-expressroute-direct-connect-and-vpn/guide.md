# Lesson 10 — Hybrid Connectivity: ExpressRoute, Direct Connect, and VPN

**Chapter 3 · Network Architecture at Enterprise Scale · Lesson 2 of 4**

## What you'll learn

- What a dedicated circuit (Azure ExpressRoute, AWS Direct Connect)
  actually is, and why it behaves differently from any connection
  that rides over the public internet
- How site-to-site VPN compares on cost, throughput, and setup time
  — and why it's often the right call even in an enterprise design
- The real provisioning mechanics: ExpressRoute peering locations and
  circuits, Direct Connect virtual interfaces (VIFs) and Direct
  Connect Gateway
- How to decide between a dedicated circuit and VPN for a given
  workload, and why many enterprise designs end up using both

## Two fundamentally different kinds of hybrid link

Every enterprise cloud design eventually needs a path back to
on-premises — a data center that isn't moving anytime soon, a branch
office, or another cloud. There are really only two mechanisms for
that path: a **dedicated, private circuit** that never touches the
public internet, or a **VPN tunnel** that rides over the public
internet but encrypts everything inside it. They are not simply
"expensive" and "cheap" versions of the same thing — they have
different failure characteristics, different SLAs, and different
lead times to stand up, and a real architecture decision weighs all
three, not just price.

## Azure ExpressRoute: a dedicated circuit through a connectivity provider

ExpressRoute connects on-premises to Azure through a **peering
location** — a facility operated by a connectivity provider (a
telecom or colo operator) where Microsoft has a presence. The
customer (or more often their network provider) establishes a
**circuit** at that peering location, and that circuit carries
traffic to Azure entirely over private infrastructure, never
touching the public internet. There are two relevant peering types:
**private peering**, which reaches Azure VNets, and **Microsoft
peering**, which reaches public Microsoft services like Azure Storage
or Office 365 without a public IP route. A separate feature,
**ExpressRoute Global Reach**, connects two on-premises sites to each
other through the Microsoft backbone — useful when two data centers
both already have ExpressRoute circuits and need to talk to each
other without a separate WAN link.

Setting up the Azure side looks like this once the physical circuit
exists:

```
az network express-route create \
  --resource-group hub-rg \
  --name primary-circuit \
  --provider "Equinix" \
  --peering-location "Washington DC" \
  --bandwidth 1000 \
  --sku-family MeteredData \
  --sku-tier Standard

az network express-route gateway connection create \
  --resource-group hub-rg \
  --gateway-name hub-er-gateway \
  --name er-connection \
  --circuit-name primary-circuit
```

The bandwidth, SKU tier, and peering location are all decided before
any Azure configuration happens — they're a conversation with a
connectivity provider, and that conversation, plus physical circuit
provisioning, is usually the slowest part: weeks to months, not
minutes.

## AWS Direct Connect: the same idea, AWS's terms

AWS Direct Connect is architecturally the same answer — a dedicated
connection from on-premises to AWS through a Direct Connect location,
again provisioned through a connectivity partner. The AWS-side
concept to know is the **virtual interface (VIF)**: a private VIF
reaches a VPC (through a virtual private gateway or Direct Connect
Gateway), while a public VIF reaches AWS public services like S3
without the traffic going over the internet. For organizations with
more than one VPC or more than one region to reach, a **Direct
Connect Gateway** sits between the physical connection and multiple
VPCs so one circuit can serve many attachments instead of needing a
separate connection per VPC:

```
aws directconnect create-connection \
  --location "EqDC2" \
  --bandwidth "1Gbps" \
  --connection-name "primary-dx-connection"

aws directconnect create-private-virtual-interface \
  --connection-id dxcon-fguhmqlc \
  --new-private-virtual-interface '{
    "virtualInterfaceName": "prod-vif",
    "vlan": 101,
    "asn": 65000,
    "directConnectGatewayId": "abcd1234-ab12-cd34-ef56-abcdef123456"
  }'
```

## Site-to-site VPN: lower cost, faster to stand up, lower throughput ceiling

A **site-to-site VPN** connects on-premises to a VNet or VPC over the
public internet, with IPsec encrypting everything in transit. Both
clouds support it natively — an Azure VPN Gateway or an AWS Site-to-
Site VPN attached to a virtual private gateway or Transit Gateway —
and both can typically be stood up in a matter of hours once the
on-premises firewall or router supports IPsec, versus the weeks to
months a dedicated circuit takes. The tradeoff is throughput and
predictability: VPN traffic still crosses the public internet, so
its latency and available bandwidth aren't guaranteed the way a
dedicated circuit's are, and most VPN gateway SKUs top out well below
what a serious ExpressRoute or Direct Connect circuit can sustain.

## Choosing, and why many designs use both

The decision isn't really "dedicated circuit or VPN" as a single
platform-wide choice — it's a per-workload, per-site question:

- **High, sustained throughput with a predictable SLA** (a data
  warehouse replicating continuously, a trading floor, a large file
  migration): dedicated circuit. The cost and lead time are justified
  by what's riding on it.
- **A branch office, a dev/test environment, or a site that just
  needs connectivity quickly while a circuit is being provisioned**:
  VPN. Lower cost, no peering-location dependency, live in hours.
- **Production traffic that cannot tolerate an outage**: both,
  together. A VPN configured as an automatic failover path for an
  ExpressRoute or Direct Connect circuit is a standard enterprise
  pattern — if the dedicated circuit goes down, routing fails over to
  the VPN tunnel, at reduced throughput but without a hard outage.

That last pattern is worth internalizing: a dedicated circuit is not
inherently more reliable than a VPN in the sense of avoiding all
outages — a backhoe can cut a dedicated circuit's fiber exactly as
easily as it can disrupt internet transit. The resilience comes from
having two independent paths, not from either path alone.

## Key terms

| Term | Meaning |
|---|---|
| ExpressRoute circuit | A dedicated, private Azure connection established at a peering location through a connectivity provider |
| Private peering / Microsoft peering | ExpressRoute peering types reaching Azure VNets versus public Microsoft services, without a public internet route |
| Direct Connect VIF | A virtual interface on an AWS Direct Connect connection — private VIFs reach VPCs, public VIFs reach AWS public services |
| Direct Connect Gateway | Lets one physical Direct Connect connection serve multiple VPCs/regions instead of one connection per VPC |
| Site-to-site VPN | An IPsec-encrypted tunnel over the public internet connecting on-premises to a VNet/VPC; faster to provision, lower throughput ceiling than a dedicated circuit |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
is a dedicated circuit not automatically "more reliable" than a VPN,
and what specific enterprise pattern uses both together to actually
get real resilience?
