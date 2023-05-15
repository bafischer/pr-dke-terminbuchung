import {Component} from '@angular/core';
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {HttpErrorResponse} from "@angular/common/http";

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

  visible: boolean = true;

  // defined the array of data

  constructor(private personService: PersonService) {
  }

  savePerson() {

    this.personService.addPerson(this.person).subscribe((newPerson) => {
      console.log('newPerson', newPerson);
      this.errorMessage = "ok";

    },
      (error: HttpErrorResponse) => {                            //Error callback
        this.getErrorDetails(error);
      });
  }




  getErrorDetails(error: HttpErrorResponse) {
    if (this.person.svnr.length != 10 || !(this.person.svnr.match(/^[0-9]*$/))) {
      this.errorMessage = 'Die Sozialversicherungsnummer ist ungültig';
    } else if (error.status == 400) {
      this.errorMessage = 'Diese Sozialversicherungsnummer ist bereits in der Datenbank erfasst';
    } else {
      this.errorMessage = "Alle Felder müssen befüllt werden";
    }
  }

   refresh(): void {
    window.location.reload();
  }




}
