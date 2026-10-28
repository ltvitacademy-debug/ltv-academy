# Lesson 19 — Public IPs and Azure Load Balancer Basics

**Chapter 5 · Azure Networking · Lesson 19 of 32**

## What you'll learn

- The real difference between a Basic and a Standard Azure Public IP, and why Standard is now the
  only practical choice
- Why a Standard Public IP is secure by default, and what that means for your NSG
- How Azure Load Balancer works as Azure's Layer 4 implementation of the load-balancing concept
- The three pieces every load balancer rule needs: a backend pool, a health probe, and a rule

## Public IP SKUs: Basic vs. Standard

An Azure Public IP resource is what actually gives a VM or load balancer an internet-reachable
address. It comes in two SKUs, and the difference matters:

```
Basic SKU:
  - No availability zone support
  - No SLA
  - Open by default — relies entirely on NSGs to restrict access
  - Retired for new deployments by Microsoft (Basic Public IPs were retired Sept 30, 2025)

Standard SKU:
  - Zone-redundant by default
  - 99.99% SLA when deployed across zones
  - Secure by default — all inbound traffic is denied unless an NSG explicitly allows it
  - Supports the Global tier for cross-region load balancing
```

Standard is the only SKU Microsoft still provisions for new deployments, and it's what this course
uses throughout. Create one with:

```
az network public-ip create \
  --resource-group rg-network-demo \
  --name pip-lb \
  --sku Standard \
  --allocation-method Static
```

Standard SKU public IPs always use static allocation — the address doesn't change once assigned,
which matters for DNS records and firewall allow-lists pointed at it.

## Azure Load Balancer: the Layer 4 implementation

The networking fundamentals course covered load balancing as a general concept — spreading
traffic across multiple backend servers. **Azure Load Balancer** is Azure's specific
implementation, and it's a **Layer 4** device: it distributes TCP and UDP traffic based on IP
address and port, without looking inside the application payload at all (that's what Application
Gateway, a Layer 7 service, is for — out of scope here).

```
az network lb create \
  --resource-group rg-network-demo \
  --name lb-web \
  --sku Standard \
  --public-ip-address pip-lb \
  --frontend-ip-name feConfig \
  --backend-pool-name beWebPool
```

## The three pieces: backend pool, health probe, rule

A working load balancer needs three things wired together:

```
Backend pool  -> the VMs (or NICs) that actually receive the traffic
Health probe  -> a periodic check that marks each backend instance healthy or unhealthy
LB rule       -> maps a frontend IP:port to the backend pool:port, using the probe's results
```

```
az network lb probe create \
  --resource-group rg-network-demo --lb-name lb-web \
  --name healthProbe --protocol Tcp --port 80

az network lb rule create \
  --resource-group rg-network-demo --lb-name lb-web \
  --name httpRule --protocol Tcp \
  --frontend-port 80 --backend-port 80 \
  --frontend-ip-name feConfig --backend-pool-name beWebPool \
  --probe-name healthProbe
```

The probe checks TCP port 80 on every backend instance at a regular interval. Any instance that
fails enough consecutive probes is pulled out of rotation automatically — the load balancer never
sends it new traffic until it passes the probe again. The rule itself just says "traffic arriving
on port 80 at the frontend goes to port 80 on whichever backend pool members the probe currently
considers healthy."

## Why Standard SKU needs an explicit NSG allow

Because a Standard Public IP (and a Standard Load Balancer sitting behind one) is secure by
default, you must attach an NSG to the backend subnet or NICs that explicitly allows the traffic
you expect — port 80/443 from the Internet service tag, for example. Skip that step and the load
balancer's health probes and client traffic alike get silently dropped, even though the load
balancer itself is configured correctly.

## Key terms

| Term | Meaning |
|---|---|
| Standard SKU (Public IP / Load Balancer) | The current-generation SKU: zone-redundant, SLA-backed, secure by default — requires an explicit NSG allow |
| Backend pool | The set of VMs or NICs that a load balancer distributes traffic to |
| Health probe | A periodic TCP/HTTP/HTTPS check that determines whether a backend instance receives traffic |
| Layer 4 load balancing | Distributing traffic by IP address and port only, without inspecting application content |

## Check yourself

A Standard SKU load balancer is fully configured — backend pool, probe, and rule all correct — but
no traffic is reaching the backend VMs. What's the first thing to check, given what you now know
about Standard SKU's default security posture?
