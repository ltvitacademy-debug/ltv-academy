import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Bellingham, WA", "(360) 555-0147", "marcus.webb@example.com", "linkedin.com/in/marcuswebb-ltvexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "Marcus Webb",
    contact: CONTACT,
    summary:
      "Cloud Engineer trained across both major public clouds — IT/networking and Linux fundamentals, hands-on Azure " +
      "and AWS administration, hybrid identity and zero-trust security, and PowerShell/Python infrastructure " +
      "automation — through a hands-on apprenticeship program. Planned and deployed a complete three-tier Azure " +
      "environment end to end for a real migration scenario: network-first deployment with least-privilege NSGs, " +
      "managed-identity authentication with zero stored secrets, a verified smoke test, RTO/RPO-driven backup with a " +
      "tested restore, and handoff documentation for the next engineer. Bringing that disciplined, requirements-first " +
      "approach to a Cloud Support Engineer, Cloud Administrator, or Associate Cloud Engineer role.",
    skills: [
      "IT & Networking Fundamentals",
      "Linux Administration & Shell Scripting",
      "Azure Administration (Compute, Storage, Networking, Entra ID)",
      "AWS Administration (EC2, S3, VPC, IAM)",
      "Hybrid Identity & Zero-Trust Security",
      "Cloud Encryption & Secrets Management",
      "Cloud Security Posture Management (CSPM)",
      "PowerShell & Python Infrastructure Automation",
      "Multi-Cloud CLI Scripting",
      "Cloud Deployment Planning & Architecture Diagramming",
      "Monitoring, Alerting & Cost Management",
      "Backup, Disaster Recovery & RTO/RPO Planning",
      "Systematic Troubleshooting & Documentation",
    ],
    tools:
      "Azure (Portal, CLI, PowerShell Az module, Entra ID, Key Vault, Monitor, Cost Management), AWS (Console, CLI, " +
      "IAM, CloudWatch, CloudTrail, Secrets Manager), Microsoft Entra Connect, Linux (bash, systemd, SSH), Python " +
      "(Azure SDK, Boto3), PowerShell, jq, Azure Automation, ARM/Bicep and AWS CloudFormation (introductory), Git",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Cloud Engineer → Cloud Architect Track · Job-Ready Foundation · Bellingham, WA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering how IT teams work and deploy software, networking/Linux/virtualization fundamentals, Azure and AWS administration, hybrid identity and cloud security, infrastructure automation, and a full job-ready deployment capstone, with a hands-on lab or capstone closing nearly every course.",
              "Practiced Agile/Scrum (sprints, user stories) and Kanban-based work management, the SDLC (Dev/QA/UAT/Production), Git version control, and release/deployment and CI/CD basics through a real-world IT project simulation — the same delivery vocabulary used across every course that followed.",
              "Built networking fundamentals from the OSI/TCP-IP models through IP addressing and subnetting, IPv4 vs. IPv6, common ports/protocols, switching/routing, DNS, DHCP, and NAT/firewalls, then administered Linux end to end — filesystem hierarchy, shell navigation, users/groups/permissions, package management, systemd/process management, SSH key-based access, and shell scripting for automation.",
              "Learned virtualization from hypervisor types through VM resource virtualization and containers vs. VMs, then applied it to core cloud computing concepts — IaaS/PaaS/SaaS, the shared responsibility model, public/private/hybrid cloud, regions and availability zones — and cloud networking/storage concepts (VPCs/VNets, subnets, routing tables, security groups, load balancing, object/block/file storage), closing with a capstone provisioning and networking a Linux VM end to end and diagnosing a connectivity problem.",
              "Administered Microsoft Azure hands-on through the Azure Portal, CLI, and PowerShell: subscriptions and management groups, Resource Manager and resource groups, tags/Azure Policy/cost governance, Microsoft Entra ID (users, groups, licenses, RBAC, Conditional Access and MFA), VM creation/sizing/availability sets/scale sets and managed disks, storage accounts/blob storage/redundancy tiers, VNets/NSGs/load balancers/VNet peering, and Azure Monitor/Log Analytics/alerts/cost management — through a capstone deploying, securing, and monitoring a multi-tier environment and troubleshooting a real cost spike, aligned to AZ-104.",
              "Administered Amazon Web Services hands-on through the AWS Console and CLI: moving off the root account to IAM users/groups/roles and least-privilege policies, AWS Organizations basics, EC2 instance launch/sizing/AMIs/key pairs/security groups, S3 buckets/versioning/lifecycle rules and EBS volumes/snapshots, VPC fundamentals/CIDR planning/public-private subnets/route tables/NAT gateways/security groups vs. NACLs, and CloudWatch metrics/alarms/logs plus CloudTrail and cost management (Cost Explorer, Budgets, right-sizing, Reserved Instances/Savings Plans/Spot) — through a capstone deploying, securing, and monitoring a multi-tier AWS environment and troubleshooting an unreachable instance, aligned to AWS SysOps Administrator objectives.",
              "Built hybrid identity and zero-trust security on top of that platform administration: Microsoft Entra Connect and directory synchronization, password hash sync vs. federation trade-offs, AWS IAM Identity Center and external identity providers, zero-trust principles (microsegmentation, identity as the perimeter, continuous verification and Conditional Access), encryption at rest and in transit with Azure Key Vault and AWS KMS, customer-managed vs. platform-managed keys, and secrets management with Azure Key Vault and AWS Secrets Manager/Parameter Store, including rotation and access policies.",
              "Applied cloud security posture management concepts (what CSPM catches, Microsoft Defender for Cloud and AWS Security Hub, compliance scoring and remediation) and private connectivity options (site-to-site VPN, Azure ExpressRoute and AWS Direct Connect, point-to-site VPN) and compliance frameworks (SOC 2, ISO 27001) applied to cloud environments, through a capstone standing up hybrid identity sync, encrypting data end to end, and remediating a real CSPM finding.",
              "Automated infrastructure operations in both PowerShell and Python: idempotent, error-handled scripts safe to rerun unattended; the Az PowerShell module for looping over and managing Azure resources; the Azure SDK for Python and Boto3 for AWS with token/SDK-based authentication; multi-cloud Bash scripting with the az and aws CLIs and parsing JSON output with jq; and a first look at ARM/Bicep templates and AWS CloudFormation as a bridge to infrastructure as code.",
              "Built real operational automation — VM start/stop schedules for cost savings, tag-compliance checks, backup verification, and a simple incident-response action — then put those scripts into source control and ran them from a CI/CD pipeline instead of a laptop, with secrets handled through pipeline variables rather than hardcoded values or log output, closing with a capstone automation toolkit and a case study on a script that prevented an outage.",
              "Completed a full job-ready deployment capstone covering the real engineering lifecycle: gathering actual business requirements before touching a cloud console, choosing Azure, AWS, or both for a given workload, right-sizing compute/storage from observed usage instead of guessing, and designing an architecture diagram before building anything.",
              "Practiced network-first deployment discipline (VNet/VPC and subnets, then NSGs/security groups scoped correctly the first time, then a verified connectivity check) before deploying compute and storage into that proven network, wiring compute to storage with managed identities instead of stored keys, and confirming a real smoke test — an actual round trip through the data path, not just a status light.",
              "Stood up production-pattern monitoring (a small, high-confidence alert set designed to avoid alert fatigue) and backup/disaster recovery built from business-stated RTO and RPO numbers, including testing an actual restore rather than trusting a backup job's success message, then wrote the architecture diagram, runbook, and handoff checklist for the next engineer rather than for herself.",
              "Diagnosed deployment issues systematically — the five places a new deployment usually breaks, connectivity failures vs. permission/identity failures, and when to roll back versus fix forward — through a three-part capstone project planning and deploying a full environment, closing out the Job-Ready Foundation stage.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Harrow Peak Outfitters — Cloud Migration & Deployment — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Cloud Engineer → Cloud Architect Apprenticeship Program",
            bullets: [
              "Planned a migration for a 35-person outdoor-gear retailer off a six-year-old, out-of-warranty physical server with no redundancy, gathering real business requirements first — a 6 AM–10 PM Pacific uptime window, US-only data residency, and a modest budget with no 24/7 ops team — before making a single technical decision.",
              "Chose Azure over a split multi-cloud approach based on the business's existing Microsoft 365/Entra ID investment, and right-sized the replacement VM to a Standard_D2s_v5 (2 vCPU, 8 GB RAM) by pulling actual CPU/memory utilization off the legacy server instead of guessing or over-provisioning.",
              "Designed an architecture diagram before building anything — one VNet (10.20.0.0/16) with three single-purpose subnets for the app, the database's private endpoint, and management access — then deployed network-first: VNet, then subnets, then NSGs scoped to exactly what each subnet needed (app-subnet open only on 443, data-subnet reachable only from app-subnet on 1433, mgmt-subnet locked to one static office IP), verifying connectivity before any compute or storage existed.",
              "Deployed the app VM, a storage account, and an Azure SQL Database into that proven network, then wired compute to storage and the database with a system-assigned managed identity instead of a connection string or access key — eliminating stored credentials entirely — and proved it worked with a real smoke test: a live test order confirmed in the database, a live test invoice confirmed in blob storage, and a re-check that no secret ever landed in configuration.",
              "Stood up Azure Monitor alerting on four specific, actionable conditions (VM CPU, disk free space, database utilization, storage availability) routed to one action group, deliberately avoiding an alert-everything approach that trains an on-call engineer to start ignoring alerts.",
              "Translated the business's stated RTO (4 hours) and RPO (1 hour) into a backup policy tailored per resource — continuous transaction-log backups for the database, daily backup for the stateless app VM, and soft delete/versioning/geo-redundant storage for blobs — then proved the policy by actually testing three restores instead of trusting a nightly backup job's success report.",
              "Diagnosed a 403 permission error during final testing using a systematic method (ruled out connectivity, then confirmed the managed identity's role assignment was correct, then found the real cause in the storage account's network firewall rule) before handoff, and delivered an as-built architecture diagram, an operational runbook, and an honest handoff checklist that documented two deliberately deferred items rather than hiding them.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/marcuswebb-ltvexample/harrowpeak-cloud-deployment",
            right: "2026",
            sub: "Public portfolio repository for the capstone project",
            bullets: [
              "Published the capstone's PowerShell and Python automation scripts (tag-based VM start/stop, backup verification, compliance checks) alongside the architecture diagram, runbook, and handoff checklist, organized by phase (network/, compute-storage/, monitoring-backup/, docs/) to mirror the real network-first deployment order taught in the course.",
              "Wrote a README explaining the project's key design decisions — choosing Azure over a split multi-cloud setup, right-sizing from observed usage instead of a guess, and replacing stored credentials with a managed identity — and scrubbed all resource names, IPs, and account identifiers to generic placeholders before publishing.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Sehome High School", right: "Bellingham, WA · 2019" }],
      },
    ],
  },
};
