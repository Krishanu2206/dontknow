resource "aws_s3_bucket" "static_website" {
  bucket = "portfolio-static-website"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_object" "index" {
  bucket       = aws_s3_bucket.static_website.bucket
  key          = "index.html"
  source       = "../index.html"
  content_type = "text/html"
}

resource "aws_s3_bucket_object" "styles" {
  bucket       = aws_s3_bucket.static_website.bucket
  key          = "styles.css"
  source       = "../styles.css"
  content_type = "text/css"
}

resource "aws_s3_bucket_object" "script" {
  bucket       = aws_s3_bucket.static_website.bucket
  key          = "script.js"
  source       = "../script.js"
  content_type = "application/javascript"
}