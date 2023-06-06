import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "../entities/Location";
import {Person} from "../entities/Person";




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

  public getLocAvailable(p: Person): string[] {
    let locNameAvailable: string[] = [];
    if (p != null) {
      this.getLocations(p.county).subscribe((loc) => {

          let i: number = 0;
          for (var Location of loc) {
            if (Location.type == "vaccination") {
              locNameAvailable[i] = Location.name;
              i++;
            }
          }
        },
        (error: HttpErrorResponse) => {

        });
    } else {
    }
    return locNameAvailable;

  }


  public getLocAvailableMedic(p: Person): string[] {
    let locNameAvailable: string[] = [];
    if (p != null) {
      this.getLocations(p.county).subscribe((loc) => {
          let i: number = 0;
          for (var Location of loc) {
            if (Location.type != "vaccination") {
              locNameAvailable[i] = Location.name;
              i++;
            }
          }
        },
        (error: HttpErrorResponse) => {

        });
    } else {
    }
    return locNameAvailable;

  }
}




