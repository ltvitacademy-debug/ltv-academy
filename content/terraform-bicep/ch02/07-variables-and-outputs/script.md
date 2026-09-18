# Script — Variables & Outputs

## Segment 1 (title)

Hardcoding a resource group name works for one environment, but the moment you need dev, staging, and production, hardcoding forces you to copy the whole file three times. A variable fixes that.

## Segment 2 (code: declaring and referencing a variable)

A variable block declares a type, a description, and an optional default. Inside a resource block, var dot name substitutes in the value. Override it at apply time with -var, or more commonly with a separate tfvars file per environment.

## Segment 3 (code: declaring an output)

An output is the reverse of a variable -- a value Terraform prints after apply finishes, so you or another tool can read a result without digging through the state file by hand.

## Segment 4 (steps: why this matters)

The same configuration, applied with a different tfvars file, differs only in the values you intentionally changed. Outputs matter even more once configurations split into modules -- one configuration's output becomes another's input.

## Segment 5 (outro)

Variables parameterize input, outputs surface results. Next up: putting all of this together to provision a real storage account.
