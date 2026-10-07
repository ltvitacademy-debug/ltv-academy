## Segment 1 (title)

Not every Northbridge workload needs a VM. The storefront API is a standard web app with no reason to manage an operating system, it serves product images from Blob Storage, and it needs a database connection string that can never appear in plain text in a config file. This lesson provisions all three.

## Segment 2 (code: App Service plan and the storefront web app)

An App Service plan sets the compute tier -- here, a Premium v3 tier with enough capacity for a production API. The web app itself runs on top of that plan; because the plan is Linux, this has to be the Linux web app resource, and application_stack tells it to launch the code on Node twenty.

## Segment 3 (code: storage account and container)

Product images get their own storage account and blob container. GRS replication copies those images to a paired region, reasonable for customer-facing photography that should survive a regional outage, and blob-level public access is appropriate here specifically because these images are meant to be public.

## Segment 4 (code: Key Vault, the secret, and the access policy)

The database connection string lives in Key Vault instead of the configuration file -- value equals var.db_connection_string supplies it at apply time as a sensitive variable, never typed into source. A separate access policy is what actually grants the storefront app's managed identity permission to read that one secret.

## Segment 5 (steps: least privilege, by design)

Three things have to be true before the app can read its own secret. The secret has to exist in Key Vault, not committed anywhere. The web app needs a managed identity, an Azure identity Terraform can grant access to. And the access policy grants exactly one permission -- Get -- nothing broader.

## Segment 6 (outro)

The storefront API, its product images, and its database secret are now fully defined as code, each with no more access than it needs. Next up, Lesson 24: AKS, for Northbridge's containerized checkout service.
