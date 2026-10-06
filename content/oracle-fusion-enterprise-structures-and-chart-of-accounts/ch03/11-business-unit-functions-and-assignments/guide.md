# Business Unit Functions and Assignments

A business unit by itself is just a name and a ledger assignment. What actually makes it useful is the set of **business functions** assigned to it — the specific jobs, like invoicing or requisitioning, that the business unit is configured to perform. This lesson covers those functions, and the "shared service" assignment pattern they make possible.

## What you'll learn

- What a business function is, with concrete examples
- How a business unit can perform multiple functions, or just one
- The shared service provider pattern, and why it exists
- Why getting function assignments right affects which setup tasks appear at all

## Business functions, concretely

A **business function** is a specific business process a business unit is enabled to carry out. Common examples include:

```
Examples of Business Functions:
  - Payables Invoicing
  - Billing and Revenue Management
  - Requisitioning
  - Customer Contract Management
  - Project Accounting
  - Materials Management
```

A single business unit is not limited to one function — a mid-sized company might configure one business unit to handle both Payables Invoicing and Requisitioning, for example, if the same operational group owns both. A larger company might split these across separate business units instead, each specialized to one function.

## The shared service provider pattern

Not every business unit needs to perform every function for itself. Oracle Fusion supports a **shared service** model, where one business unit is designated as the **service provider** for a specific function, and other business units become its **client** for that same function. A common real-world example: a company centralizes Payables Invoicing processing into one shared-services business unit that processes supplier invoices on behalf of several operating business units, even though those operating units each have their own ledger assignment and legal entity context for everything else they do.

```
Shared Service Provider pattern:
  Business Unit A  --- is Payables service provider for ---> Business Unit B
                                                          ---> Business Unit C
```

This mirrors how real finance organizations are structured — a central accounts-payable team serving multiple divisions — and avoids forcing every division to independently staff and configure its own AP processing.

## Why function assignment affects what you see

Business function assignment is not just descriptive metadata. It directly affects which setup tasks and reference data options even appear for a given business unit. A business unit with no Payables Invoicing function assigned will not show Payables-specific setup and reference data options at all; assign the function, and those options become available. This is one reason business function assignment belongs early in enterprise structure setup — getting it wrong means later courses (Accounts Payable, Accounts Receivable, Procure-to-Pay) will be missing the configuration surface they expect.

## Recap

Business functions are the specific jobs — like Payables Invoicing or Requisitioning — a business unit is enabled to perform, and a business unit can be a shared service provider for some functions while being a client for others. Next up, lesson 12: reference data sets, the mechanism that lets different business units apply different policies even when they share the same function.
