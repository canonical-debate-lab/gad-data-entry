import { DocumentReference } from "@angular/fire/firestore";

export interface Statement {
  text: string;
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

export interface Context {
  name: string;
  keywords: string[];
}
export interface ContextId extends Context {
  id: string;
  docRef: DocumentReference;
}