import { DocumentReference } from "@angular/fire/firestore";

import * as firebase from 'firebase';

export interface Reference {
  source: string;
  source_date: firebase.firestore.Timestamp;
  source_type: SourceType;
  authors: string;
  source_parent: string;
  source_saved: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
export interface ReferenceId extends Reference {
  id: string;
  docRef: DocumentReference;
}

export interface SourceType {
  name: string;
}
export interface SourceTypeId extends SourceType {
  id: string;
  docRef: DocumentReference;
}