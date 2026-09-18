# Script — Installing the Tools

## Segment 1 (title)

Terraform ships as a single standalone binary. Bicep installs as a component of the Azure CLI. Let's get both running on your machine, plus the Azure CLI login both of them depend on.

## Segment 2 (code: installing Terraform)

Terraform needs no separate runtime. Install it through your package manager of choice — winget on Windows, Homebrew on macOS, apt on Linux — and confirm it landed on your PATH with terraform version.

## Segment 3 (code: installing Bicep through the Azure CLI)

Bicep isn't a separate download. Install the Azure CLI first, then run az bicep install. Check its version separately with az bicep version, since Bicep updates on its own release cadence, independent of the Azure CLI itself.

## Segment 4 (steps: log in and verify)

Both tools reach Azure through the same Azure CLI login. Run az login, then az account show to confirm which subscription is active — you don't want to provision a resource into the wrong one.

## Segment 5 (outro)

Terraform installed, Bicep installed, Azure CLI logged in. Next up: the provider block that tells Terraform which cloud it's actually talking to.
