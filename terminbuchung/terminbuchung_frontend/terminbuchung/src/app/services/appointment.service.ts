import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, subscribeOn} from "rxjs";

import {AppointmentTVerw} from "../entities/AppointmentTVerw";
import {Drug} from "../entities/Drug";

import {AppointmentTBuch} from "../entities/AppointmentTBuch";
import * as moment from "moment/moment";
import {Person} from "../entities/Person";


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {



  private readonly appManagementUrl = 'http://localhost:9191/';
  private readonly baseUrl = 'http://localhost:9192/';


  constructor(private http: HttpClient) {
  }

  public getFreeApp(locname: string): Observable<AppointmentTVerw[]> {
    return this.http.get<AppointmentTVerw[]>
    (this.appManagementUrl + 'locations/' + locname + '/free-appointments');
  }

  public getAllDrugs() : Observable<Drug[]> {
    return this.http.get<Drug[]> (this.appManagementUrl + 'articles');
  }

  public addApp(appToPost: AppointmentTBuch): Observable<AppointmentTBuch> {
    return this.http.post<AppointmentTBuch>(this.baseUrl + 'booked-appointments', appToPost);
  }

  public addAppTVerw(id: number): Observable<AppointmentTVerw> {
    // @ts-ignore
    return this.http.post<AppointmentTVerw>(this.appManagementUrl + 'appointment/' + id);

  }



}
