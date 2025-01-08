import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";


export function handleError(err: HttpErrorResponse): Observable<never> {
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
    }`;
  }
  console.error(errorMessage);
  return throwError(() => errorMessage);
}
