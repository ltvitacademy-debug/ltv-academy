# Lesson 15 — Private Endpoints and PrivateLink: Keeping Traffic Off the Public Internet

**Chapter 4 · Network Security Across Both Clouds · Lesson 3 of 4**

## What you'll learn

- How an Azure Private Endpoint gives a PaaS resource a private IP inside
  your own VNet, and why Private DNS Zones are what make it transparent
- How AWS PrivateLink's Interface VPC Endpoint compares — and how it
  differs structurally when you're the consumer versus the provider
- Why an AWS Gateway Endpoint (S3, DynamoDB) is a genuinely different
  mechanism from an Interface Endpoint, with no exact Azure equivalent
- Why a Private Endpoint/PrivateLink design removes an entire class of
  risk that an NSG or Security Group rule can only ever mitigate

## Azure Private Endpoint: a NIC for one specific resource instance

A **Private Endpoint** creates a network interface with a private IP
address, inside your own VNet subnet, that maps to one specific instance
of a PaaS resource — a particular storage account, a particular Azure SQL
server, a particular Key Vault. Traffic from your VNet to that endpoint
never leaves the Microsoft backbone and never touches the resource's
public endpoint at all.

```
az network private-endpoint create \
  --name pe-storage-prod \
  --resource-group rg-prod \
  --vnet-name vnet-hub \
  --subnet subnet-pe \
  --private-connection-resource-id /subscriptions/.../storageAccounts/stprod \
  --group-id blob \
  --connection-name pe-conn-stprod
```

The piece that makes this transparent to applications is a **Private DNS
Zone** (e.g. `privatelink.blob.core.windows.net`) linked to your VNet.
Without it, the storage account's public FQDN would still resolve to its
public IP; with it, that same FQDN resolves to the Private Endpoint's
private IP instead, so no connection string changes. Connections can
require manual approval from the resource owner or auto-approve, depending
on how the Private Endpoint connection is configured.

This fully replaces the older **Service Endpoint** model, which only
restricted which VNet/subnet could reach a resource's *public* IP over
the Microsoft backbone — the resource still had a public IP and the
traffic still carried a public source address. A Private Endpoint removes
the public IP from the path entirely.

## AWS PrivateLink: an Interface Endpoint backed by a Network Load Balancer

The consumer side looks similar: an **Interface VPC Endpoint** creates an
ENI with a private IP in your VPC's subnet, for either an AWS service
(like Secrets Manager) or a custom **Endpoint Service**. On the provider
side, you front your own service with a **Network Load Balancer** and
publish it as an Endpoint Service — PrivateLink routes the consumer's
traffic to that NLB without either VPC needing a route, a peering
connection, or a public IP.

```
aws ec2 create-vpc-endpoint \
  --vpc-id vpc-0abc123 \
  --service-name com.amazonaws.vpce.us-east-1.vpce-svc-0def456 \
  --vpc-endpoint-type Interface \
  --subnet-ids subnet-0aaa111 \
  --security-group-ids sg-0bbb222
```

An **endpoint policy** (a resource policy, like an S3 bucket policy) can
restrict exactly what that Interface Endpoint is allowed to do against the
service it reaches — independent of IAM identity policy.

## The Gateway Endpoint: AWS's other model, with no Azure equivalent

S3 and DynamoDB support a second, older endpoint type: a **Gateway
Endpoint**. It's not an ENI at all — it's a **route table entry** that
sends traffic for that service's IP prefix list through the endpoint
instead of a NAT gateway or internet gateway. Gateway Endpoints are free,
regional, and route-based rather than DNS-based, which makes them a
structurally different mechanism from both the Interface Endpoint and
Azure's Private Endpoint — there's no Azure feature that works this way.

## Side by side

| | Azure Private Endpoint | AWS Interface Endpoint (PrivateLink) | AWS Gateway Endpoint |
|---|---|---|---|
| Mechanism | ENI with private IP, mapped to one resource instance | ENI with private IP, backed by an NLB | Route table entry, no ENI |
| Transparency | Private DNS Zone overrides public FQDN | Private hosted zone / endpoint DNS name | Same public hostname, routed differently |
| Cost | Hourly + data processing | Hourly + data processing | Free |
| Scope | One resource instance | A whole service (yours or AWS's) | S3/DynamoDB only |

## Key terms

| Term | Meaning |
|---|---|
| Private Endpoint | Azure NIC with a private IP mapped to one specific PaaS resource instance |
| Private DNS Zone | Azure DNS zone that overrides a resource's public FQDN to resolve to its Private Endpoint IP |
| Interface VPC Endpoint | AWS PrivateLink's consumer-side ENI, reaching an AWS service or custom Endpoint Service |
| Gateway Endpoint | AWS's route-table-based, ENI-free endpoint type, available only for S3 and DynamoDB |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why is
an AWS Gateway Endpoint for S3 a structurally different mechanism from an
Interface Endpoint, and why doesn't Azure have anything built the same way?
