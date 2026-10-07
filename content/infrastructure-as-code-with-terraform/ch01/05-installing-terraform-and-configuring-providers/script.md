# Script — Installing Terraform & Configuring Providers

## Segment 1 (title)

Time to get Terraform actually running. This lesson covers installing the CLI and wiring up both providers Northbridge Retail needs — azurerm and aws — so the next chapter can start on a working setup.

## Segment 2 (code)

Terraform ships as a single binary, installed through a package manager on any OS. Once it's installed, terraform version confirms it's working.

## Segment 3 (code)

Every configuration starts with a terraform block declaring which providers it needs and which versions. Running terraform init downloads both plugins and writes a lock file pinning the exact versions used, so every teammate and every CI run behaves identically.

## Segment 4 (steps)

Each provider authenticates differently, and neither one puts secrets in your files. The azurerm provider uses whatever Azure CLI session is already active after az login. The aws provider reads credentials the same way the AWS CLI does — from a named profile, environment variables, or an attached role.

## Segment 5 (outro)

With both providers configured and terraform init run clean, Northbridge's platform team has a working foundation. Next up, Chapter 2: HCL syntax, and writing real configuration for the first time.
