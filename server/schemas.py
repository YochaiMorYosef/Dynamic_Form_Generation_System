from pydantic import BaseModel
from typing import Dict, Any

class SubmissionCreate(BaseModel):
    data: Dict[str, Any]
