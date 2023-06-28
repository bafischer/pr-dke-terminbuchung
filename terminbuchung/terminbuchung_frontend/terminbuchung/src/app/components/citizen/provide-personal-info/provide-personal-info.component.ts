import {Component} from '@angular/core';
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SickInformation} from "../../../entities/SickInformation";
import {Router} from "@angular/router";

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

const emptySickInfo: SickInformation = {
  id: 0,
  symptoms: false,
  sick: false,
  symptomStartingDate: new Date(),
  covidTestDate: new Date(),
  medicationDate: new Date(),
  quarantine: false,
  quarantineStartDate: new Date(),
  quarantineEndDate: new Date(),
  positiveCovidTestDate: new Date("1900-01-01"),
  potential: false

}


@Component({
  selector: 'app-provide-personal-info',
  templateUrl: './provide-personal-info.component.html',
  styleUrls: ['./provide-personal-info.component.scss']
})

export class ProvidePersonalInfoComponent {

  public person: Person = emptyPerson;
  public title: string = 'Terminbuchung';
  public errorMessage: string = '';
  public counties: Array<string> = ['Braunau','Eferding','Freistadt','Gmunden','Grieskirchen',
    'Kirchdorf','Linz-Land','Perg','Ried','Rohrbach','Schärding','Steyr-Land','Urfahr-Umgebung',
    'Vöcklabruck','Wels-Land','Wels-Stadt','Steyr-Stadt','Linz-Stadt'];

  public visible: boolean = true;
  private sickInfo: SickInformation = emptySickInfo;
  public medicationCondFullfilled: boolean = false;
  public errorMessageMedication: String = '';

  public wantsMedication: boolean = false;

  public shouldOpenVacc: boolean = false;

  public shouldOpenMedic: boolean = false;


  constructor(private personService: PersonService, private router: Router) {
  }


  getSickInformation() {
    this.wantsMedication = true;
    this.personService.getSickInfo(this.person.svnr).subscribe((sInfo) => {
        this.errorMessageMedication = "ok";
        this.errorMessage = "ok";
        this.sickInfo = sInfo;
        this.getErrorDetails();
        this.checkConditionMedic();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        this.getErrorDetails();
        if (this.person.svnr.length != 10 || !(this.person.svnr.match(/^[0-9]*$/))) {
          this.errorMessage = 'Die Sozialversicherungsnummer ist ungültig';}
        else if (error.status === 404 || error.status === 400) {
          this.errorMessageMedication = "Eine Person mit dieser SVNR ist nicht in der Contact-Tracing-Datenbank erfasst."
        } else {
        this.errorMessageMedication = "Es ist ein Server-Fehler aufgetreten. Bitte versuchen Sie es noch einmal."
      }});
  }

  checkConditionMedic() {
      this.medicationCondFullfilled = this.personService.checkConditionMedic(this.sickInfo, this.errorMessageMedication);
      if (!this.medicationCondFullfilled) {
          this.errorMessageMedication =
          "Die Voraussetzungen sind laut Contact-Tracing-Datenbank nicht erfüllt";
        }
  }

  getErrorDetails() {
    if (this.person.svnr.length != 10 || !(this.person.svnr.match(/^[0-9]*$/))) {
      this.errorMessage = 'Die Sozialversicherungsnummer ist ungültig';
    }  else if (!this.personService.checkSozVersPruefziffer(this.person.svnr)) {
      this.errorMessage = 'Die Sozialversicherungsnummer (Prüfziffer) ist ungültig';
    } else if (this.person.firstName == '' || this.person.lastName == '' || this.person.email == '' ||
      this.person.phoneNr == '' || this.person.streetAndDoorNr == '' || this.person.city == '' ||
      this.person.postalCode == 0 || this.person.county == '') {
      this.errorMessage = "Alle Felder müssen befüllt werden";
    } else {
      this.errorMessage = 'ok';
    }
  }


   refresh(): void {
     window.location.reload();
  }



  //sammle Personendaten und speichere sie in this.person; abschließend lege die Information
  //in this.personService.person ab
   shouldOpenBookVacc() {
    this.shouldOpenVacc = true;
    this.personService.setPerson(this.person);
    this.router.navigate(['Terminbuchung-Impfung']);
    console.log(this.person.county);

  }

  shouldOpenBookMedic() {
    this.shouldOpenMedic = true;
    this.personService.setPerson(this.person);
    this.router.navigate(['Terminbuchung-Medikament']);
    console.log(this.person.county);
  }



}
