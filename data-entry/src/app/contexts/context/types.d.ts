import { DocumentReference } from "@angular/fire/firestore";

import * as firebase from 'firebase';

export interface Context {
  name: string;
  desc: string;
  url: string;
  keywords: string[];
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
export interface ContextId extends Context {
  id: string;
  docRef: DocumentReference;
}
