# Script — Parameters & Variables in Bicep

## Segment 1 (title)

Bicep's equivalent of a Terraform variable block is the param keyword — a value supplied when the file is deployed, never hardcoded inside it. Some params have defaults; others, like a globally-unique storage account name, don't, because there's no sensible default to give them.

## Segment 2 (code: constraining with a decorator)

A decorator restricts what a parameter accepts, catching a bad value before deployment instead of after. Allowed limits a SKU name to exactly the replication types Azure actually supports; minLength and maxLength match Azure Storage's real 3-to-24-character naming rule.

## Segment 3 (code: var for computed values)

A var never comes from outside the file — it's a computed value derived from a parameter or another expression, used purely to avoid repeating the same logic more than once.

## Segment 4 (screenshot: the Problems pane)

VS Code's Bicep extension type-checks a file as you write it. Pass a value that violates a decorator, and the Problems pane flags it immediately, before you ever run a deployment command — the same "review before it runs" idea as Terraform's plan step, just enforced one step earlier.

## Segment 5 (outro)

Params for what comes from outside, vars for what's computed inside, and a live type-checker in between. Next up: actually deploying a resource group.
