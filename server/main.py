from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, crud, database
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Json schema as hardcoded
schema = {
    "fields": [
        {"name": "name", "type": "text", "label": "Name", "required": True, "minLength": 3},
        {"name": "email", "type": "email", "label": "Email", "required": True},
        {"name": "password", "type": "password", "label": "Password", "required": True, "minLength": 4, "maxLength": 10},
        {"name": "age", "type": "number", "label": "Age", "required": False},
        {"name": "date", "type": "date", "label": "", "required": False},
        {"name": "gender", "options": ["Male", "Female"], "type": "dropdown", "label": "Gender"}
    ]
}

@app.get("/schema")
def get_schema():
    return schema

@app.post("/submissions")
def create_submission(submission: schemas.SubmissionCreate, db: Session = Depends(database.get_db)):
    print(submission)
    existing_docs = crud.get_submissions(db)
    for doc in existing_docs:
        # Duplicate Prevention: Reject submissions that are exact duplicates
        # print(f"doc: {doc.data}")
        obj = doc.data
        if obj.get("name") == submission.data.get("name") or obj.get("email") == submission.data.get("email"):
             raise HTTPException(
                status_code=400,
                detail="Name or Email already exist."
            )
    return crud.create_submission(db, submission)

@app.get("/submissions")
def read_submissions(db: Session = Depends(database.get_db)):
    return crud.get_submissions(db)

@app.get("/totalsubmissions")
def count_submissions(db: Session = Depends(database.get_db)):
    return crud.get_total_submissions(db)

# @app.delete("/submissions")
# def delete_submissions(db: Session = Depends(database.get_db)):
#     return crud.delete_submissions(db, submission)
