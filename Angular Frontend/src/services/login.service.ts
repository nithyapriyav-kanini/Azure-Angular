import { HttpClient } from "@angular/common/http";
import {Injectable} from '@angular/core';
import { LoginModel } from "src/models/login.model";

@Injectable()
export class LoginService{

    constructor(private httpClient:HttpClient){

    }
    loginIntern(login:LoginModel){
        return this.httpClient.post("https://localhost:7021/api/User/action/Login",login);
    }
}