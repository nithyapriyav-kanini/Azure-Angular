import { HttpClient } from "@angular/common/http";
import {Injectable} from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class GetFieldsService{

    constructor(private httpClient:HttpClient){

    }
    getLocations(): Observable<string[]> {
        return this.httpClient.get<string[]>('https://localhost:7021/api/Input/action/AllLocations');
      }
    getResourceTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>('https://localhost:7021/api/Input/action/AllResources');
    }
    getBillableTypes(): Observable<string[]> {
        return this.httpClient.get<string[]>('https://localhost:7021/api/Input/action/AllBillableTypes');
      }
    getPractices(): Observable<string[]> {
    return this.httpClient.get<string[]>('https://localhost:7021/api/Input/action/AllPractices');
    }
    getExperiences(): Observable<string[]> {
        return this.httpClient.get<string[]>('https://localhost:7021/api/Input/action/AllExperiences');
      }
}
