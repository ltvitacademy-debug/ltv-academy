# Lesson 36 — Self-Hosted Integration Runtime

**Chapter 7 · Integration Runtimes · Lesson 3 of 4**

## What you'll learn

- What the self-hosted IR actually is, and what it isn't
- How it bridges Azure to an on-premises or private network
- The real install and registration flow, end to end
- Why nodes exist, and what they buy you

## The bridge the Azure IR can't build

The Azure integration runtime is fully managed, but it lives in
Azure's own network. It genuinely has no way to reach a SQL Server
sitting inside your corporate network, behind a firewall, with no
public endpoint. That's exactly the gap the **self-hosted integration
runtime** closes.

A self-hosted IR is software — the Microsoft Integration Runtime
Configuration Manager — that you install yourself, on a Windows
machine inside the network where your data actually lives. It's not
"integration runtime, but worse." It's the only IR type built to sit
on your side of the firewall.

## How the pieces actually connect

![Diagram of the self-hosted integration runtime architecture: Azure Data Factory's control channel reaching into the corporate firewall to the self-hosted IR, which handles read/write requests against on-premises storage.](/courses/data-factory/ch07/36-self-hosted-integration-runtime/high-level-overview.png)
*The self-hosted IR sits inside your corporate firewall. It receives control-channel instructions from Data Factory and reads/writes on-premises data directly — the data itself never has to be reachable from Azure.*

Notice the direction of the arrows: the self-hosted IR **initiates**
an outbound connection to Azure, on port 443. Nobody has to open an
inbound port into your network for this to work — a detail Lesson 37
covers in real depth.

## Setting one up

From **Manage → Integration runtimes → New**, choose **Self-Hosted**:

![Integration runtime setup screen with three network environment choices — Azure, Self-Hosted, and Linked Self-Hosted — with Self-Hosted highlighted.](/courses/data-factory/ch07/36-self-hosted-integration-runtime/new-self-hosted-integration-runtime.png)
*Azure IR runs fully in Azure. Self-Hosted runs on your own machine. Linked Self-Hosted reuses one that already exists in another data factory or Synapse workspace.*

Name it, and Data Factory hands you two things: a download link for
the Configuration Manager, and an **authentication key** (two keys,
actually — a primary and a secondary, for safe key rotation):

![Integration runtime setup dialog showing Express and Manual setup options, plus a name field and two authentication keys.](/courses/data-factory/ch07/36-self-hosted-integration-runtime/integration-runtime-setting-up.png)
*Express setup downloads and registers automatically on the current machine. Manual setup separates the two steps — useful when you're installing on a different machine than the one you're configuring from.*

Install the Configuration Manager on the target machine, paste in the
authentication key, and it registers itself against your data
factory:

![Microsoft Integration Runtime Configuration Manager confirming the self-hosted IR node has registered successfully.](/courses/data-factory/ch07/36-self-hosted-integration-runtime/registered-successfully.png)
*A green checkmark and "registered successfully" — the node is now live and available to any linked service in this data factory that points at it.*

## Why nodes, plural

A single self-hosted IR isn't one machine — it's a **logical**
runtime that can be backed by up to four physical machines, called
**nodes**. Multiple nodes buy you two real things:

- **High availability** — if one node goes down, the others keep
  serving requests, and Microsoft explicitly recommends at least two
  nodes for this reason.
- **Scalability** — more nodes means more concurrent throughput for
  data movement.

All nodes share the same authentication key and register against the
same logical self-hosted IR — Data Factory treats them as one unit.

## Key terms

| Term | Meaning |
|---|---|
| Self-hosted integration runtime | IR software installed on a machine inside your own network |
| Configuration Manager | The Windows application that installs and registers a self-hosted IR node |
| Authentication key | The credential a node uses to register itself against a specific data factory |
| Node | One physical machine backing a (possibly multi-node) self-hosted IR |

## Lab

1. In **Manage → Integration runtimes**, create a new self-hosted IR
   and give it a name.
2. Note the two authentication keys Data Factory generates for it.
3. Write one sentence explaining why Microsoft recommends at least
   two nodes for a production self-hosted IR.

## Check yourself

You're ready for Lesson 37 when you can explain, in one sentence, why
the self-hosted IR can reach an on-premises SQL Server that the Azure
IR genuinely cannot.
