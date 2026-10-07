# Script — What Cloud Computing Is

## Segment 1 (title)

Everything up to this point assumed hardware you could point at — a server in a rack, a hypervisor carving it into VMs. Cloud computing takes that same hardware and rents it to you, by the hour, from a data center you'll never see.

## Segment 2 (steps)

Not every rented server counts as cloud computing. The standard definition lists five traits that have to show up together. On-demand self-service means a user provisions resources through a console or API, without calling anyone. Broad network access means those resources are reachable over the internet from any standard device. Resource pooling means the provider's hardware serves many customers at once, invisibly — the same multi-tenancy that hypervisors made possible. And rapid elasticity means capacity scales up or down in minutes, not weeks. A provider needs all five, not just one or two, to really qualify as cloud.

## Segment 3 (code)

Northbridge Retail used to run its checkout database on a physical server in a back room — bought outright, patched by their own staff, sized for the busiest day of the year even though it sat mostly idle the rest of the time. Today that same database runs on a cloud provider's hardware instead. Same logical database, completely different ownership model: capacity gets provisioned in minutes instead of ordered in weeks, and the bill reflects what actually got used instead of a fixed cost paid every month regardless of load.

## Segment 4 (outro)

That shift from owning to renting is the foundation this whole chapter builds on. Next up: the different levels of control a cloud service can hand you, from a bare virtual machine all the way to software you never touch the infrastructure of at all.
