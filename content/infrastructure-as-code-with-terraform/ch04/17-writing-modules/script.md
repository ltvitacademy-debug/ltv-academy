# Script — Writing Modules

## Segment 1 (title)

Chapter 3 ended with state commands — recovering and inspecting the resources Terraform already tracks. Modules are the next step: a way to name a cluster of resources that share a lifecycle, instead of re-typing them every time you need that pattern again. Northbridge Retail needs the same storage account setup in dev, staging, and production, and this lesson is where you stop copy-pasting it across all three.

## Segment 2 (code: a module is just a parameterized folder)

Here's the part that makes modules feel less exotic than they sound: the directory you run terraform apply from is already called the root module, and you've been writing one since Chapter 1. A child module is exactly the same idea — resource blocks in a dot tf file — just living in its own folder, parameterized with variables instead of hardcoded environment-specific values.

## Segment 3 (code: calling the module twice)

Back in the root configuration, a module block replaces the resource block that used to live there directly. Source is the one required argument on that block — here it's a relative path pointing at the folder you just created. Call the same module twice, once for dev and once for staging, and Terraform treats each call as a completely separate instance with its own address in state, even though both instances run the exact same underlying code.

## Segment 4 (steps: root module, child module, source)

Three terms worth holding onto here. The root module is the directory you run apply from — nothing new, just a name for what you've already been doing. A child module is anything called through a module block, living in its own folder. And source is the argument that tells Terraform where that module's files actually live — a local relative path today, and later in this chapter, a public registry address instead.

## Segment 5 (outro)

Right now that module doesn't declare any inputs or outputs yet — it just references variables that don't exist anywhere, which would fail the moment you tried to initialize it. Next lesson fixes exactly that: module inputs and outputs, and how one module's output becomes another resource's input elsewhere in the configuration.
