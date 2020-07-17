// import { Actions, ofType, createEffect } from '@ngrx/effects';
// import { switchMap, catchError, map } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { Injectable } from '@angular/core';
// import * as AppointmentActions from './appointment.action';
// import { ToasterService } from '../../services/toaster.service';
// import { ResponseHandlerService } from '../../services/response-handler.service';
// import { AppointmentItem } from '../../models/appointment-item';

// @Injectable()
// export class AppointmentEffects {

//     cancelAppointment$ = createEffect(() => this.actions$.pipe(
//         ofType(AppointmentActions.cancelAppointmentStart),
//         switchMap((action) => {
//             return this.http.get(
//                 `${environment.apiBaseUrl}/api/cancelAppointment`,
//                 {
//                     params: {
//                         appointment_id: `${action.appointment.id}`,
//                         cacnel_reason: action.appointment.cancel_reason
//                     }
//                 }
//             ).pipe(
//                 map((resData: any) => {
//                     return AppointmentActions.cancelAppointmentSuccess({ appointment: action.appointment });
//                 }),
//                 catchError((error) => this.resHandler.handleError(error, AppointmentActions.cancelAppointmentFail)),
//             )
//         })
//     ));

//     fetchAppointments$ = createEffect(() => this.actions$.pipe(
//         ofType(AppointmentActions.fetchAppointmentStart),
//         switchMap((action) => {
//             return this.http.post(
//                 `${environment.apiBaseUrl}/api/getAppointments`,
//                 {
//                     order_by: "id",
//                     appointment_date: action.appointmentDate.appointment_date,
//                     order_type: "desc",
//                     page_number: action.appointmentDate.page_number
//                 }
//             ).pipe(
//                 map((resData: any) => {
//                     const appointments: AppointmentItem[] = resData.data.appointments;

//                     for (let i = 0; i < appointments.length; i++) {
//                         const appointment = appointments[i];
//                         appointment.search_date = action.appointmentDate.appointment_date
//                     }

//                     const appointmentDate = {
//                         ...action.appointmentDate,
//                         total_records: resData.data.total_records,
//                         appointments: resData.data.appointments
//                     }
//                     return AppointmentActions.fetchAppointmentSuccess({ appointmentDate: appointmentDate });
//                 }),
//                 catchError((error) => this.resHandler.handleError(error, AppointmentActions.fetchAppointmentFail)),
//             )
//         })
//     ));

//     constructor(
//         private actions$: Actions,
//         private http: HttpClient,
//         private resHandler: ResponseHandlerService,
//         private toaster: ToasterService
//     ) { }
// }
