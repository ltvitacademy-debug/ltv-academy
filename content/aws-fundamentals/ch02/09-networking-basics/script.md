# Script — Networking Basics: VPC

## Segment 1 (title)

A VPC is an isolated, private network you define inside an AWS Region — your own address space that other customers' traffic never crosses into, carved out with a CIDR block like 10.0.0.0/16.

## Segment 2 (code: subnets)

A subnet is a slice of that address range, confined to exactly one Availability Zone, unlike the VPC itself which spans the whole Region. Public subnets have a route to the internet, private subnets don't.

## Segment 3 (steps: how traffic gets in)

What makes a subnet public isn't a label on it — it's its route table. An Internet Gateway attaches to the VPC, and a subnet is public specifically because its route table sends internet-bound traffic there.

## Segment 4 (outro)

Security groups are stateful and attach to resources; network ACLs are stateless and apply at the subnet level as a coarser backstop. Next up: AWS pricing and cost management.
