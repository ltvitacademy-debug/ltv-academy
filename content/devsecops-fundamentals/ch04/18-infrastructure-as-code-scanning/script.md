# Script — Infrastructure as Code Scanning

## Segment 1 (title)

Every scan so far has looked at application code or its dependencies. At Northbridge Retail, infrastructure itself — storage accounts, network rules, permissions — is defined in Terraform. IaC scanning applies shift-left to that, catching a misconfiguration before it's ever applied.

## Segment 2 (steps)

A public storage account or an unencrypted database isn't a code bug or a vulnerable dependency — it's a configuration decision baked into the Terraform file. SAST and SCA have nothing to say about either, because neither reads infrastructure definitions. Tools like Checkov, tfsec, and Terrascan are built specifically to parse the IaC file itself.

## Segment 3 (code)

A real Checkov finding names the exact check that failed, the resource it failed on, and the file and line — enough for a developer to jump straight to the problem and fix it in one line.

## Segment 4 (steps)

Running this scan against the plan, in CI, before apply, means the pull request fails before anyone merges — let alone before a storage account is actually public in the real world. That's the cheapest point on the entire cost-of-a-flaw curve from Lesson 1.

## Segment 5 (outro)

Add one line, push again, the check passes — compare that to finding the same misconfiguration live, after someone already noticed. Next up, Lesson 19: SBOMs and supply chain risk.
