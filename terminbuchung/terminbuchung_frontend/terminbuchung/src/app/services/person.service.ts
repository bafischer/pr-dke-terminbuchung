import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../entities/Person";
import {SickInformation} from "../entities/SickInformation";

const emptyPerson: Person = {
  svnr: '',
  firstName: '',
  lastName: '',
  birthday: new Date(),
  county: '',
  email: '',
  phoneNr: '',
  streetAndDoorNr: '',
  postalCode: 4000,
  city: ''
}



@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly baseurl = 'http://localhost:9192/';
  private readonly urlContactTracing = 'http://localhost:9191/';

  constructor(private http: HttpClient) {
  }

  private person: Person = emptyPerson;

  public getPeople():Observable<Person[]> {
    return this.http.get<Person[]>(this.baseurl + 'persons');
  }


  public addPerson(): Observable<Person> {
    //this.person = person;
    return this.http.post<Person>(this.baseurl + 'persons', this.person);
  }

  public getSickInfo(svnr: string): Observable<SickInformation> {
    return this.http.get<SickInformation>
      (this.urlContactTracing + 'person/'+ svnr + '/sickinformation');
  }

  public getPersonBySvnr(svnr: string): Observable<Person> {
    return this.http.get<Person>(this.baseurl + 'persons/'+ svnr);
  }

  public checkConditionMedic(sickInfo: SickInformation, errorMessageMedication: String): boolean {
    let medicationCondFullfilled: boolean = false;
    if (errorMessageMedication == "ok" && sickInfo.covidTestDate != null &&
      sickInfo.sick != null) {
      let sick = sickInfo.sick;
      let covidTestDate = new Date(sickInfo.covidTestDate);
      let dateNew = new Date();
      dateNew.setDate(covidTestDate.getDate() + 3);
      let dateNow = new Date();
      if ((dateNow <= dateNew) && sick) {
        medicationCondFullfilled = true;
      }
    }
    return medicationCondFullfilled;
  }

  public getPerson(): Person {
    return this.person
  }

  public setPerson(p: Person) {
    this.person = p;
  }


}
