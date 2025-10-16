# Pipeline Description

The CI/CD pipeline automates building and deployment through CircleCI.

## Pipeline Steps

1. **Install Dependencies:**  
   Installs project dependencies for both the frontend and backend.

2. **Build:**  
   Runs the Angular frontend build and compiles the Node.js backend.

3. **Test:**  
   Executes unit tests (Jasmine for backend, Karma for frontend).

4. **Deploy:**  
   - Deploys the backend to AWS Elastic Beanstalk using the EB CLI.  
   - Deploys the frontend to AWS S3 for static hosting.  

Each successful build produces a new deployment of both the API and frontend applications.

## Artifacts

- `.circleci/config.yml` defines the pipeline configuration.
- AWS credentials are securely stored as CircleCI environment variables.
