import { Routes } from '@angular/router';
import { GenerationsPageComponent } from './components/generations-page/generations-page.component';
import { LoadingtimePageComponent } from './components/loadingtime-page/loadingtime-page.component';
import { SatisfactionPageComponent } from './components/satisfaction-page/satisfaction-page.component';

export const routes: Routes = [
  {path: "", redirectTo: '/satisfaction', pathMatch: 'full'},
  {path: "satisfaction", component: SatisfactionPageComponent},
  {path: "generations", component: GenerationsPageComponent},
  {path: "loadingtime", component: LoadingtimePageComponent}
];
