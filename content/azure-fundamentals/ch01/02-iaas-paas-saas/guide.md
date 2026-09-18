# Lesson 2 — IaaS, PaaS & SaaS

**Chapter 1 · Cloud & Azure Concepts · Lesson 2 of 18**

## What you'll learn

- The three cloud service models, defined by one question: who manages what
- IaaS (Infrastructure as a Service) — Microsoft owns the hardware, you own everything above it
- PaaS (Platform as a Service) — Microsoft manages the OS and runtime, you own just your app and data
- SaaS (Software as a Service) — you don't manage anything, you just use the software
- A concrete Azure example of each

## One question decides the model: who manages what?

Every resource you'll touch in Azure falls into one of three service
models. They aren't about price or power — a small VM and a huge one
are both IaaS. They're about **where the line is drawn between what
Microsoft manages for you and what you manage yourself.** Picture it
as a stack of layers, from the physical datacenter at the bottom up
to your application at the top: networking, servers, virtualization,
operating system, runtime, middleware, your application, your data.
The service model just tells you how far up that stack Microsoft's
responsibility goes before it becomes yours.

## IaaS — Infrastructure as a Service

With **IaaS**, Microsoft manages the physical datacenter, the
networking, the physical servers, and the virtualization layer. Everything
above that — the operating system, patching it, the runtime, your
application, your data — is yours. This is the closest cloud gets to
"renting a computer": you get a blank machine and you're responsible
for everything you install and configure on it.

**Azure example:** an Azure **Virtual Machine**. You pick the size and
the OS image, but from the moment it boots, you're the one applying
Windows updates, installing SQL Server or whatever software you need,
and configuring the firewall on that box.

## PaaS — Platform as a Service

With **PaaS**, Microsoft manages everything IaaS does, plus the
operating system, the runtime, and the middleware. You only bring your
application code and your data. You never see a server to patch —
Microsoft handles the OS updates, the runtime version, and the
underlying scaling infrastructure for you.

**Azure example:** **Azure App Service**. You deploy your web
application's code (.NET, Node.js, Python, whatever), and Azure runs
it — no OS to patch, no web server software to install. You focus
entirely on your code.

## SaaS — Software as a Service

With **SaaS**, Microsoft manages the entire stack, including the
application itself. You just use it — through a browser or a client
app — and bring nothing but your own data and configuration.

**Azure/Microsoft example:** **Microsoft 365** (Outlook, Word, Teams).
You never think about servers, operating systems, or even which
version of the application is running. You open Outlook and it works.

```
                    IaaS              PaaS              SaaS
                 (Virtual         (App Service)      (Microsoft 365)
                 Machines)

Your data         YOU               YOU                YOU
Your app          YOU               YOU              MICROSOFT
Runtime           YOU             MICROSOFT           MICROSOFT
Operating system  YOU             MICROSOFT           MICROSOFT
Virtualization  MICROSOFT         MICROSOFT           MICROSOFT
Servers          MICROSOFT         MICROSOFT           MICROSOFT
Networking       MICROSOFT         MICROSOFT           MICROSOFT
Datacenter       MICROSOFT         MICROSOFT           MICROSOFT
```

Moving left to right, you manage less and Microsoft manages more —
and in exchange, you give up some control. A VM lets you install
anything; App Service only runs what its platform supports. That
trade-off, not the price tag, is the real decision every time you
pick a service model.

## Key terms

| Term | Meaning |
|---|---|
| IaaS | Microsoft manages hardware and virtualization; you manage the OS up (example: Virtual Machines) |
| PaaS | Microsoft manages the OS and runtime too; you manage your app and data (example: App Service) |
| SaaS | Microsoft manages the entire application; you just use it (example: Microsoft 365) |
| Stack | The layers from physical datacenter up to your application and data |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: if a
team wants full control over the operating system to run a legacy
piece of software, which service model do they need, and why won't
PaaS work for them?
