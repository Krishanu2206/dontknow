provider "aws" {
  region                      = "us-east-1"
  access_key                  = "assailant2206"
  secret_key                  = "assailant2206"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_use_path_style           = true  

  endpoints {
    s3 = "http://localhost:4566"
  }
}