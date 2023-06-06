import {Component, Input} from '@angular/core';
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import * as moment from 'moment';

import {LocationService} from "../../../services/location.service";
import {AppointmentService} from "../../../services/appointment.service";

import {AppointmentTBuch} from "../../../entities/AppointmentTBuch";
import {AppointmentTVerw} from "../../../entities/AppointmentTVerw";


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

const emptyAppTB: AppointmentTBuch = {
  date: '',
  person: emptyPerson,
  nameLocation: '',
  line: 0,
  reason: 'vaccination',
  article: '',
  idTerminverw: 0,
  deleted: false
}

@Component({
  selector: 'app-book-for-vacc',
  templateUrl: './book-for-vacc.component.html',
  styleUrls: ['./book-for-vacc.component.scss']
})
export class BookForVaccComponent {


  public errorMessagePerson: string = '';

  public locNameChoosen: string = "";

  public locNameAvailable: string[] = [];

  public appFree: AppointmentTVerw[] = [];

  public datesFree: string[] = [];

  public dateChoosen: string = "";

  public timeFree: String[] = [];

  public timeChoosen: string = "";

  public substAvail: String[] = [];

  public substAvailAgeChecked: String[] = [];

  public substChoosen: string = "";

  public appToPost: AppointmentTBuch = emptyAppTB;

  public errorMessage: string = '';

  public visible: boolean = true;

  public shouldOpenStart: boolean = false;

  constructor(public personService: PersonService, private locService: LocationService,
              private route: ActivatedRoute, private appService: AppointmentService,
              private router: Router) {
  }

  ngOnInit() {

    console.log('person:', this.personService.getPerson());
    this.getLocAvailable();
  }


  getLocAvailable() {
    if (this.personService.getPerson() != null) {
      this.locNameChoosen = '';
      this.locNameAvailable = this.locService.getLocAvailable(this.personService.getPerson());
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
          let j: number = 0;
          for (var appSingle of app) {
            let date1 = new Date(appSingle.startDate);
            if (date1 > new Date()) {
              this.appFree[j] = appSingle;
              j++;
            }
          }

          let i: number = 0;
          let datesFreeDate: Date[] = [];
          for (var freeApp of this.appFree) {
            const date = new Date(freeApp.startDate);
            datesFreeDate[i] = date;
            i++;
          }
          datesFreeDate.sort((a, b) => a.getTime() - b.getTime());
          let k: number = 0;
          for (var datesFreeDateS of datesFreeDate) {
            const date = new Date(datesFreeDateS);
            this.datesFree[k] = date.toLocaleDateString();
            k++;
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
      let timeFreeDate: Date[] = [];
      for (var freeApp of this.appFree) {
        const date = new Date(freeApp.startDate);
        if (date.toLocaleDateString() == this.dateChoosen) {
          timeFreeDate[i] = date;
          i++;
        }
      }
      timeFreeDate.sort((a, b) => a.getTime() - b.getTime());
      let k: number = 0;
      for (var timeFreeDateS of timeFreeDate) {
        this.timeFree[k] = timeFreeDateS.toLocaleTimeString();
        k++;
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
        if (date.toLocaleDateString() == this.dateChoosen && date.toLocaleTimeString() == this.timeChoosen) {
          for (var sub of freeApp.substance) {
            this.substAvail[i] = sub;
            i++;
          }

        }
      }
      this.substAvail = [...new Set(this.substAvail)];
      this.checkMinMaxAge();
    }
  }

  checkMinMaxAge() {
    if (this.substAvail != null) {
      this.substAvailAgeChecked = [];
      this.appService.getAllDrugs().subscribe((allDrugs) => {
          let age: number = moment().diff(this.personService.getPerson().birthday, 'years');
          console.log('age:', age);
          let i: number = 0;
          for (var drug of allDrugs) {
            if (age < drug.maxAge && age >= drug.minAge) {
              let drugName: string = drug.name;
              for (var drugNameAvail of this.substAvail) {
                if (drugName == drugNameAvail) {
                  this.substAvailAgeChecked[i] = drugName;
                  i++;
                }
              }
            }
          }
        },

        (error: HttpErrorResponse) => {
          //Error callback
          this.errorMessagePerson = "Es ist ein Server-Fehler aufgetreten. Bitte versuchen Sie es noch einmal.";
        });
    } else {
      this.errorMessagePerson = "Es ist ein Server-Fehler aufgetreten. Bitte versuchen Sie es noch einmal."
    }
  }



  shouldOpenStartTab() {
    this.shouldOpenStart = true;
    window.location.reload();
    this.router.navigate(['Dateneingabe']);


  }


  savePerson() {
    this.personService.addPerson().subscribe((newPerson) => {
        console.log('newPerson', newPerson);
        this.errorMessage = "ok";
        this.saveAppGetPerson();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.errorMessage = "ok";
          this.saveAppGetPerson();
        }

      });
  }


  saveAppGetPerson() {
    if (this.personService.getPerson() != null) {
      this.personService.getPersonBySvnr(this.personService.getPerson().svnr).subscribe((pVacc) => {
          this.appToPost.person = pVacc;
          this.saveApp();

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

  saveApp() {

    this.appToPost.nameLocation = this.locNameChoosen;
    this.appToPost.article = this.substChoosen;
    let lineAvail: number[] = [];
    let i: number = 0;
    for (var freeApp of this.appFree) {
      const date = new Date(freeApp.startDate);
      if (date.toLocaleDateString() == this.dateChoosen && date.toLocaleTimeString() == this.timeChoosen
        && freeApp.location == this.locNameChoosen) {
        this.appToPost.date = date.toLocaleString();
        for (var subst of freeApp.substance) {
          if (subst == this.substChoosen) {
            lineAvail[i] = freeApp.line;
            if (i == 0) {
              this.appToPost.idTerminverw = freeApp.id;
              console.log('idTVerwaltung:', freeApp.id);
              console.log('idTBuchungTVerw:', this.appToPost.idTerminverw);
            }
            i++;
          }
        }
      }
    }
    if (lineAvail[0] != null) {
      this.appToPost.line = lineAvail[0];
    }

    console.log('appToPost:', this.appToPost);
    this.appService.addApp(this.appToPost).subscribe((newApp) => {
        this.errorMessage = "ok";
      },
      (error: HttpErrorResponse) => {                            //Error callback
        this.errorMessage = "Es ist ein Fehler aufgetreten.";
      });
    this.appService.addAppTVerw(this.appToPost.idTerminverw).subscribe((newApp) => {
        this.errorMessage = "ok";
      },
      (error: HttpErrorResponse) => {                            //Error callback
        this.errorMessage = "Es ist ein Fehler aufgetreten.";
      });




  }



}

















