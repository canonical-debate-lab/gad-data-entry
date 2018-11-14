import { Injectable } from "@angular/core";
import { StatementId } from "./types";
import { DocumentReference } from "@angular/fire/firestore";

@Injectable()
export class StatementService {

  selection: StatementId;
  selectedRef: DocumentReference;

  constructor() {
  }

  selectedId(): string {
    if (!this.selection) {
      return '';
    }
    return this.selection.id;
  }

  selectedRefId(): string {
    if (!this.selectedRef) {
      return '';
    }
    return this.selectedRef.id;
  }
}
