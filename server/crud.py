from sqlalchemy.orm import Session
import models, schemas

def create_submission(db: Session, submission: schemas.SubmissionCreate):
    db_submission = models.Submission(data=submission.data)
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

def get_submissions(db: Session):
    return db.query(models.Submission).order_by(models.Submission.created_at.desc()).all()

def get_total_submissions(db: Session):
    return db.query(models.Submission).count()
