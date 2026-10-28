# Lesson 3 — Data Connectors: Bringing Logs into Sentinel

**Chapter 1 · Microsoft Sentinel Architecture · Lesson 3 of 32**

## What you'll learn

- What a data connector actually is, and why it's the piece that decides what Sentinel can see at all
- The three main connector types and when each one is used
- Real, named examples of each type, from Entra ID sign-ins to AWS CloudTrail
- How to read a connector's "Connected" status and know what table its data lands in

## The piece that decides what Sentinel can see

Lesson 2 established that every table inside the Log Analytics workspace needs something to
write into it. That something is a **data connector** — a pre-built integration that pulls logs
from a specific source and writes them into one or more workspace tables. No connector, no
data, no matter how good your detection logic is later. Sentinel ships with dozens of built-in
connectors in its connector gallery, and picking the right ones for an environment is one of the
first real configuration decisions a Sentinel deployment makes.

## Service-to-service connectors: no agent required

The simplest connector type is **service-to-service**: Azure-native (or cloud-native)
integrations where Sentinel pulls data directly from another Microsoft service's API, with no
software to install anywhere. Turning one on is close to a single toggle. Real examples include
the **Microsoft Entra ID (Azure AD)** connector, which brings in sign-in logs and audit logs;
the **Office 365** connector, which brings in SharePoint, Exchange, and Teams activity; and
connectors for **Microsoft Defender products** like Defender for Endpoint and Defender for
Cloud, which forward their own detections straight into Sentinel. Because these connectors
already speak the same cloud-to-cloud language, they tend to be the fastest to stand up and the
most reliable to keep running.

## Agent-based connectors: for machines that aren't cloud-native

Some data doesn't live inside a Microsoft cloud service at all — it lives on a Windows server,
a Linux machine, or a piece of on-prem hardware. For that, Sentinel uses **agent-based**
connectors: a small piece of software, the Azure Monitor Agent (AMA), installed on the machine
itself, which then forwards logs up to the workspace. This is how Sentinel collects raw Windows
Security Events from a domain controller, or **Syslog** and **CEF (Common Event Format)** data
from Linux servers and third-party network devices — including the firewalls and network
appliances from vendors outside Microsoft's own ecosystem that still need to show up in the
same SOC.

## API-based connectors: for everything else, including other clouds

The third type covers sources that are neither a native Microsoft service nor a machine you can
install an agent on — often another cloud provider entirely. **AWS CloudTrail** is the clearest
real example: Sentinel's AWS connector authenticates into an AWS account using a cross-account
role and an S3 bucket where CloudTrail deposits its logs, then pulls that activity into the
workspace through Sentinel's API-based ingestion path rather than an installed agent. Sources
with no pre-built connector at all can still be brought in through Sentinel's **Codeless
Connector Platform** or a custom REST API integration, which is the fallback for genuinely
unusual log sources.

## Checking a connector's health

Once a connector is configured, Sentinel's Data Connectors page shows its status — most
commonly **Connected**, meaning data is actively flowing — and tells you which table(s) that
data is landing in, tying this lesson directly back to the table names from Lesson 2. A
connector showing anything other than "Connected" is the very first thing to check before
assuming a detection rule or query has a logic problem, because a rule can only be as good as
the data actually reaching its table.

## Key terms

| Term | Meaning |
|---|---|
| Data connector | A pre-built integration that pulls logs from a source into the workspace |
| Service-to-service | Cloud-to-cloud connector, no agent, e.g. Entra ID, Office 365, Defender products |
| Agent-based | Uses the Azure Monitor Agent installed on a machine, e.g. for Windows Events, Syslog, CEF |
| API-based | Pulls from a source via API/cross-account access, e.g. AWS CloudTrail |
| CEF | Common Event Format — a standardized log format many third-party firewalls export |

## Check yourself

A third-party firewall and an AWS account both need to send data into Sentinel. Which connector
type does each one most likely need, and why are they different?
