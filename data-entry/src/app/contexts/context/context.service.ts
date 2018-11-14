import { Injectable } from "@angular/core";
import { ContextId } from "./types";

@Injectable()
export class ContextService {

  selection: ContextId;

  constructor() {
  }

  selectedId(): string {
    if (this.selection == null) {
      return '';
    }
    return this.selection.id;
  }
}
