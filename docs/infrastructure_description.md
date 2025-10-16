# Infrastructure Description

This project uses AWS services to host and deploy the Udagram application.

## Components

- **Elastic Beanstalk (EB):**  
  Hosts and runs the Node.js backend API.  
  Platform: Node.js 20 running on Amazon Linux 2023.  
  Environment type: Single instance.  

- **RDS (PostgreSQL):**  
  Stores user and image metadata.  
  Hosted in AWS RDS (PostgreSQL engine, Free Tier).  
  Accessible from Elastic Beanstalk through environment variables.

- **S3 (Simple Storage Service):**  
  Hosts the static frontend Angular application.  
  Configured for public access and static website hosting.

## Connections

- The frontend (S3) communicates with the backend (EB) through RESTful HTTP requests.
- The backend connects securely to RDS through the `POSTGRES_HOST` environment variable.
