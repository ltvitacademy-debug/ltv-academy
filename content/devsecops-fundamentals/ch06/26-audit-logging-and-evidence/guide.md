# Audit Logging & Evidence

The last lesson ended with a question: once a compliance control runs, where does the evidence that it ran actually live? This lesson answers that with audit logging — the record of who did what, when, that every compliance framework (and every serious incident investigation) depends on.

## What you'll learn

- What an audit log needs to capture to be useful as evidence
- How Azure Monitor's Activity Log captures subscription-level operations
- Why audit logs must be retained somewhere tamper-resistant, not just "on by default"
- How audit evidence connects back to PCI-DSS Requirement 10 at Northbridge Retail

## What makes a log an audit log

Plenty of logs exist purely for debugging — a stack trace, a request timing line. An **audit log** is narrower and more disciplined: it records *who* (which identity) did *what* (which operation) to *which resource*, *when*, and from *where*. For Northbridge Retail, that means every time someone grants a role, changes a firewall rule, or reads a secret from Key Vault, there's a durable record naming the identity responsible — not just "a config changed," but "this service principal changed it, at this timestamp."

This matters because audit logs answer two different kinds of questions. During a security incident, they tell the response team what happened and when. During a compliance assessment, they're the proof that a control everyone claims to follow was actually followed on every relevant day, not just the day an auditor happened to look.

## Azure Monitor's Activity Log

Azure captures this automatically for every subscription through the **Activity Log** — a feed of subscription-level events tracking operations like creating a resource, starting a virtual machine, or changing a role assignment. Every Azure resource exposes an **Activity log** menu item alongside **Overview**, **Insights**, and **Metrics**:

![Screenshot of the Azure portal resource menu showing Overview and Activity log items](/courses/devsecops-fundamentals/ch06/26-audit-logging-and-evidence/azure-monitor-menu.png)
*The Activity log sits right next to Overview in the resource menu — Azure generates these entries automatically, with nothing to configure to get started.*

Opening Activity Log shows a filterable timeline of operations, each entry naming the operation, the resource it touched, the status, and — critically — the identity that performed it:

![Screenshot of an Azure Activity Log entry list showing operations, status, and timestamps](/courses/devsecops-fundamentals/ch06/26-audit-logging-and-evidence/azure-activity-log.png)
*Each row is one operation: what happened, to what, and the result — the raw material an incident investigation or a compliance review both start from.*

## Retention: on by default isn't enough

Azure retains Activity Log entries for 90 days automatically, with no setup required — useful for a quick lookback, but not nearly long enough for most compliance obligations, including PCI-DSS, which typically expects at least a year of retained audit history. That gap is why Northbridge Retail's platform team configures a **diagnostic setting** that forwards Activity Log entries to a Log Analytics workspace or storage account with a retention policy that actually matches the compliance requirement. Once forwarded, the logs should also be write-once or access-restricted — an audit log that an attacker (or a careless administrator) can quietly edit after the fact isn't evidence of anything.

## Connecting back to PCI-DSS Requirement 10

PCI-DSS Requirement 10 specifically requires tracking and monitoring all access to cardholder data and the systems that touch it. At Northbridge Retail, that means the Activity Log (and equivalent resource-level logs for the database and storage account holding payment data) has to capture every read, write, and permission change on those resources, retained long enough to satisfy the standard, and protected from tampering. Combined with the compliance-as-code controls from the previous lesson, this gives Northbridge Retail two complementary layers: automated checks that confirm a control is configured correctly right now, and an audit trail proving it stayed that way over time.

## Key terms

- **Audit log** — a durable record of who performed what operation, on which resource, and when
- **Activity Log** — Azure's built-in, automatically generated feed of subscription-level operations
- **Diagnostic setting** — the Azure configuration that forwards logs to a destination (Log Analytics, storage) with controllable retention
- **PCI-DSS Requirement 10** — the PCI-DSS requirement to track and monitor all access to cardholder data and related systems
