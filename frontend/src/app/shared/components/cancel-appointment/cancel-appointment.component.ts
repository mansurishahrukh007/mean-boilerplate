import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { fromApp } from 'src/app/shared/store';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import { AppointmentItem } from '../../models/appointment-item';
import { AppointmentActions } from '../../store/appointment';

@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.scss'],
})
export class CancelAppointmentComponent implements OnInit {
  @Input() appointmentItem: AppointmentItem;
  isFormSubmitted = false;
  cancelForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.cancelForm = new FormGroup({
      cancelReason: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    console.log(this.cancelForm.value);

    if (this.cancelForm.valid) {
      this.appointmentItem = {
        ...this.appointmentItem,
        cancel_reason: this.cancelForm.value.cancelReason
      }

      this.store.dispatch(AppointmentActions.cancelAppointmentStart({ appointment: this.appointmentItem }));
      this.dismiss(this.appointmentItem);
    }
  }

  dismiss(appointmentItem?: AppointmentItem) {
    this.modalCtrl.dismiss(appointmentItem);
  }
}
