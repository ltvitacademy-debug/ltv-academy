# Lesson 19 — Cloud Workload Protection for VMs, Containers, and Serverless

**Chapter 5 · Cloud-Native Security Tooling · Lesson 3 of 4**

## What you'll learn

- Why "cloud workload protection" can't be one uniform product — a VM,
  a container, and a serverless function each expose a genuinely
  different attack surface
- How Microsoft Defender for Servers and GuardDuty's Malware Protection
  cover VM-based workloads, and what each actually scans
- How container protection differs for build-time image scanning versus
  runtime threat detection, on both Defender for Containers and
  GuardDuty's EKS-focused coverage
- Why serverless protection looks almost nothing like VM protection, and
  what actually matters for a Lambda function or an App Service app

## CWPP isn't one thing — it's a different tool per compute shape

Cloud Workload Protection Platform (CWPP) is the umbrella term for
runtime and vulnerability protection on cloud compute, but treating it
as a single product misses the point entirely. A VM has a persistent
guest OS you can patch and scan. A container is often short-lived,
built from a layered image you can inspect before it ever runs. A
serverless function has no OS you can reach at all — your exposure is
almost entirely in your own code, its dependencies, and the IAM/role
permissions it runs with. Each shape needs protection built around what
actually can go wrong with it, not a repackaged VM agent bolted onto
everything.

## VMs: Defender for Servers and GuardDuty Malware Protection

On Azure, **Defender for Servers** is the Defender plan for VM-based
workloads. It integrates Microsoft Defender for Endpoint onto the
machine for endpoint detection and response, layers in vulnerability
assessment (via Microsoft Defender Vulnerability Management or a
connected Qualys scanner), and feeds behavioral alerts — suspicious
process execution, fileless attack behavior — back into Defender for
Cloud's alert stream.

On AWS, VM-equivalent protection comes from a combination of services
rather than one plan: GuardDuty's **Malware Protection for EC2**
performs agentless scanning of attached EBS volumes when GuardDuty
suspects malware-related activity, without you deploying anything
persistent on the instance. AWS Inspector handles vulnerability
scanning of the EC2 instance's installed software and OS packages on an
ongoing basis. Neither service alone is a full EDR replacement — pair
GuardDuty and Inspector with your own endpoint agent if you need deep
host-level behavioral telemetry.

## Containers: scan the image, watch the runtime

Container protection splits cleanly into two different moments: before
a container runs, and while it's running.

**Before it runs** — image scanning — checks a container image for
known-vulnerable packages before it's ever deployed. On Azure,
**Defender for Containers** scans images pushed to Azure Container
Registry and flags vulnerable base images or packages. On AWS,
**Amazon Inspector** scans images in Amazon ECR, and GuardDuty's ECR
coverage can also flag suspicious image-related activity.

**While it's running** — runtime threat detection — watches actual
container behavior for things a static image scan could never catch:
a process spawning unexpectedly inside a running container, unusual
network connections out of a pod. Defender for Containers covers AKS
with a lightweight sensor collecting this signal; on AWS, **GuardDuty's
EKS Protection** reads EKS audit logs for control-plane-level
suspicious activity, and **GuardDuty Runtime Monitoring** extends that
to actual runtime behavior inside EKS and ECS workloads. A clean image
scan at build time says nothing about what that container does once
it's actually running in production — you need both.

## Serverless: almost no infrastructure, almost all code and permissions

Serverless protection looks structurally different because there's
almost nothing underneath for a provider or a Defender plan to watch.
On Azure, **Defender for App Service** covers App Service and Azure
Functions, watching for suspicious requests, unusual outbound
connections, and known attack patterns against the hosted application
layer. On AWS, there's no single "Defender for Lambda" plan — protection
is assembled from a few angles: **GuardDuty's Lambda Protection** monitors
a function's network activity logs for suspicious connections (e.g., a
function calling out to known malicious infrastructure), and **Amazon
Inspector** can scan a Lambda function's code and layers for known
vulnerabilities in its dependencies. But the single highest-leverage
control for serverless remains one you set yourself: a tightly scoped,
least-privilege IAM execution role. A Lambda function with an
overly broad execution role turns a minor code vulnerability into full
account compromise; a correctly scoped one limits the blast radius no
matter what the function's code does wrong.

## The pattern across all three

Notice the shape repeats: something scans for known weaknesses before
or independent of execution (vulnerability assessment, image scanning),
and something else watches for anomalous behavior during execution
(EDR-style alerts, runtime monitoring, network-activity monitoring).
What changes is where that "during execution" signal actually comes
from — process telemetry on a VM, audit logs and a runtime sensor on a
container platform, network logs and IAM activity on serverless.

## Key terms

| Term | Meaning |
|---|---|
| CWPP | Cloud Workload Protection Platform — the umbrella term for workload-level vulnerability and runtime protection, shaped differently per compute type |
| Defender for Servers | Azure's VM protection plan: Defender for Endpoint integration, vulnerability assessment, and behavioral alerts |
| GuardDuty Malware Protection | Agentless EBS volume scanning triggered by suspected malware activity on an EC2 instance |
| Image scanning | Build-time vulnerability scanning of a container image before it is deployed (Defender for Containers / ACR, Amazon Inspector / ECR) |
| Runtime monitoring | Detection of suspicious behavior while a container is actually executing (Defender for Containers' AKS sensor, GuardDuty Runtime Monitoring) |
| Least-privilege execution role | The IAM role a Lambda function runs under — the single highest-leverage serverless control, since there is no OS layer to protect |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
does a clean container image scan at build time tell you nothing about
whether that same container is behaving safely in production, and what
does GuardDuty's Lambda Protection actually watch given that a Lambda
function has no persistent OS?
