# Getting Started with Dynamic Form Generation System

# Startup & Installation Guide.

This document will help you with the installation process for startup the system run on localhost.

This Guide is for Windows machine:
Start with the server side:

1. First of all, open the terminal or cmd.
2. Navigate to the DynamicFormGeneration dir with: cd /path/DynamicFormGeneration/
3. cd server
4. create virtual env: python -m venv venv
5. enter to the env: .\venv\Scripts\activate
6. install the pkgs requirements
7. pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
8. pip install "uvicorn[standard]"
9. run: uvicorn app.main:app --reload (for start ths server side)

Client side:

1. open a new terminal
2. Go to the client dir: cd client (here we already run npx create-react-app dynamic-form --template typescript for creating the react env)
3. run: npm install && npm start

open the localhost website on port 3000.

Good luck for us!

Yochai Mor Yosef.
Full Stuck Developer.
