# Script — Compliance as Code

## Segment 1 (title)

Chapters four and five gave Northbridge Retail automated scanning and policy gates for code and containers. Compliance asks a related but different question: not "does this build have a vulnerability," but "does this system satisfy a rule we're obligated to follow." This lesson turns that question into code that runs automatically.

## Segment 2 (steps)

A traditional compliance audit is a spreadsheet checked by hand once a quarter, and a server can drift out of compliance the very next day without anyone noticing. Compliance as code turns each control into a small, versioned test that runs continuously instead. The control lives in source control, gets reviewed like any other code, and produces a timestamped pass or fail — exactly what an auditor wants to see.

## Segment 3 (code)

Here's a real Chef InSpec control. It names the rule, rates its severity as critical, and checks whether a disk is encrypted. Run this daily, or in a pipeline before every deploy, and a disk provisioned without encryption fails immediately instead of waiting for next quarter's audit.

## Segment 4 (steps)

Northbridge Retail processes payment data, so it's in scope for PCI-DSS. Requirement 3, protecting stored cardholder data, becomes an encryption check like the one you just saw. Requirement 10, tracking access, becomes the audit logging in the next lesson. Requirement 1, restricting network traffic, becomes a firewall rule check that runs against every environment, not just the one someone remembers to inspect.

## Segment 5 (outro)

None of this replaces a real PCI-DSS assessment — it produces continuous evidence that makes that assessment faster and the gaps between them smaller. Next up, lesson twenty-six: audit logging and evidence.
