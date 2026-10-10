import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "DevOps Engineer trained across the full delivery lifecycle — IT and networking fundamentals, Linux administration, " +
      "Git/GitHub, Python and Bash automation, Azure and AWS, Docker, Kubernetes, Terraform, CI/CD, monitoring and " +
      "observability, and DevSecOps — through a hands-on apprenticeship program. Built a complete CI/CD platform end to " +
      "end for a two-service e-commerce system: containerized services deployed to Kubernetes on Azure through " +
      "Terraform-provisioned infrastructure, promoted automatically from dev through a gated production release, with " +
      "monitoring, incident response, and security scanning built in from the start. Bringing that full-stack DevOps " +
      "approach to a DevOps Engineer, Cloud Support Engineer, or Build & Release Engineer role.",
    skills: [
      "IT & Networking Fundamentals",
      "Linux Administration & Bash Scripting",
      "Python Automation & Scripting",
      "Git/GitHub Version Control & Workflows",
      "Azure & AWS Cloud Fundamentals",
      "Docker & Containerization",
      "Kubernetes Orchestration (AKS/EKS, Helm)",
      "Infrastructure as Code (Terraform)",
      "CI/CD Pipeline Engineering (GitHub Actions, Azure DevOps Pipelines)",
      "Monitoring & Observability (Prometheus/Grafana, Azure Monitor, CloudWatch)",
      "DevSecOps & Secrets Management",
      "Incident Response & Postmortems",
    ],
    tools:
      "Git, GitHub, GitHub Actions, Azure DevOps Pipelines, Docker, Docker Compose, Kubernetes, Helm, Terraform, Azure " +
      "(Portal, CLI, AKS, ACR, Key Vault, Monitor), AWS (Console, CLI, EC2, S3, VPC, IAM), Prometheus, Grafana, Linux " +
      "(bash, systemd, SSH), Python",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "DevOps Engineer Track · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering the full DevOps toolchain, from IT/networking and Linux fundamentals through cloud, containers, infrastructure as code, CI/CD, observability, and security, with a capstone at the end of nearly every course.",
              "Practiced Agile/Scrum (sprints, user stories) and Kanban-based work management, the SDLC (Dev/QA/UAT/Production), and release and deployment planning through a Scrum/Kanban-based real-world IT project simulation, including foundational Git version control (repositories, commits, branches).",
              "Built networking fundamentals end to end — the OSI/TCP-IP models, IP addressing, subnetting and CIDR, switching/routing, DHCP, TCP vs. UDP, HTTP/HTTPS and TLS/certificates — then applied a troubleshooting methodology to a capstone designing and debugging a small network with firewalls/security groups, NAT, load balancers/reverse proxies, and a VPN/bastion host, plus core cloud concepts (IaaS/PaaS/SaaS, the shared responsibility model, regions/availability, cloud cost basics).",
              "Administered Linux systems: filesystem navigation, file/permission/ownership management (users, groups, ACLs), process and signal handling, cron/systemd timer scheduling, log review with journalctl, package management (apt/dnf), disk/partition/mount management, and SSH key-based access — through a capstone hardening a Linux server end to end.",
              "Practiced professional Git/GitHub workflows beyond basic commits: branching strategies (Git Flow and trunk-based development), the forking workflow, merge vs. rebase, resolving merge conflicts, pull requests and code review, issue/project-board tracking, tags and releases, and .gitignore best practices, plus CI/CD basics — a GitHub Actions workflow that runs tests automatically and deploys on merge — through a dedicated capstone project.",
              "Automated infrastructure tasks in both Bash and Python: robust Bash scripts with functions/reusable libraries and text-processing pipelines, Python scripting with subprocess, argparse-based CLI tools, structured logging/error handling, JSON/YAML config parsing, Jinja2 templating, and calling REST APIs with token-based auth and cloud SDKs — through a capstone automating a repetitive admin workflow (log parsing/reporting, backups/cleanup, health checks and alerts).",
              "Worked across core Azure services — compute (VMs, App Service), storage, VNets, Microsoft Entra ID, Azure Monitor, and governance (policies, tags, management groups) — using the Azure Portal and Azure CLI, with an introduction to ARM/Bicep for resource deployment, aligned to AZ-900.",
              "Worked across core AWS services — EC2, Lambda, S3, EBS, and VPC networking — with an IAM deep dive covering users/groups/roles, least-privilege policy design, and cross-service access patterns, using the AWS Console, CLI, and SDK.",
              "Built and operated Docker containers from first principles: how containers use namespaces and cgroups, multi-stage Dockerfiles with layer caching and image-size optimization, tagging and pushing images to Docker Hub, Azure Container Registry, and Amazon ECR, container networking and volumes, and multi-container applications with Docker Compose (health checks, restart policies, environment/secrets config) — through a capstone containerizing a multi-service application with resource limits and non-root hardening.",
              "Ran production-pattern Kubernetes workloads: Deployments and ReplicaSets with rolling updates/rollbacks, StatefulSets, DaemonSets, Jobs and CronJobs, Services/Ingress and Network Policies, ConfigMaps/Secrets/PersistentVolumes, Horizontal Pod and Cluster Autoscaling, RBAC/Service Accounts/Pod Security, and Helm charts, on both Azure Kubernetes Service (AKS) and Amazon EKS, with an introduction to GitOps — through a capstone running a real application on Kubernetes.",
              "Provisioned cloud infrastructure as code with Terraform: HCL syntax, resources/providers/variables/outputs/data sources, the plan-and-apply workflow, remote state with locking, and reusable modules across both the azurerm and AWS providers — deploying networking, VMs, AKS, and EKS — plus Terraform in CI/CD, workspaces, policy as code, and drift detection, through a capstone provisioning a production-style environment.",
              "Built CI/CD pipelines in both GitHub Actions (triggers/events, jobs/steps/runners, secrets and variables, caching and artifacts, reusable workflows and matrix builds) and Azure DevOps Pipelines (YAML build and release pipelines, service connections, variable groups, Azure Repos/Boards/Artifacts), with automated testing, static analysis, and code-coverage quality gates.",
              "Implemented deployment promotion with approval gates across environments, rolling/blue-green/canary deployment strategies, feature flags, and rollback procedures, plus running Terraform and deploying to Kubernetes directly from CI/CD and an introduction to GitOps with Argo CD/Flux — tracked against the DORA metrics used to measure delivery performance.",
              "Instrumented services for observability across metrics, logs, and traces — defining SLIs/SLOs and error budgets and reading the golden signals; built dashboards and alerts in Azure Monitor/Log Analytics (KQL)/Application Insights and AWS CloudWatch/X-Ray/CloudTrail, and ran Prometheus with PromQL queries, Grafana dashboards, and Alertmanager.",
              "Applied structured logging, centralized logging with ELK/Loki, and OpenTelemetry distributed tracing, plus a troubleshooting methodology, on-call practices, runbooks, and blameless postmortems to reduce alert fatigue.",
              "Applied shift-left security across the pipeline: threat modeling and the OWASP Top 10, least-privilege IAM (Microsoft Entra ID, AWS IAM, Kubernetes RBAC) and workload identity, secrets management with Azure Key Vault/AWS Secrets Manager/HashiCorp Vault, static application security testing, dependency and secrets scanning, infrastructure-as-code scanning, and software bills of materials for supply-chain risk.",
              "Hardened container images and Kubernetes security posture, secured CI/CD pipelines, and practiced policy as code, compliance as code, audit logging, and security incident response — through a capstone securing a pipeline end to end.",
              "Completed career-readiness training covering DevOps-specific resume and LinkedIn positioning, GitHub portfolio presentation, and mock interview practice across Linux/networking, CI/CD/cloud, and Kubernetes/Terraform questions, plus behavioral and incident-response scenarios, aligned to the AZ-400, AWS DevOps Engineer Professional, CKA, and Terraform Associate certification tracks.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Northbridge Retail — End-to-End CI/CD Platform — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, DevOps Engineer Apprenticeship Program",
            bullets: [
              "Built a GitHub Actions CI/CD pipeline for a 2-service e-commerce platform (Node.js/Express product-catalog, Python/FastAPI checkout) with automated linting, testing, image builds, Trivy image scanning, and gitleaks secret scanning gating every pull request.",
              "Provisioned Azure infrastructure with Terraform — two AKS clusters (a shared dev/staging cluster and an isolated production cluster), Azure Container Registry, PostgreSQL Flexible Server, and Key Vault — using remote state with blob-lease locking and reusable modules across environments.",
              "Automated deployment promotion from a merge-to-main (auto-deploy to dev) through a semver tag push (auto-deploy to staging) to a manually approved production release, giving every production deployment full traceability back to a single commit SHA.",
              "Configured Kubernetes Horizontal Pod Autoscalers for two services with different load profiles — a steady-traffic API and a spiky flash-sale checkout service — on Azure Kubernetes Service, with the cluster's kubelet identity granted AcrPull access so no registry credentials were stored in Kubernetes.",
              "Ran a game-day incident drill replaying a flash-sale traffic spike, diagnosed a saturated database connection pool using Prometheus, Grafana, and the USE method (checkout p99 latency rose from ~400ms to 6.2s, affecting an estimated 4,100 customer sessions over 34 minutes), and authored a blameless postmortem with four owned, dated action items.",
              "Implemented secrets management with Azure Key Vault and the External Secrets Operator, replaced stored CI credentials with GitHub Actions OIDC federated identity, and ran Checkov policy-as-code scans against the Terraform configuration.",
              "Documented the finished system with an architecture diagram and a \"design decisions\" section, and set up monitoring dashboards and alerting so the platform stays observable without manual checking.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/northbridge-storefront",
            right: "2026",
            sub: "Public portfolio repository for the capstone project",
            bullets: [
              "Organized the capstone as a monorepo (services/, infra/terraform/, charts/, .github/workflows/) built through incremental feature-branch pull requests rather than a single squashed commit, and wrote a README with an architecture diagram and a \"design decisions\" section explaining choices like Terraform remote-state locking and per-service autoscaling ranges.",
              "Scrubbed the repository for public release — replaced realistic Azure resource and account names with generic placeholders, confirmed no .tfstate or .tfvars files were ever committed by checking git history (not just the working tree), and ran gitleaks against the full history before publishing.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
};
