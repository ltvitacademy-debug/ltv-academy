# Expressions & Functions

Variables, resources, and data sources all give you values. This lesson covers the tools HCL gives you to transform and combine those values: `for` expressions, conditionals, and a set of built-in functions. None of this is unique to Terraform — it's the small amount of logic every real configuration eventually needs — but you'll reach for it constantly once Northbridge Retail's configurations grow past a handful of hardcoded resources.

## What you'll learn

- `for` expressions, for building a list or map out of another list or map
- Conditional expressions, HCL's version of an if/else
- Four built-in functions you'll use often: `lookup()`, `join()`, `templatefile()`, and `range()`
- Where to find the full list of built-in functions when you need one this lesson doesn't cover

## `for` expressions: transform a list or map

A **`for` expression** builds a new list or map by looping over an existing one:

```hcl
variable "web_instance_count" {
  type    = number
  default = 3
}

locals {
  instance_names = [for i in range(var.web_instance_count) : "northbridge-web-${i}"]
}

# instance_names = ["northbridge-web-0", "northbridge-web-1", "northbridge-web-2"]
```

`range(3)` produces `[0, 1, 2]`, and the `for` expression runs `"northbridge-web-${i}"` once per value, collecting the results into a new list. You'll see this pattern anywhere a variable number of similarly-named resources needs to be generated.

## Conditional expressions: HCL's if/else

A **conditional expression** picks one of two values based on a true/false condition, written `condition ? true_value : false_value`:

```hcl
variable "environment" {
  type = string
}

locals {
  vm_size = var.environment == "prod" ? "Standard_D2s_v3" : "Standard_B2s"
}
```

Read it as: if `var.environment` equals `"prod"`, `vm_size` becomes `"Standard_D2s_v3"`; otherwise it becomes `"Standard_B2s"`. This is the single most common way Terraform configurations vary behavior by environment without separate files for each one.

## Four functions you'll reach for constantly

```hcl
locals {
  region_map = {
    dev  = "eastus2"
    prod = "westus2"
  }

  # lookup(map, key, default) -- read a map value, with a fallback
  region = lookup(local.region_map, var.environment, "eastus2")

  # join(separator, list) -- combine a list into one string
  tag_summary = join(", ", local.instance_names)
}

# templatefile(path, vars) -- render a file, substituting variables
resource "azurerm_linux_virtual_machine" "web" {
  # ...
  custom_data = base64encode(templatefile("${path.module}/scripts/init.sh.tpl", {
    environment = var.environment
  }))
}
```

`lookup()` reads a value out of a map by key, falling back to a default if the key isn't present — safer than `local.region_map[var.environment]`, which errors if the key is missing. `join()` combines a list into a single delimited string. `range()`, used earlier, generates a sequence of numbers for `for` expressions to loop over. `templatefile()` reads a file from disk and substitutes variables into it — commonly used to generate a cloud-init or startup script per VM without hardcoding the environment name inside the script itself.

## Where to find the rest

HCL ships dozens more built-in functions — string manipulation, type conversion, date/time, collection operations. You don't need to memorize them; the official function reference is the place to check whenever you suspect "there's probably already a function for this."

## Key terms

| Term | Meaning |
|---|---|
| `for` expression | Builds a new list or map by looping over an existing one |
| Conditional expression | `condition ? true_value : false_value` — HCL's if/else |
| `lookup()` | Reads a value from a map by key, with an optional fallback default |
| `templatefile()` | Renders a file from disk, substituting variables into its contents |
