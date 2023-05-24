import {Component, Input} from '@angular/core';
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Location} from "../../../entities/Location";
import {LocationService} from "../../../services/location.service";
import {AppointmentService} from "../../../services/appointment.service";
import {FreeAppointments} from "../../../entities/FreeAppointments";

const emptyPerson: Person = {
  svnr: '',
  firstName: '',
  lastName: '',
  birthday: new Date(),
  county: '',
  email: '',
  phoneNr: '',
  streetAndDoorNr: '',
  postalCode: 1000,
  city: ''
}

@Component({
  selector: 'app-book-for-vacc',
  templateUrl: './book-for-vacc.component.html',
  styleUrls: ['./book-for-vacc.component.scss']
})
export class BookForVaccComponent {

  @Input() personvacc: string | null = '';

  public personVaccination: Person = emptyPerson;

  public errorMessagePerson: string = '';

  public locNameChoosen: string = "";

  public locAvailable: Location[] = [];
  public locNameAvailable: string[] = [];

  public appFree: FreeAppointments[] = [];

  public datesFree: String[] = [];

  public dateChoosen: string = "";

  public timeFree: String[] = [];

  public timeChoosen: string = "";

  public substAvail: String[] = [];

  public substChoosen: string = "";


  constructor(private personService: PersonService,private locService: LocationService,
              private route: ActivatedRoute, private appService: AppointmentService) {
  }

  ngOnInit() {

    this.personvacc = this.route.snapshot.paramMap.get('data');
    this.getPerson();
  }

  getPerson() {
    if (this.personvacc != null) {
      this.personService.getPersonBySvnr(this.personvacc).subscribe((pVacc) => {
          this.personVaccination = pVacc;
          //das ist wichtig //
          this.getLocAvailable();
        },
        (error: HttpErrorResponse) => {
          //Error callback
          if (error.status === 404) {
            this.errorMessagePerson = "Eine Person mit dieser SVNR ist nicht in der Datenbank erfasst."
          } else {
            this.errorMessagePerson = "Es ist ein Server-Fehler aufgetreten. Bitte versuchen Sie es noch einmal."
          }
        });
    } else {
      this.errorMessagePerson = "Es ist ein Server-Fehler aufgetreten. Bitte versuchen Sie es noch einmal."
    }
  }

  getLocAvailable() {
    if (this.personvacc != null) {
      this.locNameChoosen = '';
      console.log('county: ', this.personVaccination.county);
      this.locService.getLocations(this.personVaccination.county).subscribe((loc) => {
          this.locAvailable = loc;
          let i: number = 0;
          for (var Location of this.locAvailable) {
            if (Location.type == "Vaccine") {
              this.locNameAvailable[i] = Location.name;
              i++;
            }
          }
        },
        (error: HttpErrorResponse) => {
          //Error callback
          if (error.status === 404) {
            this.errorMessagePerson = "In diesem Bezirk sind aktuell keine Standorte verfügbar."
          } else {
            this.errorMessagePerson = "Es ist ein Server-Fehler aufgetreten. Bitte versuchen Sie es noch einmal."
          }
        });
    } else {
      this.errorMessagePerson = "Es ist ein Server-Fehler aufgetreten. Bitte versuchen Sie es noch einmal."
    }

  }

  getDatesAvailable() {
    if (this.locNameChoosen != null) {
      console.log('locChoosen: ', this.locNameChoosen);
      this.dateChoosen = '';
      this.datesFree = [];
      this.timeChoosen = '';
      this.timeFree = [];
      this.substChoosen = '';
      this.substAvail = [];
      this.appFree = [];
      this.appService.getFreeApp(this.locNameChoosen).subscribe((app) => {
          this.appFree = app;
          let i: number = 0;
          for (var freeApp of this.appFree) {
              const date = new Date(freeApp.startDate);
              console.log('freeDate', date);
              this.datesFree[i] = date.toDateString();
              i++;
          }
          //um Duplikate zu eliminieren
          this.datesFree = [...new Set(this.datesFree)];
        },
        (error: HttpErrorResponse) => {
          //Error callback
          if (error.status === 404) {
            this.errorMessagePerson = "An diesem Standort sind aktuell keine Termine verfügbar."
          } else {
            this.errorMessagePerson = "Es ist ein Server-Fehler aufgetreten. Bitte versuchen Sie es noch einmal."
          }
        });
    } else {
      this.errorMessagePerson = "Es ist ein Server-Fehler aufgetreten. Bitte versuchen Sie es noch einmal."
    }

  }


  getTimesAvailable() {
    if (this.dateChoosen != null) {
      console.log('dateChoosen: ', this.dateChoosen);
      this.timeChoosen = '';
      this.timeFree = [];
      this.substChoosen = '';
      this.substAvail = [];
      let i: number = 0;
      for (var freeApp of this.appFree) {
        const date = new Date(freeApp.startDate);
        if (date.toDateString() == this.dateChoosen) {
            this.timeFree[i] = date.toLocaleTimeString();
            console.log('timefree', this.timeFree[i]);
            i++;
        }
      }
      this.timeFree = [...new Set(this.timeFree)];
    }
  }

  getSubstancesAvailable() {
    if (this.timeChoosen != null) {
      console.log('timeChoosen: ', this.timeChoosen);
      this.substAvail = [];
      this.substChoosen = '';
      let i: number = 0;
      for (var freeApp of this.appFree) {
        const date = new Date(freeApp.startDate);
        if (date.toDateString() == this.dateChoosen && date.toLocaleTimeString() == this.timeChoosen) {
          for (var sub of freeApp.substance) {
            this.substAvail[i] = sub;
            i++;
          }

        }
      }
      this.substAvail = [...new Set(this.substAvail)];
    }
  }





}






