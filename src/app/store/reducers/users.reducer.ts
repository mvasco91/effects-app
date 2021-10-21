import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from '../actions';
import { User } from '../../models/user.model';

export interface UsersState {
  users: User[],
  loaded: boolean,
  loading: boolean,
  error: any
};

const usersInitialState: UsersState = {
  users: [],
  loaded: false,
  loading: false,
  error: null
};

const _usersReducer = createReducer<UsersState,Action>(usersInitialState,
  on(userActions.loadUsers, state => ({ ...state, loading: true })),

  on(userActions.loadUsersSuccess, (state, {users}) =>({
    ...state,
    loading: false,
    loaded: true,
    users: [...users]
  })),

  on(userActions.loadUsersFailure, (state, {payload}) =>({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  })),

);

export function usersReducer (state: any, action: Action) {
  return _usersReducer(state, action)
}

