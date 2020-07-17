// import
import * as fromApp from './app.reducer';
import { AuthEffects } from './auth';
// import { AppointmentEffects } from './appointment';

const AppEffects = [
  AuthEffects,
  // AppointmentEffects
];

export { fromApp, AppEffects };
