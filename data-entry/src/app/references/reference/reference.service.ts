import { Injectable } from "@angular/core";
import { ReferenceId } from "./types";

@Injectable()
export class ReferenceService {

  selection: ReferenceId;

  constructor() {
  }

  selectedId(): string {
    if (this.selection == null) {
      return '';
    }
    return this.selection.id;
  }
}
