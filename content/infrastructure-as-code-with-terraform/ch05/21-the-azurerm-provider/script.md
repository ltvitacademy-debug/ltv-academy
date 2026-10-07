## Segment 1 (title)

Chapter 4 ended on module versioning, and in a real production setup Azure configuration is usually wrapped in versioned modules just like that. This chapter deliberately shows you the raw resources first, so you can see exactly what a module would be hiding underneath. We're doing it with Northbridge Retail's real Azure buildout -- order processing, the storefront, and the checkout service all land here, starting with the provider itself.

## Segment 2 (code: pinning and configuring the provider)

Every Azure configuration starts with two blocks. required_providers pins the azurerm provider to a known version, the same pessimistic constraint pattern you used for modules in Chapter 4, so Northbridge's pipeline never silently jumps to a breaking major release. Then provider "azurerm" sets subscription_id, which tells Terraform which of Northbridge's subscriptions to target, plus an empty but required features block.

## Segment 3 (steps: three ways to authenticate)

subscription_id says which subscription to use, but it doesn't prove who's asking -- that's a separate problem. The Azure CLI's az login is simplest, reusing your signed-in session for local development. A service principal, authenticated through client ID, secret, and tenant environment variables, is what CI/CD pipelines use when no human is present to sign in. And OIDC workload identity federation goes a step further, trading a short-lived federated token for credentials with no long-lived secret stored anywhere.

## Segment 4 (code: authenticating and initializing)

For local work against Northbridge's configuration, log in with the CLI, set the active subscription to Northbridge Production, then run terraform init. Terraform reads required_providers, downloads the matching azurerm provider version, and reports that it's been successfully initialized.

## Segment 5 (outro)

With the provider configured, authenticated, and initialized, every azurerm resource in the rest of this chapter can be planned and applied against Northbridge's real subscription. Next up, Lesson 22: networking and virtual machines for Northbridge's order-processing VM tier.
