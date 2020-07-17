import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { actionSheetEnter, actionSheetLeave } from 'src/app/shared/animations';
import { CancelAppointmentComponent } from './cancel-appointment.component';
import { AppointmentItem } from '../../models/appointment-item';

@Injectable({
    providedIn: 'root'
})
export class CancelAppointmentService {
    private modal: HTMLIonModalElement;

    constructor(
        private modalCtrl: ModalController
    ) { }

    async show(appointmentItem: AppointmentItem) {
        this.modal = await this.modalCtrl.create({
            component: CancelAppointmentComponent,
            cssClass: 'add-tokens-popup',
            enterAnimation: actionSheetEnter,
            leaveAnimation: actionSheetLeave,
            componentProps: { appointmentItem }
        });
        return await this.modal.present();
    }

    onDismiss(): Observable<AppointmentItem> {
        return from(this.modal.onDidDismiss()).pipe(map(data => data.data));
    }
}