# Script — Understanding State

## Segment 1 (title)

Every time Terraform applies a configuration, it writes a record of exactly what it created into terraform.tfstate. That file is Terraform's only memory of what it has already built.

## Segment 2 (code: state is what makes plan possible)

Terraform plan compares your HCL, the state file, and the real infrastructure. From that comparison it decides create, update, replace, or leave alone. Without state, every plan would look like creating everything from scratch.

## Segment 3 (code: the real danger)

Delete the state file, and Terraform forgets every resource it manages -- the next plan proposes duplicates. Hand-edit it to fix a mismatch, and you can desynchronize Terraform's understanding without it ever validating that edit.

## Segment 4 (steps: local state's real hazard)

A local state file works fine solo, but it lives on one laptop -- lose the laptop, lose the record. Two people applying from their own local state at the same time can silently overwrite each other's changes.

## Segment 5 (outro)

State is Terraform's memory, and local state is a starting point, not the production pattern -- Lesson 17 covers storing it remotely. Chapter 1 is done. Next up: Chapter 2, Terraform for Azure Data Resources, starting with resource blocks.
