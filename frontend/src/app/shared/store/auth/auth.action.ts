import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';


export const loginStart = createAction('[Auth] Login Start', props<{ mobile: string, password: string }>());
export const authenticationSuccess = createAction('[Auth] Authentication Success', props<{ user: User, isRedirect: boolean }>());
export const authenticationFail = createAction('[Auth] Authentication Fail', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');
export const autoLogin = createAction('[Auth] Auto Login');

export const registerStart = createAction('[Auth] Register Start', props<User>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ registeredUserId: number }>());
export const registerFail = createAction('[Auth] Register Fail', props<{ error: string }>());

