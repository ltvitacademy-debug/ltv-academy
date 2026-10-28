# Lesson 22 — Managing Resources with az Commands

**Chapter 6 · Azure CLI & PowerShell Administration · Lesson 22 of 32**

## What you'll learn

- A full resource lifecycle from the CLI, start to finish: create, inspect, and clean up
- How `az vm create` actually provisions a real virtual machine in one command
- Why `az resource list` is the command that shows you everything in a resource group, not just VMs
- Why deleting the resource group, not the individual resources, is the real cleanup step

## The lifecycle, end to end

Lesson 21 covered the pieces — command groups, output formats, `--query`. This lesson strings them
together into the thing an administrator actually does: stand up a resource group, create a real
resource inside it, confirm what exists, then tear it down.

```
1. az group create       # the container, first
2. az vm create           # the actual resource, inside it
3. az resource list       # confirm what's really there
4. az group delete        # clean up everything at once
```

Every step below is one real command, not a simplified stand-in for one.

## Step 1 & 2: creating a group, then a VM inside it

```
az group create \
  --name rg-cli-demo \
  --location eastus

az vm create \
  --resource-group rg-cli-demo \
  --name vm-cli-demo \
  --image Ubuntu2204 \
  --admin-username azureuser \
  --generate-ssh-keys \
  --size Standard_B1s
```

`--image Ubuntu2204` picks a published image alias — Azure maintains a set of short aliases like
this one so you don't have to type a full image URN. `--generate-ssh-keys` tells the CLI to
create a new SSH key pair for you if one doesn't already exist locally, instead of requiring a
password. `--size Standard_B1s` picks a small, cheap VM size — the same sizing concept from
Chapter 3, just set from the command line instead of a Portal dropdown. This single command does
everything the multi-screen Portal VM-creation wizard does: picks the image, provisions the disk,
configures networking defaults, and generates the authentication.

## Step 3: `az resource list` — everything, not just VMs

`az vm list` only shows VMs. A resource group usually holds more than that — the VM's disk,
network interface, public IP, and virtual network are all separate resources sitting alongside it.
`az resource list` shows **all** of them, regardless of type:

```
az resource list \
  --resource-group rg-cli-demo \
  --output table
```

That single command returns the VM itself, its managed disk, its NIC, its public IP, and the VNet
it's attached to — five or six resource types, all created automatically as side effects of one
`az vm create` call. This is the command to reach for whenever you need the honest, complete
answer to "what's actually in this resource group," rather than assuming you already know.

## Step 4: cleaning up — delete the group, not the pieces

You could delete the VM, then its disk, then its NIC, then its public IP, one `az <group> delete`
command at a time — tracking down and removing every piece by hand. Nobody does this. Delete the
resource group instead, and everything inside it goes with it, in one call:

```
az group delete \
  --name rg-cli-demo \
  --yes \
  --no-wait
```

`--yes` skips the interactive confirmation prompt, which matters the moment this command goes into
a script instead of being typed by hand. `--no-wait` returns control immediately instead of
blocking your terminal until the (sometimes slow) deletion finishes in the background. This is the
same principle from the prerequisite course's deployment lesson: a resource group isn't just an
organizational folder, it's the one blast-radius boundary that makes full cleanup a single command
instead of a scavenger hunt.

## Key terms

| Term | Meaning |
|---|---|
| `az vm create` | Provisions a full virtual machine — image, disk, NIC, and networking — in one command |
| Image alias | A short name like `Ubuntu2204` standing in for a full published image URN |
| `az resource list` | Lists every resource in a group regardless of type, unlike a type-specific list command |
| `--no-wait` | Returns control immediately instead of blocking until a long-running operation finishes |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why does `az resource list`
typically return more items than you explicitly created, and why is deleting the resource group
the right cleanup step instead of deleting each resource individually?
