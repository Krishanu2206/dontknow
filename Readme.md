# **Deploying a Static Website to LocalStack Using Terraform**

This guide walks you through the process of deploying a static website (HTML, CSS, JS, and SVG animations) to **LocalStack** using **Terraform**. LocalStack is a fully functional local AWS cloud stack, and Terraform is an Infrastructure as Code (IaC) tool for automating cloud resource provisioning.

---

## **Prerequisites**

Before you begin, ensure you have the following installed:

1. **Docker**: To run LocalStack.
2. **AWS CLI**: To interact with LocalStack.
3. **Terraform**: To automate infrastructure provisioning.
4. **Code Editor**: For writing HTML, CSS, JS, and Terraform configuration files.

---

## **Step 1: Set Up LocalStack with Docker**

LocalStack emulates AWS services locally. Start the LocalStack container using Docker:

```bash
docker run --rm -it -p 127.0.0.1:4566:4566 -p 127.0.0.1:4510-4559:4510-4559 -v /var/run/docker.sock:/var/run/docker.sock localstack/localstack
```

### **Explanation**:
- `-p 4566:4566`: Exposes LocalStack's default port for S3 and other services.
- `-p 4510-4559:4510-4559`: Exposes additional ports for other AWS services.
- `-v /var/run/docker.sock:/var/run/docker.sock`: Allows LocalStack to manage Docker containers.

---

## **Step 2: Install and Configure AWS CLI**

The AWS CLI is used to interact with LocalStack. Install and configure it as follows:

1. **Install AWS CLI**:
   - Download the installer: [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
   - For Windows, use:
     ```bash
     msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
     ```

2. **Configure AWS CLI**:
   Run the following command and provide the required details:
   ```bash
   aws configure
   ```
   - **AWS Access Key ID**: `test`
   - **AWS Secret Access Key**: `test`
   - **Default Region**: `us-east-1`
   - **Default Output Format**: `json`

   > **Note**: LocalStack uses dummy credentials (`test`/`test`) for authentication.

---

## **Step 3: Write Your Website Code**

Create the following files for your static website:

1. **`index.html`**: The main HTML file.
2. **`styles.css`**: The CSS file for styling.
3. **`script.js`**: The JavaScript file for interactivity.
4. **SVG Animations**: Include any SVG animations in your HTML file.

Example `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <svg id="text-svg" width="800" height="200" viewBox="0 0 800 200">
      <text x="50%" y="50%" text-anchor="middle" fill="none" stroke="#000" stroke-width="2" font-size="50" font-family="Arial">
        DEPLOYING TO LOCALSTACK FOR THE FIRST TIME
      </text>
    </svg>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

---

## **Step 4: Install Terraform**

Terraform is used to automate the creation of AWS resources. Install it by following the official guide: [Terraform Installation Guide](https://developer.hashicorp.com/terraform/install).

---

## **Step 5: Create Terraform Configuration Files**

Create the following Terraform configuration files in your project directory:

### **1. `provider.tf`**
Configure the AWS provider to use LocalStack:
```hcl
provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_use_path_style           = true

  endpoints {
    s3 = "http://localhost:4566"
  }
}
```

### **2. `main.tf`**
Define the S3 bucket and upload your website files:
```hcl
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
```

### **3. `outputs.tf`**
Output the website endpoint:
```hcl
output "website_endpoint" {
  value = "http://localhost:4566/${aws_s3_bucket.static_website.bucket}/index.html"
}
```

---

## **Step 6: Initialize and Apply Terraform**

1. **Initialize Terraform**:
   ```bash
   terraform init
   ```

2. **Apply the Configuration**:
   ```bash
   terraform apply
   ```

   Confirm by typing `yes` when prompted.

3. **Access the Website**:
   After the deployment completes, Terraform will output the website endpoint:
   ```
   website_endpoint = "http://localhost:4566/portfolio-static-website/index.html"
   ```

   Open this URL in your browser to view your website.

---

## **Step 7: Persist Data Across LocalStack Restarts (Optional)**

By default, LocalStack does not persist data. To persist data across container restarts, use a Docker volume:

1. **Create a Docker Volume**:
   ```bash
   docker volume create localstack_data
   ```

2. **Run LocalStack with Persistence**:
   ```bash
   docker run -d -p 4566:4566 -v localstack_data:/var/lib/localstack --name localstack localstack/localstack:latest
   ```

---

## **Troubleshooting**

- **Bucket Already Exists**: If you encounter `BucketAlreadyExists`, delete the bucket using:
  ```bash
  aws --endpoint-url=http://localhost:4566 s3api delete-bucket --bucket portfolio-static-website
  ```

- **NoSuchBucket**: If the bucket doesn't exist, ensure you've applied the Terraform configuration.

- **Check LocalStack Logs**:
  ```bash
  docker logs localstack
  ```

---

## **Conclusion**

You’ve successfully deployed a static website to LocalStack using Terraform! This setup is perfect for local development and testing AWS resources without incurring cloud costs.
