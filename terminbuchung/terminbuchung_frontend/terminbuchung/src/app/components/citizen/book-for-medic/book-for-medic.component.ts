import {Component, Input} from '@angular/core';
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Location} from "../../../entities/Location";
import {LocationService} from "../../../services/location.service";
import {AppointmentService} from "../../../services/appointment.service";
import {AppointmentTVerw} from "../../../entities/AppointmentTVerw";
import * as moment from 'moment';
import {AppointmentTBuch} from "../../../entities/AppointmentTBuch";

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
  reason: 'medication',
  article: '',
  idTerminverw: 0,
  deleted: false
}
@Component({
  selector: 'app-book-for-medic',
  templateUrl: './book-for-medic.component.html',
  styleUrls: ['./book-for-medic.component.scss']
})
export class BookForMedicComponent {

  @Input() personmedic: string | null = '';

  public personMedication: Person = emptyPerson;

  public errorMessagePerson: string = '';

  public locNameChoosen: string = "";

  public locAvailable: Location[] = [];
  public locNameAvailable: string[] = [];

  public appFree: AppointmentTVerw[] = [];

  public datesFree: String[] = [];

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

  constructor(private personService: PersonService, private locService: LocationService,
              private route: ActivatedRoute, private appService: AppointmentService,
              private router: Router) {
  }

  ngOnInit() {

    this.personmedic = this.route.snapshot.paramMap.get('data');
    this.getPerson();
  }

  getPerson() {
    if (this.personmedic != null) {
      this.personService.getPersonBySvnr(this.personmedic).subscribe((pVacc) => {
          this.personMedication = pVacc;
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
    if (this.personmedic != null) {
      this.locNameChoosen = '';
      console.log('county: ', this.personMedication.county);
      this.locService.getLocations(this.personMedication.county).subscribe((loc) => {
          this.locAvailable = loc;
          let i: number = 0;
          for (var Location of this.locAvailable) {
            if (Location.type == "medication") {
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
          let j: number = 0;
          for (var appSingle of app) {
            let date1 = new Date(appSingle.startDate);
            if (date1 > new Date()) {
              this.appFree[j] = appSingle;
              j++;
            }
          }
          let i: number = 0;
          for (var freeApp of this.appFree) {
            const date = new Date(freeApp.startDate);
            console.log('freeDate', date);
            this.datesFree[i] = date.toLocaleDateString();
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
        if (date.toLocaleDateString() == this.dateChoosen) {
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
          let age: number = moment().diff(this.personMedication.birthday, 'years');
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

  saveApp() {
    this.appToPost.person = this.personMedication;
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

  shouldOpenStartTab() {
    this.shouldOpenStart = true;
    window.location.reload();
    this.router.navigate(['Dateneingabe']);


  }


}







