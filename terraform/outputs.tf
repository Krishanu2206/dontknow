output "website_endpoint" {
  value = "http://localhost:4566/${aws_s3_bucket.static_website.bucket}/${aws_s3_bucket.static_website.website[0].index_document}"
}