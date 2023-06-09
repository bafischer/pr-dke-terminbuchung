import {Component} from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {Person} from "../../../entities/Person";

//Komponente wurde nur zu Testzwecken benötigt


@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent {

  public people: Person[] = [];

  constructor(private personService: PersonService) {
  }

  ngOnInit() {
    this.personService.getPeople().subscribe((people) => {
      this.people = people;
      console.log(this.people);
    })
  }



}
