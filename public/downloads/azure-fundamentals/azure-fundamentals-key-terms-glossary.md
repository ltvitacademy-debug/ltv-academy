# Azure Fundamentals — Key Terms Glossary

Every "Key terms" table from all 18 lessons, compiled into one document,
organized by chapter. Use it as a single-page review before the AZ-900 exam,
or as a lookup when a later course in this catalog (Azure Database
Administrator, Data Factory, PowerShell Fundamentals, Terraform & Bicep,
Kafka, and others) assumes you already know this vocabulary.

## Chapter 1 — Cloud & Azure Concepts

### Lesson 1 — What Is Cloud Computing?

| Term | Meaning |
|---|---|
| Cloud computing | On-demand computing resources, over the internet, billed by usage |
| CapEx | A large upfront purchase that depreciates over time |
| OpEx | An ongoing, variable cost that scales with actual use |
| Elasticity | Scaling resources up or down to match real demand |

### Lesson 2 — IaaS, PaaS & SaaS

| Term | Meaning |
|---|---|
| IaaS | Microsoft manages hardware and virtualization; you manage the OS up (example: Virtual Machines) |
| PaaS | Microsoft manages the OS and runtime too; you manage your app and data (example: App Service) |
| SaaS | Microsoft manages the entire application; you just use it (example: Microsoft 365) |
| Stack | The layers from physical datacenter up to your application and data |

### Lesson 3 — Azure Global Infrastructure: Regions & Availability Zones

| Term | Meaning |
|---|---|
| Region | A set of datacenters in one geography, connected by a low-latency network |
| Availability zone | A physically separate datacenter within a region, with its own power/cooling/network |
| Latency | The delay between a request and its response — worse the farther apart requester and resource are |
| Data residency | A requirement that data physically remain within a specific country or region |

### Lesson 4 — Azure Portal Tour

| Term | Meaning |
|---|---|
| Azure Portal | The web-based UI at portal.azure.com for managing Azure resources |
| Favorites | Services pinned to the side menu for one-click access |
| Global search | The top search bar (Ctrl+/) that jumps to any service, resource, or doc |
| Blade | The panel that opens when you view a specific resource, with Overview/Settings/etc. |

### Lesson 5 — Subscriptions & Resource Groups

| Term | Meaning |
|---|---|
| Subscription | The billing and access boundary; every resource belongs to exactly one |
| Resource group | A logical container for related resources, managed and deleted together |
| Tag | A label applied to resources (often at the resource-group level) for organization and cost tracking |

## Chapter 2 — Core Azure Services

### Lesson 6 — Azure Compute Overview: VMs & App Service

| Term | Meaning |
|---|---|
| Virtual Machine (VM) | IaaS compute — you manage the OS, runtime, and app; Microsoft manages the hardware |
| Azure App Service | PaaS compute for web apps/APIs — you manage just your code; Microsoft manages the OS/runtime |
| Scaling out | Adding more instances of your app to handle increased traffic |

### Lesson 7 — Azure Storage Overview

| Term | Meaning |
|---|---|
| Storage Account | The top-level container that holds Azure storage services like Blob and Files |
| Blob Storage | Storage for unstructured files (images, video, logs, backups) at scale |
| Azure Files | Fully managed, SMB-accessible file shares, mountable by multiple machines |

### Lesson 8 — Azure Networking Basics: VNets

| Term | Meaning |
|---|---|
| Virtual Network (VNet) | Your own private, isolated network inside Azure |
| Subnet | A smaller IP address range within a VNet, often used to separate resources by role |
| Private IP address | An address reachable only within the VNet, not from the public internet |

### Lesson 9 — Microsoft Entra ID Basics

| Term | Meaning |
|---|---|
| Microsoft Entra ID | Azure's identity service (formerly Azure Active Directory / Azure AD) |
| User | An identity — a person or application — that can sign in and be granted permissions |
| Group | A collection of users, used to manage permissions at scale |
| Tenant | An organization's dedicated Entra ID directory |

### Lesson 10 — Azure Monitor Basics

| Term | Meaning |
|---|---|
| Azure Monitor | Azure's platform-wide observability service, collecting data automatically |
| Metric | A numerical value collected at regular intervals (e.g., CPU percentage) |
| Log | A detailed, timestamped record of an event |
| Alert | A rule that notifies you or triggers an action when a condition is met |

## Chapter 3 — Security, Pricing & Governance

### Lesson 11 — Identity & Access Management Basics

| Term | Meaning |
|---|---|
| Authentication | Proving who you are (handled by Microsoft Entra ID) |
| Authorization | Determining what an authenticated identity is allowed to do |
| RBAC | Role-Based Access Control — Azure's permission model |
| Role assignment | A role granted to a user/group/service at a specific scope |
| Least privilege | Granting only the minimum access needed, nothing more |

### Lesson 12 — Azure Pricing & Cost Management

| Term | Meaning |
|---|---|
| Pay-as-you-go | Billed by actual usage, no commitment, higher per-unit cost |
| Reserved instance | 1-3 year commitment for a steady workload, in exchange for a discount |
| Pricing Calculator | Free tool to estimate cost before deploying a resource |
| Cost Management + Billing | Built-in tool for tracking and analyzing real Azure spending |
| Budget / alert | A spending threshold, and a notification when spending nears it |

### Lesson 13 — Governance: Policies, Tags & Management Groups

| Term | Meaning |
|---|---|
| Azure Policy | A rule automatically evaluated against resources, can deny or audit |
| Tag | A name/value pair attached to a resource for tracking and organization |
| Management group | A container above subscriptions for applying RBAC/Policy at scale |
| Deny vs. audit | A policy effect that blocks vs. one that just flags a violation |

### Lesson 14 — Compliance Basics

| Term | Meaning |
|---|---|
| Compliance | Meeting external legal, industry, or contractual data-handling standards |
| Shared responsibility | Microsoft secures the platform; the customer secures how they configure and use it |
| Microsoft Trust Center | Microsoft's published compliance posture, certifications, and audit documentation |
| SOC 2 / ISO 27001 / GDPR / HIPAA | Common frameworks — security auditing, security management, EU privacy, US health data |

## Chapter 4 — Working in Azure

### Lesson 15 — Azure CLI Basics

| Term | Meaning |
|---|---|
| Azure CLI | A command-line tool for managing Azure resources by typing commands |
| Scriptable | Can be saved in a file and run again without manual clicking |
| Repeatable | Running the same command twice produces the same result |
| Parameter | A named value passed to a command, like `--name` or `--location` |

### Lesson 16 — ARM & Bicep, Overview

| Term | Meaning |
|---|---|
| Infrastructure as Code (IaC) | Describing the resources you want in a file, instead of typing steps |
| ARM template | Azure's native Infrastructure as Code format, written in JSON |
| Bicep | A friendlier language that compiles down to the same ARM JSON |
| Imperative | Telling a tool the exact steps to take (what Lesson 15's CLI commands do) |

### Lesson 17 — Deploying Your First Resource

| Term | Meaning |
|---|---|
| Resource group | The container created first, to hold the resources that go inside it |
| Storage account | A simple, cheap real resource — a good first deployment target |
| SKU | The specific tier/configuration of a resource, e.g. `Standard_LRS` |
| Resource Manager | The engine underneath both the Portal and the CLI |

### Lesson 18 — AZ-900 Exam Overview

| Term | Meaning |
|---|---|
| AZ-900 | Microsoft's entry-level, concept-focused Azure certification exam |
| Proctored exam | A monitored exam, taken online or at a testing center |
| Microsoft Learn | Microsoft's own free learning platform, including an AZ-900 path |
