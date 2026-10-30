# Lesson 5 — Migrating the VM Workload

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 5 of 10**

## What you'll learn

- How to get the catalog application itself running on `vm-catalog01`, not just the VM existing
- How to open exactly the network path the app needs, and nothing more
- How to validate the app is actually serving traffic correctly, not just that the VM is "on"
- Why this is a lift-and-shift, and what that specifically rules in and out

## From an empty VM to a running app

Lesson 3 created `vm-catalog01` — an Ubuntu VM with nothing on it yet. A VM existing and a VM
running Driftwood's catalog app are two different states, and getting from one to the other is
the real work of this lesson: connect to the VM, install whatever runtime the catalog app needs
(for example, Node.js or PHP, depending on how the on-prem version was built), copy the
application code over, and start it as a service so it keeps running after you disconnect — the
same thing systemd or a process manager was already doing on the on-prem server.

```
ssh azureuser@<vm-catalog01-public-ip>

sudo apt-get update && sudo apt-get install -y nodejs npm
scp -r ./catalog-app azureuser@<vm-catalog01-public-ip>:/opt/catalog-app
sudo systemctl enable --now catalog-app
```

This is deliberately the same shape of setup the on-prem server already had — a lift-and-shift,
not a redesign. The only functional change the app's code needs is the image URL update from
Lesson 4; everything else about how the app runs stays the same on purpose.

## Opening exactly the path the app needs

`az vm create` back in Lesson 3 created a default network security group with only SSH (port
22) open. The catalog app serves web traffic, so the NSG needs one more rule — and only one:

```
az network nsg rule create \
  --resource-group rg-driftwood-eastus-catalog \
  --nsg-name vm-catalog01NSG \
  --name allow-http \
  --priority 200 \
  --destination-port-ranges 80 \
  --access Allow \
  --protocol Tcp
```

Opening exactly port 80 (or 443, once TLS is in place) is the point — not opening every port "to
be safe," which isn't safe at all. The on-prem server's firewall presumably allowed exactly the
traffic the app needed and nothing else; the Azure NSG should land in the same place.

## Validating the app actually serves traffic

A VM showing `Running` in `az vm list` or the Portal tells you the VM is on. It tells you nothing
about whether the catalog app inside it is working. Real validation:

```
curl -I http://<vm-catalog01-public-ip>
```

A `200 OK` response confirms the web server is actually answering requests. From there, loading
the catalog app's product pages directly in a browser confirms the deeper check: pages render,
and — thanks to Lesson 4's work — product images load from their new Blob Storage URLs instead
of a local file path that no longer exists on this VM.

## What this lesson deliberately doesn't do

Consistent with Lesson 2's scope: this is the app running on one VM, reachable directly by its
public IP for now, with no load balancer, no auto-scaling, and no CI/CD pipeline deploying
future code changes. Those are real next steps for a more mature platform — not what this
specific migration, on this deadline, needs to include.

## Key terms

| Term | Meaning |
|---|---|
| Lift-and-shift | Moving the existing application to new infrastructure largely as-is |
| Network Security Group (NSG) rule | A specific allow/deny rule controlling what traffic can reach a VM |
| `curl -I` | Requests only the HTTP headers from a URL — a fast way to confirm a web server is responding |
| Service/process manager | The mechanism (e.g. systemd) that keeps an application running and restarts it if it stops |

## Lab

On `vm-catalog01`, install the runtime the catalog app needs, deploy the application code, open
only the NSG rule the app actually requires, and confirm with `curl -I` that the server returns
a `200 OK` before checking it in a browser.

## Check yourself

You're ready for Lesson 6 when you can explain, from memory, why a `Running` VM status doesn't
prove the app is working, and why opening only port 80 (or 443) on the NSG is the correct
choice instead of opening a wider range "to be safe."
