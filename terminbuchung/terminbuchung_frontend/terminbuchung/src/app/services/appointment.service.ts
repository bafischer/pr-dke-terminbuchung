import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
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



  private readonly appManagementUrl = 'http://localhost:9193/';

  private readonly locSubstManagementUrl = 'http://localhost:9194/';
  private readonly baseUrl = 'http://localhost:9192/';


  constructor(private http: HttpClient) {
  }

  //Aufruf Terminverwaltungs-App um alle freien Termine für einen best. Standort zu erhalten
  public getFreeApp(locname: string): Observable<AppointmentTVerw[]> {
    console.log('locname', locname);
    const params = new HttpParams()
      .set('location', locname);

    return this.http.get<AppointmentTVerw[]>
    (this.appManagementUrl + 'free-appointments-loc', {params});
  }

  //Aufruf Impfstoff-/Medikamentenverwaltungs-App um alle Impfstoffe und Medikamente zu erhalten
  public getAllDrugs() : Observable<Drug[]> {
    return this.http.get<Drug[]> (this.locSubstManagementUrl + 'articles');
  }

  // Aufruf Terminbuchungs-App um soeben gebuchten Termin zu speichern
  public addApp(appToPost: AppointmentTBuch): Observable<AppointmentTBuch> {
    return this.http.post<AppointmentTBuch>(this.baseUrl + 'booked-appointments', appToPost);
  }

  // Aufruf Terminverwaltungs-App um einen bis dahin freien Termin als nunmehr gebucht zu markieren
  public addAppTVerw(id: number): Observable<AppointmentTVerw> {

    // @ts-ignore
    return this.http.put<AppointmentTVerw>(this.appManagementUrl + 'appointment/' + id);

  }



}
