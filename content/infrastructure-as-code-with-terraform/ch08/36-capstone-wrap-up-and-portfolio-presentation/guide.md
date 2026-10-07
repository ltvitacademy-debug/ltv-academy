# Capstone: Wrap-Up & Portfolio Presentation

The plan from Lesson 35 is clean. This final lesson applies it, reviews what actually got created, tears it down responsibly, and — just as important for your career — covers how to talk about this project when you're showing it to someone else.

## What you'll learn

- Reviewing a real `terraform apply` output after a clean plan
- Tearing down a dev environment safely with `terraform destroy`
- What to say about this project in a portfolio or a technical interview
- Where to go next in the DevOps Engineer path

## Applying the plan

```
$ terraform apply
module.azure_network.azurerm_virtual_network.this: Creating...
module.aws_network.aws_vpc.this: Creating...
azurerm_linux_web_app.storefront: Creating...
aws_s3_bucket.product_images: Creating...
aws_lambda_function.order_confirmation: Creating...
...

Apply complete! Resources: 12 added, 0 changed, 0 destroyed.

Outputs:
storefront_url = "https://northbridge-dev-storefront.azurewebsites.net"
product_images_bucket = "northbridge-dev-product-images"
```

Twelve resources, matching the plan exactly — no surprises, because the plan already told you what would happen. The `outputs` block at the end is worth keeping: it's how teammates (and Chapter 4's module-output pattern) hand off the practical, usable values from a run without anyone having to dig through the Portal or Console.

## Tearing it down responsibly

A dev environment that exists only to prove the pattern works doesn't need to run forever:

```
$ terraform destroy
Plan: 0 to add, 0 to change, 12 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure...

  Enter a value: yes

Destroy complete! Resources: 12 destroyed.
```

`terraform destroy` reads the same state file it used to build the environment, so it knows exactly what to remove and in what order — the reverse of the dependency graph from Chapter 1. A real production environment is rarely destroyed this way, but a capstone or a scratch environment should be, both to avoid ongoing cloud costs and to prove the configuration can rebuild it again from nothing if needed.

## Talking about this project

In a portfolio or an interview, the strongest way to present this capstone isn't "I used Terraform" — it's the specific decisions behind it: why you chose directory-per-environment over workspaces, why tags were centralized in one `local` value, what the acceptance criteria were and how the plan output proved them, and what you'd change with more time (adding a staging and prod environment, wiring in the CI/CD pipeline from Chapter 7, adding the policy-as-code checks from the same chapter). Linking to the actual code in a public GitHub repository, with a short README explaining the brief and the structure, turns this from "I took a course" into a project someone else can actually open and read.

## Where to go next

You now have a working, end-to-end understanding of Terraform — HCL, state, modules, and running it safely as a team, across both Azure and AWS. That's a solid, in-demand piece of the DevOps Engineer path. Congratulations on finishing Infrastructure as Code with Terraform — you're ready for what's next in the path.

## Key terms

| Term | Meaning |
|---|---|
| `terraform apply` output | The real-time log of resources being created, ending in a summary and any declared outputs |
| `terraform destroy` | Removes every resource Terraform currently manages, read from state, in reverse dependency order |
| Portfolio presentation | Explaining the decisions and tradeoffs behind a project, not just that a tool was used |
