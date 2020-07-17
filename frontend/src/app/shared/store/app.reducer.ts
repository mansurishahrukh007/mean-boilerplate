import { ActionReducerMap } from '@ngrx/store';
import { fromAuth } from './auth';
// import { fromAppointment } from './appointment';

export interface AppState {
  auth: fromAuth.State,
  // appointment: fromAppointment.State
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  // appointment: fromAppointment.appointmentReducer
}


