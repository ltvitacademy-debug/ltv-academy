# Script — The Shared Responsibility Model

## Segment 1 (title)

AWS draws one line everywhere: AWS is responsible for security of the cloud, and you're responsible for security in the cloud. It's the single most-tested concept on every AWS certification, for good reason.

## Segment 2 (code: the split)

AWS secures the facilities, the hardware, the host OS, the network backbone — everything underneath what you touch. You secure everything you configure on top: IAM, OS patching where it applies, firewall rules, encryption, and whether that S3 bucket is accidentally public.

## Segment 3 (steps: the line moves)

That line isn't fixed — it slides with how much AWS manages. On EC2 you patch the guest OS yourself; on RDS, AWS patches the database engine but you still own IAM and backups; on S3, there's no OS at all, but bucket policy and access settings are entirely yours.

## Segment 4 (outro)

Most real AWS security incidents are exactly this: a misconfigured bucket or an overly broad policy, squarely on the customer's side of the line. Next up: IAM basics, where that "your job" work actually happens.
