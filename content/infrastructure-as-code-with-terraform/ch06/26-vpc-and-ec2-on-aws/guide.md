# VPC & EC2 on AWS

With the `aws` provider configured, Northbridge Retail can start provisioning real networking and compute. This lesson builds the AWS half of Northbridge's order-processing fleet: a VPC to contain it, a subnet to place it in, an internet gateway so it can reach the internet, a security group to control what traffic reaches it, and the EC2 instances that actually run the service.

## What you'll learn

- How `aws_vpc` and `aws_subnet` define Northbridge's private network space
- Why an `aws_internet_gateway` is required before anything in the VPC can reach the public internet
- How `aws_security_group` controls inbound and outbound traffic, resource by resource
- How `aws_instance` provisions the EC2 fleet itself, wired into the network you just built

## The VPC and subnet

Every AWS resource Northbridge provisions in this chapter lives inside a Virtual Private Cloud — an isolated network space Northbridge fully controls:

```hcl
resource "aws_vpc" "northbridge" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "northbridge-vpc"
  }
}

resource "aws_subnet" "order_processing" {
  vpc_id                  = aws_vpc.northbridge.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "northbridge-order-processing-subnet"
  }
}
```

The subnet's `vpc_id` references the VPC block the same way Chapter 2 taught you resources reference each other — Terraform infers the VPC must exist first. `map_public_ip_on_launch` means instances launched into this subnet get a public IP automatically, which the order-processing fleet needs to receive traffic.

## The internet gateway

A VPC with no internet gateway is sealed off from the public internet entirely. Attaching one, and routing traffic to it, is what makes the subnet actually public:

```hcl
resource "aws_internet_gateway" "northbridge" {
  vpc_id = aws_vpc.northbridge.id

  tags = {
    Name = "northbridge-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.northbridge.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.northbridge.id
  }
}

resource "aws_route_table_association" "order_processing" {
  subnet_id      = aws_subnet.order_processing.id
  route_table_id = aws_route_table.public.id
}
```

The route table's `0.0.0.0/0` route says "anything not destined for the VPC itself goes out through the internet gateway." Associating that route table with the subnet is what makes the subnet public.

## The security group

`aws_security_group` controls exactly what traffic is allowed to and from the order-processing fleet — nothing is open by default:

```hcl
resource "aws_security_group" "order_processing" {
  name   = "northbridge-order-processing-sg"
  vpc_id = aws_vpc.northbridge.id

  ingress {
    description = "HTTPS from the internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

This group allows inbound HTTPS from anywhere and unrestricted outbound traffic — a reasonable starting point for a public-facing service, tightened further as Northbridge's security posture matures.

## The EC2 instances

With networking in place, `aws_instance` provisions the fleet itself:

```hcl
resource "aws_instance" "order_processing" {
  ami                    = "ami-0c7217cdde317cfec"
  instance_type           = "t3.medium"
  subnet_id               = aws_subnet.order_processing.id
  vpc_security_group_ids  = [aws_security_group.order_processing.id]

  tags = {
    Name = "northbridge-order-processing"
  }
}
```

Every reference here — `subnet_id`, `vpc_security_group_ids` — points back to a block defined earlier in this same lesson. Terraform assembles the entire dependency graph from those references alone: VPC, then subnet and internet gateway, then security group, then the instance that depends on all three.

## Key terms

| Term | Meaning |
|---|---|
| `aws_vpc` | An isolated, Northbridge-controlled network space in a chosen CIDR range |
| `aws_subnet` | A smaller address range within a VPC, tied to one availability zone |
| `aws_internet_gateway` | What makes a VPC's resources reachable from, and able to reach, the public internet |
| `aws_security_group` | A stateful firewall controlling inbound and outbound traffic for attached resources |
| `aws_instance` | A single EC2 virtual machine, provisioned into a subnet and secured by a security group |
