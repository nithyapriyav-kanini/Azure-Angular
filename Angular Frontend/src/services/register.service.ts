import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {Injectable} from '@angular/core';
import { catchError, throwError } from "rxjs";
import { RegisterModel } from "src/models/register.model";

@Injectable()
export class RegisterService{

    constructor(private httpClient:HttpClient){

    }
    employeeRegister(employee: RegisterModel) {
        console.log(employee);
        return this.httpClient.post("https://localhost:7021/api/User/action/Register", employee).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error occurred:', error);
            return throwError('Something went wrong. Please try again later.');
          })
        );
      }
}