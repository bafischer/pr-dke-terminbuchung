import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "../entities/Location";




@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly urlLocationManagement = 'http://localhost:9191/';




  constructor(private http: HttpClient) {
  }

  public getLocations(county: string): Observable<Location[]> {
      return this.http.get<Location[]>
      (this.urlLocationManagement + 'locations/' + county);
    }

  }

