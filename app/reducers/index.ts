import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromCounter from './counter.reducer';
  
  export interface State {
    "counter" : number;
  }
  
  export const reducers: ActionReducerMap<State> = {
    "counter": fromCounter.reducer,
  };
  
  
  export const metaReducers: MetaReducer<State>[] = [];
  