import { Action } from '@ngrx/store';

export enum CounterActionTypes {
  Increment = '[Counter] Increment',
  Decrement = '[Counter] Decrement',
  Reset = '[Counter] Reset'
}

export class CounterIncrement implements Action {
  readonly type = CounterActionTypes.Increment;
}

export class CounterDecrement implements Action {
  readonly type = CounterActionTypes.Decrement;
}

export class CounterReset implements Action {
  readonly type = CounterActionTypes.Reset;
}


export type CounterActions = CounterIncrement | CounterDecrement | CounterReset;
