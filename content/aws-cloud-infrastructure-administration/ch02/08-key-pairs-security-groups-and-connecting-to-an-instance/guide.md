# Lesson 8 — Key Pairs, Security Groups, and Connecting to an Instance

**Chapter 2 · AWS Compute: EC2 · Lesson 8 of 32**

## What you'll learn

- What an EC2 key pair actually is, and why AWS only lets you download the
  private half once
- What a security group is, and how it behaves as a **stateful** firewall
- How those two pieces combine to make SSH access to an instance possible
  at all
- How to read and run a real `ssh -i` connection command

## Key pairs: a public half on the instance, a private half with you

An EC2 **key pair** is a standard public/private key pair, used for
authentication instead of a password. When you create one with
`aws ec2 create-key-pair`, AWS keeps the **public** key and automatically
installs it into the instance's authorized-keys file the moment you launch
with `--key-name` pointing at it. The **private** key is handed back to you
exactly once, in the API response — AWS does not retain a copy. If you lose
it, there is no "forgot my key" recovery; your only options are replacing
the key material on the instance yourself (if you still have another way
in) or launching a fresh instance.

```
aws ec2 create-key-pair \
  --key-name my-ec2-keypair \
  --query "KeyMaterial" \
  --output text > my-ec2-keypair.pem

chmod 400 my-ec2-keypair.pem
```

`chmod 400` matters on Linux/macOS — SSH refuses to use a private key file
that other users on your machine could read.

## Security groups: AWS's stateful, instance-level firewall

A **security group** is a virtual firewall attached directly to an
instance's network interface. It works entirely on **allow rules** — there
is no "deny" rule to write, because everything not explicitly allowed is
denied by default. Two defaults matter:

- **Inbound**: nothing is allowed in until you add a rule for it. A brand-new
  security group blocks all inbound traffic.
- **Outbound**: everything is allowed out by default, until you lock it down
  yourself.

Security groups are **stateful**: if you allow inbound traffic on port 22,
the response traffic going back out is automatically permitted — you never
have to write a matching outbound rule for traffic your instance initiated
or responded to. That statefulness is what separates a security group from
the network ACLs covered later in Chapter 4, which are stateless.

```
aws ec2 authorize-security-group-ingress \
  --group-id sg-0123456789abcdef0 \
  --protocol tcp \
  --port 22 \
  --cidr 203.0.113.0/24
```

That rule allows inbound SSH (port 22, TCP) only from the `203.0.113.0/24`
range — scoping the source CIDR to where you actually connect from, instead
of `0.0.0.0/0`, is the single most common SSH-hardening step administrators
skip and later regret.

## Connecting: putting both pieces together

With the public key installed on the instance (via the key pair at launch)
and the security group allowing inbound SSH from your address, connecting is
one command:

```
ssh -i my-ec2-keypair.pem ec2-user@203.0.113.50
```

`-i` points SSH at your private key file, `ec2-user` is the default login
username on Amazon Linux AMIs (Ubuntu AMIs use `ubuntu` instead), and the
IP is the instance's public IP address — found via `describe-instances` or
the console. If this fails, the cause is almost always one of: the security
group doesn't allow your current IP on port 22, the instance has no public
IP, or the wrong username was used for the AMI.

## Key terms

| Term | Meaning |
|---|---|
| Key pair | A public/private key pair for SSH auth; AWS installs the public half on the instance and hands you the private half exactly once |
| Security group | A stateful, instance-level firewall working on allow rules only; inbound denied by default, outbound allowed by default |
| Stateful | Response traffic to an already-allowed request is automatically permitted, with no matching rule needed in the other direction |
| `ssh -i` | The flag that tells the SSH client which private key file to authenticate with |

## Check yourself

An administrator can't SSH into a new instance. The security group allows
port 22 from `0.0.0.0/0`, the key pair was created correctly, and the
instance shows `running`. What two things would you check first, and why?
