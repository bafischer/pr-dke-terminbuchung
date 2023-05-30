import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {PersonService} from "./services/person.service";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from "primeng/table";
import {AccordionModule} from "primeng/accordion";
import {MenubarModule} from "primeng/menubar";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import { ProvidePersonalInfoComponent } from './components/citizen/provide-personal-info/provide-personal-info.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {SelectButtonModule} from "primeng/selectbutton";
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import {ListPersonComponent} from "./components/citizen/list-person/list-person.component";
import { BookForVaccComponent } from './components/citizen/book-for-vacc/book-for-vacc.component';
import { BookForMedicComponent } from './components/citizen/book-for-medic/book-for-medic.component';


@NgModule({
  declarations: [
    AppComponent,
    ProvidePersonalInfoComponent,
    ListPersonComponent,
    BookForVaccComponent,
    BookForMedicComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ButtonModule,
        CardModule,
        ToolbarModule,
        TableModule,
        AccordionModule,
        MenubarModule,
        CalendarModule,
        FormsModule,
        InputTextModule,
        InputNumberModule
        , BrowserAnimationsModule, SelectButtonModule,
        DropdownModule,
      DialogModule

    ],
  providers: [
    HttpClientModule,
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
