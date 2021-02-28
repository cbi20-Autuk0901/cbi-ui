import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Datastore } from '../models/data-store.model';

// Section 2
export const ADD_DATA = '[DATASTORE] Add';
export const REMOVE_DATA = '[DATASTORE] Remove';

// Section 3
export class AddData implements Action {
  readonly type = ADD_DATA;

  constructor(public payload: Datastore) {}
}

export class RemoveData implements Action {
  readonly type = REMOVE_DATA;

  constructor(public payload: number) {}
}

// Section 4
export type Actions = AddData | RemoveData;
