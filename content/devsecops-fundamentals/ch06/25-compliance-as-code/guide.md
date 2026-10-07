# Compliance as Code

Chapters 4 and 5 gave Northbridge Retail automated scanning and policy gates for code, dependencies, and containers. Compliance is the same idea applied to a different question: not "does this build have a vulnerability," but "does this system satisfy a written rule we're obligated to follow." This lesson shows how to express compliance requirements as code that runs automatically, instead of a checklist someone fills out by hand once a year.

## What you'll learn

- Why point-in-time compliance audits leave gaps that compliance as code closes
- How a compliance control becomes an executable check, using Chef InSpec syntax
- Mapping a real obligation — PCI-DSS — onto automated controls at Northbridge Retail
- How compliance-as-code results feed the audit evidence covered in the next lesson

## From checklist to executable control

Traditional compliance work looks like a spreadsheet: a list of controls ("disk encryption must be enabled," "SSH must require key-based auth"), each manually verified by someone taking screenshots once a quarter. The problem isn't the controls — it's the gap between audits. A server can drift out of compliance the day after it passes a manual review, and nobody finds out until the next audit cycle, or until an attacker does.

Compliance as code turns each control into a small, versioned, automatically-run test. Instead of a person SSHing into a server and reading a config file, a tool runs the same check as part of a pipeline or a scheduled scan, every day instead of once a quarter. The control lives in source control, gets reviewed in pull requests like any other code, and produces a pass/fail result with a timestamp — which is exactly the kind of evidence an auditor wants to see.

## An executable control, in InSpec

Chef InSpec is a widely used open-source framework for exactly this: writing infrastructure and compliance controls as code. A single control names the rule, rates its severity, and describes the check:

```ruby
control 'pci-encrypt-at-rest' do
  impact 1.0
  title 'Cardholder data volume must be encrypted'
  desc 'PCI-DSS Req 3: stored cardholder data must be unreadable'
  describe azure_disk_encryption('nb-payments-db') do
    its('encryption_enabled') { should eq true }
  end
end
```

Run this against Northbridge Retail's infrastructure daily (or on every change), and the result is never more than a day stale. Run it in a pipeline before a deploy, and a disk provisioned without encryption fails the build instead of waiting for next quarter's audit to find it.

## Mapping PCI-DSS at Northbridge Retail

Northbridge Retail processes customer payment data, which puts it in scope for PCI-DSS, the Payment Card Industry Data Security Standard. A few of its requirements translate directly into controls the platform team can automate: Requirement 3 (protect stored cardholder data) becomes a disk- and database-encryption check like the one above. Requirement 10 (track and monitor access to cardholder data) becomes the audit logging you'll build out in the next lesson. Requirement 1 (restrict inbound/outbound traffic) becomes a network security group or firewall rule check that runs against every environment, not just the one someone remembers to inspect before an audit.

None of this replaces a real PCI-DSS assessment performed by a qualified assessor — compliance as code produces continuous *evidence* that controls are working, which makes that formal assessment faster and the gaps between assessments far smaller.

## Feeding the evidence trail

Every control run — pass or fail, with a timestamp and the exact resource it checked — is itself a compliance artifact. Instead of a person manually screenshotting a config page for an auditor, the platform team can point to months of automated control runs as continuous evidence. That evidence has to be captured and retained somewhere durable, which is exactly what the next lesson, audit logging, covers.

## Key terms

- **Compliance as code** — expressing a compliance control as an automated, versioned, repeatedly-run check instead of a manual, point-in-time review
- **Control** — a single named rule (such as "disk encryption must be enabled") with a defined severity and an automated check
- **PCI-DSS** — Payment Card Industry Data Security Standard; applies to any organization that stores, processes, or transmits cardholder data, including Northbridge Retail
- **Continuous evidence** — a record of control results over time, used to demonstrate compliance between formal audits rather than only at audit time
