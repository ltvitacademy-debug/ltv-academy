# HCL Syntax

Chapter 1 got Terraform installed and a provider configured on your machine. Before Northbridge Retail's platform team writes a single real resource, you need to be fluent in the language Terraform files are actually written in: HashiCorp Configuration Language, or HCL. This lesson covers the handful of syntax rules that every `.tf` file follows, no matter what you're building.

## What you'll learn

- The anatomy of an HCL block: block type, labels, and the body in `{ }`
- The value types HCL arguments can hold — strings, numbers, booleans, lists, and maps
- The two comment styles HCL supports, and when you'd use each
- How to reference a value inside a string with `${ }` interpolation

## Every HCL file is built from blocks

HCL organizes everything into **blocks**. A block has a type, zero or more quoted labels, and a body wrapped in curly braces:

```hcl
locals {
  environment = "dev"
}
```

Here `locals` is the block type and it takes no labels — the body starts right after it. You'll meet blocks with one label (like `variable "environment"`) and blocks with two (like `resource "azurerm_resource_group" "northbridge"`) starting in the next lesson. Inside the body, each line is an **argument**: a name, an equals sign, and a value.

## The value types you'll use constantly

HCL arguments can hold several kinds of values. Here's one `locals` block using all of them, for a Northbridge Retail configuration:

```hcl
locals {
  environment     = "dev"          # string
  instance_count  = 3              # number
  is_production   = false          # bool

  allowed_regions = ["eastus2", "westus2", "centralus"]   # list

  tags = {                         # map
    project = "northbridge-retail"
    owner   = "platform-team"
  }
}
```

- **String** — text in double quotes, like `"dev"`.
- **Number** — no quotes: `3`, `99.5`.
- **Bool** — `true` or `false`, no quotes.
- **List** — an ordered, square-bracketed sequence of values: `["eastus2", "westus2", "centralus"]`.
- **Map** — an unordered set of key/value pairs in curly braces, each key followed by `=` and its value.

You'll use every one of these types once you start writing real resource and variable blocks in the rest of this chapter.

## Two ways to write a comment

HCL supports two single-line comment markers and one multi-line marker:

```hcl
# this is a comment (the HCL-preferred style)
// this also works, and is just as valid
/*
  this spans multiple lines —
  handy for temporarily disabling a whole block
*/
```

`#` is the style you'll see in almost all official Terraform examples and the style used throughout this course; `//` is borrowed from other languages and works identically. Either is fine — just be consistent within a file.

## Referencing values inside a string

When you need a value dropped into the middle of a string, HCL uses `${ }` interpolation:

```hcl
locals {
  environment = "dev"
  project     = "northbridge"
}

resource_name_prefix = "${local.project}-${local.environment}"
# evaluates to: "northbridge-dev"
```

Anything between `${` and `}` is evaluated as an expression — a variable reference, a function call, even arithmetic — and the result is spliced into the surrounding string. You'll use this constantly once resource names need to incorporate an environment, a project name, or another resource's attribute.

## Key terms

| Term | Meaning |
|---|---|
| Block | HCL's basic unit: a type, optional labels, and a body in `{ }` |
| Argument | A `name = value` line inside a block body |
| List | An ordered, square-bracketed sequence of values |
| Map | An unordered set of `key = value` pairs in curly braces |
| Interpolation (`${ }`) | Syntax for evaluating an expression inside a string |
