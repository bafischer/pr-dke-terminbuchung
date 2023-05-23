import {Component, Input} from '@angular/core';
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  selector: 'app-book-for-vacc',
  templateUrl: './book-for-vacc.component.html',
  styleUrls: ['./book-for-vacc.component.scss']
})
export class BookForVaccComponent {

  @Input() personvacc: string | null = '';

  public personVaccination: Person = emptyPerson;

  public errorMessagePerson: string = '';

  constructor(private personService: PersonService,private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.personvacc = this.route.snapshot.paramMap.get('data');
    this.getPerson();
    console.log(this.personvacc);
  }

  getPerson() {
    if (this.personvacc != null) {
      this.personService.getPersonBySvnr(this.personvacc).subscribe((pVacc) => {
          this.personVaccination = pVacc;
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






}






