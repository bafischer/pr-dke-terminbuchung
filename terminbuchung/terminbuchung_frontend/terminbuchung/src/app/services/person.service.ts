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
  private covidTestDate: Date | undefined = new Date();

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
    this.covidTestDate = sickInfo.covidTestDate;
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


  getCovidTestDate(): Date | undefined {
    return this.covidTestDate;
  }

  public setPerson(p: Person) {
    this.person = p;
  }

  public checkSozVersPruefziffer (sozVersNr: string): boolean {
    let pruefZ: string = sozVersNr.charAt(3);
    let pruefZNr: number = +pruefZ;
    console.log('pruefz:', pruefZNr);
    let summe: number = 0;
    let stelle: number = 0;

    do {
      for (var char of sozVersNr) {
        if (stelle == 0) {
          summe = summe + (+sozVersNr.charAt(stelle) * 3);
        }
        if (stelle == 1) {
          summe = summe + (+sozVersNr.charAt(stelle) * 7);
        }
        if (stelle == 2) {
          summe = summe + (+sozVersNr.charAt(stelle) * 9);
        }
        if (stelle == 4) {
          summe = summe + (+sozVersNr.charAt(stelle) * 5);
        }
        if (stelle == 5) {
          summe = summe + (+sozVersNr.charAt(stelle) * 8);
        }
        if (stelle == 6) {
          summe = summe + (+sozVersNr.charAt(stelle) * 4);
        }
        if (stelle == 7) {
          summe = summe + (+sozVersNr.charAt(stelle) * 2);
        }
        if (stelle == 8) {
          summe = summe + (+sozVersNr.charAt(stelle) * 1);
        }
        if (stelle == 9) {
          summe = summe + (+sozVersNr.charAt(stelle) * 6);
        }
        stelle++;
        console.log('stelle:', stelle);
        console.log('summe:', summe);

      }
      let erg: number = summe % 11;
      console.log('Validierungserg:', erg);
      let sozVersNrString = [...sozVersNr];
      let i;
      for (i = 0; i < sozVersNrString.length; i++) {
        if (i == 2) {
          sozVersNrString[2] = sozVersNrString[2] + 1;
        }
      }
      sozVersNr =  sozVersNrString.join('');



    }
    while ((summe % 11) == 10);
    if ((summe % 11) == pruefZNr) {
      return true;
    }
    return false;



  }



}
