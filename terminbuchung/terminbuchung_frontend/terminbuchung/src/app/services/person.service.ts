import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Person} from "../entities/Person";



@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly baseurl = 'http://localhost:9192/';
  constructor(private http: HttpClient) {
  }  public getPeople():Observable<Person[]> {

    return this.http.get<Person[]>(this.baseurl + 'persons');
  }

  public addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseurl + 'persons', person);
  }

}
