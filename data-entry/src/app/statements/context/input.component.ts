import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, switchMap, filter } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ContextId, Context } from '../../contexts/context/types';
import { ContextService } from 'src/app/contexts/context/service';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-context-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
})
export class ContextInput {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  contextCtrl = new FormControl();

  @Input() contexts: ContextId[];

  filteredContexts: Observable<ContextId[]>;

  @ViewChild('contextInput') contextInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private db: AngularFirestore,
    public svc: ContextService,
  ) {
    this.filteredContexts = this.contextCtrl.valueChanges.pipe(
      filter(value => { return value !== null }),
      filter(value => { console.log(value); return typeof value == typeof "" }),
      debounceTime(300),
      switchMap(value =>
        this.db.collection('contexts', ref => ref.where('keywords', 'array-contains', value.toLowerCase())).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Context;
            const id = a.payload.doc.id;
            const docRef = a.payload.doc.ref;
            return { id, docRef, ...data };
          })))
      )
    );
  }

  add(event: MatChipInputEvent): void {
    // Add context only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our context
      // TODO(kwiesmueller): Open Context for further editing!
      if (value) {
        this.svc.add(value, v => {
          this.contexts.push(v);
        });
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.contextCtrl.setValue(null);
    }
  }

  remove(context: ContextId): void {
    const index = this.contexts.indexOf(context);

    if (index >= 0) {
      this.contexts.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.contexts.push(event.option.value);
    this.contextInput.nativeElement.value = '';
    this.contextCtrl.setValue(null);
  }
}