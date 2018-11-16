import { DocumentReference } from "@angular/fire/firestore";
import { SourceType } from "src/app/references/reference/types";

export interface Statement {
  text: string;
  action: boolean;
  originalText: string;
  modified: boolean;
  statement_type: SourceType;
  desc: string;
  ref: DocumentReference;
  contexts: DocumentReference[];
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
export interface StatementId extends Statement {
  id: string;
  docRef: DocumentReference;
}
