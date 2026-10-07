# App Services, Storage & Key Vault on Azure

Not every Northbridge Retail workload needs a VM. The storefront API is a standard web application with no reason to manage an operating system, so it runs on Azure App Service instead. It serves product images out of Blob Storage, and it needs a database connection string that must never appear in plain text in a `.tf` file — that's what Key Vault is for. This lesson provisions all three.

## What you'll learn

- `azurerm_service_plan` and `azurerm_linux_web_app` — hosting the storefront API without managing a VM
- `azurerm_storage_account` and a blob container for Northbridge's product images
- `azurerm_key_vault` and `azurerm_key_vault_secret` — storing the database connection string safely
- Granting the web app permission to read a Key Vault secret

## The App Service plan and the web app

An App Service plan defines the compute tier; the web app itself runs on top of it:

```hcl
resource "azurerm_service_plan" "storefront" {
  name                = "asp-northbridge-storefront"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = "P1v3"
}

resource "azurerm_linux_web_app" "storefront" {
  name                = "app-northbridge-storefront"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  service_plan_id     = azurerm_service_plan.storefront.id

  site_config {
    application_stack {
      node_version = "20-lts"
    }
  }
}
```

`sku_name = "P1v3"` is a Premium v3 tier — enough capacity for a production storefront API. Because the plan is `os_type = "Linux"`, the web app must be `azurerm_linux_web_app`, not the Windows equivalent. `application_stack` tells App Service which runtime to launch the code with — here, Node.js 20 LTS.

## Storage account for product images

Northbridge's product images live in a dedicated storage account and blob container:

```hcl
resource "azurerm_storage_account" "product_images" {
  name                     = "northbridgeprodimg"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
}

resource "azurerm_storage_container" "product_images" {
  name                  = "product-images"
  storage_account_name  = azurerm_storage_account.product_images.name
  container_access_type = "blob"
}
```

`account_replication_type = "GRS"` geo-replicates the images to a paired region — reasonable for customer-facing product photography that should survive a regional outage. `container_access_type = "blob"` allows anonymous read access to individual blobs, which is appropriate for public product images but would be the wrong choice for anything sensitive.

## Key Vault and the database secret

The storefront API needs a database connection string, and that string must never be hardcoded in a `.tf` file or committed to version control:

```hcl
resource "azurerm_key_vault" "main" {
  name                = "kv-northbridge-prod"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"
}

resource "azurerm_key_vault_secret" "db_connection_string" {
  name         = "storefront-db-connection-string"
  value        = var.db_connection_string
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_access_policy" "storefront_app" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = azurerm_linux_web_app.storefront.identity[0].principal_id

  secret_permissions = ["Get"]
}
```

`value = var.db_connection_string` keeps the actual secret out of the configuration file entirely — it's supplied at apply time as a sensitive variable, never typed into source. `azurerm_key_vault_access_policy` is what grants the storefront web app's managed identity permission to read ("Get") that one secret, following the same least-privilege principle you'd apply to any production credential.

## Key terms

| Term | Meaning |
|---|---|
| App Service plan | Defines the compute tier an App Service web app runs on |
| `azurerm_linux_web_app` | A Linux-hosted web application, no VM or OS management required |
| Key Vault | Azure's managed secret store for keys, certificates, and connection strings |
| Access policy | Grants a specific identity permission to read, write, or manage Key Vault secrets |
