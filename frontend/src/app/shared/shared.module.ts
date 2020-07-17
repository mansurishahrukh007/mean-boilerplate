import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommaSeparatePipe } from './pipes/comma-separate.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    // CancelAppointmentComponent,
    CommaSeparatePipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    CommaSeparatePipe,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
