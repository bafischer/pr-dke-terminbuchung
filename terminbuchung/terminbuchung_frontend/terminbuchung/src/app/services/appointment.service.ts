import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {AppointmentTVerw} from "../entities/AppointmentTVerw";
import {Drug} from "../entities/Drug";

import {AppointmentTBuch} from "../entities/AppointmentTBuch";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private readonly urlLocationManagement = 'http://localhost:9191/';
  private readonly baseUrl = 'http://localhost:9192/';


  constructor(private http: HttpClient) { }

  public getFreeApp(locname: string): Observable<AppointmentTVerw[]> {
    return this.http.get<AppointmentTVerw[]>
    (this.urlLocationManagement + 'locations/' + locname + '/free-appointments');
  }

  public getAllDrugs() : Observable<Drug[]> {
    return this.http.get<Drug[]> (this.urlLocationManagement + 'articles');
  }

  public addApp(appToPost: AppointmentTBuch): Observable<AppointmentTBuch> {
    return this.http.post<AppointmentTBuch>(this.baseUrl + 'booked-appointments', appToPost);
  }

  public addAppTVerw(id: number): Observable<AppointmentTVerw> {
    // @ts-ignore
    return this.http.post<AppointmentTVerw>(this.urlLocationManagement + 'appointment/' + id);

  }




}
