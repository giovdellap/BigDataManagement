import { Routes } from '@angular/router';
import { GenerationsPageComponent } from './components/generations-page/generations-page.component';
import { LoadingtimePageComponent } from './components/loadingtime-page/loadingtime-page.component';
import { MultipleLinechartComponent } from './components/multiple-linechart/multiple-linechart.component';
import { SatisfactionPageComponent } from './components/satisfaction-page/satisfaction-page.component';
import { SetupPageComponent } from './components/setup-page/setup-page.component';
import { WliboxplotsPageComponent } from './components/wliboxplots-page/wliboxplots-page.component';

export const routes: Routes = [
  {path: "", redirectTo: '/setup', pathMatch: 'full'},
  {path: "satisfaction", component: SatisfactionPageComponent},
  {path: "generations", component: GenerationsPageComponent},
  {path: "loadingtime", component: LoadingtimePageComponent},
  {path: "wliboxplots", component: WliboxplotsPageComponent},
  {path: 'linecharts', component: MultipleLinechartComponent},
  {path: "setup", component: SetupPageComponent},

];
