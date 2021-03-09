import { Action, ActionReducer } from '@ngrx/store';
import { logoutUser } from '../login/login.action';
export function clearStateMetaReducer<State extends {}>(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return function clearStateFn(state: State, action: Action) {
    if (action.type === 'logoutUser') {
      state = {} as State; // ==> Emptying state here
    }
    return reducer(state, action);
  };
}
