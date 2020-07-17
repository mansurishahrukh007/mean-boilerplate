
import { User } from '../../models/user.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.action';

export interface State {
  user: User,
  registerUser: User,
  imageBaseUrl: string,
  authError: string,
  loading: boolean
}

const initialState: State = {
  user: null,
  registerUser: null,
  imageBaseUrl: null,
  authError: null,
  loading: false
}

const _authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginStart,
    (state) => ({
      ...state,
      user: null,
      registerUser: null,
      authError: null,
      loading: true,
    })
  ),
  on(
    AuthActions.registerStart,
    (state, user) => ({
      ...state,
      registerUser: user,
      authError: null,
      loading: true,
    })
  ),
  on(
    AuthActions.registerSuccess,
    (state, action) => ({
      ...state,
      registerUser: { ...state.registerUser, id: action.registeredUserId },
      authError: null,
      loading: false,
    })
  ),
  on(
    AuthActions.registerFail,
    (state, action) => ({
      ...state,
      authError: action.error,
      loading: false,
    })
  ),
  on(
    AuthActions.authenticationSuccess,
    (state, action) => ({
      ...state,
      user: { ...action.user },
      authError: null,
      loading: false
    })
  ),
  on(
    AuthActions.authenticationFail,
    (state, error) => ({
      ...state,
      user: null,
      authError: error.error,
      loading: false
    })
  ),
  on(
    AuthActions.logout,
    (state) => ({
      ...state,
      user: null,
      registerUser: null,
      authError: null,
      loading: false,
    })
  ),
);


export function authReducer(authState: State, authAction: Action) {
  return _authReducer(authState, authAction);
}
