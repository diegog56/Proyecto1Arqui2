import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { DocComponent } from './components/doc/doc.component';


const routes: Routes = [
  {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{
  path: 'home',
  component: PrincipalComponent
},
{
  path: 'analytics',
  component: AnalyticsComponent
},
{
  path: 'doc',
  component: DocComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
