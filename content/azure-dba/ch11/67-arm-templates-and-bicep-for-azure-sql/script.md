# Script — ARM Templates & Bicep for Azure SQL

## Segment 1 (title)

This is a light overview, on purpose. Bicep syntax, parameters, and a full hands-on deployment already exist as their own lessons in Terraform & Bicep for Data Engineers, later in this catalog. What this lesson covers instead is narrower: why a DBA who's never going to be a full-time infrastructure engineer should still care.

## Segment 2 (steps: why a DBA cares)

Three reasons, without ever writing IaC daily: repeatable, so the same server gets created identically every time with no portal clicks to fat-finger; reviewable, so a database change goes through a pull request before production; and auditable, because the git history of a Bicep file is the change history for that server.

## Segment 3 (code: recognizing the shape)

A Bicep resource block declaring a database on an existing server, at a given service tier — the same tier concept from Lesson 66's CLI example. The goal here is recognizing this shape, not writing it from scratch.

## Segment 4 (outro)

For hands-on Bicep authoring — parameters, modules, a real deployment confirmed in the Azure Portal — go to Terraform & Bicep for Data Engineers, Lesson 15, "Deploying Azure SQL With Bicep," and Lesson 16 right after it for ARM versus Bicep in depth. Next up here: Elastic Jobs, Agent's equivalent for Azure SQL Database.
