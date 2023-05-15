import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProvidePersonalInfoComponent} from "./components/citizen/provide-personal-info/provide-personal-info.component";



const routes: Routes = [
  {path: '**', component: ProvidePersonalInfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
