import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from '../actions';
import { User } from '../../models/user.model';

export interface UserState {
  id: string | any,
  user: User | any,
  loaded: boolean,
  loading: boolean,
  error: any
};

const userInitialState: UserState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null
};

const _userReducer = createReducer<UserState, Action>(userInitialState,
  on(userActions.loadUser, (state, { id }) => ({
    ...state,
    loading: true,
    id: id
  })),

  on(userActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...user }
  })),

  on(userActions.loadUserFailure, (state, { payload }) => ({
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

export function userReducer(state: any, action: Action) {
  return _userReducer(state, action)
}

