# S3, IAM & Lambda on AWS

Northbridge's order-processing fleet now has a network to run on. This lesson rounds out the rest of Northbridge's core AWS footprint: an S3 bucket to store product images, an IAM role scoped to exactly what that bucket's consumers need, and a Lambda function that sends the order-confirmation email customers see right after checkout.

## What you'll learn

- How `aws_s3_bucket` plus its versioning and encryption resources protect product images
- How `aws_iam_role` and `aws_iam_policy` express least-privilege access, and how `aws_iam_role_policy_attachment` connects them
- How `aws_lambda_function` deploys Northbridge's order-confirmation email function
- Why the Lambda function assumes an IAM role instead of using long-lived credentials

## S3 for product images

Product images get their own bucket, with versioning and encryption configured as separate resources attached to it:

```hcl
resource "aws_s3_bucket" "product_images" {
  bucket = "northbridge-product-images"
}

resource "aws_s3_bucket_versioning" "product_images" {
  bucket = aws_s3_bucket.product_images.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "product_images" {
  bucket = aws_s3_bucket.product_images.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
```

Versioning means an accidentally overwritten or deleted product photo can be recovered from an earlier version instead of being gone for good. Server-side encryption means every object AWS stores is encrypted at rest automatically, with no extra work from whoever uploads it.

## IAM: a role scoped to exactly one job

The Lambda function needs to read from that bucket and send email — nothing more. IAM expresses that as a role, a policy describing the allowed actions, and an attachment connecting the two:

```hcl
resource "aws_iam_role" "order_confirmation_lambda" {
  name = "northbridge-order-confirmation-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_policy" "order_confirmation_access" {
  name = "northbridge-order-confirmation-access"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:GetObject"]
        Effect   = "Allow"
        Resource = "${aws_s3_bucket.product_images.arn}/*"
      },
      {
        Action   = ["ses:SendEmail"]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "order_confirmation" {
  role       = aws_iam_role.order_confirmation_lambda.name
  policy_arn = aws_iam_policy.order_confirmation_access.arn
}
```

The `assume_role_policy` says which AWS service is allowed to use this role — here, the Lambda service itself. The policy's `Statement` lists exactly two allowed actions: reading objects from the product-images bucket, and sending email. Nothing else is granted. This is least privilege in practice: the function can do its one job and nothing more, so a bug or a compromised function can't do unrelated damage.

## The Lambda function

With the role in place, the function itself is a short block pointing at deployed code and the role it assumes:

```hcl
resource "aws_lambda_function" "order_confirmation" {
  function_name = "northbridge-order-confirmation"
  role          = aws_iam_role.order_confirmation_lambda.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  filename      = "order-confirmation.zip"

  environment {
    variables = {
      PRODUCT_IMAGE_BUCKET = aws_s3_bucket.product_images.id
    }
  }
}
```

`role` references the IAM role block directly — Lambda assumes that role every time it runs, instead of the function carrying its own access keys. That's the pattern AWS wants everywhere: services assume roles; people and automation almost never hold long-lived credentials.

## Key terms

| Term | Meaning |
|---|---|
| `aws_s3_bucket` | An S3 storage bucket; versioning and encryption are configured as separate attached resources |
| `aws_iam_role` | An identity a service (or user) can assume, defined by who is allowed to assume it |
| `aws_iam_policy` | A document listing exactly which actions are allowed on which resources |
| `aws_iam_role_policy_attachment` | Connects a policy to a role, granting the role that policy's permissions |
| Least privilege | Granting only the specific permissions a role needs, never broad or default access |
| `aws_lambda_function` | A serverless function deployed from code, run under an assumed IAM role |
