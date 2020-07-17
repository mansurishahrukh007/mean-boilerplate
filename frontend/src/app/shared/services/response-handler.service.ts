import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionCreator } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {

  constructor(
  ) { }

  handleError(errorRes: HttpErrorResponse, action: ActionCreator<any, any>) {
    console.error(errorRes);

    let errorMessage = 'Something went wrong!';
    if (errorRes.error && errorRes.error.message) {
      errorMessage = errorRes.error.message;
    }
    return of(action({ error: errorMessage }));
  }
}
