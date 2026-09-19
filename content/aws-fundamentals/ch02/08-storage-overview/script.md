# Script — Storage Overview: S3 & EBS

## Segment 1 (title)

S3 stores objects — files plus metadata plus a unique key — inside buckets, accessed over HTTPS rather than mounted like a disk. No practical size limit, and no server it's attached to.

## Segment 2 (code: buckets and storage classes)

That's why S3 is the default landing zone for pipelines — raw files, staged data, any compute can read and write it without owning the storage. Storage classes like Standard, Standard-IA, and Glacier trade retrieval speed for price.

## Segment 3 (steps: S3 vs EBS)

EBS is fundamentally different — block storage, a virtual hard drive attached to exactly one EC2 instance in one Availability Zone, formatted and mounted like a real disk. S3 and EBS aren't competing options, they solve different problems.

## Segment 4 (outro)

S3 is what Glue reads from and Redshift loads from; EBS shows up underneath compute that needs a real disk. Next up: networking basics — VPC.
