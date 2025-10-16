# Udagram - Image Filtering Application  
### Fullstack Deployment Project – Udacity Cloud Developer Nanodegree  

---

## 🌍 Project Overview  

**Udagram** is a full-stack application built with **Node.js**, **TypeScript**, and **Angular (Ionic)**.  
It allows users to register, log in, upload images, and process them through a filtering service.  

The project demonstrates deploying and managing a scalable cloud-based architecture using **AWS** services.

---

## Components  

| Component | Technology | Hosting |
|------------|-------------|----------|
| **Frontend** | Angular (Ionic) | AWS S3 (Static Website Hosting) |
| **Backend API** | Node.js + Express + Sequelize | AWS Elastic Beanstalk |
| **Database** | PostgreSQL | AWS RDS |

---
## Deployed URLs  

| Service | URL |
|----------|-----|
| **Frontend (S3 Hosted)** | http://udagram-frontend-radu.s3-website-eu-west-1.amazonaws.com |
| **Backend API (Elastic Beanstalk)** | http://udagram-api.eba-tmpiktqx.eu-west-1.elasticbeanstalk.com/api/v0 |
| **Database (RDS)** | Private endpoint – used only by the backend |

---

## Environment Variables  

The backend uses the following environment variables (set both in `.env` and Elastic Beanstalk → Configuration → Software):  

POSTGRES_HOST=udagramdb.crwiwcascafp.eu-north-1.rds.amazonaws.com
POSTGRES_DB=udagram
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Password123!
PORT=8080
JWT_SECRET=mystrongsecret
URL=http://udagram-api.eba-tmpiktqx.eu-west-1.elasticbeanstalk.com

AWS_REGION=eu-west-1
AWS_PROFILE=default
AWS_BUCKET=udagram-frontend-radu


---

## Project Structure  

├── .circleci/
│ └── config.yml
├── docs/
│ ├── architecture_diagram.png
│ ├── pipeline_diagram.png
│ ├── Infrastructure_description.md
│ └── Pipeline_description.md
├── udagram/
│ ├── udagram-api/ # Backend (Node.js + Express)
│ └── udagram-frontend/ # Frontend (Angular)
└── README.md


---

## Local Development  

### Backend API  

```bash
cd udagram/udagram-api
npm install
npm run build
npm run start
```

API runs locally on http://localhost:8080

## Frontend

```bash
cd udagram/udagram-frontend
npm install
npm run build
npm start
```
## AWS Deployment Steps
### Deploy Backend to Elastic Beanstalk

```bash
cd udagram/udagram-api
eb init
eb create --single --keyname udagram-key --instance-types t3.micro
```

### Deploy Frontend to S3
```bash
cd udagram/udagram-frontend
npm run build
# Upload the contents of the "www" folder to your S3 bucket (public-read)
```

## Verify Application
* Acces to Frontend (S3 URL)
* Confirm API connectivity (Elastic Beanstalk URL)
* Check RDS connection from backend logs (eb logs)

## Documentation

### Inside the docs/ folder:
* architecture_diagram.png – high-level system architecture
* pipeline_diagram.png – CI/CD workflow overview
* Infrastructure_description.md – details of AWS services used
* Pipeline_description.md – explanation of the deployment process

## Testing

Run backend tests locally using:

```bash
npm test
```

## Manual API verification example:

### Acces http://udagram-api.eba-tmpiktqx.eu-west-1.elasticbeanstalk.com/api/v0/feed

Expected response : {"count":0,"rows":[]}

## CI/CD Pipeline

This project uses **CircleCI** for continuous integration and deployment.  
The pipeline consists of three stages:
1. **Build** – installs dependencies and builds both frontend and backend.
2. **Hold** – requires manual approval before deployment.
3. **Deploy** – deploys the backend to AWS Elastic Beanstalk and frontend to AWS S3.

All environment variables are securely stored in CircleCI and sent to Elastic Beanstalk during deployment.


> Developed by Radu Covlea for Udacity's FullStack JavaScript Nanodegree program.
