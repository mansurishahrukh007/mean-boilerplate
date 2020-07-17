
// import { Action, createReducer, on } from '@ngrx/store';
// import * as AppointmentActions from './appointment.action';
// import { AppointmentDate } from '../../models/appointment-date';
// import { AuthActions } from '../auth';

// export interface State {
//     appointmentDates: AppointmentDate[],
//     responseError: string,
//     loading: boolean
// }

// const initialState: State = {
//     appointmentDates: null,
//     responseError: null,
//     loading: false
// }
// const _appointmentReducer = createReducer(
//     initialState,
//     on(
//         AppointmentActions.cancelAppointmentStart, AppointmentActions.fetchAppointmentStart,
//         (state, action) => ({
//             ...state,
//             responseError: null,
//             loading: true
//         })
//     ),
//     on(
//         AppointmentActions.cancelAppointmentFail, AppointmentActions.fetchAppointmentFail,
//         (state, action) => ({
//             ...state,
//             responseError: action.error,
//             loading: false
//         })
//     ),
//     on(
//         AppointmentActions.cancelAppointmentSuccess,
//         (state, action) => {
//             let dateIndex = state.appointmentDates.findIndex(item => item.appointment_date === action.appointment.search_date);
//             let updatedDates: AppointmentDate[] = [...state.appointmentDates];
//             let appointmentIndex = updatedDates[dateIndex].appointments.findIndex(item => item.id === action.appointment.id);
//             let appointments = [...updatedDates[dateIndex].appointments];

//             appointments[appointmentIndex] = { ...action.appointment };
//             updatedDates[dateIndex] = { ...updatedDates[dateIndex], appointments: appointments }

//             return ({
//                 ...state,
//                 appointmentDates: updatedDates,
//                 responseError: null,
//                 loading: false
//             })
//         }
//     ),
//     on(
//         AppointmentActions.fetchAppointmentSuccess,
//         (state, action) => {

//             let dateIndex = -1;
//             let updatedDates: AppointmentDate[];
//             if (state.appointmentDates) {
//                 dateIndex = state.appointmentDates.findIndex(item => item.appointment_date === action.appointmentDate.appointment_date);
//                 updatedDates = [...state.appointmentDates];
//             }
//             if (dateIndex < 0) {
//                 if (state.appointmentDates) {
//                     updatedDates = [...state.appointmentDates, action.appointmentDate];
//                 } else {
//                     updatedDates = [action.appointmentDate];
//                 }
//             } else {
//                 if (action.appointmentDate.page_number === 1) {
//                     updatedDates[dateIndex] = {
//                         ...updatedDates[dateIndex],
//                         appointments: [...action.appointmentDate.appointments]
//                     }
//                 } else {
//                     updatedDates[dateIndex] = {
//                         ...updatedDates[dateIndex],
//                         appointments: [...updatedDates[dateIndex].appointments, ...action.appointmentDate.appointments]
//                     }
//                 }
//             }
//             return ({
//                 ...state,
//                 appointmentDates: updatedDates,
//                 responseError: null,
//                 loading: false
//             })
//         }
//     ),
//     on(
//         AuthActions.logout,
//         (state) => ({
//             ...state,
//             ...initialState
//         })
//     ),
// );

// export function appointmentReducer(appointmentState: State, authAction: Action) {
//     return _appointmentReducer(appointmentState, authAction);
// }
