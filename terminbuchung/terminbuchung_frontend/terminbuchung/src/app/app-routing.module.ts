import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProvidePersonalInfoComponent} from "./components/citizen/provide-personal-info/provide-personal-info.component";
import {BookForVaccComponent} from "./components/citizen/book-for-vacc/book-for-vacc.component";



const routes: Routes = [
  {path: 'Dateneingabe', component: ProvidePersonalInfoComponent},
  {path: 'Terminbuchung-Impfung', component: BookForVaccComponent},
  {path: '**', component: ProvidePersonalInfoComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
