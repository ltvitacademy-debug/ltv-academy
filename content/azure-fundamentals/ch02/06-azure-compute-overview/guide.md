# Lesson 6 — Azure Compute Overview: VMs & App Service

**Chapter 2 · Core Azure Services · Lesson 6 of 18**

## What you'll learn

- Azure Virtual Machines — IaaS compute, and when you actually need it
- Azure App Service — PaaS compute for web apps, and when it's the better fit
- The real decision behind picking one over the other
- Why this course covers these two, not every compute option Azure has

## Welcome to Chapter 2 — hands-on with real services

Chapter 1 covered concepts: cloud computing itself, the three service
models, Azure's global footprint, the portal, and how subscriptions
and resource groups organize everything. Chapter 2 gets specific —
the actual services you'll deploy into those resource groups,
starting with **compute**: where your application's code actually
runs.

## Virtual Machines — full control, full responsibility

An Azure **Virtual Machine (VM)** is IaaS compute, covered conceptually
back in Lesson 2: Microsoft manages the physical hardware and
virtualization, and you manage everything from the operating system
up. You choose the OS (Windows or Linux), the size (how much CPU,
memory, and disk), and from the moment it boots, you're responsible
for patching it, installing whatever software you need, and securing
it.

**When you'd pick a VM:** you need a specific OS configuration, you're
running legacy software that won't run any other way, or you need
full control over the environment — installing arbitrary software,
tuning OS-level settings, running something that simply isn't a web
application.

## App Service — just bring your code

**Azure App Service** is PaaS compute purpose-built for web
applications and APIs. You deploy your application code — .NET,
Node.js, Python, Java, PHP, whatever your stack is — and Azure runs
it. There's no OS to patch and no web server software to install;
Microsoft manages the runtime, and features like scaling out to
handle more traffic are built in rather than something you configure
by hand.

**When you'd pick App Service:** you're building a standard web app
or API and don't need OS-level control. It's faster to deploy, and
there's simply less to manage — which is exactly the trade-off PaaS
makes over IaaS.

```
                    Virtual Machines         App Service
Best for:           Full OS control,         Web apps & APIs,
                     legacy software          standard runtimes

You manage:          OS, runtime, app         App only

Setup speed:          Slower — configure       Faster — deploy code,
                      the whole box first      it just runs

Scaling:              You configure it         Built-in scale settings
```

## The real decision

The question isn't "which is more powerful" — a VM can run App
Service's job just as well, technically. The real question is: **do
you need OS-level control badly enough to take on managing it
yourself?** If the answer is no, App Service gets you running faster
with less to maintain. If the answer is yes — a legacy app, a specific
OS dependency, software that only installs a certain way — a VM is
the tool that actually lets you do that.

Azure has other compute options beyond these two (containers, serverless
functions, and more), but VMs and App Service are the two you'll reach
for most often, and they map directly onto the IaaS/PaaS distinction
from Lesson 2 — which is exactly why this course starts here.

## Key terms

| Term | Meaning |
|---|---|
| Virtual Machine (VM) | IaaS compute — you manage the OS, runtime, and app; Microsoft manages the hardware |
| Azure App Service | PaaS compute for web apps/APIs — you manage just your code; Microsoft manages the OS/runtime |
| Scaling out | Adding more instances of your app to handle increased traffic |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: a
team needs to run a legacy Windows application that requires a
specific, older OS configuration — why won't App Service work for
them, and what should they use instead?
