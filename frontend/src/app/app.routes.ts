import { Routes } from '@angular/router';
import { LinechartContainerComponent } from './components/linechart-container/linechart-container.component';
import { LoadingtimePageComponent } from './components/loadingtime-page/loadingtime-page.component';
import { ScatterplotComponent } from './components/scatterplot/scatterplot.component';
import { SetupPageComponent } from './components/setup-page/setup-page.component';
import { WliboxplotsPageComponent } from './components/wliboxplots-page/wliboxplots-page.component';

export const routes: Routes = [
  {path: "", redirectTo: '/setup', pathMatch: 'full'},
  {path: "scatterplot", component: ScatterplotComponent},
  {path: "loadingtime", component: LoadingtimePageComponent},
  {path: "wliboxplots", component: WliboxplotsPageComponent},
  {path: 'linecharts', component: LinechartContainerComponent},
  {path: "setup", component: SetupPageComponent},

];
